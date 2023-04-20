<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import '@/styles';
import './IkButtonGroup.css';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'IkButtonGroup',
    props: {
        equal: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes(): string[] {
            const classes = ['ik-button-group'];

            if (this.equal) {
                classes.push('ik-button-group--equal');
            }
            return classes;
        },
    },
});
</script>
