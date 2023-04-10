import '@/styles';
import type { App } from 'vue';
import { createTheme } from '@/composables/theme';
import type { VuePlugin } from './types/util';

export function createIkolUI(): VuePlugin {
    function install(app: App) {
        const theme = createTheme();

        theme.install(app);

        app.provide('theme', theme);
    };

    return {
        install,
    };
}
