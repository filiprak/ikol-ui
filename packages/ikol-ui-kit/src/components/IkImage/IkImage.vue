<script lang="ts">
import '@/styles';
import './IkImage.css';
import type { Ref } from 'vue';
import { defineComponent, h, ref } from 'vue';
import { IkLoaderCircle } from '@/components/IkLoaderCircle';

export default defineComponent({
    name: 'IkImage',
    props: {
        src: {
            type: String,
            default: null,
        },
        alt: {
            type: String,
            default: null,
        },
        round: {
            type: Boolean,
            default: false,
        },
        size: {
            type: Number,
            default: null,
        },
        width: {
            type: Number,
            default: null,
        },
        height: {
            type: Number,
            default: null,
        },
        width_attr: {
            type: Number,
            default: null,
        },
        height_attr: {
            type: Number,
            default: null,
        },
        contain: {
            type: Boolean,
            default: false,
        },
        cover: {
            type: Boolean,
            default: false,
        },
        loader: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { slots }) {
        const classes = {
            'ik-image': true,
            'ik-image--empty': !props.src,
            'ik-image--round': props.round,
            'ik-image--contain': props.contain,
            'ik-image--cover': props.cover,
        };
        const loading = ref(props.loader);
        const error: Ref<Event | null> = ref(null);
        const width = props.width || props.size;
        const height = props.height || props.size;
        const styles: any = {};

        width && (styles.width = width + 'px');
        height && (styles.height = height + 'px');

        return () => {
            const img = h(props.src ? 'img' : 'div', {
                class: classes,
                src: props.src,
                loading: 'lazy',
                alt: props.alt || '{{_*en*Image_}}',
                width: props.width_attr || null,
                height: props.height_attr || null,
                style: styles,

                onLoad: props.loader
                    ? () => {
                        loading.value = false;
                        error.value = null;
                    }
                    : null,
                onError: props.loader
                    ? (event: Event) => {
                        loading.value = false;
                        error.value = event;
                    }
                    : null,

            }, slots.default?.());

            if (props.loader && loading.value) {
                return h('div', { style: styles, class: ['ik-image', 'ik-image--loading'] }, [
                    h(IkLoaderCircle, { indeterminate: true }),
                    img,
                ]);
            } else {
                return img;
            }
        };
    },
});
</script>
