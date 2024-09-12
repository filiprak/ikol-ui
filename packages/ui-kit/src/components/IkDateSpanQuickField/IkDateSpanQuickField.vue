<template>
    <IkFormField ref="field"
                 class="ik-date-span-quick-field"
                 :errors="filtered_errors"
                 v-bind="$props">
        <IkFormFieldViewMode v-if="computed_view_mode">
            <div class="ik-flat-form-control form-control">
                <span v-if="preview">{{ preview }}</span>
                <span v-else
                      class="ik-on-background-color-4">[[_*en*Not set_]]</span>
            </div>
        </IkFormFieldViewMode>
        <template v-else>
            <IkButtonGroup separate>
                <IkButton v-for="button in buttons"
                          :key="button.name"
                          :active="(active_button == button.name && !is_custom_date)"
                          :design="(active_button == button.name && !is_custom_date) ? 'primary' : 'default'"
                          outline
                          @click="_onQuickButtonClick(button)">
                    {{ button.label }}
                </IkButton>
                <IkButton :active="is_custom_date"
                          :design="is_custom_date ? 'primary' : 'default'"
                          outline
                          @click="_toggleCustomInputs">
                    [[_*en*Custom_]]
                </IkButton>
            </IkButtonGroup>
            <IkGrid v-if="is_custom_date"
                    class="ik-mt-2"
                    spacing_x="0"
                    spacing_y="2">
                <IkGridItem xs="2"
                            class="ik-pt-2">
                    <IkIcon design="default"
                            icon="clock:light"
                            size="2" />
                </IkGridItem>
                <IkGridItem xs="1"
                            class="ik-date-span-quick-field__label">
                    [[_*en*Start_]]
                </IkGridItem>
                <IkGridItem xs="9">
                    <IkDate variant="outline"
                            full_width
                            :model-value="modelValue!.start"
                            @update:modelValue="_onStartInput" />
                </IkGridItem>
                <IkGridItem xs="2"></IkGridItem>
                <IkGridItem xs="1"
                            class="ik-date-span-quick-field__label">
                    [[_*en*End_]]
                </IkGridItem>
                <IkGridItem xs="9">
                    <IkDate variant="outline"
                            full_width
                            :model-value="modelValue!.end"
                            @update:modelValue="_onEndInput" />
                </IkGridItem>
            </IkGrid>
        </template>
    </IkFormField>
</template>
<script setup lang="ts">
import '@ui/styles';
import './IkDateSpanQuickField.css';
import type { IkFieldProps } from '@ui/composables/form';
import { IkFormField, IkFormFieldViewMode } from '@ui/components/IkForm';

import { computed, onMounted, ref, watch } from 'vue';
import type { IkTime } from '@ui/classes/dates/IkTime';
import { type IkTimeQuickOptions, time } from '@ui/classes/dates';
import { useFormField, getFieldPropDefaults } from '@ui/composables/form';

import { IkIcon } from '../IkIcon';
import { IkDate } from '../IkDate';
import { IkButton } from '../IkButton';
import { IkGrid, IkGridItem } from '../IkGrid';
import { IkButtonGroup } from '../IkButtonGroup';

interface IkValueT {
    start: IkTime | null;
    end: IkTime | null;
}

interface IkDateSpanButton {
    name: IkTimeQuickOptions;
    label: string;
}

const props = withDefaults(
    defineProps<IkFieldProps & {
        modelValue?: IkValueT;
        quick_options?: IkTimeQuickOptions[];
    }>(),
    {
        ...getFieldPropDefaults(),
        quick_options: () => ['today', 'yesterday', 'last_week'],
    }
);

defineOptions({
    inheritAttrs: false,
});

const emit = defineEmits<{
    (e: 'update:modelValue', value?: IkValueT): void,
}>();

const field = ref<IkFormField>();
const {
    filtered_errors,
    computed_variant,
    computed_skeleton,
    computed_view_mode,
    emitVModel,
    ...methods

} = useFormField({
    field,
    props,
});

const is_custom_date = ref(false);
const active_button = ref<string | null>(null);
const user_custom_changed = ref(false);

const quick_actions = computed(() => {
    return time.quickDatespans();
});

const buttons = computed(() => {
    return props.quick_options.map(option => ({
        name: option,
        label: quick_actions.value[option]!.label,
    }));
});

const preview = computed(() => {
    let start = props.modelValue?.start;
    let end = props.modelValue?.end;

    if (start && end) {
        start = start.clone().local();
        end = end.clone().local();

        if (start.isSame(end, 'day')) {
            return start.format('![dddd, D MMMM YYYY]');
        } else {
            return [
                start.format('![ddd, D MMM YYYY]'),
                ' - ',
                end.format('![ddd, D MMM YYYY]'),
            ].join('');
        }
    } else {
        return '';
    }
});

const _onStartInput = (date: IkTime) => {
    if (!props.modelValue) return;

    user_custom_changed.value = true;

    const new_end = date.clone().add(1, 'day').endOf('day');

    if (props.modelValue.end == null || date.isSameOrBefore(props.modelValue.end)) {
        emitVModel({ start: date.startOf('day') || null, end: props.modelValue.end || null });
    } else {
        emitVModel({ start: date.startOf('day') || null, end: new_end || null });
    }
};

const _onEndInput = (date: IkTime) => {
    if (!props.modelValue) return;

    user_custom_changed.value = true;

    const new_start = date.clone().subtract(1, 'day').startOf('day');

    if (props.modelValue.start == null || date.isSameOrAfter(props.modelValue.start)) {
        emitVModel({ start: props.modelValue.start || null, end: date?.endOf('day') || null });
    } else {
        emitVModel({ start: new_start || null, end: date?.endOf('day') || null });
    }
};

const _onQuickButtonClick = (option: IkDateSpanButton) => {
    is_custom_date.value = false;
    active_button.value = option.name;
    /**
     * Event contains object with dateframes in following format. { start: {IkTime}, end: {IkTime} }
     * @event IkDateSpanQuickField#modelValue
     * @type {IkValueT}
     */
    emitVModel({
        ...quick_actions.value[option.name]?.value,
    });
};

const _toggleCustomInputs = () => {
    is_custom_date.value = true;
    active_button.value = null;
};

const _detectActive = () => {
    if (props.modelValue) {
        let matched = '';

        for (const name in quick_actions.value) {
            const action = quick_actions.value[name as IkTimeQuickOptions]!;

            if (
                props.modelValue.start?.isSame(action.value.start, 'second') &&
                props.modelValue.end?.isSame(action.value.end, 'second')
            ) {
                matched = name;
                break;
            }
        }

        if (matched) {
            active_button.value = matched;
            is_custom_date.value = false;
        } else {
            active_button.value = null;
            is_custom_date.value = true;
        }
    } else {
        active_button.value = null;
        is_custom_date.value = false;
    }
};

onMounted(() => {
    _detectActive();
});

watch(() => props.modelValue, () => {
    if (!user_custom_changed.value) {
        _detectActive();
    } else {
        user_custom_changed.value = false;
    }
});

defineExpose({
    ...methods,
    focus,
});
</script>
