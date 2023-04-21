<script lang="ts">
import '@/styles';
import './IkGrid.css';
import { defineComponent, h } from 'vue';

export default defineComponent({
    name: 'IkGrid',
    props: {
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
    },
    setup(props, { slots }) {
        const classes = {
            'ik-grid': true,
            [`ik-grid--spacing-x-${props.spacingX}`]: props.spacingX !== null,
            [`ik-grid--spacing-y-${props.spacingY}`]: props.spacingY !== null,
        };

        return () => h(
            props.tag,
            { class: classes },
            slots.default?.(),
        );
    },
});
</script>
