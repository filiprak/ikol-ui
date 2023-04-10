import type { App } from 'vue';

export interface VuePlugin {
    install: (app: App) => any
}
