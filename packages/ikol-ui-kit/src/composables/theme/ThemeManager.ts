import { watch, ref } from 'vue';
import type { Ref } from 'vue';
import type { ThemeColors } from './colors/base';
import ColorsLight from './colors/light';
import ColorsDark from './colors/dark';
import { useHead } from '@/composables/head';

export enum ThemeType {
    DARK = 'dark',
    LIGHT = 'light',
}

const COLORS_MAP: { [k: string]: ThemeColors } = {
    light: ColorsLight,
    dark: ColorsDark,
};

export type ThemeOptions = {
    type?: ThemeType,
    variant?: number | null,
}

export class ThemeManager {
    public type: Ref<ThemeType> = ref(ThemeType.LIGHT);
    public variant: Ref<number | null> = ref(null);
    public is_dark: Ref<boolean> = ref(false);
    public css_classes: Ref<{ [key: string]: boolean }> = ref({});
    public colors: Ref<ThemeColors> = ref(COLORS_MAP.light);

    constructor(options: ThemeOptions = {}) {
        this.type.value = options.type || ThemeType.LIGHT;
        this.variant.value = options.variant || null;
        this.is_dark.value = this.type.value === ThemeType.DARK;

        useHead({
            htmlAttrs: { class: this.css_classes },
            styles: {
                'ik-colors': ref({ css: this.generateCssVariables() }),
            },
        });
        watch(this.is_dark, (dark) => {
            this.updateType(dark ? ThemeType.DARK : ThemeType.LIGHT);
        });
        watch(this.variant, () => {
            this.updateType();
        });

        this.updateType();
    }

    private updateType(new_type?: ThemeType) {
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
                const css_name = name.replace(/_/g, '-');
                css += `    --${css_name}: ${(map as any)[name]};` + '\n';
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
