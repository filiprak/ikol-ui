import '@/styles';
import type { App } from 'vue';
import type { VuePlugin } from './types/utils';

export function createIkolUI(): VuePlugin {
    function install(app: App) {

    };

    return {
        install,
    };
}
