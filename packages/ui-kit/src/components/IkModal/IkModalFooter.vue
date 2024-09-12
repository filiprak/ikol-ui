<template>
    <div class="ik-modal-footer">
        <slot name="content">
            <IkButtonGroup :stack="device.mobile.value"
                           :reverse="device.mobile.value">
                <slot></slot>
                <IkButton v-if="!no_close"
                          @click="modal?.close()">
                    [[_*en*Close_]]
                </IkButton>
            </IkButtonGroup>
        </slot>
    </div>
</template>
<script setup lang="ts">
import '@ui/styles';
import './IkModal.css';
import { useModal } from '@ui/composables/modal';
import { IkButtonGroup } from '../IkButtonGroup';
import { IkButton } from '../IkButton';
import { useDevice } from '@ui/composables/device';

const modal = useModal();
const device = useDevice();

defineProps({
    no_close: {
        type: Boolean,
        default: false,
    },
});
</script>
