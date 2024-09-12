<script setup lang="ts">
import '@ui/styles';
import './IkGrid.css';
import { h, useSlots, computed, watch } from 'vue';
import { useRender } from '@ui/composables/render';

const props = defineProps({
    tag: {
        type: String,
        default: 'div',
    },
    spacing_x: {
        type: [String, Number],
    },
    spacing_y: {
        type: [String, Number],
    },
    relative: {
        type: Boolean,
        default: false,
    },
    sm: {
        type: [String, Number],
    },
    md: {
        type: [String, Number],
    },
    lg: {
        type: [String, Number],
    },
});
const slots = useSlots();
const classes = {
    'ik-grid': true,
    'ik-grid--relative': props.relative,
    [`ik-grid--spacing-x-${props.spacing_x}`]: props.spacing_x !== undefined,
    [`ik-grid--spacing-y-${props.spacing_y}`]: props.spacing_y !== undefined,
};
const breakpoints = computed(() => ({
    sm: props.sm,
    md: props.md,
    lg: props.lg,
}));
const breakpoints_hash = computed(() => {
    const bps = breakpoints.value;
    let hash = '';

    if (bps.sm !== undefined) {
        hash += `sm${bps.sm}`;
    }
    if (bps.md !== undefined) {
        hash += `md${bps.md}`;
    }
    if (bps.lg !== undefined) {
        hash += `lg${bps.lg}`;
    }
    return hash || null;
});

function insertBreakpointsCss(hash: string, bps: Record<string, string | number | undefined>) {
    let style = document.querySelector(`style[data-ik-grid-${hash}]`);

    if (!style) {
        const css = Object.keys(bps).map((bp) => {
            let inner_css = '';

            if (bps[bp] !== undefined) {
                for (let i = 0; i < 12; i++) {
                    inner_css += `.ik-grid--relative .ik-grid-item--col-${bp}-${i + 1} { grid-column: auto/span ${i + 1} }\n`;
                }

                return `@container ${hash} (min-width: ${bps[bp]}px) {\n${inner_css}\n}`;
            } else {
                return '';
            }
        }).join('\n');

        style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.setAttribute(`data-ik-grid-${hash}`, '');
        style.textContent = css;
        document.head.appendChild(style);
    }
}

watch(breakpoints, (bps) => {
    if (breakpoints_hash.value && props.relative) {
        // generate css
        insertBreakpointsCss(breakpoints_hash.value, bps);
    }
}, { deep: true, immediate: true });

useRender(() => h(
    props.tag,
    { class: classes, style: { containerName: props.relative ? breakpoints_hash.value : null } },
    slots.default?.(),
));
</script>
