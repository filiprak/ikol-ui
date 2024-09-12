<script setup lang="ts">
import '@ui/styles';
import './IkButtonGroup.css';
import { computed, useSlots, h } from 'vue';
import { useRender } from '@ui/composables/render';
import { extractElementVNodes } from '@ui/utils/core';

const props = defineProps({
    equal: {
        type: Boolean,
        default: false,
    },
    stack: {
        type: Boolean,
        default: false,
    },
    reverse: {
        type: Boolean,
        default: false,
    },
});
const classes = computed(() => {
    const classes = ['ik-button-group'];

    if (props.equal) {
        classes.push('ik-button-group--equal');
    }

    if (props.stack) {
        classes.push('ik-button-group--stack');
    }
    return classes;
});
const slots = useSlots();

useRender(() => {
    const children = slots.default?.() || [];
    let elements = extractElementVNodes(children);

    if (props.reverse) {
        elements = elements.reverse();
    }

    return h('div', { class: classes.value }, [elements]);
});
</script>
