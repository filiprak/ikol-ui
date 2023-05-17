<script setup lang="ts">
import '@/styles';
import './IkIcon.css';
import { h, useAttrs } from 'vue';
import { formatCssValue, getIconClasses } from '@/utils/helpers';
import { useRender } from '@/composables/render';

const props = defineProps({
    tag: {
        type: String,
        default: 'i',
    },
    icon: {
        type: String,
        default: null,
    },
    size: {
        type: [Number, String],
        default: null,
    },
    sizePx: {
        type: [Number, String],
        default: null,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    circle: {
        type: Boolean,
        default: false,
    },
    design: {
        type: String,
        default: null,
    },
    variant: {
        type: String,
        default: null,
    },
});
const attrs = useAttrs();

useRender(() => {
    return h(props.tag, {
        class: [
            {
                'ik-icon': true,
                ['ik-icon--' + props.design]: !!props.design,
                ['ik-icon--' + props.variant]: !!props.variant,
                'ik-icon--circle': props.circle,
                'ik-icon--clickable': !props.disabled && !!attrs.onClick,
                'ik-icon--disabled': props.disabled,
                ['fa-' + props.size + 'x']: !!props.size,
            },
            getIconClasses(props.icon),
        ],
        style: {
            width: props.sizePx && props.circle ? formatCssValue(props.sizePx, 'px') : null,
            height: props.sizePx && props.circle ? formatCssValue(props.sizePx, 'px') : null,
            fontSize: props.sizePx ? formatCssValue(props.circle ? (Number(props.sizePx) / 2) : props.sizePx, 'px') : null,
        },
    });
});
</script>
