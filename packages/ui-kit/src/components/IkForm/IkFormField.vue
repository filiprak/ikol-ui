<template>
    <div ref="el"
         :class="root_class">
        <template v-if="!hide_label">
            <div :class="label_class">
                {{ label }}
                <span v-if="show_required_dot"
                      class="ik-form-field__required-dot">*</span>
                <slot name="label-end" />
            </div>
        </template>
        <div :class="content_class">
            <div v-if="field_icon"
                 class="ik-form-field__icon">
                <IkIcon :icon="field_icon" />
            </div>
            <slot></slot>
            <div v-if="!computed_view_mode"
                 class="ik-form-field__errors">
                <div v-for="error in errors"
                     :key="error"
                     class="ik-form-field__error">
                    {{ error }}
                </div>
            </div>
            <div v-if="subtext"
                 class="ik-form-field__subtext">
                {{ subtext }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import '@ui/styles';
import './IkForm.css';
import type { IkForm } from '@ui/components/IkForm';
import { IkIcon } from '@ui/components/IkIcon';
import { computed, inject, ref, useAttrs } from 'vue';

defineOptions({
    inheritAttrs: false,
});

const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    hide_label: {
        type: Boolean,
        default: false,
    },
    field_icon: {
        type: String,
    },
    field_pad: {
        type: Boolean,
        default: false,
    },
    no_margin: {
        type: Boolean,
        default: false,
    },
    full_width_content: {
        type: Boolean,
        default: false,
    },
    variant: {
        type: String,
    },
    hint: {
        type: [String, Object],
        default: '',
    },
    errors: {
        type: Array<string>,
        default: () => [],
    },
    required: {
        type: Boolean,
        default: false,
    },
    view_mode: {
        type: [Boolean, String],
        default: 'inherit',
    },
    skeleton: {
        type: [String, Boolean],
        default: 'inherit',
    },
    subtext: {
        type: String,
    },
});

const attrs = useAttrs();
const el = ref<HTMLElement>();
const form = inject<IkForm>('form');

const root_class = computed(() => {
    const classes: Record<string, boolean> = {
        'ik-form-field': true,
        'ik-form-field--no-margin': props.no_margin,
        'ik-form-field--pad': !!props.field_icon || props.field_pad,
        'ik-form-field--skeleton': computed_skeleton.value,
    };
    if (computed_variant.value) {
        classes['ik-form-field--' + computed_variant.value] = true;
    }
    return [classes, attrs.class];
});

const label_class = computed(() => ({
    'ik-form-field__label': true,
    'ik-bg-skeleton': computed_skeleton.value,
}));

const content_class = computed(() => ({
    'ik-form-field__content': true,
    'ik-bg-skeleton': computed_skeleton.value,
    'ik-full-width': props.full_width_content,
}));

const show_required_dot = computed(() => props.required && !computed_view_mode.value);
const computed_variant = computed(() => props.variant || (form ? form.variant : undefined));
const computed_view_mode = computed(() => {
    return props.view_mode === 'inherit' ? !!form?.view_mode : !!props.view_mode;
});
const computed_skeleton = computed(() => {
    return props.skeleton === 'inherit' ? !!form?.skeleton : !!props.skeleton;
});

function getElementRef() {
    return el;
}

defineExpose({
    getElementRef,
});
</script>
