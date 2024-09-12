import { watch, ref } from 'vue';
import type { Ref } from 'vue';
import type { IkThemeColors } from './colors/base';
import ColorsLight from './colors/light';
import ColorsDark from './colors/dark';
import { useHead } from '@ui/composables/head';

export enum IkThemeType {
    DARK = 'dark',
    LIGHT = 'light',
}

export const COLORS_MAP: { [k: string]: IkThemeColors } = {
    light: ColorsLight,
    dark: ColorsDark,
};

export type IkThemeOptions = {
    type?: IkThemeType,
    variant?: number | null,
}

export class IkThemeManager {
    public type: Ref<IkThemeType> = ref(IkThemeType.LIGHT);
    public variant: Ref<number | null> = ref(null);
    public is_dark: Ref<boolean> = ref(false);
    public css_classes: Ref<{ [key: string]: boolean }> = ref({});
    public colors: Ref<IkThemeColors> = ref(COLORS_MAP.light);

    constructor(options: IkThemeOptions = {}) {
        this.type.value = options.type || IkThemeType.LIGHT;
        this.variant.value = options.variant || null;
        this.is_dark.value = this.type.value === IkThemeType.DARK;

        useHead({
            htmlAttrs: { class: this.css_classes },
            styles: {
                'ik-colors': ref({ css: this.generateCssVariables() }),
            },
        });
        watch(this.is_dark, (dark) => {
            this.updateType(dark ? IkThemeType.DARK : IkThemeType.LIGHT);
        });
        watch(this.variant, () => {
            this.updateType();
        });

        this.updateType();
    }

    public static jsColorToCssValue(color: string) {
        return ['rgb', 'hsl'].indexOf(color.slice(0, 3)) < 0 ? `#${color}` : color;
    }

    public static jsColorToCssVar(name: string) {
        return `--${name.replace(/_/g, '-')}`;
    }

    public isCombinedColor(color: string) {
        return this.colors.value.hasOwnProperty(`combined_${color.toUpperCase()}_text`);
    }

    public getCombinedColor(color: string, combination: 'text' | 'bckg'): string | undefined {
        return this.colors.value[`combined_${color.toUpperCase()}_${combination}` as keyof IkThemeColors] || undefined;
    }

    private updateType(new_type?: IkThemeType) {
        new_type = new_type || this.type.value;

        const classes = {
            'ik-theme': true,
            [['ik-theme--', new_type].join('')]: true,
        };

        if (this.variant.value) {
            classes[['ik-theme--', this.variant.value].join('')] = true;
        }

        this.css_classes.value = classes;
        this.type.value = new_type;
        this.colors.value = COLORS_MAP[new_type] || COLORS_MAP.light;
    }

    private generateCssVariables() {
        let css = '';
        const variants = [];

        for (const type in COLORS_MAP) {
            const map = COLORS_MAP[type];

            if (type === 'light') {
                css += ':root,\n';
            }
            css += `.ik-theme--${type}:root,\n`;
            css += `.ik-theme--${type} {\n`;

            for (const name in map) {
                const css_name = IkThemeManager.jsColorToCssVar(name);
                const css_value = IkThemeManager.jsColorToCssValue((map as any)[name] || ''); // eslint-disable-line @typescript-eslint/no-explicit-any

                css += `    ${css_name}: ${css_value};` + '\n';
            }

            css += '}\n';
        }

        for (const name in COLORS_MAP.light) {
            const m = name.match(/^theme_(\d+)_color$/);
            if (m) {
                variants.push(m[1]);
            }
        }

        for (const i in variants) {
            const variant = variants[i];
            css += `.ik-theme--${variant}:root,\n`;
            css += `.ik-theme--${variant} {\n`;
            css += `    --primary-color: var(--theme-${variant}-color);\n`;
            css += '    --on-primary-color: var(--on-theme-color);\n';
            css += `    --primary-color-o1: var(--theme-${variant}-color-o1);\n`;
            css += '}\n';
        }

        return css;
    }
}
