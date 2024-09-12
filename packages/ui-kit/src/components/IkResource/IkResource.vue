<template>
    <div :class="root_class">
        <div v-if="!empty"
             class="ik-resource__content"
             @click.stop
             @mousedown.stop
             @mouseup.stop="default_handler">
            <slot></slot>
        </div>
        <div v-if="!empty"
             class="ik-resource__actions">
            <IkIcon v-if="copyable"
                    :icon="copy_icon"
                    class="ik-resource__action"
                    @click="onClickCopy" />
            <IkIcon v-if="uri"
                    icon="external-link:regular"
                    class="ik-resource__action"
                    @click="onClickUri" />
        </div>
        <slot v-else></slot>
    </div>
</template>

<script lang="ts">
import './IkResource.css';
import { defineComponent, computed, ref } from 'vue';
import { copyToClipboard } from '@ui/utils/helpers';
import { IkIcon } from '@ui/components/IkIcon';

export default defineComponent({
    name: 'IkResource',
    components: {
        IkIcon,
    },
    props: {
        value: {
            type: String,
            default: undefined,
        },
        copyable: {
            type: Boolean,
            default: false,
        },
        uri: {
            type: String,
            default: undefined,
        },
        target: {
            type: String,
            default: '_blank',
        },
        no_wrap: {
            type: Boolean,
            default: false,
        },
        email: {
            type: Boolean,
            default: false,
        },
        phone: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { slots }) {
        const copy_done = ref<boolean>(false);

        const root_class = computed(() => ({
            'ik-resource': true,
            'ik-resource--empty': empty.value,
            'ik-resource--no-wrap': props.no_wrap,
        }));

        const empty = computed(() => !props.uri && !props.copyable);

        const computed_uri = computed(() => {
            if (props.uri) {
                if (props.email) {
                    return `mailto:${props.uri}`;
                } else if (props.phone) {
                    return `tel:${props.uri}`;
                } else {
                    return props.uri;
                }
            }
            return null;
        });

        const copy_icon = computed(() => (copy_done.value ? 'check-double:regular' : 'copy:regular'));

        const default_handler = computed(() => (props.copyable ? onClickCopy : onClickUri));

        const onClickCopy = (event: MouseEvent) => {
            const to_copy = props.value ? String(props.value) : slots.default?.toString();
            if (to_copy) {
                copyToClipboard(to_copy.trim());
                if (!copy_done.value) {
                    copy_done.value = true;
                    setTimeout(() => {
                        copy_done.value = false;
                    }, 800);
                }
                event.preventDefault();
                event.stopPropagation();
            }
        };

        const onClickUri = (event: MouseEvent) => {
            if (computed_uri.value) {
                const mouse_click = event.button === 2 || event.button === 0;
                const mouse_middle = event.button === 1;
                const target = mouse_middle ? '_blank' : props.target;

                if (mouse_click || mouse_middle) {
                    window.open(computed_uri.value, target);
                }
            }

            event.preventDefault();
            event.stopPropagation();
        };

        return {
            root_class,
            empty,
            computed_uri,
            copy_icon,
            default_handler,
            onClickCopy,
            onClickUri,
        };
    },
});
</script>
