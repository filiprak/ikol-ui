<script setup lang="ts">
import '@/styles';
import './IkFlex.css';
import { computed, defineProps, h, useSlots } from 'vue';
import { useRender } from '@/composables/render';

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
    fullHeightItems: {
        type: Boolean,
        default: false,
    },
    fullWidthItems: {
        type: Boolean,
        default: false,
    },
    wrap: {
        type: Boolean,
        default: false,
    },
    wrapText: {
        type: Boolean,
        default: false,
    },
    justifyStart: {
        type: Boolean,
        default: false,
    },
    justifyEnd: {
        type: Boolean,
        default: false,
    },
    justifySpace: {
        type: Boolean,
        default: false,
    },
    alignStart: {
        type: Boolean,
        default: false,
    },
    alignEnd: {
        type: Boolean,
        default: false,
    },
    fixedAndGrow: {
        type: Boolean,
        default: false,
    },
    growAndFixed: {
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
    if (props.fullWidthItems) {
        classes.push('ik-flex--full-width-items');
    }
    if (props.fullHeightItems) {
        classes.push('ik-flex--full-height-items');
    }
    if (props.wrap) {
        classes.push('ik-flex--wrap');
    }
    if (props.wrapText) {
        classes.push('ik-flex--wrap-text');
    }
    if (props.justifyStart) {
        classes.push('ik-flex--justify-start');
    }
    if (props.justifySpace) {
        classes.push('ik-flex--justify-space');
    }
    if (props.justifyEnd) {
        classes.push('ik-flex--justify-end');
    }
    if (props.alignStart) {
        classes.push('ik-flex--align-start');
    }
    if (props.alignEnd) {
        classes.push('ik-flex--align-end');
    }
    if (props.fixedAndGrow) {
        classes.push('ik-flex--fixed-grow');
    }
    if (props.growAndFixed) {
        classes.push('ik-flex--grow-fixed');
    }
    return classes;
});
useRender(() => h(props.tag, { class: classes.value }, slots.default?.()));
</script>
