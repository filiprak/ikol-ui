<template>
    <form class="ik-form"
          novalidate
          @submit.prevent="onSubmit">
        <slot></slot>
    </form>
</template>
<script setup lang="ts">
import '@ui/styles';
import './IkForm.css';
import type { IkForm } from '.';
import { provide, ref, shallowRef } from 'vue';
import { useInstance } from '@ui/composables/instance';
import type { IkField } from '@ui/composables/form';
import { useForm } from '@ui/composables/form';
import { isFunction } from '@ui/utils/helpers';

const { onCreate, onDestroy, getInstance } = useInstance<IkForm>();
const manager = useForm();

const fields = shallowRef<IkField[]>([]);
const dirty = ref(false);

const props = defineProps({
    prompt_unsaved: {
        type: [Boolean, Function],
        default: false,
    },
    routable_edit: {
        type: Boolean,
    },
    routable_is_new: {
        type: Boolean,
        default: false,
    },
    no_auto_validate: {
        type: Boolean,
        default: false,
    },
    view_mode: {
        type: Boolean,
        default: false,
    },
    variant: {
        type: String,
    },
    skeleton: {
        type: Boolean,
    },
});
const emit = defineEmits<{
    (e: 'ik-submit', o: { form: IkForm }): void,
    (e: 'update:modelValue', value: unknown): void,
    (e: 'update:routable_edit', value: boolean): void,
}>();

const onSubmit = () => {
    let is_valid = true;

    if (!props.no_auto_validate) {
        is_valid = validate();
    }
    if (is_valid) {
        dirty.value = false;
        emit('ik-submit', { form: getInstance() });
    }
};

const validate = () => {
    let valid = true;
    let scrolled = false;

    for (let i = 0; i < fields.value.length; i++) {
        if (!fields.value[i].isViewMode() &&
            !fields.value[i].isDisabled()) {
            if (!fields.value[i].validate()) {
                valid = false;

                if (!scrolled) {
                    fields.value[i].scrollIntoView();
                    scrolled = true;
                }
            }
        }
    }
    return valid;
};

const reset = () => {
    resetValidation();
    dirty.value = false;
};

const confirmCancel = () => {
    if (dirty.value) {
        return manager
            .showUnsavedModal()
            .then(({ confirmed }) => {
                if (confirmed) {
                    dirty.value = false;
                    return Promise.resolve(true);
                } else {
                    return Promise.resolve(false);
                }
            });
    } else {
        return Promise.resolve(true);
    }
};

const resetValidation = () => {
    for (let i = 0; i < fields.value.length; i++) {
        fields.value[i].resetValidation();
    }
};

const registerField = (field: IkField) => {
    fields.value.push(field);
};

const unregisterField = (field: IkField) => {
    fields.value = fields.value.filter((i) => {
        if (i === field) {
            return false;
        } else {
            return true;
        }
    });
};

const isDirty = () => {
    if (isFunction(props.prompt_unsaved)) {
        return !!props.prompt_unsaved(dirty.value, getInstance());
    } else {
        return dirty.value;
    }
};

const submit = () => {
    onSubmit();
};

const emitVModel = (value: unknown) => {
    if (!props.view_mode) {
        dirty.value = true;
    }
    emit('update:modelValue', value);
};

onCreate((instance) => {
    provide('form', getInstance());

    manager.registerForm(instance);
});

onDestroy((instance) => {
    manager.unregisterForm(instance);
});

defineExpose({
    registerField,
    unregisterField,
    submit,
    validate,
    isDirty,
    reset,
    confirmCancel,
    resetValidation,
    emitVModel,
});
</script>
