import type { InjectionKey, Ref } from 'vue';
import { getCurrentInstance, inject, provide, watchEffect, watch, ref } from 'vue';

export enum ThemeType {
    DARK = 'dark',
    LIGHT = 'light',
}

export type ThemeOptions = {
    type?: ThemeType,
    variant?: number | null,
}

class ThemeColors {
    primary: string | null = null;
    accent: string | null = null;
    success: string | null = null;
    error: string | null = null;

    background: string | null = null;
    on_background_1: string | null = null;
    on_background_2: string | null = null;
    on_background_3: string | null = null;

    border_1: string | null = null;

    theme_1: string | null = null;
    theme_2: string | null = null;
    theme_3: string | null = null;
    theme_4: string | null = null;
    theme_5: string | null = null;
    theme_6: string | null = null;
    theme_7: string | null = null;
    theme_8: string | null = null;
    theme_9: string | null = null;
}

export interface ThemeInstance {
    readonly type: Ref<ThemeType>,
    readonly css_classes: Ref<{ [key: string]: boolean }>,
    is_dark: Ref<boolean>,
    variant: Ref<number | null>,
    colors: Ref<ThemeColors>,
}

export const THEME_SYMBOL: InjectionKey<ThemeInstance> = Symbol.for('ik-theme');

function loadCssColors(variables: ThemeColors, options?: ThemeOptions): ThemeColors {
    const result = new ThemeColors();
    const el = document.createElement('div');

    el.classList.add('ik-theme');
    el.style.display = 'none';

    options?.type && el.classList.add('ik-theme--' + options.type);
    options?.variant && el.classList.add('ik-theme--' + options.variant);

    document.body.appendChild(el);

    for (const name in variables) {
        const var_name = (variables as any)[name];

        if (var_name) {
            const value = getComputedStyle(el).getPropertyValue((variables as any)[name]);

            if (result.hasOwnProperty(name)) {
                (result as any)[name] = String(value || '')
                    .trim()
                    .replace('#', '') || null;
            }
        }
    }

    el.remove();

    return result;
}

export function provideTheme(options: ThemeOptions) {
    const theme = createTheme(options);

    provide(THEME_SYMBOL, theme);

    return theme;
}

function createTheme(options?: ThemeOptions): ThemeInstance {
    const type = ref(options?.type || ThemeType.LIGHT);
    const variant = ref<number | null>(options?.variant || null);
    const is_dark = ref(type.value === ThemeType.DARK);
    const css_classes = ref<{ [key: string]: boolean }>({});
    const colors = ref<ThemeColors>(new ThemeColors());

    function updateType(new_type?: ThemeType) {
        new_type = new_type || type.value;

        const classes = {
            'ik-theme': true,
            [['ik-theme--', new_type].join('')]: true,
        };

        if (variant.value) {
            classes[['ik-theme--', variant.value].join('')] = true;
        }

        css_classes.value = classes;
        type.value = new_type;

        colors.value = loadCssColors({
            primary: '--primary-color',
            accent: '--accent-color',
            success: '--success-color',
            error: '--error-color',

            background: '--background-color',
            on_background_1: '--background-color-1',
            on_background_2: '--background-color-2',
            on_background_3: '--background-color-3',

            border_1: '--border-color-1',

            theme_1: '--theme-1-color',
            theme_2: '--theme-2-color',
            theme_3: '--theme-3-color',
            theme_4: '--theme-4-color',
            theme_5: '--theme-5-color',
            theme_6: '--theme-6-color',
            theme_7: '--theme-7-color',
            theme_8: '--theme-8-color',
            theme_9: '--theme-9-color',

        }, { type: new_type, variant: variant.value });
    }

    watch(is_dark, (dark) => {
        updateType(dark ? ThemeType.DARK : ThemeType.LIGHT);
    });
    watch(variant, () => {
        updateType();
    });
    updateType(type.value);

    return {
        type,
        is_dark,
        variant,
        colors,
        css_classes,
    };
}

const global = createTheme();

watchEffect(() => {
    const el = document.documentElement;

    [...el.classList].forEach(class_name => {
        if (class_name.startsWith('ik-theme')) {
            el.classList.remove(class_name);
        }
    });

    for (const class_name in global.css_classes.value) {
        if (global.css_classes.value[class_name]) {
            el.classList.add(class_name);
        }
    }
});

export function useTheme(): ThemeInstance {
    if (getCurrentInstance()) {
        return inject(THEME_SYMBOL, global);
    } else {
        return global;
    }
}
