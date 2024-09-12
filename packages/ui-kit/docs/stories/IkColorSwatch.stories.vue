<script setup lang="ts">
import { IkColorSwatch } from '@ui/components/IkColorSwatch';
import { IkUIElemSize } from '@ui/types/utils';


const colors = ['5CA7D7', '6488F8', '40BE7A', 'BBC7D0', 'F4C23B', 'F96839', 'A036CC', 'FF304C', 'FF179E', 'D7BC5C', 'D7625C', 'F3B563'];

</script>
<template>
    <Stories title="Components/Other/IkColorSwatch"
             :component="IkColorSwatch">
        <Story title="Default">
            <IkColorSwatch v-for="color in colors" :color="color"
                           :style="{ display: 'inline-block', margin: '10px' }" />
        </Story>
        <Story title="Round">
            <IkColorSwatch v-for="color in colors" :color="color"
                           round
                           :style="{ display: 'inline-block', margin: '10px' }" />
        </Story>
        <Story title="Sizes">
            <div v-for="size in IkUIElemSize">
                <IkColorSwatch v-for="color in colors" :color="color"
                               :size="size"
                               :style="{ display: 'inline-block', margin: '10px' }" />
            </div>
        </Story>
    </Stories>
</template>
