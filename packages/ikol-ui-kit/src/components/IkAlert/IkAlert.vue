<template>
    <div :class="classes">
        <div v-if="$slots.prepend || icon"
             class="ik-alert__prepend">
            <slot name="prepend">
                <IkIcon :icon="icon" />
            </slot>
        </div>
        <div class="ik-alert__content">
            <slot></slot>
        </div>
        <div v-if="$slots.append"
             class="ik-alert__append">
            <slot name="append"></slot>
        </div>
    </div>
</template>
<script lang="ts">
import '@/styles';
import './IkAlert.css';
import { IkIcon } from '@/components/IkIcon';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'IkAlert',
    components: {
        IkIcon,
    },
    props: {
        tag: {
            type: String,
            default: 'div',
        },
        design: {
            type: String,
            default: null,
        },
        icon: {
            type: String,
            default: null,
        },
        variant: {
            type: String,
            default: null,
        },
    },
    setup(props) {
        const classes = ['ik-alert'];

        if (props.design) {
            classes.push(`ik-alert--${props.design}`);
        }

        if (props.variant) {
            classes.push(`ik-alert--${props.variant}`);
        }

        return { classes, icon: props.icon };
    },
});
</script>
