<template>
    <div ref="root_el"
         :class="root_class"
         data-simplebar
         data-simplebar-auto-hide="false">
        <div class="simplebar-wrapper">
            <template v-if="horizontal_arrows">
                <transition name="fade">
                    <div v-if="arrows.left"
                         class="ik-scroll-area__shadow-left">
                        <IkButton circle
                                  filled
                                  icon="arrow-left"
                                  size="lg"
                                  @click="_onArrowClick(-1)" />
                    </div>
                </transition>
                <transition name="fade">
                    <div v-if="arrows.right"
                         class="ik-scroll-area__shadow-right">
                        <IkButton circle
                                  filled
                                  icon="arrow-right"
                                  size="lg"
                                  @click="_onArrowClick(1)" />
                    </div>
                </transition>
            </template>
            <div class="simplebar-height-auto-observer-wrapper">
                <div class="simplebar-height-auto-observer" />
            </div>
            <div class="simplebar-mask">
                <div class="simplebar-offset">
                    <div ref="scroll_el"
                         class="simplebar-content-wrapper"
                         @scrollend="_onScrollEnd"
                         @scroll.passive="_onScroll">
                        <div ref="content_el"
                             class="simplebar-content">
                            <slot v-if="!reverse"></slot>
                            <div v-if="show_loader"
                                 class="ik-scroll-area__loader">
                                <IkLoaderCircle indeterminate
                                                :design="loader_design || 'default'"
                                                :size="20"
                                                :thickness="2" />
                            </div>
                            <slot v-if="reverse"></slot>
                        </div>
                    </div>
                </div>
            </div>
            <div class="simplebar-placeholder" />
        </div>
        <div class="simplebar-track simplebar-horizontal">
            <div class="simplebar-scrollbar" />
        </div>
        <div class="simplebar-track simplebar-vertical">
            <div class="simplebar-scrollbar" />
        </div>
    </div>
</template>
<script setup lang="ts">
import '@ui/styles';
import 'simplebar/dist/simplebar.min.css';
import './IkScrollArea.css';
import SimpleBar from 'simplebar';
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, useAttrs } from 'vue';
import { IkLoaderCircle } from '@ui/components/IkLoaderCircle';
import { IkButton } from '@ui/components/IkButton';
import { isFunction } from '@ui/utils/helpers';

const SCROLL_EL_DATA_KEY = 'ik-scroll-area';

export interface HTMLIkScrollElement extends HTMLElement {
    [SCROLL_EL_DATA_KEY]?: {
        is_bottom?: boolean,
        last_offset?: number | null,
        last_scroll_top?: number,
        last_scroll_height?: number,
        last_bottom_distance?: number,
    }
}
const emit = defineEmits({});
const attrs = useAttrs();
const props = withDefaults(
    defineProps<{
        hide_x?: boolean,
        hide_y?: boolean,
        disable_auto_anchoring?: boolean,
        loading?: boolean,
        hide_loader?: boolean,
        loader_design?: string,
        bound_threshold?: number,
        reverse?: boolean,
        pagination?: { offset: number, has_more: boolean },
        horizontal_arrows?: boolean,
        horizontal_arrow_step?: number,
    }>(),
    {
        hide_x: false,
        hide_y: false,
        disable_auto_anchoring: false,
        loading: false,
        hide_loader: false,
        bound_threshold: 20,
        reverse: false,
        pagination: () => ({
            offset: 0,
            has_more: false,
        }),
        horizontal_arrows: false,
    },
);

const root_el = ref<HTMLElement>();
const scroll_el = ref<HTMLElement>();
const content_el = ref<HTMLElement>();

const arrows = reactive({
    left: false,
    right: false,
});

const root_class = computed(() => {
    return {
        'ik-scroll-area': true,
        'ik-scroll-area--hide-x': props.hide_x,
        'ik-scroll-area--hide-y': props.hide_y,
        'ik-scroll-area--no-auto-anchor': props.disable_auto_anchoring,
    };
});
const infinite = computed(() => {
    return !!attrs.onIkLoadMore;
});
const show_loader = computed(() => {
    return !props.hide_loader && infinite.value && props.pagination.has_more;
});

function getContentHeight() {
    const el = content_el.value;
    if (el) {
        const rect = el.getBoundingClientRect();
        return rect.height;
    } else {
        return null;
    }
}
function scrollTop(offset: number, animate = false) {
    const el = getScrollEl();
    if (el) {
        el.scroll({
            top: (offset || 0),
            behavior: animate ? 'smooth' : undefined,
        });
    }
}
function scrollLeft(offset: number, animate = false) {
    const el = getScrollEl();
    if (el) {
        el.scroll({
            left: (offset || 0),
            behavior: animate ? 'smooth' : undefined,
        });
    }
}
function getScrollWidth() {
    const el = getScrollEl();
    return el ? el.scrollWidth : null;
}
function getScrollTop() {
    const el = getScrollEl();
    return el ? el.scrollTop : null;
}
function getScrollLeft() {
    const el = getScrollEl();
    return el ? el.scrollLeft : null;
}
function getScrollTopMax() {
    const el = getScrollEl();
    return el ? el.scrollHeight - el.clientHeight : null;
}
function getScrollLeftMax() {
    const el = getScrollEl();
    return el ? el.scrollWidth - el.clientWidth : null;
}
function getScrollLeftRemaining() {
    const left_max = getScrollLeftMax();
    const left = getScrollLeft();

    if (left_max !== null && left !== null) {
        return left_max - left;
    } else {
        return null;
    }
}
function scrollBottom() {
    const el = getScrollEl();
    if (el) {
        nextTick(() => {
            el.scrollTop = el.scrollHeight;
        });
    }
}
function scrollTo(el: HTMLElement, align: 'center' | 'top') {
    const scroll_el = getScrollEl();

    if (scroll_el && el) {
        nextTick(() => {
            const s_rect = scroll_el.getBoundingClientRect();
            const rect = el.getBoundingClientRect();
            let top = 0;
            switch (align) {
                case 'center':
                    top = Math.floor(el.offsetTop + (rect.height / 2) - (s_rect.height / 2));
                    break;
                default:
                    top = 0;
            }
            scroll_el.scrollTop = Math.max(top, 0);
        });
    }
}
function getScrollEl(): HTMLIkScrollElement | undefined {
    return scroll_el.value;
}
function _getContentEl() {
    return content_el.value;
}
function _onArrowClick(steps: number) {
    scrollLeft((getScrollLeft() || 0) + (steps * (props.horizontal_arrow_step || 300)), true);
}
function _onScroll(event: Event) {
    const el = event.target as HTMLIkScrollElement | null;

    if (infinite.value && el) {
        const data = el[SCROLL_EL_DATA_KEY] || {};
        const last_offset = data.last_offset;
        const from_bottom = el.scrollHeight - el.scrollTop - el.clientHeight;
        const is_bottom = from_bottom <= 10;

        if (!props.loading) {
            const reached_bound = props.reverse
                ? (el.scrollTop <= props.bound_threshold)
                : (el.scrollTop + el.clientHeight + props.bound_threshold >= el.scrollHeight);
            if (reached_bound) {
                const has_more_items = props.pagination.has_more;
                if (has_more_items && last_offset !== props.pagination.offset) {
                    data.last_offset = props.pagination.offset;
                    emit('ik-load-more', { pagination: props.pagination });
                }
            }
        }
        el[SCROLL_EL_DATA_KEY] = {
            is_bottom,
            last_offset: data.last_offset || null,
            last_scroll_height: el.scrollHeight,
            last_bottom_distance: el.scrollHeight - el.scrollTop - el.clientHeight,
        };
    }
    if (props.horizontal_arrows) {
        _updateArrows();
    }
    if (isFunction(attrs.onScroll)) {
        attrs.onScroll(event);
    }
}
function _onScrollEnd(event: Event) {
    if (isFunction(attrs.onScrollend)) {
        attrs.onScrollend(event);
    }
}
function _onContentChange() {
    const el = getScrollEl();

    if (props.reverse && el) {
        const data = el[SCROLL_EL_DATA_KEY] || {};
        const last_height = data.last_scroll_height || 0;

        nextTick(() => {
            if (data.is_bottom) {
                el.scrollTop = el.scrollHeight;
            } else {
                el.scrollTop = Math.max(el.scrollTop + (el.scrollHeight - last_height), 0);
            }
        });
    }
    if (props.horizontal_arrows) {
        _updateArrows();
    }
}
function _onScrollElReady(el: HTMLIkScrollElement) {
    if (props.reverse) {
        el.scrollTop = el.scrollHeight;
        el[SCROLL_EL_DATA_KEY] = {
            is_bottom: true,
            last_offset: null,
            last_scroll_top: el.scrollTop,
            last_scroll_height: el.scrollHeight,
            last_bottom_distance: el.scrollHeight - el.scrollTop - el.clientHeight,
        };
    }
    if (props.reverse || props.horizontal_arrows) {
        new MutationObserver(_onContentChange)
            .observe(el, {
                childList: true,
                subtree: true,
            });
        const r_obs = new ResizeObserver(_onContentChange);
        r_obs.observe(el);
        if (el !== _getContentEl()) {
            const c_el = _getContentEl();
            c_el && r_obs.observe(c_el);
        }
    }
}
function _updateArrows() {
    const left = getScrollLeft();
    const leftr = getScrollLeftRemaining();

    arrows.left = left !== null && (left > 2);
    arrows.right = leftr !== null && (leftr > 2);
}
onMounted(() => {
    const el = getScrollEl();

    if (el) {
        _onScrollElReady(el);
    }

    if (props.reverse) {
        nextTick(() => {
            scrollBottom();
        });
    }
    if (props.horizontal_arrows) {
        nextTick(() => {
            _updateArrows();
        });
    }
});

onBeforeUnmount(() => {
    const instance = SimpleBar.instances.get(root_el.value as Object);
    if (instance) {
        instance.unMount();
    }
});

defineExpose({
    getScrollEl,
    getContentHeight,
    scrollTop,
    scrollLeft,
    getScrollWidth,
    getScrollTop,
    getScrollTopMax,
    getScrollLeft,
    getScrollLeftMax,
    scrollBottom,
    scrollTo,
});
</script>
