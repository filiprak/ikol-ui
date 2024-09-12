<script setup lang="ts">
import { IkPickerFieldItem } from '@ui/components/IkPickerField';

import { shallowRef } from 'vue';

const items = shallowRef([
    { value: 0, text: 'Test 0', color: '3CFC9D' },
    { value: 13, text: 'Test 13', color: 'C63FFD' }
]);
</script>
<template>
    <Stories title="Components/Form/IkPickerFieldItem"
             :component="IkPickerFieldItem">
        <Story title="Default">
            <IkPickerFieldItem v-for="(item, idx) in items" :model-value="item" :key="idx" />
        </Story>
        <Story title="Action slot">
            <IkPickerFieldItem>
                <template #action-text>
                    ACTION
                </template>
            </IkPickerFieldItem>
        </Story>
    </Stories>
</template>
