import { useTheme } from '@ui/composables';
import { createIkolUI } from '@ui/index';
import { App } from 'vue';
import { StoryContext, VueRenderer } from '@storybook/vue3';

export function setupTheme(context: any) {
    const theme = useTheme();

    theme.is_dark.value = context?.globals?.theme === 'dark';

    return theme;
}

export function setupApp(app: App, context?: StoryContext<VueRenderer>) {
    app.use(createIkolUI());
}
