<script lang="ts">
import '@/styles';
import './IkIcon.css';
import { defineComponent, h } from 'vue';
import { formatCssValue } from '@/utils/helpers';

function getIconClasses(icon: string): string[] {
    const parts = (icon || '').split(':');
    let prefix = 'fa-solid';

    if (parts.length > 1) {
        switch (parts[1]) {
            case 'thin':
                prefix = 'fa-thin';
                break;
            case 'light':
                prefix = 'fa-light';
                break;
            case 'regular':
                prefix = 'fa-regular';
                break;
            case 'solid':
                prefix = 'fa-solid';
                break;
            case 'duotone':
                prefix = 'fa-duotone';
                break;
            case 'brands':
                prefix = 'fa-brands';
                break;
        }
    }

    if (parts[0]) {
        return [prefix, 'fa-' + parts[0]];
    } else {
        return [];
    }
}

export default defineComponent({
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
    setup(props) {
        return () => {
            return h(props.tag, {
                class: [
                    {
                        'ik-icon': true,
                        ['ik-icon--' + props.design]: !!props.design,
                        ['ik-icon--' + props.variant]: !!props.variant,
                        ['ik-icon--circle']: props.circle,
                        ['ik-icon--disabled']: props.disabled,
                        ['fa-' + props.size + 'x']: !!props.size,
                    },
                    getIconClasses(props.icon),
                ],
                style: {
                    width: props.circle ? formatCssValue(props.size_px, 'px') : null,
                    height: props.circle ? formatCssValue(props.size_px, 'px') : null,
                    fontSize: props.size_px ? formatCssValue(Number(props.size_px) / 2, 'px') : null,
                }
            });
        };
    },
});
</script>
