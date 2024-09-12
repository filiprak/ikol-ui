<script setup lang="ts">
import { IkRadioGroup } from '@ui/components/IkRadioGroup';
import { IkButton } from '@ui/components/IkButton';
import { ref } from 'vue';

const items = [
    { value: 1, text: 'Option 1', icon: 'home' },
    { value: 2, text: 'Option 2', icon: 'star' },
    { value: 3, text: 'Option 3', icon: 'cog' },
];
const vmodel = ref(1);
const vmodel_multiple = ref([1]);
</script>
<template>
    <Stories title="Components/Inputs/IkRadioGroup"
             :component="IkRadioGroup">
        <Story title="Default">
            <IkRadioGroup v-model="vmodel"
                          value_key="value"
                          text_key="text"
                          :items="items">
            </IkRadioGroup>
        </Story>
        <Story title="Multiple">
            <IkRadioGroup v-model="vmodel_multiple"
                          multiple
                          value_key="value"
                          text_key="text"
                          :items="items">
            </IkRadioGroup>
        </Story>
        <Story title="Disabled">
            <IkRadioGroup v-model="vmodel"
                          disabled
                          value_key="value"
                          text_key="text"
                          :items="items">
            </IkRadioGroup>
        </Story>
        <Story title="Custom Buttons">
            <IkRadioGroup v-model="vmodel"
                          value_key="value"
                          text_key="text"
                          :items="items">
                <template #button="{ item, active, disabled, design, toggle }">
                    <IkButton circle
                              outline
                              :active="active"
                              :disabled="disabled"
                              :icon="item.icon"
                              @click="toggle"
                              :design="design">
                    </IkButton>
                </template>
            </IkRadioGroup>
        </Story>
    </Stories>
</template>
