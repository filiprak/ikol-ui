<template>
    <IkListItem :class="{ 'ik-select-item': true, 'ik-select-item--disabled': disabled }"
                no_select>
        <template v-if="$slots.prepend"
                  #prepend>
            <slot name="prepend"></slot>
        </template>
        <slot></slot>
        <template v-if="$slots.subtext"
                  #secondary>
            <slot name="subtext"></slot>
        </template>
        <template v-if="$slots.append"
                  #append>
            <slot name="append"></slot>
        </template>
    </IkListItem>
</template>
<script setup lang="ts">
import '@ui/styles';
import './IkSelect.css';
import { IkListItem } from '@ui/components/IkList';

defineProps({
    disabled: {
        type: Boolean,
    },
});
</script>
