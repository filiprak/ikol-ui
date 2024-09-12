<script setup lang="ts">
import { time } from '@ui/classes/dates';
import { IkButton } from '@ui/components/IkButton';
import { IkDate } from '@ui/components/IkDate';
import { IkUIVariant } from '@ui/types/utils';
import { shallowRef } from 'vue';

const value = shallowRef(null);
const value_btn = shallowRef(time());
const disabled_datespans = [{ to: time().subtract(1, 'day'), from: null }];
</script>
<template>
    <Stories title="Components/Inputs/IkDate"
             :component="IkDate">
        <Story title="Default">
            <IkDate v-model="value"></IkDate>
        </Story>
        <Story title="Variant">
            <div v-for="variant in IkUIVariant" class="ik-mb-3">
                <IkDate time :variant="variant" v-model="value"></IkDate>
            </div>
        </Story>
        <Story title="Disabled">
            <IkDate disabled v-model="value"></IkDate>
        </Story>
        <Story title="With Time">
            <IkDate time v-model="value"></IkDate>
        </Story>
        <Story title="Only Time">
            <IkDate time_only v-model="value"></IkDate>
        </Story>
        <Story title="Placeholder">
            <IkDate placeholder="My placeholder" v-model="value"></IkDate>
        </Story>
        <Story title="Time Placeholder">
            <IkDate time placeholder_hour="My placeholder" v-model="value"></IkDate>
        </Story>
        <Story title="Format">
            <IkDate format="YYYY|MM|DD" v-model="value"></IkDate>
        </Story>
        <Story title="Hour Format">
            <IkDate time format_hour="HH|mm" v-model="value"></IkDate>
        </Story>
        <Story title="Hour Prompt Interval">
            <IkDate time_only :prompt_hour_interval="15" v-model="value"></IkDate>
        </Story>
        <Story title="Full Width">
            <IkDate full_width v-model="value"></IkDate>
        </Story>
        <Story title="Custom Activator">
            <IkDate v-model="value_btn">
                <template #activator="{ on }">
                    <IkButton v-on="on">Date: {{ value_btn.format() }}</IkButton>
                </template>
            </IkDate>
        </Story>
        <Story title="Disabled datespans">
            <IkDate v-model="value" :disabled_datespans="disabled_datespans"></IkDate>
        </Story>
    </Stories>
</template>
