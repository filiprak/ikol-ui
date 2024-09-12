<template>
    <div :class="classes">
        <div v-if="$slots.default"
             class="ik-divider__content">
            <slot></slot>
        </div>
        <div class="ik-divider__line"></div>
    </div>
</template>

<script setup lang="ts">
import '@ui/styles';
import './IkDivider.css';
import { computed } from 'vue';

const props = defineProps({
    no_bottom_margin: {
        type: Boolean,
        default: false,
    },
    no_margin: {
        type: Boolean,
        default: false,
    },
    darken: {
        type: Boolean,
        default: false,
    },
});
const classes = computed(() => {
    const classes = ['ik-divider'];

    if (props.no_margin) {
        classes.push('ik-divider--no-margin');
    } else if (props.no_bottom_margin) {
        classes.push('ik-divider--no-b-margin');
    }
    if (props.darken) {
        classes.push('ik-divider--darken');
    }

    return classes;
});
</script>
