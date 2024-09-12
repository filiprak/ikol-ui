<template>
    <div :class="root_class">
        <label class="ik-checkbox__label">
            <input v-model="internal_checked"
                   type="checkbox"
                   :name="name"
                   :checked="internal_checked" />
            <template v-if="variant === 'switch'">
                <div class="ik-checkbox__switch">
                    <div></div>
                </div>
            </template>
            <template v-else>
                <div class="ik-checbox__icon">
                    <IkIcon v-if="internal_checked || props.indeterminate"
                            :icon="$props.indeterminate ? 'minus' : 'check'"
                            :title="title" />
                </div>
            </template>
            <div class="ik-checkbox__text">
                <slot></slot>
            </div>
        </label>
    </div>
</template>
<script setup lang="ts">
import '@ui/styles';
import './IkCheckbox.css';
import { computed, type PropType } from 'vue';
import { IkIcon } from '@ui/components/IkIcon';
import { isArray, isBoolean, isString } from '@ui/utils/helpers';

const props = defineProps({
    /**
     * Current state of checkbox. This is also used for `v-model` binding.
     * Possible types are `"array", "boolean" , "string"`.
     * - `"array"` option allows to connect multiple checkboxes to single `v-model` variable
     * - `"string"` option allows to connect multiple exclusive checkboxes to single `v-model` variable
     * - `"boolean"` option allows to connect checkbox to simple `true/false` `v-model` variable
     * See examples below.
     **/
    modelValue: {
        type: [String, Boolean, Array] as PropType<boolean | string | string[]>,
        default: false,
    },
    /**
    * Sets `name` attribute for native html input element. Is also as id for 'array and 'string' v-model types.
    **/
    name: {
        type: String,
    },
    /**
     * Tooltip text shown when mouse hovers checkbox icon.
    **/
    title: {
        type: String,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    /**
     * Renders checkbox with `minus` icon. This applies only to `"basic"` variant.
     * Indeterminate state can be used to present checkbox with unknown state.
    **/
    indeterminate: {
        type: Boolean,
        default: false,
    },
    /**
     * Style variant. Possible values `"basic", "switch"`.
     * - `"basic"` is regular checkbox with check icon
     * - `"switch"` is modern styled switch
    **/
    variant: {
        type: String as PropType<'basic' | 'switch'>,
        default: 'basic',
    },
    no_margin: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean | string | string[]): void
}>();

const root_class = computed(() => {
    const classes: Record<string, boolean> = {
        'ik-checkbox': true,
        'ik-checkbox--disabled': props.disabled,
        'ik-checkbox--no-margin': props.no_margin,
    };
    if (props.variant) {
        classes['ik-checkbox--' + props.variant] = true;
    }
    return classes;
});

const internal_checked = computed({
    get: () => {
        if (isString(props.modelValue)) {
            return props.modelValue === props.name;
        } else if (isArray(props.modelValue)) {
            if (!props.name) {
                return false;
            }
            return props.modelValue.includes(props.name);
        } else if (isBoolean(props.modelValue)) {
            return props.modelValue;
        } else {
            return false;
        }
    },
    set: (val) => {
        if (isString(props.modelValue)) {
            emit('update:modelValue', val && props.name ? props.name : '');
        } else if (isArray(props.modelValue)) {
            if (val) {
                if (!props.name) {
                    return emit('update:modelValue', props.modelValue);
                }
                if (!props.modelValue.includes(props.name)) {
                    emit('update:modelValue', [...props.modelValue, props.name]);
                }
            } else {
                const arr = props.modelValue.filter(name => name !== props.name);
                emit('update:modelValue', arr);
            }
        } else {
            emit('update:modelValue', val);
        }
    },
});

</script>
