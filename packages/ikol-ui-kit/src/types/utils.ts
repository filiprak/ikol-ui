import type { App } from 'vue';

export interface VuePlugin {
    install: (app: App) => any
}

export enum UIDesignColor {
    primary = 'primary',
    success = 'success',
    error = 'error',
    accent = 'accent',
    default = 'default',
}
