<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import '@/styles';
import './IkButtonGroup.css';
import { defineProps, computed } from 'vue';

const props = defineProps({
    equal: {
        type: Boolean,
        default: false,
    },
});
const classes = computed(() => {
    const classes = ['ik-button-group'];

    if (props.equal) {
        classes.push('ik-button-group--equal');
    }
    return classes;
});
</script>
