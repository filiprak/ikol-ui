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
        const staticClass = 'ik-grid-item'

        const classes = Object
            .keys(attrs)
            .filter((key) => {
                console.log(key, attrs[key])
                if (key === 'slot') {
                    return false;
                }
                const value = attrs[key];
                if (key.slice(0, 5) == 'data-') {
                    return false;
                }
                return value || typeof value === 'string';
            })
            .map((key) => {
                return `${staticClass}--col-${key}`;
            });

        props.xs && classes.push(`${staticClass}--col-xs-${props.xs}`);
        props.sm && classes.push(`${staticClass}--col-sm-${props.sm}`);
        props.md && classes.push(`${staticClass}--col-md-${props.md}`);
        props.lg && classes.push(`${staticClass}--col-lg-${props.lg}`);

        return () => h(
            props.tag,
            {
                attrs: {
                    ...attrs,
                    class: `${staticClass} ${classes.join(' ')}`
                },
            },
            slots.default?.(),
        );
    }
})
</script>
