<template>
    <div :class="classes">
        <div v-if="$slots.prepend || icon"
             class="ik-alert__prepend">
            <slot name="prepend">
                <IkIcon :icon="icon" />
            </slot>
        </div>
        <div class="ik-alert__content">
            <slot></slot>
        </div>
        <div v-if="$slots.append"
             class="ik-alert__append">
            <slot name="append"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import '@ui/styles';
import './IkAlert.css';
import { IkIcon } from '@ui/components/IkIcon';
import { computed } from 'vue';

const props = defineProps({
    design: {
        type: String,
    },
    icon: {
        type: String,
    },
    variant: {
        type: String,
    },
});
const classes = computed(() => {
    const result = ['ik-alert'];

    if (props.design) {
        result.push(`ik-alert--${props.design}`);
    }

    if (props.variant) {
        result.push(`ik-alert--${props.variant}`);
    }

    return result;
});
</script>
