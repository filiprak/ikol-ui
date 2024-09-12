<template>
    <div class="ik-form-submit">
        <slot>
            <div>
                <IkButton round
                          flat
                          design="default"
                          :size="size"
                          @click="onCancel">
                    <slot name="cancel-label">
                        [[_*en*Cancel_]]
                    </slot>
                </IkButton>
                <IkButton v-if="show_reset"
                          round
                          flat
                          design="default"
                          :size="size"
                          @click="onReset">
                    <slot name="reset-label">
                        [[_*en*Reset_]]
                    </slot>
                </IkButton>
            </div>
            <IkButton type="submit"
                      filled
                      :circle="circle_submit"
                      :round="round_submit"
                      :form="form"
                      :loading="loading"
                      :disabled="disabled"
                      :icon="submit_icon"
                      :size="size"
                      :design="design"
                      class="ik-form-submit__icon"
                      @click="onSubmit">
                <slot name="submit-label"></slot>
            </IkButton>
        </slot>
    </div>
</template>

<script lang="ts">
import './IkFormSubmit.css';
import type { PropType, SetupContext } from 'vue';
import { defineComponent, computed } from 'vue';
import { IkButton } from '@ui/components/IkButton';
import type { IkUIDesignColor } from '@ui/types/utils';

export default defineComponent({
    name: 'IkFormSubmit',
    components: {
        IkButton,
    },
    props: {
        form: {
            type: String,
            default: undefined,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'lg',
        },
        design: {
            type: String as PropType<IkUIDesignColor>,
            default: 'success',
        },
        submit_icon: {
            type: [String] as PropType<string | undefined>,
            default: 'check:light',
        },
        show_reset: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit, slots }: SetupContext) {
        const circle_submit = computed(() => !slots['submit-label']);
        const round_submit = computed(() => !!slots['submit-label']);

        function onCancel() {
            emit('ik-cancel');
        }

        function onReset() {
            emit('ik-reset');
        }

        function onSubmit() {
            emit('ik-submit');
        }

        return {
            onCancel,
            onReset,
            onSubmit,
            circle_submit,
            round_submit,
        };
    },
});
</script>
