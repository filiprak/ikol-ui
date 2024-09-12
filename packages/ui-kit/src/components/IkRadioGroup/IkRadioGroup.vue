<template>
    <div :class="classes">
        <IkButtonGroup>
            <slot v-for="item in items"
                  name="button"
                  :item="item"
                  :disabled="disabled"
                  :active="isActive(item)"
                  :design="getDesign(item)"
                  :toggle="() => onOptionClick(item)">
                <IkButton :key="toKey(item)"
                          variant="outline"
                          :disabled="disabled"
                          :design="getDesign(item)"
                          :active="isActive(item)"
                          @click="onOptionClick(item)">
                    <slot name="button-label"
                          :item="item">
                        {{ toText(item) }}
                    </slot>
                </IkButton>
            </slot>
        </IkButtonGroup>
    </div>
</template>
<script setup lang="ts" generic="ItemT extends {}, ValueT = ItemT">
import '@ui/styles';
import { computed, onBeforeMount } from 'vue';
import { IkButton } from '@ui/components/IkButton';
import { IkButtonGroup } from '@ui/components/IkButtonGroup';
import type { IkKeysByType, IkUIDesignColor } from '@ui/types/utils';
import { useFormRadio } from '@ui/composables/form';

const props = withDefaults(
    defineProps<{
        modelValue?: ValueT | ValueT[];
        items: ItemT[];
        unique_key?: keyof ItemT;
        value_key?: IkKeysByType<ItemT, ValueT | undefined>;
        text_key?: keyof ItemT,
        disabled?: boolean;
        multiple?: boolean;
    }>(),
    {
        multiple: false,
    },
);

const emit = defineEmits<{
    (e: 'update:modelValue', value?: ValueT | ValueT[]): void,
}>();

const {
    selected_items,
    isActive,
    toText,
    toKey,
    toValue,
} = useFormRadio(props);

const classes = computed(() => {
    const classes = ['ik-radio-group'];

    return classes;
});

function onOptionClick(item: ItemT, event?: Event) {
    if (event) {
        (event.target as HTMLElement)?.blur();
    }

    if (props.multiple) {
        let new_items = selected_items.value.slice();

        if (isActive(item)) {
            new_items = new_items.filter(i => (toKey(i) !== toKey(item)));
        } else {
            new_items.push(item);
        }

        emit('update:modelValue', new_items.map(i => toValue(i)));
    } else {
        emit('update:modelValue', toValue(item));
    }
}

function getDesign(item: ItemT) {
    return (isActive(item) ? 'primary' : 'default') as IkUIDesignColor;
}

onBeforeMount(() => {
    if (!props.value_key && !props.unique_key) {
        throw new Error('Either value_key or unique_key prop must be passed to IkRadioGroup to work correctly');
    }
});
</script>
