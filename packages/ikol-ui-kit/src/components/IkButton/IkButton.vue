<template>
    <component :is="tag"
               :type="type"
               :class="button_class"
               :disabled="disabled || loading">
        <template v-if="loading">
            <IkLoaderCircle indeterminate
                            :size="16"
                            :thickness="2" />
            <template v-if="!fab && $slots.default">Loading...</template>
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
<script lang="ts">
import '@/styles';
import './IkButton.css';
import { useRouter } from '@/composables/router';
import { IkIcon } from '@/components/IkIcon';
import { IkLoaderCircle } from '@/components/IkLoaderCircle';
import { computed, defineComponent, PropType } from 'vue';
import { RouteRecordNormalized } from 'vue-router';

export default defineComponent({
    name: 'IkButton',
    components: {
        IkIcon,
        IkLoaderCircle,
    },
    props: {
        tag: {
            type: String,
            default: 'button'
        },
        type: {
            type: String,
            default: 'button'
        },
        block: {
            type: Boolean,
            default: false
        },
        design: {
            type: String,
            default: 'default'
        },
        size: {
            type: String,
            default: null
        },
        prepend_icon: {
            type: String,
            default: null
        },
        append_icon: {
            type: String,
            default: null
        },
        icon: {
            type: String,
            default: null
        },
        separate: {
            type: Boolean,
            default: false
        },
        route: {
            type: Object as PropType<string | RouteRecordNormalized>,
            default: null
        },
        route_func: {
            type: String,
            default: 'push'
        },
        loading: {
            type: Boolean,
            default: false
        },
        skeleton: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        fab: {
            type: Boolean,
            default: false
        },
        round: {
            type: Boolean,
            default: false
        },
        circle: {
            type: Boolean,
            default: false
        },
        active: {
            type: Boolean,
            default: false,
        },
        variant: {
            type: String,
            default: null,
        },
        flat: {
            type: Boolean,
            default: false
        },
        filled: {
            type: Boolean,
            default: false
        },
        outline: {
            type: Boolean,
            default: false
        },
    },
    setup(props, { slots }) {
        return {
            button_class: computed(() => {
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
                    'ik-button--block': props.block,
                    'ik-skeleton-bckg': props.skeleton,
                    'ik-button--fab': props.fab,
                    'ik-button--circle': props.circle,
                    ['ik-button--' + variant]: !!variant,
                    'ik-button--active': props.active,
                };
                return classes;
            }),
            prepend_icon_class: computed(() => {
                return {
                    'ik-mr-2': !!slots.default,
                };
            }),
            append_icon_class: computed(() => {
                return {
                    'ik-ml-2': !!slots.default,
                };
            }),
            listeners: computed(() => {
                const attrs: any = {};
                const router = useRouter();

                if (props.route !== null) {
                    attrs.onClick = () => {
                        if ((router as any)[props.route_func]) {
                            (router as any)[props.route_func](props.route);
                        }
                    };
                }
                return attrs;
            }),
        };
    }
});
</script>
