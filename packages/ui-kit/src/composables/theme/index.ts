import type { InjectionKey } from 'vue';
import { inject, provide } from 'vue';
import type { IkThemeOptions } from './IkThemeManager';
import { IkThemeManager } from './IkThemeManager';
import { getCurrentInstance, logError } from '@ui/utils/core';

export const THEME_SYMBOL: InjectionKey<IkThemeManager> = Symbol.for('ik-theme');

export function createTheme(options: IkThemeOptions = {}): IkThemeManager {
    return new IkThemeManager(options);
}

export function provideTheme(options: IkThemeOptions) {
    const theme = createTheme(options);

    provide(THEME_SYMBOL, theme);

    return theme;
}

export function useTheme(): IkThemeManager {
    let theme;

    if (getCurrentInstance('useTheme')) {
        theme = inject(THEME_SYMBOL);
    }

    if (!theme) {
        logError('Injection "theme" not found');
        theme = createTheme();
    }

    return theme;
}
