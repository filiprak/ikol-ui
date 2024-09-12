<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import '@ui/styles';
import './[[NAME]].css';
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        tag: {
            type: String,
            default: 'div',
        },
    },
    computed: {
        classes() {
            const classes = ['[[NAME_KEBAB]]'];

            return classes;
        },
    },
});
</script>
