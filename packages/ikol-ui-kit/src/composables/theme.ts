import type { App, Ref } from 'vue';
import { watch, ref } from 'vue';

import type { VuePlugin } from '../types/util';

export enum ThemeType {
    DARK = 'dark',
    LIGHT = 'light',
}

export interface ThemeInstance {
    readonly theme: Ref<ThemeType>,
    is_dark: Ref<boolean>,
    variant: Ref<number | null>,
}

// function getColorVar(name: string) {
//     let value = getComputedStyle(document.documentElement)
//         .getPropertyValue(name);

//     value = String(value || '')
//         .trim()
//         .replace('#', '');

//     return value || null;
// }

export function createTheme(): ThemeInstance & VuePlugin {
    const theme = ref(ThemeType.LIGHT);
    const variant = ref<number | null>(null);
    const is_dark = ref(theme.value === ThemeType.DARK);

    function updateDOM(type?: ThemeType) {
        type = type || theme.value;

        const classes = [
            'ik-theme',
            ['ik-theme--', type].join(''),
        ];
        if (variant.value) {
            classes.push(['ik-theme--', variant.value].join(''));
        }
        document.documentElement.className = classes.join(' ');

        theme.value = type;
    };

    function install(app: App) {
        watch(is_dark, (dark) => {
            updateDOM(dark ? ThemeType.DARK : ThemeType.LIGHT);
        });
        watch(variant, () => {
            updateDOM();
        });
        updateDOM(theme.value);
    };

    return {
        install,
        theme,
        is_dark,
        variant,
    };
}
