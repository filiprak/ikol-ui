<template>
    <component :is="tag"
               v-bind="vbind"
               :class="classes">
        <div v-if="$slots.prepend || icon"
             class="ik-list-item__prepend">
            <slot name="prepend">
                <IkIcon :icon="icon"></IkIcon>
            </slot>
        </div>
        <div class="ik-list-item__content">
            <div class="ik-list-item__title">
                <slot></slot>
            </div>
            <div v-if="$slots.secondary"
                 class="ik-list-item__secondary">
                <slot name="secondary"></slot>
            </div>
        </div>
        <div v-if="$slots.append"
             class="ik-list-item__append">
            <slot name="append"></slot>
        </div>
    </component>
</template>
<script setup lang="ts">
import '@ui/styles';
import './IkList.css';
import { computed, useAttrs } from 'vue';
import { IkIcon } from '@ui/components/IkIcon';

const props = defineProps({
    icon: {
        type: String,
    },
    link: {
        type: String,
    },
    inline: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    active: {
        type: Boolean,
        default: false,
    },
    wrap_text: {
        type: Boolean,
        default: false,
    },
    no_select: {
        type: Boolean,
        default: false,
    },
    no_padding: {
        type: Boolean,
        default: false,
    },
    no_hover: {
        type: Boolean,
        default: false,
    },
    lines: {
        type: [String, Number],
    },
    align_start: {
        type: Boolean,
        default: false,
    },
    border_bottom: {
        type: Boolean,
        default: false,
    },
});
const attrs = useAttrs();
const tag = props.link ? 'a' : 'div';
const vbind = props.link ? { href: props.link } : {};
const classes = computed(() => {
    const classes = ['ik-list-item'];

    if (props.inline) {
        classes.push('ik-list-item--inline');
    }

    if (props.disabled) {
        classes.push('ik-list-item--disabled');
    }

    if (props.wrap_text) {
        classes.push('ik-list-item--wrap-text');
    }

    if (props.no_select) {
        classes.push('ik-list-item--no-select');
    }

    if (props.no_padding) {
        classes.push('ik-list-item--no-padding');
    }

    if (props.no_hover) {
        classes.push('ik-list-item--no-hover');
    }

    if (props.active) {
        classes.push('ik-list-item--active');
    }

    if (attrs.onClick || props.link) {
        classes.push('ik-list-item--clickable');
    }

    if (props.lines) {
        classes.push('ik-list-item--lines');
        classes.push('ik-list-item--lines-' + String(props.lines));
    }

    if (props.align_start) {
        classes.push('ik-list-item--align-start');
    }

    if (props.border_bottom) {
        classes.push('ik-list-item--border-bottom');
    }
    return classes;
});
</script>
