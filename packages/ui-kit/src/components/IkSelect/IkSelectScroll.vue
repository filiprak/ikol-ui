<script setup lang="ts" generic="ItemT">
import '@ui/styles';
import './IkSelect.css';
import { useRender } from '@ui/composables';
import { h, ref, useAttrs } from 'vue';
import { IkScrollArea } from '@ui/components/IkScrollArea';
import { IkVirtualScroller } from '@ui/components/IkVirtualScroller';

const props = withDefaults(
    defineProps<{
        virtual: boolean,
        items: ItemT[],
        item_height?: number | ((item: ItemT) => number),
        pagination?: { offset: number, has_more: boolean },
        loading?: boolean,
    }>(),
    {}
);
const slots = defineSlots<{
    default(): void
    item(props: { item: ItemT }): void
}>();
const attrs = useAttrs();
const vscroll_ref = ref<IkVirtualScroller<ItemT>>();
const scroll_ref = ref<IkScrollArea>();

function getContentHeight() {
    return (props.virtual ? vscroll_ref.value?.getContentHeight() : scroll_ref.value?.getContentHeight()) || undefined;
}

function scrollTop(offset: number) {
    props.virtual ? vscroll_ref.value?.scrollTop(offset) : scroll_ref.value?.scrollTop(offset);
}

useRender(() => {
    if (props.virtual) {
        return h(IkVirtualScroller<ItemT>, {
            ref: vscroll_ref,
            items: props.items,
            item_height: props.item_height,
        }, {
            item: slots.item,
            default: slots.default,
        });
    } else {
        return h(IkScrollArea, {
            ref: scroll_ref,
            pagination: props.pagination,
            loading: props.loading,
            onIkLoadMore: attrs.onIkLoadMore,
        }, () => [
            props.items.map(i => slots.item?.({ item: i })),
            slots.default?.(),
        ]);
    }
});

defineExpose({
    scrollTop,
    getContentHeight,
});
</script>
