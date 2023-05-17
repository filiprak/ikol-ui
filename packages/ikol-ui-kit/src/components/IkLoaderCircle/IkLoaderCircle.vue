<template>
    <div :class="root_class"
         class="ik-loader-circle"
         role="progressbar"
         :style="{ height: size_css, width: size_css }">
        <svg xmlns="http://www.w3.org/2000/svg"
             :style="{ transform: `rotate(${rotate}deg)` }"
             :viewBox="view_box">
            <circle v-if="!indeterminate"
                    class="ik-loader-circle__bckg"
                    fill="transparent"
                    :cx="2 * view_box_size"
                    :cy="2 * view_box_size"
                    :r="radius"
                    :stroke-width="stroke_width"
                    :stroke-dasharray="stroke_dash_array" />
            <circle class="ik-loader-circle__bar"
                    fill="transparent"
                    :cx="2 * view_box_size"
                    :cy="2 * view_box_size"
                    :r="radius"
                    :stroke-width="stroke_width"
                    :stroke-dasharray="stroke_dash_array"
                    :stroke-dashoffset="stroke_dash_offset" />
        </svg>
    </div>
</template>
<script setup lang="ts">
import '@/styles';
import './IkLoaderCircle.css';
import { defineProps, computed } from 'vue';
import { formatCssValue, clamp } from '@/utils/helpers';

const props = defineProps({
    value: {
        type: [Number, String],
        default: 0,
    },
    indeterminate: {
        type: Boolean,
        default: false,
    },
    rotate: {
        type: [Number, String],
        default: 0,
    },
    size: {
        type: [Number, String],
        default: 28,
    },
    thickness: {
        type: [Number, String],
        default: 3,
    },
    design: {
        type: String,
        default: null,
    },
});
const radius = 20;
const stroke_width = computed(() => Number(props.thickness) / Number(props.size) * view_box_size.value * 2);
const view_box_size = computed(() => radius / (1 - Number(props.thickness) / Number(props.size)));
const circle_len = computed(() => 2 * Math.PI * radius);
const computed_value = computed(() => clamp(Number(props.value), 0, 100));
const stroke_dash_array = computed(() => Math.round(circle_len.value * 1000) / 1000);
const stroke_dash_offset = computed(() => ((100 - computed_value.value) / 100) * circle_len.value + 'px');
const size_css = computed(() => formatCssValue(Number(props.size), 'px'));

const root_class = computed(() => ({
    'ik-loader-circle--indeterminate': props.indeterminate,
    [`ik-loader-circle--${props.design}`]: Boolean(props.design),
}));

const view_box = computed(() => `${view_box_size.value} ${view_box_size.value} ${2 * view_box_size.value} ${2 * view_box_size.value}`);
</script>
