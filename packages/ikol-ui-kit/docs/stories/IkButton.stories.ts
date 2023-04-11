import type { Meta } from '@storybook/vue3';
import { IkButton } from '@/components/IkButton';
import { h } from 'vue';
import { useTheme } from '@/composables';


const meta: Meta<typeof IkButton> = {
  title: 'Components/IkButton',
  tags: ['autodocs'],
  component: IkButton,

  render: (args) => {
    return {
      components: {
        IkButton,
      },
      inheritAttrs: false,
      setup() {
        const theme = useTheme();

        return () => {
          const { dark_theme, ...props } = args;
          theme.is_dark.value = dark_theme;

          return h(IkButton, props, ['Button']);
        };
      },
    };
  }
};

export const Preview = {
  args: {},
};

export default meta;
