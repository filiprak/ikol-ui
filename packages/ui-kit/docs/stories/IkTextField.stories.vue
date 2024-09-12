<script setup lang="ts">
import { IkTextField } from '@ui/components/IkTextField';
import { IkForm } from '@ui/components/IkForm';
import { ref } from 'vue';

const vmodel = ref('');
</script>
<template>
    <Stories title="Components/Form/IkTextField"
             :component="IkTextField">
        <Story title="Default">
            <IkForm>
                <IkTextField v-model="vmodel"
                             placeholder="Enter text">
                </IkTextField>
            </IkForm>
        </Story>
    </Stories>
</template>
