<script lang="ts">
import '@/styles';
import { defineComponent, h } from 'vue';
import { ThemeType, provideTheme } from '@/composables/theme';

export default defineComponent({
    props: {
        tag: {
            type: String,
            default: 'div',
        },
        theme: {
            type: String,
            default: null,
        },
        variant: {
            type: Number,
            default: null,
        },
    },
    setup(props, { slots }) {
        const theme = provideTheme({ type: props.theme as ThemeType, variant: props.variant });

        return () => h(props.tag, { class: theme.css_classes.value }, slots.default?.());
    },
});
</script>
