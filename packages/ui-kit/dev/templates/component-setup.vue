<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import '@ui/styles';
import './[[NAME]].css';
import { computed } from 'vue';

const props = defineProps({
    tag: {
        type: String,
        default: 'div',
    },
});

const classes = computed(() => {
    const classes = ['[[NAME_KEBAB]]'];

    return classes;
})
</script>
