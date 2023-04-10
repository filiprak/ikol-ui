import '@/styles';
import type { App } from 'vue';
import { useGlobalTheme } from '@/composables/theme';
import type { VuePlugin } from './types/utils';

export function createIkolUI(): VuePlugin {
    function install(app: App) {
        const theme = useGlobalTheme();

        theme.is_dark.value = true;
    };

    return {
        install,
    };
}
