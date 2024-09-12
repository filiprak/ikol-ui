<template>
    <IkFormField ref="field"
                 class="ik-radio-group-field"
                 :errors="filtered_errors"
                 v-bind="$props">
        <IkFormFieldViewMode v-if="computed_view_mode">
            <template v-if="!is_empty">
                {{ preview_text }}
            </template>
            <template v-else>
                <div class="ik-text--placeholder">
                    <slot name="view-empty">
                        [[_*en*Empty_]]
                    </slot>
                </div>
            </template>
        </IkFormFieldViewMode>
        <IkRadioGroup v-if="!computed_view_mode"
                      :model-value="modelValue"
                      :items="items"
                      :value_key="(value_key as any) /* eslint-disable-line @typescript-eslint/no-explicit-any */"
                      :unique_key="(unique_key as any) /* eslint-disable-line @typescript-eslint/no-explicit-any */"
                      :text_key="(text_key as any) /* eslint-disable-line @typescript-eslint/no-explicit-any */"
                      :disabled="disabled"
                      @update:modelValue="emitVModel">
            <template v-if="$slots['button']"
                      #button="btn_slot">
                <slot name="button"
                      v-bind="btn_slot"></slot>
            </template>
            <template v-if="$slots['button-label']"
                      #button-label="btn_label_slot">
                <slot name="button-label"
                      v-bind="btn_label_slot"></slot>
            </template>
        </IkRadioGroup>
    </IkFormField>
</template>
<script setup lang="ts" generic="ItemT extends object, ValueT = ItemT">
import '@ui/styles';
import './IkRadioGroupField.css';
import type { IkFieldProps } from '@ui/composables/form';
import { useFormField, getFieldPropDefaults, useFormRadio } from '@ui/composables/form';
import { IkFormField, IkFormFieldViewMode } from '@ui/components/IkForm';
import { IkRadioGroup } from '@ui/components/IkRadioGroup';
import { computed, ref } from 'vue';
import type { IkKeysByType } from '@ui/types/utils';

type IkRadioGroupFieldValuesT = ValueT[];

const props = withDefaults(
    defineProps<IkFieldProps & {
        modelValue?: ValueT | IkRadioGroupFieldValuesT,
        items: ItemT[],
        unique_key?: keyof ItemT,
        value_key?: IkKeysByType<ItemT, ValueT | undefined>,
        text_key?: keyof ItemT,
        disabled?: boolean,
        multiple?: boolean,
    }>(),
    {
        ...getFieldPropDefaults(),
        multiple: false,
    }
);

defineOptions({
    inheritAttrs: false,
});
const emit = defineEmits<{
    (e: 'update:modelValue', value?: ValueT): void,
}>();

const field = ref<IkFormField>();

const {
    selected_items,
    is_empty,
    toText,
} = useFormRadio(props);

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

const preview_text = computed(() => {
    return selected_items.value.map(i => toText(i)).join(', ');
});

defineExpose({
    ...methods,
});
</script>
