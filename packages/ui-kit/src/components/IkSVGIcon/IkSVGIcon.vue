<script setup lang="ts">
import '@ui/styles';
import './IkSVGIcon.css';

import { computed, ref, useAttrs, h, type PropType, watch, onMounted } from 'vue';
import { useTheme } from '@ui/composables/theme';
import { clamp, getTextColorForBackground, toCssUnits } from '@ui/utils/helpers';
import { useRender } from '@ui/composables/render';
import { fetchSvgText } from './loader';
import type { IkUIDesignColor } from '@ui/types/utils';

const props = defineProps({
    src: {
        type: String,
    },
    size_px: {
        type: Number,
        default: 28,
    },
    inner_scale: {
        type: Number,
        default: 0.6,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    circle: {
        type: Boolean,
        default: false,
    },
    design: {
        type: String as PropType<`${IkUIDesignColor}`>,
        default: 'default',
    },
    variant: {
        type: String,
    },
    color: {
        type: String,
    },
});

const icon = ref<HTMLDivElement | null>(null);
const attrs = useAttrs();
const theme = useTheme();

const is_filled = computed(() => {
    return props.variant === 'filled';
});

const bg_color = computed(() => {
    if (props.color) {
        return is_filled.value ? ('#' + props.color) : ('#' + props.color + '1A');
    } else {
        return null;
    }
});

const stroke = computed(() => {
    if (props.color) {
        if (is_filled.value) {
            return getTextColorForBackground(props.color);
        } else {
            return props.color;
        }
    }

    const colors = is_filled.value ? filled_circle_variant_colors : design_colors;
    return colors[props.design] || null;
});

const design_colors: Record<`${IkUIDesignColor}`, string | null> = {
    primary: theme.colors.value.primary_color,
    accent: theme.colors.value.accent_color,
    error: theme.colors.value.error_color,
    success: theme.colors.value.success_color,
    default: theme.colors.value.on_surface_color_3,
};

const filled_circle_variant_colors: Record<`${IkUIDesignColor}`, string | null> = {
    primary: theme.colors.value.on_primary_color,
    accent: theme.colors.value.on_accent_color,
    error: theme.colors.value.on_error_color,
    success: theme.colors.value.on_success_color,
    default: theme.colors.value.on_surface_color_3,
};

function onLoad(svg_string: string) {
    renderSvg(svg_string);
}

function renderSvg(svg_string: string) {
    if (icon.value) {
        icon.value.innerHTML = '';
        icon.value.insertAdjacentHTML('afterbegin', svg_string);

        const nodes = icon.value.firstElementChild ? getNodes(icon.value.firstElementChild) : [];

        nodes.forEach(node => {
            if (
                node.hasAttribute('fill') &&
                node.getAttribute('fill') !== '' &&
                node.getAttribute('fill') !== 'none' &&
                stroke.value
            ) {
                node.setAttribute('fill', `#${stroke.value}`);
            }
            if (
                node.hasAttribute('stroke') &&
                node.getAttribute('stroke') !== '' &&
                node.getAttribute('stroke') !== 'none' &&
                stroke.value
            ) {
                node.setAttribute('stroke', `#${stroke.value}`);
            }
        });
        const svg = icon.value.firstElementChild;

        if (props.circle || is_filled.value) {
            svg?.setAttribute('width', (100 * clamp(props.inner_scale, 0, 1)) + '%');
            svg?.setAttribute('height', (100 * clamp(props.inner_scale, 0, 1)) + '%');
        } else {
            svg?.setAttribute('width', '100%');
            svg?.setAttribute('height', '100%');
        }

        if (props.circle) {
            svg?.setAttribute('aspect-ratio', '1');
        }
    }
}

function getNodes(node: Element): Element[] {
    const nodes: Element[] = [];
    if (node.nodeType === Node.ELEMENT_NODE) {
        nodes.push(node);
        const len = node.children.length;
        for (let i = 0; i < len; i++) {
            nodes.push(...getNodes(node.children[i]));
        }
    }
    return nodes;
}

function load() {
    if (props.src) {
        fetchSvgText(props.src)
            .then(onLoad);
    }
}

onMounted(() => {
    load();
});

watch(() => props.src, () => {
    load();
});

watch(() => props.circle, () => {
    load();
});

watch(is_filled, () => {
    load();
});

watch(stroke, () => {
    load();
});

useRender(() => {
    return h('div', {
        class: {
            'ik-svg-icon': true,
            'ik-svg-icon--circle': props.circle,
            'ik-svg-icon--clickable': !props.disabled && !!attrs.onClick,
            'ik-svg-icon--disabled': props.disabled,
            ['ik-svg-icon--' + props.design]: !!props.design,
            ['ik-svg-icon--' + props.variant]: !!props.variant,
        },
        ref: icon,
        style: {
            width: toCssUnits(props.size_px, 'px'),
            height: toCssUnits(props.size_px, 'px'),
            backgroundColor: bg_color.value,
        },
    });
});
</script>
