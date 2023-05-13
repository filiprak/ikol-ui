<script lang="ts">
import '@/styles';
import { defineComponent, h } from 'vue';
import type { ThemeType } from '@/composables/theme/ThemeManager';
import { provideTheme } from '@/composables/theme';

export default defineComponent({
    name: 'IkThemeProvider',
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
            type: [String, Number],
            default: null,
        },
    },
    setup(props, { slots }) {
        const theme = provideTheme({
            type: props.theme as ThemeType,
            variant: props.variant ? Number(props.variant) : null,
        });

        return () => h(props.tag, { class: ['ik-theme-provider', theme.css_classes.value] }, slots.default?.());
    },
});
</script>
