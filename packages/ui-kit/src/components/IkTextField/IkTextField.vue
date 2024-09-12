<template>
    <IkFormField ref="field"
                 class="ik-text-field"
                 :errors="filtered_errors"
                 v-bind="$props">
        <template v-if="$slots['label-end']"
                  #label-end>
            <slot name="label-end"></slot>
        </template>
        <IkFormFieldViewMode v-if="computed_view_mode">
            <template v-if="preview_value">
                {{ preview_value }}
            </template>
            <template v-else>
                <div class="ik-text--placeholder">
                    <slot name="view-empty">
                        [[_*en*Empty_]]
                    </slot>
                </div>
            </template>
        </IkFormFieldViewMode>
        <IkInput v-else
                 ref="input"
                 :model-value="modelValue"
                 :variant="computed_variant"
                 :placeholder="placeholder"
                 :decimals="decimals"
                 :min="min"
                 :max="max"
                 :step="step"
                 :maxlength="maxlength"
                 :minlength="minlength"
                 :disabled="disabled"
                 :name="name"
                 :type="type"
                 :append_clear_icon="append_clear_icon"
                 :autocomplete="autocomplete"
                 :append_icon="append_icon"
                 :prepend_icon="prepend_icon"
                 :autofocus="autofocus"
                 :icon="icon"
                 :size="size"
                 v-bind="{
                     onIkClickAppend,
                     onIkClickPrepend
                 }"
                 @update:modelValue="emitVModel">
            <template v-if="$slots.prepend"
                      #prepend>
                <slot name="prepend" />
            </template>
            <template v-if="$slots.append"
                      #append>
                <slot name="append" />
            </template>
        </IkInput>
    </IkFormField>
</template>
<script setup lang="ts">
import '@ui/styles';
import { useFormField, makeFieldProps } from '@ui/composables/form';
import { IkFormField, IkFormFieldViewMode } from '@ui/components/IkForm';
import { IkInput } from '@ui/components/IkInput';
import { computed, ref, useAttrs } from 'vue';
import { formatNumber } from '@ui/utils/helpers';

const props = defineProps({
    ...makeFieldProps(),
    modelValue: {
        type: [String, Number],
        default: '',
    },
    type: {
        type: String,
    },
    name: {
        type: String,
    },
    size: {
        type: String,
    },
    autocomplete: {
        type: String,
    },
    placeholder: {
        type: String,
    },
    append_clear_icon: {
        type: Boolean,
    },
    prepend_icon: {
        type: String,
    },
    icon: {
        type: String,
    },
    append_icon: {
        type: String,
    },
    decimals: {
        type: Number,
    },
    autofocus: {
        type: Boolean,
    },
});
defineOptions({
    inheritAttrs: false,
});
defineEmits<{
    (e: 'update:modelValue', value: unknown): void,
}>();

const field = ref<IkFormField>();
const input = ref<IkInput>();
const {
    onIkClickPrepend,
    onIkClickAppend,
} = useAttrs();

const preview_value = computed(() => {
    if (props.decimals !== undefined) {
        return formatNumber(props.modelValue, props.decimals, true);
    } else {
        return props.modelValue;
    }
});

function focus() {
    input.value?.focus();
}

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
</script>
