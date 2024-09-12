<template>
    <component :is="tag"
               class="ik-app-content">
        <slot></slot>
    </component>
</template>
<script lang="ts">
import '@ui/styles';
import './IkApp.css';
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        tag: {
            type: String,
            default: 'main',
        },
    },
});
</script>
