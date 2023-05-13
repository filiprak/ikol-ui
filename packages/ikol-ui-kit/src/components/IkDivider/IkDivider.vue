<template>
    <div :class="classes">
        <div v-if="$slots.default"
             class="ik-divider__content">
            <slot></slot>
        </div>
        <div class="ik-divider__line"></div>
    </div>
</template>
  
<script lang="ts">
import '@/styles';
import './IkDivider.css';
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'IkDivider',
    props: {
        noBottomMargin: {
            type: Boolean,
            default: false
        },
        noMargin: {
            type: Boolean,
            default: false
        },
        darken: {
            type: Boolean,
            default: false
        },
    },
    setup(props) {
        const classes = ['ik-divider'];

        if (props.noMargin) {
            classes.push('ik-divider--no-margin');
        } else if (props.noBottomMargin) {
            classes.push('ik-divider--no-b-margin');
        }
        if (props.darken) {
            classes.push('ik-divider--darken');
        }

        return { classes };
    }
})
</script>
