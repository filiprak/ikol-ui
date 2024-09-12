import '@ui/styles';
import type { App } from 'vue';
import type { IkLocaleSettings } from '@ui/classes/locale/settings';
import { updateLocaleSettings } from '@ui/classes/locale/settings';
import { DEVICE_SYMBOL, createDevice } from '@ui/composables/device';
import { THEME_SYMBOL, createTheme } from '@ui/composables/theme';
import { ROUTER_SYMBOL } from '@ui/composables/router';
import type { IkRouterManager } from '@ui/composables/router/IkRouterManager';

interface IkUiConfig {
    locale?: Partial<IkLocaleSettings>,
    router?: IkRouterManager,
}

class IkUIApp {
    private config: IkUiConfig;

    constructor(config: IkUiConfig = {}) {
        this.config = config;
    }

    getRouter() {
        return this.config.router;
    }
}

let _app: IkUIApp;

export function getIkolUIApp() {
    if (!_app) {
        throw new Error('IKOL UI app must be initialized before using.');
    }
    return _app;
}

export function createIkolUI(config?: IkUiConfig) {
    function install(app: App) {
        app.provide(THEME_SYMBOL, createTheme());
        app.provide(DEVICE_SYMBOL, createDevice());

        if (config?.router) {
            app.use(config.router);
            app.provide(ROUTER_SYMBOL, config.router);
        }

        if (config?.locale) {
            updateLocaleSettings(config.locale);
        }
        _app = new IkUIApp(config);
    };

    return {
        install,
    };
}
