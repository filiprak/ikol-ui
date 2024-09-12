<template>
    <textarea ref="textarea_el"
              :class="root_class"
              :value="modelValue"
              :name="name"
              :required="required"
              :readonly="readonly"
              :disabled="disabled"
              :placeholder="placeholder"
              :rows="rows"
              :cols="cols"
              :maxlength="maxlength"
              :wrap="wrap"
              @input="updateValue"></textarea>
</template>

<script lang="ts">
import '@ui/styles';
import './IkTextarea.css';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'IkTextarea',
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        name: {
            type: String,
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
        placeholder: {
            type: String,
        },
        rows: {
            type: [String, Number],
        },
        cols: {
            type: [String, Number],
        },
        maxlength: {
            type: [String, Number],
        },
        wrap: {
            type: String,
        },
        resize: {
            type: Boolean,
            default: true,
        },
        resize_x: {
            type: Boolean,
            default: false,
        },
        resize_y: {
            type: Boolean,
            default: true,
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
        root_class: function () {
            const classes: { [key: string]: boolean } = {
                'ik-textarea': true,
                'ik-f-input': true,
                'ik-textarea--no-resize': !this.resize || (!this.resize_x && !this.resize_y),
                'ik-textarea--no-resize-x': this.resize && !this.resize_x,
                'ik-textarea--no-resize-y': this.resize && !this.resize_y,
            };
            if (this.variant) {
                classes['ik-f-input--' + this.variant] = true;
            }
            return classes;
        },
    },
    methods: {
        focus() {
            if (this.textarea_el) {
                this.textarea_el.focus();
            }
        },
        updateValue() {
            if (this.textarea_el) {
                this.$emit('update:modelValue', this.textarea_el.value);
            }
        },
    },
    mounted() {
        if (this.autofocus) {
            setTimeout(this.focus, 0);
        }
    },
    setup() {
        return { textarea_el: ref<HTMLTextAreaElement>() };
    },
});
</script>
