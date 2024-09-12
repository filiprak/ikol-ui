<template>
    <div :class="root_class"
         :style="root_style"></div>
</template>

<script setup lang="ts">

import './IkColorSwatch.css';
import type { IkUIElemSize } from '@ui/types/utils';

import { computed } from 'vue';

const props = withDefaults(defineProps<{
    format?: 'css' | 'hex' | 'rgb' | 'rgba',
    color?: string | string[]
    round?: boolean,
    size?: `${IkUIElemSize}`
}>(), {
    format: 'hex',
    round: false,
});

const root_class = computed(() => {
    const classes: Record<string, boolean> = {
        'ik-color-swatch': true,
        'ik-color-swatch--round': props.round,
    };
    if (props.size) {
        classes['ik-color-swatch--' + props.size] = !!props.size;
    }
    return classes;
});

const root_style = computed(() => {
    if (props.color) {
        let color_style = null;
        switch (props.format) {
            case 'css':
                color_style = props.color as string;
                break;
            case 'hex':
                color_style = '#' + props.color;
                break;
            case 'rgb':
                color_style = (typeof props.color === 'string') ? props.color : 'rgb(' + props.color.join(', ') + ')';
                break;
            case 'rgba':
                color_style = (typeof props.color === 'string') ? props.color : 'rgba(' + props.color.join(', ') + ')';
                break;
        }
        if (!color_style) {
            return {};
        }
        return { backgroundColor: color_style };
    } else {
        return {};
    }
});

</script>
