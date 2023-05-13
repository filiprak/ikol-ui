import type { InjectionKey } from 'vue';
import { getCurrentInstance, inject, provide } from 'vue';
import type { ThemeOptions } from './ThemeManager';
import { ThemeManager } from './ThemeManager';

export const THEME_SYMBOL: InjectionKey<ThemeManager> = Symbol.for('ik-theme');

const global = new ThemeManager();

export function provideTheme(options: ThemeOptions) {
    const theme = new ThemeManager(options);

    provide(THEME_SYMBOL, theme);

    return theme;
}

export function useTheme(): ThemeManager {
    if (getCurrentInstance()) {
        return inject(THEME_SYMBOL, global);
    } else {
        return global;
    }
}
