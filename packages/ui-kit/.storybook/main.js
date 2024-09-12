/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
    stories: [
        "../docs/stories/**/*.mdx",
        "../docs/stories/**/*.stories.@(js|jsx|ts|tsx|vue)"
    ],
    staticDirs: [{ from: '../docs/stories/assets/', to: '/assets' }],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        'storybook-vue-addon',
    ],
    async viteFinal (config, { configType }) {
        // prevent vue stories from being optimized due - esbuild is unable to recognize ?vue&type=stories files
        if (config.optimizeDeps) {
            config.optimizeDeps.entries = (config.optimizeDeps.entries || []).filter(path => !/\.vue$/.test(path));
        }

        config.plugins = config.plugins.filter(p => {
            return [
                'ikol:plugin-css',
                'vite:dts',
                'rollup-plugin-multi-input',
            ].indexOf(p.name) < 0;
        });

        return config;
    },
    framework: {
        name: "@storybook/vue3-vite",
        options: {},
    },
    docs: {
        autodocs: true,
    },
};
export default config;
