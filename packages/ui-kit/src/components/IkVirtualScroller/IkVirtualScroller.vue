<template>
    <IkScrollArea ref="scrollarea"
                  class="ik-virtual-scroller"
                  @scroll="onScroll"
                  @scrollend="onScrollEnd">
        <div class="ik-virtual-scroller__spacer"
             :style="{ paddingTop: toCssUnits(padding_top, 'px') }"></div>
        <IkVirtualScrollerItem v-for="item in visible_items"
                               :key="item.index"
                               @ik-resize="onItemResize(item.index, $event)">
            <slot name="item"
                  :item="item.raw"></slot>
        </IkVirtualScrollerItem>
        <slot v-if="visible_items.length < 1"></slot>
        <div class="ik-virtual-scroller__spacer"
             :style="{ paddingBottom: toCssUnits(padding_bottom, 'px') }"></div>
    </IkScrollArea>
</template>
<script setup lang="ts" generic="ItemT">
// inspired by https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/composables/virtual.ts
import '@ui/styles';
import './IkVirtualScroller.css';
import { computed, ref, shallowRef, watch, watchEffect } from 'vue';
import { IkScrollArea } from '@ui/components/IkScrollArea';
import { useResizeObserver } from '@ui/composables';
import { clamp, toCssUnits, debounce, isNumber, isFunction } from '@ui/utils/helpers';
import IkVirtualScrollerItem from './IkVirtualScrollerItem.vue';

const props = withDefaults(
    defineProps<{
        items: ItemT[],
        item_height?: number | ((item: ItemT) => number),
    }>(),
    {
        item_height: 40,
    },
);
const BUFFER_PX = 100;
const SCROLL_UP = -1;
const SCROLL_DOWN = 1;

const scrollarea = ref<IkScrollArea>();
const scroll_el = computed(() => scrollarea.value?.getScrollEl());
const { rect: scroll_rect } = useResizeObserver(scroll_el);
const scroll_height = computed(() => scroll_rect.value?.height);
const item_min_height = shallowRef(0);

const padding_top = shallowRef(0);
const padding_bottom = shallowRef(0);

const first_idx = shallowRef(0);
const last_idx = shallowRef(25);

let sizes = Array.from<number | null>({ length: props.items.length });
let offsets = Array.from<number>({ length: props.items.length });
let last_scroll_top = 0;
let scroll_velocity = 0;
let last_scroll_time = 0;

const initialized = computed(() => {
    return !!scroll_rect.value;
});

const visible_items = computed(() => {
    return props.items
        .slice(first_idx.value, last_idx.value)
        .map((item, index) => ({
            raw: item,
            index: index + first_idx.value,
        }));
});

function getItemHeight(index: number) {
    index = clamp(index, 0, props.items.length - 1);
    return sizes[index] || (isFunction(props.item_height) ? props.item_height(props.items[index]) : null) || item_min_height.value;
}

function getItemOffset(index: number) {
    return offsets[clamp(index, 0, props.items.length - 1)] || 0;
}

function getItemIndex(scroll_top: number) {
    return binaryClosest(offsets, scroll_top);
}

let update_time = 0;
let updateOffsets: () => void = doUpdateOffsets;

function doUpdateOffsets() {
    offsets[0] = 0;

    const start = performance.now();

    for (let i = 1; i <= props.items.length - 1; i++) {
        offsets[i] = (offsets[i - 1] || 0) + getItemHeight(i - 1);
    }

    update_time = Math.max(update_time, performance.now() - start);
    updateOffsets = debounce(doUpdateOffsets, update_time);
}

let frame_id = -1;
function recalculate() {
    cancelAnimationFrame(frame_id);
    frame_id = requestAnimationFrame(doRecalculate);
}

function doRecalculate() {
    const scroll_top = last_scroll_top;
    const direction = Math.sign(scroll_velocity);

    const start_px = Math.max(0, scroll_top - BUFFER_PX);
    const start_i = clamp(getItemIndex(start_px), 0, props.items.length);

    const end_px = scroll_top + (scroll_rect.value?.height || 0) + BUFFER_PX;
    const end_i = clamp(getItemIndex(end_px) + 1, start_i + 1, props.items.length);

    if (
        (direction !== SCROLL_UP || start_i < first_idx.value) &&
        (direction !== SCROLL_DOWN || end_i > last_idx.value)
    ) {
        const top_overflow = getItemOffset(first_idx.value) - getItemOffset(start_i);
        const bottom_overflow = getItemOffset(end_i) - getItemOffset(last_idx.value);
        const buffer_overflow = Math.max(top_overflow, bottom_overflow);

        if (buffer_overflow > BUFFER_PX) {
            first_idx.value = start_i;
            last_idx.value = end_i;
        } else {
            if (start_i <= 0) {
                first_idx.value = start_i;
            }
            if (end_i >= props.items.length) {
                last_idx.value = end_i;
            }
        }
    }

    padding_top.value = getItemOffset(first_idx.value);
    padding_bottom.value = getItemOffset(props.items.length) - getItemOffset(last_idx.value);
}

function onScroll() {
    if (scrollarea.value) {
        const scroll_top = scrollarea.value.getScrollTop() || 0;
        const scroll_time = performance.now();
        const scroll_dt = scroll_time - last_scroll_time;

        if (scroll_dt > 500) {
            scroll_velocity = Math.sign(scroll_top - last_scroll_top);
        } else {
            scroll_velocity = scroll_top - last_scroll_top;
        }

        last_scroll_top = scroll_top;
        last_scroll_time = scroll_time;

        recalculate();
    }
}

function onScrollEnd() {
    scroll_velocity = 0;
    last_scroll_time = 0;

    recalculate();
}

function onItemResize(index: number, rect: DOMRectReadOnly) {
    if (rect.height !== null && rect.height > 0) {
        const prev_h = sizes[index];
        const prev_min_h = item_min_height.value;

        item_min_height.value = prev_min_h ? Math.min(prev_min_h, rect.height) : rect.height;

        if (prev_h !== rect.height || prev_min_h !== item_min_height.value) {
            sizes[index] = rect.height;
            updateOffsets();
        }
    }
}

function onInit() {
    updateOffsets();
    recalculate();
}

const stopInit = watch(initialized, (ready) => {
    if (!ready) return;

    stopInit();
    onInit();
});

watch(() => props.items, () => {
    sizes = Array.from({ length: props.items.length });
    offsets = Array.from({ length: props.items.length });

    doUpdateOffsets();
    recalculate();
}, { deep: true });

watchEffect(() => {
    if (isNumber(props.item_height)) {
        item_min_height.value = props.item_height;
    }
});

watch(scroll_height, (h_new, h_old) => {
    if (h_old !== h_new) {
        recalculate();
    }
});

function scrollToIndex(index: number) {
    if (scroll_el.value) {
        scroll_el.value.scrollTop = getItemOffset(index);
    }
}

function getContentHeight() {
    return scrollarea.value?.getContentHeight() ?? undefined;
}

function scrollTop(offset: number) {
    scrollarea.value?.scrollTop(offset);
}

// https://gist.github.com/robertleeplummerjr/1cc657191d34ecd0a324
function binaryClosest(arr: ArrayLike<number>, val: number) {
    let high = arr.length - 1;
    let low = 0;
    let mid = 0;
    let item = null;
    let target = -1;

    if (arr[high]! < val) {
        return high;
    }

    while (low <= high) {
        mid = (low + high) >> 1;
        item = arr[mid]!;

        if (item > val) {
            high = mid - 1;
        } else if (item < val) {
            target = mid;
            low = mid + 1;
        } else if (item === val) {
            return mid;
        } else {
            return low;
        }
    }

    return target;
}

defineExpose({
    getContentHeight,
    scrollTop,
    scrollToIndex,
});
</script>
