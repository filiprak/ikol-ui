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
<script lang="ts">
import '@/styles';
import './IkList.css';
import { defineComponent } from 'vue';
import { IkIcon } from '@/components/IkIcon';

export default defineComponent({
    name: 'IkListItem',
    components: {
        IkIcon,
    },
    props: {
        icon: {
            type: String,
            default: null,
        },
        link: {
            type: String,
            default: null,
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
        wrapText: {
            type: Boolean,
            default: false,
        },
        noSelect: {
            type: Boolean,
            default: false,
        },
        lines: {
            type: [String, Number],
            default: null,
        },
        alignStart: {
            type: Boolean,
            default: false,
        },
        borderBottom: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { attrs }) {
        const classes = ['ik-list-item'];
        const tag = props.link ? 'a' : 'div';
        const vbind = props.link ? { href: props.link } : {};

        if (props.inline) {
            classes.push('ik-list-item--inline');
        }

        if (props.disabled) {
            classes.push('ik-list-item--disabled');
        }

        if (props.wrapText) {
            classes.push('ik-list-item--wrap-text');
        }

        if (props.noSelect) {
            classes.push('ik-list-item--no-select');
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

        if (props.alignStart) {
            classes.push('ik-list-item--align-start');
        }

        if (props.borderBottom) {
            classes.push('ik-list-item--border-bottom');
        }

        return { classes, tag, vbind };
    },
});
</script>
