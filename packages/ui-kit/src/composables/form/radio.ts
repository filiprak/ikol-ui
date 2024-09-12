import type { IkKeysByType } from '@ui/types/utils';
import { isArray } from '@ui/utils/helpers';
import { computed } from 'vue';

interface IkFormRadioProps<ItemT, ValueT> {
    modelValue?: ValueT | ValueT[];
    items: ItemT[];
    unique_key?: keyof ItemT;
    value_key?: IkKeysByType<ItemT, ValueT | undefined>;
    text_key?: keyof ItemT,
    multiple?: boolean;
}

export function useFormRadio<ItemT, ValueT>(props: IkFormRadioProps<ItemT, ValueT>) {
    const unique_key = computed(() => String(props.value_key || props.unique_key || 'id') as keyof ItemT);
    const is_primary = computed(() => !!props.value_key);
    const is_empty = computed(() => isArray(props.modelValue) ? props.modelValue.length < 1 : !!props.modelValue);

    const cached_items = computed(() => {
        return props.items.reduce((acc, item) => {
            acc[toKey(item)] = item;
            return acc;
        }, {} as Record<string, ItemT>);
    });

    const selected_items = computed(() => {
        if (props.modelValue) {
            if (isArray(props.modelValue)) {
                if (is_primary.value) {
                    return props.modelValue.map(v => cached_items.value[String(v)]);
                } else {
                    return props.modelValue as unknown as ItemT[];
                }
            } else {
                if (is_primary.value) {
                    return [cached_items.value[String(props.modelValue)]];
                } else {
                    return [props.modelValue as unknown as ItemT];
                }
            }
        } else {
            return [];
        }
    });

    const selected_items_by_key = computed(() => {
        return selected_items.value.reduce((acc, item) => {
            acc[toKey(item)] = item;
            return acc;
        }, {} as Record<string, ItemT>);
    });

    function isActive(item: ItemT) {
        return !!selected_items_by_key.value[toKey(item)];
    }

    function toValue(item: ItemT) {
        if (props.value_key) {
            return item[props.value_key] as ValueT;
        } else {
            return item as unknown as ValueT;
        }
    }

    function toKey(item: ItemT) {
        return String(item[unique_key.value]);
    }

    function toText(item: ItemT) {
        if (props.text_key) {
            return String(item[props.text_key]);
        } else {
            return JSON.stringify(item);
        }
    }

    return {
        cached_items,
        selected_items,
        selected_items_by_key,
        is_primary,
        is_empty,
        isActive,
        toText,
        toValue,
        toKey,
    };
}
