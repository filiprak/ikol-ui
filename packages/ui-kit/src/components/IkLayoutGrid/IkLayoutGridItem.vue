<template>
    <div :class="computed_classes"
         :style="computed_styles">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import '@ui/styles';
import './IkLayoutGrid.css';
import type { CSSProperties } from 'vue';
import { ref, computed, watchEffect } from 'vue';
import { useDevice } from '@ui/composables/device';
import { useRoute } from '@ui/composables/router';

const props = defineProps({
    mobile_route: {
        type: String,
    },
    size: {
        type: [Number, String],
    },
    row: {
        type: Boolean,
        default: false,
    },
});
const device = useDevice();
const route = useRoute();
const mobile_visible = ref(!props.mobile_route);
const computed_mobile_route = computed(() =>
    props.mobile_route ? props.mobile_route.split(',') : []
);

watchEffect(
    () => {
        if (device.mobile.value && props.mobile_route) {
            mobile_visible.value = computed_mobile_route.value.includes(route.value.name);
        }
    },
);

const computed_size = computed(() => {
    if (props.size) {
        return typeof props.size === 'string' ? props.size : `${props.size}%`;
    } else {
        return undefined;
    }
});

const computed_styles = computed(() => {
    const styles: CSSProperties = {};

    if (device.mobile.value) {
        styles.flexBasis = '100%';
        styles.display = mobile_visible.value ? undefined : 'none';
    } else {
        styles.flexBasis = computed_size.value;
        styles.maxWidth = computed_size.value;
    }
    return styles;
});

const computed_classes = computed(() => ({
    'ik-layout-grid-item': true,
    'ik-layout-grid-item--row': props.row,
}));
</script>
