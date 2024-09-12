<template>
    <IkFormField ref="field"
                 class="ik-select-field"
                 :errors="filtered_errors"
                 v-bind="$props">
        <template v-if="$slots['label-end']"
                  #label-end>
            <slot name="label-end"></slot>
        </template>
        <IkFormFieldViewMode v-if="computed_view_mode">
            <template v-if="selected_item">
                <IkSelectChip v-if="variant_chip"
                              :size="size"
                              v-on="onIkPreviewClick ? { click: onIkPreviewClick } : {}">
                    <template v-if="show_img"
                              #prepend>
                        <slot name="image"
                              :item="selected_item">
                            <IkImage :size="img_size"
                                     :round="round_img"
                                     :src="toImage(selected_item)" />
                        </slot>
                    </template>
                    <slot name="selected"
                          :item="selected_item">
                        {{ toText(selected_item) }}
                    </slot>
                </IkSelectChip>
                <IkListItem v-else
                            inline
                            class="ik-select-field__preview ik-pa-0"
                            v-on="onIkPreviewClick ? { click: onIkPreviewClick } : {}">
                    <template v-if="show_img"
                              #prepend>
                        <slot name="image"
                              :item="selected_item">
                            <IkImage :size="img_size"
                                     :round="round_img"
                                     :src="toImage(selected_item)" />
                        </slot>
                    </template>
                    {{ toText(selected_item) }}
                </IkListItem>
            </template>
            <template v-else>
                <div class="ik-text--placeholder">
                    <slot name="view-empty">
                        [[_*en*Empty_]]
                    </slot>
                </div>
            </template>
        </IkFormFieldViewMode>
        <IkSelect v-show="!computed_view_mode"
                  ref="select"
                  v-model:selected="selected_item"
                  :model-value="modelValue"
                  :items="items"
                  :items_per_page="items_per_page"
                  :items_debounce_ms="items_debounce_ms"
                  :lazy="lazy"
                  :clearable="clearable"
                  :value_key="(value_key as any) /* eslint-disable-line @typescript-eslint/no-explicit-any */"
                  :unique_key="(unique_key as any) /* eslint-disable-line @typescript-eslint/no-explicit-any */"
                  :text_key="(text_key as any) /* eslint-disable-line @typescript-eslint/no-explicit-any */"
                  :subtext_key="(subtext_key as any) /* eslint-disable-line @typescript-eslint/no-explicit-any */"
                  :img_key="(img_key as any) /* eslint-disable-line @typescript-eslint/no-explicit-any */"
                  :text_expression="text_expression"
                  :subtext_expression="subtext_expression"
                  :img_expression="img_expression"
                  :img_size="img_size"
                  :dropdown_img_size="dropdown_img_size"
                  :round_img="round_img"
                  :min_dropdown_width="min_dropdown_width"
                  :max_dropdown_width="max_dropdown_width"
                  :variant="computed_variant"
                  :placeholder="placeholder"
                  :variant_chip="variant_chip"
                  :filter="filter"
                  :disabled="disabled"
                  :disabled_items="disabled_items"
                  :inline="inline"
                  :skip_tab="skip_tab"
                  :size="size"
                  v-bind="{
                      onIkOpen,
                      onIkClose,
                  }"
                  @update:modelValue="emitVModel">
            <template #item="{ item }">
                <slot name="item"
                      :item="item" />
            </template>
            <template #image="{ item }">
                <slot name="image"
                      :item="item" />
            </template>
        </IkSelect>
    </IkFormField>
</template>
<script setup lang="ts" generic="ItemT extends object, ValueT = ItemT">
import '@ui/styles';
import './IkSelectField.css';
import type { IkFieldProps } from '@ui/composables/form';
import { useFormField, getFieldPropDefaults } from '@ui/composables/form';
import { IkFormField, IkFormFieldViewMode } from '@ui/components/IkForm';
import type { IkSelectItemLoader } from '@ui/components/IkSelect';
import { IkSelect, IkSelectChip } from '@ui/components/IkSelect';
import { IkImage } from '@ui/components/IkImage';
import { IkListItem } from '@ui/components/IkList';
import { computed, ref, shallowRef, useAttrs } from 'vue';
import type { IkKeysByType } from '@ui/types/utils';

const props = withDefaults(
    defineProps<IkFieldProps & {
        modelValue?: ValueT;
        items: ItemT[] | IkSelectItemLoader<ItemT>;
        items_per_page?: number;
        items_debounce_ms?: number;
        lazy?: boolean;
        clearable?: boolean;
        unique_key?: keyof ItemT;
        value_key?: IkKeysByType<ItemT, ValueT | undefined>;
        text_key?: keyof ItemT,
        text_expression?: (item: ItemT) => string;
        subtext_key?: keyof ItemT,
        subtext_expression?: (item: ItemT) => string;
        img_key?: keyof ItemT,
        img_expression?: (item: ItemT) => string;
        img_size?: number,
        dropdown_img_size?: number,
        round_img?: boolean,
        size?: string;
        min_dropdown_width?: string | number;
        max_dropdown_width?: string | number;
        variant?: string;
        variant_chip?: boolean;
        filter?: boolean;
        placeholder?: string;
        disabled?: boolean;
        disabled_items?: (item: ItemT) => boolean;
        inline?: boolean;
        skip_tab?: boolean;
    }>(),
    {
        ...getFieldPropDefaults(),
        variant: 'flat',
        img_size: (props) => (props.size == 'xs' ? 18 : 24),
        items_per_page: 15,
        items_debounce_ms: 500,
    }
);

defineOptions({
    inheritAttrs: false,
});
const emit = defineEmits<{
    (e: 'update:modelValue', value?: ValueT): void,
}>();

const field = ref<IkFormField>();
const select = ref<IkSelect>();
const {
    onIkOpen,
    onIkClose,
    onIkPreviewClick,
} = useAttrs();

const show_img = computed(() => !!props.img_key || !!props.img_expression);
const selected_item = shallowRef<ItemT>();

function toText(item: ItemT) {
    if (props.text_key) {
        return String(item[props.text_key]);
    } else if (props.text_expression) {
        return props.text_expression(item);
    } else {
        return JSON.stringify(item);
    }
}

function toImage(item: ItemT) {
    if (props.img_key) {
        return String(item[props.img_key]);
    } else if (props.img_expression) {
        return props.img_expression(item);
    } else {
        return '';
    }
}

function focus() {
    select.value?.focus();
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
