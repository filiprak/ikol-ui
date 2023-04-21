<script lang="ts">
import '@/styles';
import './IkGrid.css';
import { defineComponent, h } from 'vue'

export default defineComponent({
    name: 'IkGridItem',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        xs: {
            type: [String, Number],
            default: null
        },
        sm: {
            type: [String, Number],
            default: null
        },
        md: {
            type: [String, Number],
            default: null
        },
        lg: {
            type: [String, Number],
            default: null
        },
    },
    setup(props, { attrs, slots }) {
        const base_class = 'ik-grid-item'
        const brk_classes = Object
            .keys(attrs)
            .filter(key => key.slice(0, 2) != 'on')
            .map(key => `${base_class}--col-${key}`);

        props.xs && brk_classes.push(`${base_class}--col-xs-${props.xs}`);
        props.sm && brk_classes.push(`${base_class}--col-sm-${props.sm}`);
        props.md && brk_classes.push(`${base_class}--col-md-${props.md}`);
        props.lg && brk_classes.push(`${base_class}--col-lg-${props.lg}`);

        return () => h(
            props.tag,
            {
                class: [
                    base_class,
                    brk_classes,
                ],
            },
            slots.default?.(),
        );
    }
})
</script>
