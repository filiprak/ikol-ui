<script setup lang="ts">
import '@ui/styles';
import './IkImage.css';
import type { CSSProperties, Ref } from 'vue';

import { h, ref, computed, useSlots } from 'vue';
import { IkLoaderCircle } from '@ui/components/IkLoaderCircle';
import { useRender } from '@ui/composables/render';

const props = defineProps({
    src: {
        type: String,
    },
    alt: {
        type: String,
    },
    round: {
        type: Boolean,
        default: false,
    },
    size: {
        type: Number,
    },
    width: {
        type: Number,
    },
    height: {
        type: Number,
    },
    width_attr: {
        type: Number,
    },
    height_attr: {
        type: Number,
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
});
const slots = useSlots();
const classes = computed(() => {
    return {
        'ik-image': true,
        'ik-image--empty': !props.src,
        'ik-image--round': props.round,
        'ik-image--contain': props.contain,
        'ik-image--cover': props.cover,
    };
});
const loading = ref(props.loader);
const error: Ref<Event | null> = ref(null);
const width = props.width || props.size;
const height = props.height || props.size;
const styles: CSSProperties = {};

width && (styles.width = width + 'px');
height && (styles.height = height + 'px');

useRender(() => {
    const img = h(props.src ? 'img' : 'div', {
        class: classes.value,
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
});
</script>
