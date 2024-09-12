/* eslint-disable @typescript-eslint/naming-convention */
import type { IkDeviceManager } from './composables/device/IkDeviceManager';
import type { IkThemeManager } from './composables/theme/IkThemeManager';

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent;
    export default component;
}
