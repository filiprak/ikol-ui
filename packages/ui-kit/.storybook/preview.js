import './preview.css';
import { h } from 'vue';
import { setup } from '@storybook/vue3';
import { setupApp, setupTheme } from '../docs/stories/utils/theme';

/** @type { import('@storybook/vue3').Preview } */
const preview = {
    globalTypes: {
        theme: {
            description: 'Global theme for components',
            defaultValue: 'light',
            toolbar: {
                title: 'Theme',
                icon: 'mirror',
                items: ['light', 'dark'],
                dynamicTitle: true,
            },
        },
    },
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(date)$/i,
                date: /Date$/,
            },
        },
        docs: {
            source: {
                format: true,
                language: 'html',
            },
        },
    },
    decorators: [
        (Story, context) => {
            return {
                setup () {
                    setupTheme(context);
                    return () => h(Story());
                }
            }
        },
    ],
};

setup(setupApp);

export default preview;
