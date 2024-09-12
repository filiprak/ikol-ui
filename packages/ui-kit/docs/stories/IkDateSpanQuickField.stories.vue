<script setup lang="ts">
import { IkForm } from '@ui/components/IkForm';
import { time } from '@ui/classes/dates';
import { IkDateSpanQuickField } from '@ui/components/IkDateSpanQuickField';
import { shallowRef } from 'vue';

const value = shallowRef({
    start: time('2022-01-01'),
    end: time('2022-02-01'),
});

</script>
<template>
    <Stories title="Components/Form/IkDateSpanQuickField"
             :component="IkDateSpanQuickField">
        <Story title="Default">
            <IkForm>
                <IkDateSpanQuickField v-model="value"/>
            </IkForm>
        </Story>
        <Story title="Quick Options">
            <IkForm>
                <IkDateSpanQuickField v-model="value"
                                      :quick_options="['last_month', 'last_7_days', 'this_week', 'this_month']" />
            </IkForm>
        </Story>
    </Stories>
</template>
