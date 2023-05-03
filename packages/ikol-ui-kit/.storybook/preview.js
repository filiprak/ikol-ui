import './preview.css';
import { h } from 'vue';
import { setupTheme } from '../docs/stories/utils/theme';

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
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story, context) => {
      setupTheme(context);
      return h(Story());
    },
  ],
};

export default preview;
