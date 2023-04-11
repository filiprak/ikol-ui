import './preview.css';

/** @type { import('@storybook/vue3').Preview } */
const preview = {
  argTypes: { dark_theme: { control: 'boolean' } },
  args: { dark_theme: false },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
