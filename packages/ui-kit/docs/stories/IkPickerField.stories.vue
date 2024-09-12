<script setup lang="ts">
import { IkForm } from '@ui/components/IkForm';
import { IkPickerField, IkPickerFieldItem } from '@ui/components/IkPickerField';

import { ref, shallowRef } from 'vue';

const items = shallowRef([
    { value: 0, text: 'Test 0', color: '3CFC9D' },
    { value: 13, text: 'Test 13', color: 'C63FFD' },
]);
const vmodel = ref();
</script>
<template>
    <Stories title="Components/Form/IkPickerField"
             :component="IkPickerField">
        <Story title="Default">
            <IkForm>
                <IkPickerField v-model="vmodel"
                               :items="items"
                               label="picker">
                    <template v-slot:activator="{ on, selected }">
                        <IkPickerFieldItem v-on="on" :model-value="selected" />
                    </template>
                </IkPickerField>
            </IkForm>
        </Story>
    </Stories>
</template>
