<template>
    <div :class="rootClass"
         class="ik-loader-circle"
         role="progressbar"
         :style="{ height: sizeCss, width: sizeCss }"
         @...$listeners>
        <svg v-if="isSvg"
             :style="{ transform: `rotate(${rotate}deg)` }"
             :viewBox="viewBox">
            <circle class="ik-loader-circle__bckg"
                    fill="transparent"
                    :cx="center"
                    :cy="center"
                    :r="radius"
                    :stroke-width="strokeWidth"
                    :stroke-dasharray="strokeDashArray" />
            <circle class="ik-loader-circle__bar"
                    fill="transparent"
                    :cx="center"
                    :cy="center"
                    :r="radius"
                    :stroke-width="strokeWidth"
                    :stroke-dasharray="strokeDashArray"
                    :stroke-dashoffset="strokeDashOffset" />
        </svg>
        <i v-else
           class="ik-loader-circle fas fa-spinner fa-spin"
           role="progressbar" />
    </div>
</template>
  
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { formatCssPixels, clamp } from '@ikol/src/common/classes/ik_utils';

export default defineComponent({
    name: 'IkLoaderCircle',
    props: {
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
    },
    setup(props) {
        const radius = 20;
        const center = 2 * radius;
        const strokeWidth = computed(() => Number(props.thickness) / Number(props.size) * viewBoxSize.value * 2);
        const viewBoxSize = computed(() => radius / (1 - Number(props.thickness) / Number(props.size)));
        const circleLen = computed(() => 2 * Math.PI * radius);
        const computedValue = computed(() => clamp(Number(props.value), 0, 100));
        const strokeDashArray = computed(() => Math.round(circleLen.value * 1000) / 1000);
        const strokeDashOffset = computed(() => ((100 - computedValue.value) / 100) * circleLen.value + 'px');
        const sizeCss = computed(() => formatCssPixels(props.size));

        const isSvg = computed(() => Boolean(props.design));
        const rootClass = computed(() => ({
            'ik-loader-circle--indeterminate': props.indeterminate,
            [`ik-loader-circle--${props.design}`]: Boolean(props.design),
        }));

        const viewBox = computed(() => `${viewBoxSize.value} ${viewBoxSize.value} ${2 * viewBoxSize.value} ${2 * viewBoxSize.value}`);

        return {
            radius,
            center,
            strokeWidth,
            viewBoxSize,
            circleLen,
            computedValue,
            strokeDashArray,
            strokeDashOffset,
            sizeCss,
            isSvg,
            rootClass,
            viewBox,
        };
    },
});
</script>
  