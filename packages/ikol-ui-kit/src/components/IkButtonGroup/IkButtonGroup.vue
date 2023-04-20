<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import '@/styles';
import './IkButtonGroup.css';
import { defineComponent } from 'vue';
import { IkButton } from '@/components/IkButton';

export default defineComponent({
    name: 'IkButtonGroup',
    props: {
        equal: {
            type: Boolean,
            default: false
        },
        justified: {
            type: Boolean,
            default: false
        },
        separate: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        classes(): string[] {
            const classes = ['ik-button-group'];

            if (this.separate) {
                classes.push('ik-button-group--separate');
            }
            if (this.justified) {
                classes.push('ik-button-group--justified');
            }
            if (this.equal) {
                const n = this.$slots.default?.().filter(vnode => vnode?.type === IkButton)?.length || 1;
                classes.push(`ik-button-group--equal${n > 1 ? `-${n}` : ''}`);
            }
            return classes;
        }
    }
});
</script>
