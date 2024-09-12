<template>
    <IkModal :closeable="closeable"
             :size="size"
             :full_height_body="full_height_body"
             :no_scroll="no_scroll"
             :no_keyboard="no_keyboard">
        <IkModalContent>
            <IkModalHeader :design="design">
                {{ header }}
            </IkModalHeader>
            <IkModalBody>
                {{ body }}
            </IkModalBody>
            <IkModalFooter no_close>
                <IkButton v-for="btn in buttons_filtered"
                          :key="btn.label"
                          :icon="btn.icon"
                          :design="btn.design"
                          @click="_onButtonClick(btn)">
                    {{ btn.label }}
                </IkButton>
            </IkModalFooter>
        </IkModalContent>
    </IkModal>
</template>

<script lang="ts">
import { IkButton } from '@ui/components/IkButton';
import { IkModal, IkModalBody, IkModalContent, IkModalFooter, IkModalHeader } from '@ui/components/IkModal';
import type { IkModalConfirmActionOptions } from '@ui/composables/modal';
import { useModal } from '@ui/composables/modal';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { IkButton, IkModal, IkModalContent, IkModalHeader, IkModalBody, IkModalFooter },
    props: {
        size: {
            type: String,
        },
        design: {
            type: String,
        },
        closeable: {
            type: Boolean,
            default: true,
        },
        full_height_body: {
            type: Boolean,
            default: false,
        },
        no_scroll: {
            type: Boolean,
            default: false,
        },
        no_keyboard: {
            type: Boolean,
            default: false,
        },
        header: {
            type: String,
            default: '{{_*en*Confirm_}}',
        },
        body: {
            type: String,
            default: '{{_*en*Are you sure you want to continue?_}}',
        },
        actions: {
            type: Array,
        },
        cancellable: {
            type: Boolean,
            default: false,
        },
        buttons: {
            type: Array as PropType<IkModalConfirmActionOptions[]>,
            default: () => [
                { label: '{{_*en*Cancel_}}', cancel_on_click: true },
                { label: '{{_*en*No_}}', reject_on_click: true },
                { label: '{{_*en*Yes_}}', design: 'primary', confirm_on_click: true },
            ],
        },
    },
    setup() {
        return { modal: useModal() };
    },
    data() {
        return {
            was_decided: !this.cancellable,
            confirmed: false,
        };
    },
    computed: {
        buttons_filtered() {
            return this.buttons.filter(btn => !this.cancellable ? !btn.cancel_on_click : true);
        },
    },
    methods: {
        resolve() {
            return {
                was_decided: this.was_decided,
                confirmed: this.confirmed,
            };
        },
        _onButtonClick(btn: IkModalConfirmActionOptions) {
            btn.onClick?.();

            if (btn.confirm_on_click) {
                this.was_decided = true;
                this.confirmed = true;
                this.modal?.close();
            } else if (btn.reject_on_click) {
                this.was_decided = true;
                this.confirmed = false;
                this.modal?.close();
            } else if (btn.cancel_on_click) {
                this.was_decided = false;
                this.modal?.close();
            } else if (btn.close_on_click) {
                this.modal?.close();
            }
        },
    },
});
</script>
