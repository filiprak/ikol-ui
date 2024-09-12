<template>
    <div :class="root_class"
         tabindex="-1"
         role="dialog"
         @keydown.esc="_onEscapeKey">
        <div v-outside.mousedown="_onOutsideMousedown"
             class="ik-modal__dialog"
             role="document">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts">
import '@ui/styles';
import './IkModal.css';
import { defineComponent } from 'vue';
import { useModal } from '@ui/composables/modal';
import { vOutside } from '@ui/directives/outside';
import { useDevice } from '@ui/composables/device';

export default defineComponent({
    props: {
        size: {
            type: String,
            default: 'md',
        },
        closeable: {
            type: Boolean,
            default: true,
        },
        full_height_body: {
            type: Boolean,
            default: false,
        },
        fill_viewport: {
            type: Boolean,
            default: false,
        },
        no_keyboard: {
            type: Boolean,
            default: false,
        },
        no_scroll: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        root_class() {
            const classes: Record<string, boolean> = {
                'ik-modal': true,
                'ik-modal--fill-body': this.full_height_body,
                'ik-modal--fill-viewport': this.fill_viewport,
                'ik-modal--no-scroll': this.no_scroll,
                'ik-modal--mobile': this.device.mobile.value,
            };
            if (this.size) {
                classes['ik-modal--size-' + this.size] = true;
            }
            return classes;
        },
    },
    mounted() {
        this.$el.focus();
    },
    methods: {
        _onEscapeKey() {
            if (!this.no_keyboard) {
                if (this.closeable && this.modal?.isOnTop()) {
                    this.modal?.close();
                }
            }
        },
        _onOutsideMousedown() {
            if (this.closeable && this.modal?.isOnTop()) {
                this.modal?.close();
            }
        },
    },
    setup() {
        return {
            modal: useModal(),
            device: useDevice(),
            vOutside,
        };
    },
    directives: {
        outside: vOutside,
    },
});
</script>
