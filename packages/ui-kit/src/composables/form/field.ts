import type { Ref } from 'vue';
import { computed, inject, ref } from 'vue';
import type { IkForm, IkFormField } from '@ui/components/IkForm';
import { useInstance } from '@ui/composables/instance';
import { getCurrentInstance } from '@ui/utils/core';
import { isNumeric, isString } from '@ui/utils/helpers';
import { scrollIntoView as _scrollIntoView } from '@ui/utils/scroll';
import { DEFAULT_RULES } from '@ui/composables/form/rules';

type IkFieldConfig = {
    field: Ref<IkFormField | undefined>,
    props: IkFieldProps,
    rules?: (IkFieldValidateRule | string)[],
    rule_definitions?: Record<string, IkFieldValidateRule>,
};

export interface IkFieldProps {
    modelValue?: unknown;
    name?: string | undefined;
    label?: string | undefined;
    hide_label?: boolean | undefined;
    field_icon?: string | undefined;
    field_pad?: boolean | undefined;
    no_margin?: boolean | undefined;
    variant?: string | undefined;
    required?: boolean | undefined;
    disabled?: boolean | undefined;
    min?: string | number | undefined;
    max?: string | number | undefined;
    minlength?: string | number | undefined;
    maxlength?: string | number | undefined;
    step?: string | number | undefined;
    range_max?: string | number | undefined;
    range_min?: string | number | undefined;
    default_error_message?: string | undefined;
    view_mode?: boolean | string | undefined;
    skeleton?: boolean | string | undefined
    rules?: string | IkFieldValidateRule[] | undefined;
    validate_on_change?: boolean | undefined;
    show_single_error?: boolean | undefined;
    subtext?: string | undefined;
}

export function getFieldPropDefaults() {
    return {
        label: '',
        hide_label: false,
        field_pad: false,
        no_margin: false,
        required: false,
        disabled: false,
        default_error_message: '{{_*en*Please enter correct value_}}',
        view_mode: 'inherit',
        skeleton: 'inherit',
        validate_on_change: true,
        show_single_error: true,
    };
}

export function makeFieldProps() {
    return {
        modelValue: {
            required: false,
        },
        name: {
            type: String,
        },
        label: {
            type: String,
            default: getFieldPropDefaults().label,
        },
        hide_label: {
            type: Boolean,
            default: getFieldPropDefaults().hide_label,
        },
        field_icon: {
            type: String,
        },
        field_pad: {
            type: Boolean,
            default: getFieldPropDefaults().field_pad,
        },
        no_margin: {
            type: Boolean,
            default: getFieldPropDefaults().no_margin,
        },
        variant: {
            type: String,
        },
        required: {
            type: Boolean,
            default: getFieldPropDefaults().required,
        },
        disabled: {
            type: Boolean,
            default: getFieldPropDefaults().disabled,
        },
        min: {
            type: [Number, String],
        },
        max: {
            type: [Number, String],
        },
        minlength: {
            type: [Number, String],
        },
        maxlength: {
            type: [Number, String],
        },
        step: {
            type: [Number, String],
        },
        range_max: {
            type: [Number, String],
        },
        range_min: {
            type: [Number, String],
        },
        default_error_message: {
            type: String,
            default: getFieldPropDefaults().default_error_message,
        },
        view_mode: {
            type: [Boolean, String],
            default: getFieldPropDefaults().view_mode,
        },
        skeleton: {
            type: [Boolean, String],
            default: getFieldPropDefaults().skeleton,
        },
        rules: {
            type: [String, Array<IkFieldValidateRule>],
        },
        validate_on_change: {
            type: Boolean,
            default: getFieldPropDefaults().validate_on_change,
        },
        show_single_error: {
            type: Boolean,
            default: getFieldPropDefaults().show_single_error,
        },
        subtext: {
            type: String,
        },
    };
}

export function useFormField(config: IkFieldConfig) {
    const { onCreate, onDestroy } = useInstance<IkField>();
    const { emit } = getCurrentInstance('field');
    const { field, props, rule_definitions, rules: private_rules } = config;

    const form = inject<IkForm>('form');
    const errors = ref<string[]>([]);

    const rules = computed(() => {
        let result: (IkFieldValidateRule | string)[] = [];

        if (props.rules) {
            if (isString(props.rules)) {
                result = result.concat(props.rules.split(','));
            } else {
                result = result.concat(props.rules);
            }
        }
        if (private_rules) {
            result = result.concat(private_rules);
        }
        return result.filter(rule => {
            return rule !== '' && rule !== 'required';
        });
    });
    const filtered_errors = computed(() => {
        return props.show_single_error ? (errors.value.length > 0 ? [errors.value[0]] : []) : errors.value;
    });
    const computed_variant = computed(() => {
        if (props.variant) {
            return props.variant;
        } else if (form) {
            return form.variant;
        } else {
            return undefined;
        }
    });
    const computed_view_mode = computed(() => {
        if (props.view_mode !== 'inherit') {
            return !!props.view_mode;
        } else if (form) {
            return !!form.view_mode;
        } else {
            return false;
        }
    });
    const computed_skeleton = computed(() => {
        if (props.skeleton !== 'inherit') {
            return !!props.skeleton;
        } else if (form) {
            return !!form.skeleton;
        } else {
            return false;
        }
    });

    function emitVModel(value: unknown) {
        if (props.validate_on_change) {
            validate(value);
        }
        form && form.emitVModel(value);
        emit('update:modelValue', value);
    }

    function getRuleDefinitions() {
        const defs = DEFAULT_RULES;

        if (rule_definitions) {
            for (const name in rule_definitions) {
                defs[name] = rule_definitions[name];
            }
        }
        return defs;
    }

    function validate(value?: unknown) {
        errors.value = [];

        value = value !== undefined ? value : props.modelValue;

        if (props.required) {
            validateRule(value, 'required');
        }
        if (isNumeric(props.minlength)) {
            validateRule(value, 'minlength', { minlength: props.minlength });
        }
        if (isNumeric(props.maxlength)) {
            validateRule(value, 'maxlength', { maxlength: props.maxlength });
        }
        if (isNumeric(props.max)) {
            validateRule(value, 'max', { max: props.max });
        }
        if (isNumeric(props.min)) {
            validateRule(value, 'min', { min: props.min });
        }
        if (isNumeric(props.range_min) && isNumeric(props.range_max)) {
            validateRule(value, 'range', { min: props.range_min, max: props.range_max });
        }
        if (isNumeric(props.step)) {
            validateRule(value, 'step', { step: props.step });
        }

        for (let i = 0; i < rules.value.length; i++) {
            validateRule(value, rules.value[i]);
        }
        return errors.value.length === 0;
    }

    function validateRule(value: unknown, rule: IkFieldValidateRule | string, params: IkFieldValidateRuleParams = {}) {
        const rule_defs = getRuleDefinitions();
        let valid = true;
        let error: string | null = null;

        const pass_optional = (!props.required && rule_defs.required(value, params) !== true);

        if (!pass_optional) {
            if (isString(rule)) {
                rule = rule_defs[rule];
            }
            const result = rule ? rule(value, params) : true;

            if (isString(result)) {
                valid = false;
                error = result;
            } else {
                valid = result === true;
            }

            if (!valid) {
                error = error || props.default_error_message || '';
                errors.value.push(error);
            }
        }
        return valid;
    }

    function resetValidation() {
        errors.value = [];
    }

    function isViewMode() {
        return computed_view_mode.value;
    }

    function isDisabled() {
        return !!props.disabled;
    }

    function scrollIntoView() {
        setTimeout(() => {
            const el = field.value?.getElementRef().value;

            el && _scrollIntoView(el, {
                scrollMode: 'if-needed',
                block: 'nearest',
                inline: 'nearest',
            });
        }, 0);
    }

    onCreate(vm => {
        form && form.registerField(vm);
    });

    onDestroy(vm => {
        form && form.unregisterField(vm);
    });

    return {
        filtered_errors,
        computed_variant,
        computed_view_mode,
        computed_skeleton,
        validate,
        scrollIntoView,
        resetValidation,
        emitVModel,
        isViewMode,
        isDisabled,
    };
}

export interface IkField extends ReturnType<typeof useFormField> { };
export type IkFieldValidateRule = (val: unknown, params: IkFieldValidateRuleParams) => {};
export type IkFieldValidateRuleParams = Partial<{
    min: string | number,
    max: string | number,
    step: string | number,
    maxlength: string | number,
    minlength: string | number,
}>;
