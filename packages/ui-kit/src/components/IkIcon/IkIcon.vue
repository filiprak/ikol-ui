<script setup lang="ts">
import '@ui/styles';
import './IkIcon.css';
import { type PropType, h, useAttrs } from 'vue';
import { toCssUnits, getIconClasses } from '@ui/utils/helpers';
import { useRender } from '@ui/composables/render';
import type { IkUIDesignColor } from '@ui/types/utils';

const props = defineProps({
    tag: {
        type: String,
        default: 'i',
    },
    icon: {
        type: String,
    },
    size: {
        type: [Number, String],
    },
    size_px: {
        type: [Number, String],
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
        type: String as PropType<`${IkUIDesignColor}`>,
    },
    variant: {
        type: String,
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
            getIconClasses(props.icon || ''),
        ],
        style: {
            width: props.size_px && props.circle ? toCssUnits(props.size_px, 'px') : null,
            height: props.size_px && props.circle ? toCssUnits(props.size_px, 'px') : null,
            fontSize: props.size_px ? toCssUnits(props.circle ? (Number(props.size_px) / 2) : props.size_px, 'px') : null,
        },
    });
});
</script>
