<script setup lang="ts">
import '@ui/styles';
import './IkFlex.css';
import { computed, h, useSlots } from 'vue';
import { useRender } from '@ui/composables/render';

const props = defineProps({
    tag: {
        type: String,
        default: 'div',
    },
    column: {
        type: Boolean,
        default: false,
    },
    inline: {
        type: Boolean,
        default: false,
    },
    full_height_items: {
        type: Boolean,
        default: false,
    },
    full_width_items: {
        type: Boolean,
        default: false,
    },
    wrap: {
        type: Boolean,
        default: false,
    },
    wrap_text: {
        type: Boolean,
        default: false,
    },
    justify_start: {
        type: Boolean,
        default: false,
    },
    justify_end: {
        type: Boolean,
        default: false,
    },
    justify_space: {
        type: Boolean,
        default: false,
    },
    align_start: {
        type: Boolean,
        default: false,
    },
    align_end: {
        type: Boolean,
        default: false,
    },
    fixed_and_grow: {
        type: Boolean,
        default: false,
    },
    grow_and_fixed: {
        type: Boolean,
        default: false,
    },
    reverse: {
        type: Boolean,
        default: false,
    },
});
const slots = useSlots();
const classes = computed(() => {
    const classes = ['ik-flex'];

    if (props.column) {
        classes.push('ik-flex--column');
    }
    if (props.reverse) {
        classes.push('ik-flex--reverse');
    }
    if (props.inline) {
        classes.push('ik-flex--inline');
    }
    if (props.full_width_items) {
        classes.push('ik-flex--full-width-items');
    }
    if (props.full_height_items) {
        classes.push('ik-flex--full-height-items');
    }
    if (props.wrap) {
        classes.push('ik-flex--wrap');
    }
    if (props.wrap_text) {
        classes.push('ik-flex--wrap-text');
    }
    if (props.justify_start) {
        classes.push('ik-flex--justify-start');
    }
    if (props.justify_space) {
        classes.push('ik-flex--justify-space');
    }
    if (props.justify_end) {
        classes.push('ik-flex--justify-end');
    }
    if (props.align_start) {
        classes.push('ik-flex--align-start');
    }
    if (props.align_end) {
        classes.push('ik-flex--align-end');
    }
    if (props.fixed_and_grow) {
        classes.push('ik-flex--fixed-grow');
    }
    if (props.grow_and_fixed) {
        classes.push('ik-flex--grow-fixed');
    }
    return classes;
});
useRender(() => h(props.tag, { class: classes.value }, slots.default?.()));
</script>
