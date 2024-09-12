<template>
    <div :class="root_class">
        <div class="ik-modal-header__title">
            <slot>[[_*en*Information_]]</slot>
        </div>
        <div v-if="!no_close"
             class="ik-modal-header__append">
            <IkIcon :size_px="20"
                    tabindex="0"
                    icon="times:regular"
                    @click="modal?.close">
            </IkIcon>
        </div>
    </div>
</template>
<script setup lang="ts">
import '@ui/styles';
import './IkModal.css';
import { IkIcon } from '@ui/components/IkIcon';
import { useModal } from '@ui/composables/modal';
import { computed } from 'vue';

const modal = useModal();

const props = defineProps({
    design: {
        type: String,
        default: 'default',
    },
    no_close: {
        type: Boolean,
        default: false,
    },
});
const root_class = computed(() => {
    const classes: Record<string, boolean> = {
        'ik-modal-header': true,
    };
    if (props.design) {
        classes['ik-modal-header--' + props.design] = true;
    }
    return classes;
});
</script>
