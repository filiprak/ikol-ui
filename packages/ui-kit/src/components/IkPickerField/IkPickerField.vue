<template>
    <IkFormField class="ik-picker-field"
                 :errors="filtered_errors"
                 v-bind="$props">
        <IkSelect ref="select"
                  :model-value="props.modelValue"
                  :value_key="props.value_key"
                  :text_key="props.text_key"
                  :text_expression="props.text_expression"
                  :items="props.items"
                  variant="filled"
                  :disabled="props.disabled"
                  @update:modelValue="emitVModel">
            <template #activator="{ on, selected }">
                <slot name="activator"
                      :on="on"
                      :selected="selected">
                    <IkPickerFieldItem :text_expression="props.text_expression"
                                       :model-value="selected"
                                       :disabled="props.disabled"
                                       :text_key="props.text_key"
                                       v-on="on">
                        <slot name="action-text"></slot>
                    </IkPickerFieldItem>
                </slot>
            </template>
            <template #item="item">
                <IkListItem no_wrap
                            grow_content
                            class="ik-picker-field__item">
                    <template v-if="$slots.icon"
                              #prepend>
                        <slot name="icon"
                              :item="item.item" />
                    </template>
                    <slot name="text">
                        <span>{{ getItemText(item.item) }}</span>
                    </slot>
                </IkListItem>
            </template>
        </IkSelect>
    </IkFormField>
</template>

<script setup lang="ts" generic="ItemT extends {}, ValueT = ItemT">

import './IkPickerField.css';

import { IkFormField } from '../IkForm';
import { IkListItem } from '../IkList';
import { IkSelect, type IkSelectItemLoader } from '../IkSelect';
import IkPickerFieldItem from './IkPickerFieldItem.vue';
import { type IkFieldProps, getFieldPropDefaults, useFormField } from '@ui/composables/form';
import { ref } from 'vue';
import type { IkKeysByType } from '@ui/types/utils';

const props = withDefaults(
    defineProps<IkFieldProps & {
        modelValue?: ValueT;
        items?: ItemT[] | IkSelectItemLoader<ItemT>;
        value_key?: IkKeysByType<ItemT, ValueT>;
        text_key?: keyof ItemT,
        text_expression?: (item: ItemT) => string;
        placeholder?: string;
        disabled?: boolean;
    }>(),
    {
        ...getFieldPropDefaults(),
        items: () => [],
        value_key() {
            return 'value' as unknown as IkKeysByType<ItemT, ValueT>;
        },
        text_key() {
            return 'text' as unknown as keyof ItemT;
        },
        placeholder: '[[_*en*Not set_]]',
        disabled: false,
    }
);

defineOptions({
    inheritAttrs: false,
});

const field = ref<IkFormField>();
const select = ref<IkSelect>();

const {
    filtered_errors,
    computed_variant,
    computed_skeleton,
    computed_view_mode,
    emitVModel,
    ...methods

} = useFormField({
    field,
    props,
});

defineExpose({
    ...methods,
    focus,
});

const getItemText = (data: ItemT) => {
    if (props.text_expression) {
        return props.text_expression(data);
    } else {
        return data[props.text_key as keyof ItemT] || '';
    }
};

</script>
