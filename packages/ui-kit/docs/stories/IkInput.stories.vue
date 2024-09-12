<script setup lang="ts">
import { IkInput } from '@ui/components/IkInput';
import { IkUIElemSize, IkUIVariant } from '@ui/types/utils';
import { ref } from 'vue';

const text = ref('');
const decimal = ref('');
const clearable = ref('this is input text');
</script>
<template>
    <Stories title="Components/Inputs/IkInput"
             :component="IkInput">
        <Story title="Default">
            <IkInput v-model="text"></IkInput>
        </Story>
        <Story title="Variant">
            <IkInput v-for="variant in IkUIVariant"
                     class="ik-mb-3"
                     placeholder="My input"
                     v-model="text"
                     :variant="variant">
            </IkInput>
        </Story>
        <Story title="Size">
            <IkInput v-for="size in IkUIElemSize"
                     class="ik-mb-3"
                     :placeholder="'Size ' + size"
                     v-model="text"
                     :size="size">
            </IkInput>
        </Story>
        <Story title="Disabled">
            <IkInput placeholder="My input"
                     v-model="text"
                     disabled>
            </IkInput>
        </Story>
        <Story title="Placeholder">
            <IkInput placeholder="My custom placeholder"
                     v-model="text">
            </IkInput>
        </Story>
        <Story title="Clearable">
            <IkInput placeholder="My input"
                     append_clear_icon
                     v-model="clearable">
            </IkInput>
        </Story>
        <Story title="Prepend Icon">
            <IkInput placeholder="My input"
                     icon="user"
                     v-model="text">
            </IkInput>
        </Story>
        <Story title="Append Icon">
            <IkInput placeholder="My input"
                     append_icon="user"
                     v-model="text">
            </IkInput>
        </Story>
        <Story title="Number">
            <IkInput placeholder="0.00"
                     type="decimal"
                     v-model="decimal">
            </IkInput>
        </Story>
        <Story title="Decimal Precision">
            <IkInput placeholder="0.00"
                     type="decimal"
                     :decimals="2"
                     v-model="decimal">
            </IkInput>
        </Story>
        <Story title="Min And Max">
            <IkInput placeholder="0 - 10"
                     type="decimal"
                     :min="0"
                     :max="10"
                     v-model="decimal">
            </IkInput>
        </Story>
    </Stories>
</template>
