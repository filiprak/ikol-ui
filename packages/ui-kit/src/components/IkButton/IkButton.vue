<template>
    <component :is="tag"
               :type="type"
               :class="button_class"
               :disabled="disabled || loading">
        <template v-if="loading">
            <IkLoaderCircle indeterminate
                            :size="16"
                            :thickness="2" />
            <template v-if="!fab && $slots.default">
                [[_*en*Loading..._]]
            </template>
        </template>
        <template v-else>
            <IkIcon v-if="prepend_icon || icon"
                    :icon="prepend_icon || icon"
                    :class="prepend_icon_class" />
            <slot></slot>
            <IkIcon v-if="append_icon"
                    :icon="append_icon"
                    :class="append_icon_class" />
        </template>
    </component>
</template>
<script setup lang="ts">
import '@ui/styles';
import './IkButton.css';
import { IkIcon } from '@ui/components/IkIcon';
import { IkLoaderCircle } from '@ui/components/IkLoaderCircle';
import { type PropType, computed, useSlots } from 'vue';
import type { IkUIDesignColor } from '@ui/types/utils';

const props = defineProps({
    tag: {
        type: String,
        default: 'button',
    },
    type: {
        type: String,
        default: 'button',
    },
    block: {
        type: Boolean,
        default: false,
    },
    design: {
        type: String as PropType<`${IkUIDesignColor}`>,
        default: 'default',
    },
    size: {
        type: String,
    },
    prepend_icon: {
        type: String,
    },
    append_icon: {
        type: String,
    },
    icon: {
        type: String,
    },
    separate: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    skeleton: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    fab: {
        type: Boolean,
        default: false,
    },
    round: {
        type: Boolean,
        default: false,
    },
    circle: {
        type: Boolean,
        default: false,
    },
    active: {
        type: Boolean,
        default: false,
    },
    variant: {
        type: String,
    },
    flat: {
        type: Boolean,
        default: false,
    },
    filled: {
        type: Boolean,
        default: false,
    },
    outline: {
        type: Boolean,
        default: false,
    },
});
const slots = useSlots();
const button_class = computed(() => {
    let variant: string | null = 'filled';

    if (props.variant) {
        variant = props.variant;
    } else if (props.filled) {
        variant = 'filled';
    } else if (props.outline) {
        variant = 'outline';
    } else if (props.flat) {
        variant = 'flat';
    }

    if (props.separate) {
        variant = null;
    }

    const classes: { [k: string]: boolean } = {
        'ik-button': true,
        'ik-button--separate': props.separate,
        'ik-button--disabled': props.disabled,
        'ik-button--loading': props.loading,
        'ik-button--round': props.round,
        ['ik-button--' + props.design]: !!props.design,
        ['ik-button--size-' + props.size]: !!props.size,
        'ik-button--skeleton': props.skeleton,
        'ik-bg-skeleton': props.skeleton,
        'ik-button--block': props.block,
        'ik-button--fab': props.fab,
        'ik-button--circle': props.circle,
        ['ik-button--' + variant]: !!variant,
        'ik-button--active': props.active,
    };
    return classes;
});
const prepend_icon_class = computed(() => {
    return {
        'ik-mr-2': !!slots.default?.(),
    };
});
const append_icon_class = computed(() => {
    return {
        'ik-ml-2': !!slots.default?.(),
    };
});
</script>
