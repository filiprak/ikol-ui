<script lang="ts">
import '@ui/styles';
import './IkInput.css';
import { defineComponent, h, ref } from 'vue';
import { formatNumber, isNumeric } from '@ui/utils/helpers';
import { IkIcon } from '@ui/components/IkIcon';

export default defineComponent({
    render() {
        const input = h('input', {
            ref: 'native_el',
            class: this.computed_class,
            type: this.computed_type,
            name: this.name,
            required: this.required,
            readonly: this.readonly,
            disabled: this.disabled,
            autocomplete: this.autocomplete,
            placeholder: this.placeholder,
            min: this.min,
            max: this.max,
            minlength: this.minlength,
            maxlength: this.maxlength,
            step: this.step,
            inputmode: this.computed_inputmode,
            value: this.computed_value,
            onFocusout: this._onFocusOut,
            onInput: this._onInput,
        });

        let prepend, append;

        if (this.has_prepend) {
            prepend = h('div', { class: 'ik-input__prepend' }, [
                this.$slots.prepend?.()
                    ? this.$slots.prepend?.()
                    : h(IkIcon, {
                        icon: this.prepend_icon || this.icon,
                        ...this.prepend_on,
                    }),
            ]);
        }

        if (this.has_append) {
            append = h('div', {
                class: 'ik-input__append',
                style: this.show_append ? {} : { display: 'none' },
            }, [
                this.$slots.append?.()
                    ? this.$slots.append?.()
                    : h(IkIcon, {
                        icon: this.append_icon,
                        ...this.append_on,
                    }),
            ]);
        }

        return h('div', {
            class: {
                'ik-input': true,
                'ik-input--prepend': this.has_prepend,
                'ik-input--append': this.has_append,
                'ik-input--disabled': this.disabled,
            },
        }, [prepend, input, append]);
    },
    props: {
        modelValue: {
            type: [String, Number],
            default: '',
        },
        type: {
            type: String,
            default: 'text',
        },
        name: {
            type: String,
        },
        size: {
            type: String,
            default: 'sm',
        },
        required: {
            type: Boolean,
            default: false,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        autocomplete: {
            type: String,
            default: 'off',
        },
        placeholder: {
            type: String,
        },
        min: {
            type: [String, Number],
        },
        max: {
            type: [String, Number],
        },
        maxlength: {
            type: [String, Number],
        },
        minlength: {
            type: [String, Number],
        },
        step: {
            type: [String, Number],
        },
        append_clear_icon: {
            type: Boolean,
            default: false,
        },
        prepend_icon: {
            type: String,
        },
        icon: {
            type: String,
        },
        append_icon: {
            type: String,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            default(props: any) {
                return props.append_clear_icon ? 'times' : undefined;
            },
        },
        decimals: {
            type: Number,
        },
        variant: {
            type: String,
            default: 'flat',
        },
        autofocus: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        computed_type() {
            return (this.type === 'decimal') ? 'text' : this.type;
        },
        computed_inputmode() {
            return (this.type === 'decimal') ? 'decimal' : undefined;
        },
        computed_class() {
            const classes: Record<string, boolean> = {
                'ik-input__native': true,
                'ik-f-input': true,
            };
            if (this.size) {
                classes['ik-f-input--size-' + this.size] = true;
            }
            classes['ik-f-input--' + this.variant] = true;
            return classes;
        },
        computed_value() {
            if (!this.hasFocus() && this.decimals !== undefined) {
                return formatNumber(this.modelValue, this.decimals);
            } else {
                return this.modelValue;
            }
        },
        has_prepend() {
            return this.prepend_icon || this.icon || this.$slots.prepend;
        },
        has_append() {
            return this.append_icon || this.$slots.append;
        },
        show_append() {
            if (this.append_clear_icon) {
                return !!this.modelValue;
            } else {
                return true;
            }
        },
        prepend_on() {
            return this.$attrs.onIkClickPrepend
                ? {
                    onClick: this.$attrs.onIkClickPrepend,
                }
                : {};
        },
        append_on() {
            const handlers = [];

            if (this.append_clear_icon) {
                handlers.push(() => {
                    this.$emit('update:modelValue', '');
                });
            }
            if (this.$attrs.onIkClickAppend) {
                handlers.push(this.$attrs.onIkClickAppend);
            }
            return { onClick: handlers };
        },
    },
    methods: {
        focus() {
            this.native_el?.focus();
        },
        hasFocus() {
            return this.native_el === document.activeElement;
        },
        moveCursorToEnd() {
            const el = this.native_el;

            if (el) {
                if (typeof el.selectionStart == 'number') {
                    el.selectionStart = el.selectionEnd = el.value.length;
                } else if (typeof (el as any).createTextRange != 'undefined') { // eslint-disable-line @typescript-eslint/no-explicit-any
                    if (!this.hasFocus()) {
                        el.focus();
                    }
                    const range = (el as any).createTextRange(); // eslint-disable-line @typescript-eslint/no-explicit-any
                    range.collapse(false);
                    range.select();
                }
            }
        },
        _setValueAsync(value: string, select = false) {
            setTimeout(() => {
                if (this.native_el) {
                    this.native_el.value = value;
                    select && this.native_el.select();
                }
            }, 0);
        },
        _onInput() {
            let value = this.native_el?.value;

            if (this.type === 'decimal') {
                if (value) {
                    const original = value;

                    value = String(value);
                    // replace commas with dots
                    value = value.replace(/,/g, '.');
                    // remove all dots except last
                    value = value.replace(/(.*)\./, (x) => { return x.replace(/\./g, '') + '.'; });
                    // replace all non-decimal characters left
                    value = value.replace(/[^\d.-]/g, '');

                    if (!isNumeric(value) && value !== '-') {
                        value = '0';
                    }
                    if (value !== original) {
                        this._setValueAsync(value, false);
                    }
                }
            }

            if ((this.type === 'number' || this.type === 'decimal') && isNumeric(value)) {
                const numeric = Number(value);

                if (this.min !== undefined && (this.min == 0 || this.min == 1) && numeric < this.min) {
                    value = String(Number(this.min));
                    this._setValueAsync(value, true);
                }
                if (this.max !== undefined && numeric > Number(this.max)) {
                    value = String(this.max);
                    this._setValueAsync(value, false);
                }
            }

            this.$emit('update:modelValue', value);
        },
        _onFocusOut() {
            if (this.decimals !== undefined) {
                const formatted = formatNumber(this.native_el?.value || '', this.decimals);

                if (this.native_el?.value !== formatted) {
                    this.$emit('update:modelValue', formatted);
                }
            }
        },
    },
    mounted() {
        if (this.autofocus) {
            setTimeout(this.focus, 0);
        }
    },
    setup() {
        return { native_el: ref<HTMLInputElement>() };
    },
});
</script>
