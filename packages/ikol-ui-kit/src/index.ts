import '@/styles';
import type { App } from 'vue';
import { useTheme } from '@/composables/theme';
import type { VuePlugin } from './types/utils';

export function createIkolUI(): VuePlugin {
    function install(app: App) {
        const theme = useTheme();

        theme.is_dark.value = true;
    };

    return {
        install,
    };
}
