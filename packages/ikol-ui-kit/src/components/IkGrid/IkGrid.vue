<script setup lang="ts">
import '@/styles';
import './IkGrid.css';
import { defineProps, h, useSlots } from 'vue';
import { useRender } from '@/composables/render';

const props = defineProps({
    tag: {
        type: String,
        default: 'div',
    },
    spacingX: {
        type: [String, Number],
        default: null,
    },
    spacingY: {
        type: [String, Number],
        default: null,
    },
});
const slots = useSlots();
const classes = {
    'ik-grid': true,
    [`ik-grid--spacing-x-${props.spacingX}`]: props.spacingX !== null,
    [`ik-grid--spacing-y-${props.spacingY}`]: props.spacingY !== null,
};

useRender(() => h(
    props.tag,
    { class: classes },
    slots.default?.(),
));
</script>
