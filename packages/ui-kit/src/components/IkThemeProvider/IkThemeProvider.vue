<script lang="ts">
import '@ui/styles';
import { defineComponent, h } from 'vue';
import type { IkThemeType } from '@ui/composables/theme/IkThemeManager';
import { provideTheme } from '@ui/composables/theme';

export default defineComponent({
    name: 'IkThemeProvider',
    props: {
        tag: {
            type: String,
            default: 'div',
        },
        theme: {
            type: String,
        },
        variant: {
            type: [String, Number],
        },
    },
    setup(props, { slots }) {
        const theme = provideTheme({
            type: props.theme as IkThemeType,
            variant: props.variant ? Number(props.variant) : null,
        });

        return () => h(props.tag, { class: ['ik-theme-provider', theme.css_classes.value] }, slots.default?.());
    },
});
</script>
