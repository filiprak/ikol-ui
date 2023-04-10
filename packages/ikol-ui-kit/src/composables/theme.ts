import { InjectionKey, Ref, getCurrentInstance, inject, provide, watchEffect } from 'vue';
import { watch, ref } from 'vue';

export enum ThemeType {
    DARK = 'dark',
    LIGHT = 'light',
}

export interface ThemeInstance {
    readonly type: Ref<ThemeType>,
    readonly css_classes: Ref<{ [key: string]: boolean }>,
    is_dark: Ref<boolean>,
    variant: Ref<number | null>,
}

export type ThemeOptions = {
    type?: ThemeType,
    variant?: number,
}

export const ThemeSymbol: InjectionKey<ThemeInstance> = Symbol.for('ik-theme')

// function getColorVar(name: string) {
//     let value = getComputedStyle(document.documentElement)
//         .getPropertyValue(name);

//     value = String(value || '')
//         .trim()
//         .replace('#', '');

//     return value || null;
// }

export function provideTheme(options: ThemeOptions) {
    const theme = createTheme(options);

    provide(ThemeSymbol, theme);

    return theme;
}

function createTheme(options?: ThemeOptions): ThemeInstance {
    const type = ref(options?.type || ThemeType.LIGHT);
    const variant = ref<number | null>(options?.variant || null);
    const is_dark = ref(type.value === ThemeType.DARK);
    const css_classes = ref<{ [key: string]: boolean }>({});

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
    };

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

document.addEventListener('click', () => {
    global.is_dark.value = !global.is_dark.value;
});

export function useTheme(): ThemeInstance {
    if (getCurrentInstance()) {
        return inject(ThemeSymbol, global);
    } else {
        return global;
    }
}
