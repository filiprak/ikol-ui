<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import '@/styles';
import './[[NAME]].css';
import { defineComponent } from 'vue';

export default defineComponent({
    name: '[[NAME]]',
    props: {
        
    },
    setup(props) {
        const classes = ['[[NAME_KEBAB]]'];

        return { classes };
    },
});
</script>
