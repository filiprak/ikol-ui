<template>
    <component :is="tag"
               class="ik-form-field-view-mode">
        <slot></slot>
    </component>
</template>
<script setup lang="ts">
import '@ui/styles';
import './IkForm.css';

defineProps({
    tag: {
        type: String,
        default: 'div',
    },
});
</script>
