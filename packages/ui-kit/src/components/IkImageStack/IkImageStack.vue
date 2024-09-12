<template>
    <div :class="main_class">
        <div v-for="(image, index) in visible_images"
             :key="index"
             :class="imageClass(index)"
             :style="imageStyles(index)">
            <IkImage :src="image"
                     :size="size"
                     round></IkImage>
        </div>
        <div v-if="value?.length > max"
             class="ik-image-stack__image-wrapper"
             :style="imageStyles(max)">
            <IkImage :src="value ? value[max] : undefined"
                     :size="size"
                     round />
            <div class="ik-image-stack__image--dark"></div>
            <span class="ik-image-stack__count ik-noselect"
                  :style="image_count_styles">
                {{ hidden_count }}
            </span>
        </div>
        <div v-else-if="!view_mode"
             class="ik-image-stack__image-wrapper ik-image-stack__add"
             :style="image_placeholder_styles">
            <IkIcon icon="plus" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { IkImage } from '@ui/components/IkImage';
import { IkIcon } from '@ui/components/IkIcon';
import './IkImageStack.css';
import { computed, type CSSProperties, type PropType } from 'vue';

const props = defineProps({
    size: {
        type: Number,
        default: 24,
    },
    max: {
        type: Number,
        default: 5,
    },
    view_mode: {
        type: Boolean,
        default: false,
    },
    value: {
        type: Array as PropType<string[]>,
        default() {
            return [];
        },
    },
    disabled: {
        type: Array as PropType<string[]>,
        default() {
            return [];
        },
    },
});

const visible_images = computed((): string[] => {
    return props.value.slice(0, props.max);
});
const hidden_count = computed((): string => {
    return `+${props.value.length - props.max}`;
});
const image_count_styles = computed((): CSSProperties => {
    return {
        'font-size': `${Math.round(props.size * 0.35)}px`,
    };
});
const image_placeholder_styles = computed((): CSSProperties => {
    return Object.assign(imageStyles(props.value.length), {
        width: `${props.size}px`,
        height: `${props.size}px`,
        'font-size': `${Math.round(props.size * 0.4)}px`,
    });
});
const main_class = computed((): Record<string, boolean> => {
    return {
        'ik-image-stack': true,
        'ik-image-stack--view': !props.view_mode,
    };
});

function getIsDisabled(index: number): boolean {
    return props.disabled.indexOf(props.value[index]) > -1;
}

function imageClass(index: number): Record<string, boolean> {
    return {
        'ik-image-stack__image-wrapper': true,
        'ik-image-stack__image-wrapper--disabled': getIsDisabled(index),
    };
}

function imageStyles(index: number): CSSProperties {
    const margin: number = -Math.round(props.size * 0.3);
    return {
        'margin-left': index !== 0 ? margin + 'px' : '',
        'z-index': props.max - index,
        'border-width': `${Math.round(props.size * 0.06)}px`,
    };
}
</script>
