<script lang="ts">
import '@/styles';
import { defineComponent, h } from 'vue';
import { formatCssValue } from '@/utils/helpers';

function getIconClasses(icon: string): string[] {
    const parts = (icon || '').split(':');
    let prefix = 'fas';

    if (parts.length > 1) {
        switch (parts[1]) {
            case 'light':
                prefix = 'fal';
                break;
            case 'regular':
                prefix = 'far';
                break;
            case 'solid':
                prefix = 'fas';
                break;
            case 'duotone':
                prefix = 'fad';
                break;
            case 'brands':
                prefix = 'fab';
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
    },
    setup(props) {
        return () => {
            return h(props.tag, {
                class: [
                    {
                        'ik-icon': true,
                        ['ik-icon--' + props.design]: !!props.design,
                        ['fa-' + props.size + 'x']: !props.size,
                    },
                    getIconClasses(props.icon),
                ],
                style: {
                    width: formatCssValue(props.size_px, 'px'),
                    height: formatCssValue(props.size_px, 'px'),
                    fontSize: formatCssValue(Number(props.size_px) / 2, 'px'),
                }
            });
        };
    },
});
</script>
