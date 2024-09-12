<template>
    <IkListItem no_wrap
                grow_content
                v-bind="$attrs"
                :class="item_class"
                :style="item_style"
                :disabled="props.disabled">
        <template #prepend>
            <slot name="prepend">
                <IkColorSwatch size="md"
                               :color="color ?? 'BBC7D0'"
                               round
                               format="hex" />
            </slot>
        </template>
        <slot name="text">
            {{ item_text ?? '[[_*en*Not set_]]' }}
        </slot>
        <template #append>
            <slot name="action-text">
                {{ props.modelValue ? '[[_*en*UPDATE_]]' : '[[_*en*CHOOSE_]]' }}
            </slot>
        </template>
    </IkListItem>
</template>

<script setup lang="ts" generic="ItemT extends {}, ValueT = ItemT">
import { computed } from 'vue';
import './IkPickerField.css';

import { useTheme } from '@ui/composables/theme';
import { IkColorSwatch } from '@ui/components/IkColorSwatch';
import { IkListItem } from '@ui/components/IkList';

type IkPickerFieldItemValueT = ValueT & { color: string }

const props = withDefaults(
    defineProps<{
        modelValue?: ValueT;
        text_key?: keyof ItemT,
        text_expression?: (item: ItemT) => string;
        disabled?: boolean;
    }>(),
    {
        disabled: false,
        text_key() {
            return 'text' as unknown as keyof ItemT;
        },
    }
);

const theme = useTheme();

const color = computed(() => (props.modelValue as IkPickerFieldItemValueT)?.color);

const item_style = computed(() => {
    if (color.value && theme.isCombinedColor(color.value)) {
        const text_color = theme.getCombinedColor(color.value, 'text');
        const bckg_color = theme.getCombinedColor(color.value, 'bckg');

        return {
            backgroundColor: bckg_color ? ('#' + bckg_color) : null,
            color: text_color ? ('#' + text_color) : null,
        };
    }
    return { backgroundColor: null, color: null };
});

const item_class = computed(() => ({
    'ik-picker-field-item': true,
    'ik-picker-field-item--default': props.modelValue ? !color.value : true,
    'ik-picker-field-item--disabled': props.disabled,
}));

const item_text = computed(() => {
    if (props.text_expression && props.modelValue) {
        return props.text_expression(props.modelValue as unknown as ItemT);
    } else if (props.text_key) {
        return props.modelValue?.[props.text_key as unknown as keyof ValueT] ?? null;
    } else {
        return null;
    }
});

</script>
