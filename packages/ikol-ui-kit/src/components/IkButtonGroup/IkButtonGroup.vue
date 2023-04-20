<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import '@/styles';
import './IkButtonGroup.css';
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: 'IkButtonGroup',
    props: {
        equal: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        return {
            classes: computed(() => {
                const classes = ['ik-button-group'];

                if (props.equal) {
                    classes.push('ik-button-group--equal');
                }
                return classes;
            }),
        };
    },
});
</script>
