<template>
    <div :class="root_class"
         :style="chip_style">
        <div class="ik-chip__content"
             :style="chip_content_style">
            <slot></slot>
        </div>
        <div v-if="removable || custom_action"
             class="ik-chip__actions">
            <IkIcon v-if="custom_action"
                    class="ik-chip__action"
                    :size_px="icon_size"
                    :icon="custom_action"
                    :style="custom_icon_style"
                    circle
                    @click.stop="$emit('ik-custom-click')"
                    @mousedown.stop
                    @mouseenter="custom_hover = true"
                    @mouseleave="custom_hover = false" />
            <IkIcon v-if="removable"
                    class="ik-chip__action"
                    :size_px="icon_size"
                    icon="times:light"
                    :style="remove_icon_style"
                    circle
                    @click.stop="$emit('ik-remove')"
                    @mousedown.stop
                    @mouseenter="remove_hover = true"
                    @mouseleave="remove_hover = false" />
        </div>
    </div>
</template>
<script setup lang="ts">
import '@ui/styles';
import './IkChip.css';
import { IkIcon } from '@ui/components/IkIcon';
import { ref, computed, type PropType } from 'vue';
import { useTheme } from '@ui/composables/theme';
import { getTextColorForBackground } from '@ui/utils/helpers';
import type { IkUIDesignColor } from '@ui/types/utils';

const custom_hover = ref(false);
const remove_hover = ref(false);

const theme = useTheme();

const design_colors: Record<`${IkUIDesignColor}`, string | null> = {
    primary: theme.colors.value.primary_color,
    accent: theme.colors.value.accent_color,
    error: theme.colors.value.error_color,
    success: theme.colors.value.success_color,
    default: theme.colors.value.on_surface_color_3,
};

const props = defineProps({
    /**
    * Color theme variant. Possible values are `"accent", "error", "success", "primary", "default"`.
    * @instance
    * @type String
    * @default undefined
    */
    design: {
        type: String as PropType<`${IkUIDesignColor}`>,
    },
    /**
     * Whether to append remove button at the end of chip content.
     * @instance
     * @type Boolean
     * @default false
     */
    removable: {
        type: Boolean,
        default: false,
    },
    /**
     * Whether component should not accept mouse events.
     * @instance
     * @type Boolean
     * @default false
     */
    disabled: {
        type: Boolean,
        default: false,
    },
    /**
     * Adds custom action to chip, string represents icon name that will be displayed.
     * @instance
     * @type String
     * @default undefined
     */
    custom_action: {
        type: String,
    },
    /**
     * Chip size. Possible values are: "sm", "md".
     * @instance
     * @type String
     * @default 'md'
     */
    size: {
        type: String,
        default: 'md',
    },
    /**
     * Chip backgorund color.
     * @instance
     * @type String
     * @default undefined
     */
    color: {
        type: String,
    },
});

if (props.design && props.color) {
    // eslint-disable-next-line no-console
    console.error('Props design and color should not be used together');
}

function _getIconStyle(is_hovering: boolean) {
    const style = {
        backgroundColor: '',
        color: '',
    };
    if (props.design && props.design !== 'default') {
        const design_color = '#' + design_colors[props.design];

        if (is_hovering) {
            style.backgroundColor = '#' + getTextColorForBackground(design_color);
            style.color = design_color;
        } else {
            style.backgroundColor = design_color;
            style.color = '#' + getTextColorForBackground(design_color);
        }
    } else {
        if (is_hovering) {
            style.backgroundColor = props.color ? '#' + getTextColorForBackground(props.color) : 'var(--on-surface-darken-color-3)';
            style.color = props.color ? '#' + props.color : 'var(--surface-darken-color)';
        } else {
            style.backgroundColor = props.color ? '#' + props.color : 'var(--surface-darken-color)';
            style.color = props.color ? '#' + getTextColorForBackground(props.color) : 'var(--on-surface-darken-color-3)';
        }
    }

    return style;
};

const root_class = computed(() => {
    const classes = ['ik-chip'];

    if (props.removable) {
        classes.push('ik-chip--removable');
    }
    if (props.disabled) {
        classes.push('ik-chip--disabled');
    }
    if (props.design) {
        classes.push('ik-chip--' + props.design);
    }
    if (props.size) {
        classes.push('ik-chip--size-' + props.size);
    }

    return classes;
});

const chip_style = computed(() => {
    return props.color
        ? {
            backgroundColor: '#' + props.color,
            color: '#' + getTextColorForBackground(props.color),
        }
        : {};
});

const custom_icon_style = computed(() => {
    return _getIconStyle(custom_hover.value);
});

const remove_icon_style = computed(() => {
    return _getIconStyle(remove_hover.value);
});

const chip_content_style = computed(() => {
    if (props.size === 'sm') {
        return {
            padding: props.removable || props.custom_action ? '4px 0 4px 8px' : '4px 8px',
        };
    } else {
        return {
            padding: props.removable || props.custom_action ? '4px 0 4px 16px' : '4px 16px',
        };
    }
});

const icon_size = computed(() => {
    return props.size == 'sm' ? 16 : 20;
});

</script>
