<script setup lang="ts">
import { IkForm } from '@ui/components/IkForm';
import { IkSelectField } from '@ui/components/IkSelectField';
import { ref, shallowRef } from 'vue';

const items = shallowRef([
    { code: 1, name: 'John Doe', descr: 'Designs and implements software solutions to meet client needs.', avatar: 'https://picsum.photos/48?random=1' },
    { code: 2, name: 'Matt Benett', descr: 'Develops and executes marketing strategies to promote products or services.', avatar: 'https://picsum.photos/48?random=2' },
    { code: 3, name: 'Adam Setter', descr: 'Provides compassionate care to patients, administering medications, and treatments.', avatar: 'https://picsum.photos/48?random=3' },
]);
const vmodel = ref();
</script>
<template>
    <Stories title="Components/Form/IkSelectField"
             :component="IkSelectField">
        <Story title="Default">
            <IkForm>
                <IkSelectField v-model="vmodel"
                               value_key="code"
                               text_key="name"
                               placeholder="Select item"
                               :items="items">
                </IkSelectField>
            </IkForm>
        </Story>
    </Stories>
</template>
