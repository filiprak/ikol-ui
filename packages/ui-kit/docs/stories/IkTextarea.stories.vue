<script setup lang = "ts" >
import { IkTextarea } from '@ui/components/IkTextarea';
import { IkUIVariant } from '@ui/types/utils';
import { ref } from 'vue';

const value = ref('');
</script>
<template>
    <Stories title="Components/Inputs/IkTextarea"
             :component="IkTextarea">
        <Story title="Default">
            <IkTextarea v-model="value"></IkTextarea>
        </Story>
        <Story title="Variant">
            <div v-for="variant in IkUIVariant"
                 class="ik-mb-3">
                <IkTextarea :variant="variant"
                            :placeholder="variant"
                            v-model="value"></IkTextarea>
            </div>
        </Story>
        <Story title="Disabled">
            <IkTextarea disabled
                        v-model="value"></IkTextarea>
        </Story>
        <Story title="Readonly">
            <IkTextarea readonly
                        v-model="value"></IkTextarea>
        </Story>
        <Story title="Placeholder">
            <IkTextarea placeholder="enter my text here"
                        v-model="value"></IkTextarea>
        </Story>
        <Story title="Rows">
            <IkTextarea rows="6"
                        v-model="value"></IkTextarea>
        </Story>
        <Story title="No Resize">
            <IkTextarea :resize="false"
                        v-model="value"></IkTextarea>
        </Story>
        <Story title="No Resize Y">
            <IkTextarea :resize_y="false"
                        v-model="value"></IkTextarea>
        </Story>
        <Story title="Maxlength">
            <IkTextarea maxlength="3"
                        v-model="value"></IkTextarea>
        </Story>
    </Stories>
</template>
