<script setup lang="ts">
import '@/styles';
import './IkGrid.css';
import { computed, defineProps, h, useAttrs, useSlots } from 'vue';
import { useRender } from '@/composables/render';

const props = defineProps({
    tag: {
        type: String,
        default: 'div',
    },
    xs: {
        type: [String, Number],
        default: null,
    },
    sm: {
        type: [String, Number],
        default: null,
    },
    md: {
        type: [String, Number],
        default: null,
    },
    lg: {
        type: [String, Number],
        default: null,
    },
})
const slots = useSlots();
const attrs = useAttrs();

const classes = computed(() => {
    const base_class = 'ik-grid-item';
    const brk_classes = Object
        .keys(attrs)
        .filter(key => key.slice(0, 2) !== 'on')
        .map(key => `${base_class}--col-${key}`);

    props.xs && brk_classes.push(`${base_class}--col-xs-${props.xs}`);
    props.sm && brk_classes.push(`${base_class}--col-sm-${props.sm}`);
    props.md && brk_classes.push(`${base_class}--col-md-${props.md}`);
    props.lg && brk_classes.push(`${base_class}--col-lg-${props.lg}`);

    return [base_class, brk_classes];
});

useRender(() => h(
    props.tag,
    { class: classes.value },
    slots.default?.(),
));
</script>
