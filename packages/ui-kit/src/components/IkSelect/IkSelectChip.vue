<template>
    <div :class="{ 'ik-select-chip': true, [`ik-select-chip--size-${size}`]: !!size, 'ik-select-chip--clickable': !!$attrs.onClick }">
        <IkListItem :no_select="!!$attrs.onClick">
            <template v-if="$slots.prepend"
                      #prepend>
                <slot name="prepend"></slot>
            </template>
            <slot></slot>
        </IkListItem>
        <div v-if="clearable"
             class="ik-select-chip__remove">
            <IkIcon icon="times:light"
                    @mousedown.stop
                    @click.stop="emit('ik-clear')" />
        </div>
    </div>
</template>
<script setup lang="ts">
import '@ui/styles';
import './IkSelect.css';
import { IkIcon } from '@ui/components/IkIcon';
import { IkListItem } from '@ui/components/IkList';

defineProps({
    size: {
        type: String,
    },
    clearable: {
        type: Boolean,
    },
});

const emit = defineEmits<{
    (e: 'ik-clear'): void,
}>();
</script>
