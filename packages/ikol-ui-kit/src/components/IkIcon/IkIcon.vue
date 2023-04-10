<script lang="ts">
import '@/styles';
import './IkIcon.css';
import { defineComponent, h } from 'vue';
import { formatCssValue, getIconClasses } from '@/utils/helpers';

export default defineComponent({
    name: 'IkIcon',
    props: {
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
        size_px: {
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
    },
    setup(props, { attrs }) {
        return () => {
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
                    width: props.circle ? formatCssValue(props.size_px, 'px') : null,
                    height: props.circle ? formatCssValue(props.size_px, 'px') : null,
                    fontSize: props.size_px ? formatCssValue(props.circle ? (Number(props.size_px) / 2) : props.size_px, 'px') : null,
                },
            });
        };
    },
});
</script>
