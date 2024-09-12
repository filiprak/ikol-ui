<script lang="ts">
import '@ui/styles';
import './IkBadge.css';
import { computed, h, defineComponent, type PropType } from 'vue';
import type { IkUIDesignColor } from '@ui/types/utils';

export default defineComponent({
    props: {
        design: {
            type: String as PropType<`${IkUIDesignColor}`>,
        },
        top: {
            type: Boolean,
            default: false,
        },
        left: {
            type: Boolean,
            default: false,
        },
        size: {
            type: Number,
            default: 12,
        },
        number: {
            type: [Number, String],
        },
        show: {
            type: Boolean,
            default: true,
        },
        show_zero: {
            type: Boolean,
            default: false,
        },
        outer: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { slots }) {
        const classes = computed(() => {
            return {
                'ik-badge': true,
                'ik-badge--outer': props.outer,
                'ik-badge--top': props.top && !props.outer,
                'ik-badge--left': props.left && !props.outer,
                ['ik-badge--' + props.design]: !!props.design,
            };
        });

        let show: boolean = props.show;

        let mask: string | null = null;

        if (!props.outer) {
            const r = Math.round(props.size / 2);
            const mr = (r + 2);

            const mx = props.left ? (r + 'px') : ('calc(100% - ' + r + 'px)');
            const my = props.top ? (r + 'px') : ('calc(100% - ' + r + 'px)');

            mask = `radial-gradient(circle ${mr}px at ${mx} ${my}, transparent 95%, #fff 100%)`;
        }

        let dot_text = '';

        if (!Number.isNaN(Number(props.number))) {
            if (Number(props.number) == 0 && !props.show_zero) {
                show = false;
            }
            if (Number(props.number) < 10) {
                dot_text = String(props.number);
            } else {
                dot_text = '9+';
            }
        }

        return () => h('div', {
            class: classes.value,
        }, [
            h('div', {
                class: 'ik-badge__content',
                style: show && mask
                    ? {
                        mask,
                        '-webkit-mask': mask,
                    }
                    : null,
            }, slots.default?.()),
            show
                ? h('div', {
                    class: 'ik-badge__dot',
                    style: { width: props.size + 'px', height: props.size + 'px' },
                }, slots.content?.() || dot_text)
                : null,
        ]);
    },
});
</script>
