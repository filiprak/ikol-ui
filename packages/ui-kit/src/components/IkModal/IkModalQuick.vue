<template>
    <IkModal :closeable="closeable"
             :size="size"
             :full_height_body="full_height_body"
             :no_scroll="no_scroll"
             :no_keyboard="no_keyboard">
        <IkModalContent :design="design">
            <IkModalHeader :design="design">
                {{ header }}
            </IkModalHeader>
            <IkModalBody>
                {{ body }}
            </IkModalBody>
            <IkModalFooter :no_close="no_footer_close">
                <IkButton v-for="btn in buttons"
                          :key="btn.label"
                          :icon="btn.icon"
                          :design="btn.design"
                          @click="() => btn.close_on_click ? modal?.close() : btn.onClick?.()">
                    {{ btn.label }}
                </IkButton>
            </IkModalFooter>
        </IkModalContent>
    </IkModal>
</template>

<script lang="ts">
import { IkButton } from '@ui/components/IkButton';
import { IkModal, IkModalBody, IkModalContent, IkModalFooter, IkModalHeader } from '@ui/components/IkModal';
import type { IkModalActionOptions } from '@ui/composables/modal';
import { useModal } from '@ui/composables/modal';
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

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
        no_footer_close: {
            type: Boolean,
            default: false,
        },
        header: {
            type: String,
            default: '{{_*en*Information_}}',
        },
        body: {
            type: String,
        },
        buttons: {
            type: Array as PropType<IkModalActionOptions[]>,
            default: () => [],
        },
    },
    methods: {
        resolve() {
            return {};
        },
    },
    setup() {
        return { modal: useModal() };
    },
});
</script>
