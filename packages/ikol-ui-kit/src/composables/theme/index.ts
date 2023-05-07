import type { InjectionKey, Ref } from 'vue';
import ColorsLight from './colors/light';
import ColorsDark from './colors/dark';
import { getCurrentInstance, inject, provide, watchEffect, watch, ref } from 'vue';

export enum ThemeType {
    DARK = 'dark',
    LIGHT = 'light',
}

const COLORS_MAP = {
    'light': ColorsLight,
    'dark': ColorsDark,
};

export type ThemeOptions = {
    type?: ThemeType,
    variant?: number | null,
}

export class ThemeColors {
    readonly background_color: string | null = null;
    readonly on_background_color_1: string | null = null;
    readonly on_background_color_2: string | null = null;
    readonly on_background_color_3: string | null = null;
    readonly on_background_color_4: string | null = null;
    readonly on_background_color_5: string | null = null;

    readonly surface_color: string | null = null;
    readonly on_surface_color_1: string | null = null;
    readonly on_surface_color_2: string | null = null;
    readonly on_surface_color_3: string | null = null;
    readonly on_surface_color_4: string | null = null;

    readonly surface_darken_color: string | null = null;
    readonly on_surface_darken_color_1: string | null = null;
    readonly on_surface_darken_color_2: string | null = null;
    readonly on_surface_darken_color_3: string | null = null;
    readonly on_surface_darken_color_4: string | null = null;

    readonly surface_lighten_color: string | null = null;
    readonly on_surface_lighten_color_1: string | null = null;
    readonly on_surface_lighten_color_2: string | null = null;
    readonly on_surface_lighten_color_3: string | null = null;
    readonly on_surface_lighten_color_4: string | null = null;

    readonly border_color_1: string | null = null;
    readonly border_color_2: string | null = null;
    readonly marker_color_1: string | null = null;
    readonly skeleton_color_1: string | null = null;
    readonly skeleton_color_2: string | null = null;

    readonly primary_color: string | null = null;
    readonly primary_color_o1: string | null = null;
    readonly on_primary_color: string | null = null;

    readonly secondary_color: string | null = null;
    readonly secondary_color_alt_1: string | null = null;
    readonly on_secondary_color: string | null = null;
    readonly on_secondary_color_alt_1: string | null = null;

    readonly accent_color: string | null = null;
    readonly accent_color_o1: string | null = null;
    readonly on_accent_color: string | null = null;

    readonly error_color: string | null = null;
    readonly error_color_o1: string | null = null;
    readonly on_error_color: string | null = null;

    readonly success_color: string | null = null;
    readonly success_color_o1: string | null = null;
    readonly on_success_color: string | null = null;

    readonly shadow_color_1: string | null = null;
    readonly shadow_color_2: string | null = null;
    readonly shadow_color_3: string | null = null;

    readonly scrollbar_color: string | null = null;
    readonly scrollbar_track_color: string | null = null;

    readonly tooltip_color: string | null = null;
    readonly on_tooltip_color: string | null = null;

    readonly theme_1_color: string | null = null;
    readonly theme_1_color_o1: string | null = null;
    readonly theme_2_color: string | null = null;
    readonly theme_2_color_o1: string | null = null;
    readonly theme_3_color: string | null = null;
    readonly theme_3_color_o1: string | null = null;
    readonly theme_4_color: string | null = null;
    readonly theme_4_color_o1: string | null = null;
    readonly theme_5_color: string | null = null;
    readonly theme_5_color_o1: string | null = null;
    readonly theme_6_color: string | null = null;
    readonly theme_6_color_o1: string | null = null;
    readonly theme_7_color: string | null = null;
    readonly theme_7_color_o1: string | null = null;
    readonly theme_8_color: string | null = null;
    readonly theme_8_color_o1: string | null = null;
    readonly theme_9_color: string | null = null;
    readonly theme_9_color_o1: string | null = null;

    readonly on_theme_color: string | null = null;

    constructor(colors: ThemeColors) { Object.assign(this, colors); }
}

export interface ThemeInstance {
    readonly type: Ref<ThemeType>,
    readonly css_classes: Ref<{ [key: string]: boolean }>,
    is_dark: Ref<boolean>,
    variant: Ref<number | null>,
    colors: Ref<ThemeColors>,
}

export const THEME_SYMBOL: InjectionKey<ThemeInstance> = Symbol.for('ik-theme');

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
    const colors = ref<ThemeColors>(COLORS_MAP['light']);

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
        colors.value = COLORS_MAP[new_type] || COLORS_MAP['light'];
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
