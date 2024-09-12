<script setup lang = "ts" >
import { IkCheckbox } from '@ui/components/IkCheckbox';
import { ref } from 'vue';

const checked_bool = ref(false);
const checked_string = ref('checked1');
const checked_array = ref(['checked1', 'checked2']);

</script>

<template>
    <Stories title="Components/Inputs/IkCheckbox"
             description="Checkbox component"
             :component="IkCheckbox">
        <Story title="Boolean Binding">
            <IkCheckbox v-model="checked_bool"
                        name="checked1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
            </IkCheckbox>
        </Story>
        <Story title="String Binding">
            <IkCheckbox v-model="checked_string"
                        name="checked1"
                        type="string">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
            </IkCheckbox>
            <IkCheckbox v-model="checked_string"
                        name="checked2"
                        type="string">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
            </IkCheckbox>
            <IkCheckbox v-model="checked_string"
                        name="checked3"
                        type="string">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
            </IkCheckbox>
        </Story>
        <Story title="Array Binding">
            <IkCheckbox v-model="checked_array"
                        name="checked1"
                        type="array">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
            </IkCheckbox>
            <IkCheckbox v-model="checked_array"
                        name="checked2"
                        type="array">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
            </IkCheckbox>
            <IkCheckbox v-model="checked_array"
                        name="checked3"
                        type="array">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
            </IkCheckbox>
        </Story>
        <Story title="Title">
            <IkCheckbox v-model="checked_bool"
                        name="checked1"
                        title="Lorem ipsum">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
            </IkCheckbox>
        </Story>
        <Story title="Disabled">
            <IkCheckbox v-model="checked_bool"
                        name="checked1"
                        title="Lorem ipsum"
                        disabled>
                Lorem ipsum dolor sit amet consectetur adipisicing elit
            </IkCheckbox>
        </Story>
        <Story title="Indeterminate">
            <IkCheckbox v-model="checked_bool"
                        name="checked1"
                        title="Lorem ipsum"
                        indeterminate>
                Indeterminate
            </IkCheckbox>
        </Story>
        <Story title="Switch Variant">
            <IkCheckbox v-model="checked_bool"
                        name="checked1"
                        title="Lorem ipsum"
                        variant="switch">
                Switch Variant
            </IkCheckbox>
        </Story>
        <Story title="No margin">
            <IkCheckbox v-model="checked_bool"
                        name="checked1"
                        title="Lorem ipsum"
                        style="border: 1px black solid;">
                Default
            </IkCheckbox>
            <IkCheckbox v-model="checked_bool"
                        name="checked1"
                        title="Lorem ipsum"
                        no_margin
                        style="border: 1px black solid;">
                No margin
            </IkCheckbox>
        </Story>
    </Stories>
</template>
