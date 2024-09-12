<template>
    <div ref="root_el"
         class="ik-virtual-scroller-item">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import '@ui/styles';
import './IkVirtualScroller.css';
import { watch, ref } from 'vue';
import { useResizeObserver } from '@ui/composables';

const root_el = ref<HTMLElement>();
const emit = defineEmits<{
    (e: 'ik-resize', rect: DOMRectReadOnly): void,
}>();
const { rect } = useResizeObserver(root_el, 'border');

watch(rect, (r_new, r_old) => {
    if (r_new && (r_new?.height !== r_old?.height)) {
        emit('ik-resize', r_new);
    }
});
</script>
