import type { Meta } from '@storybook/vue3';
import { IkIcon } from '@/components/IkIcon';
import { h } from 'vue';
import { useTheme } from '@/composables';


const meta: Meta<typeof IkIcon> = {
  title: 'Components/IkIcon',
  tags: ['autodocs'],
  component: IkIcon,

  render: (args) => {
    return {
      components: {
        IkIcon,
      },
      inheritAttrs: false,
      setup() {
        const theme = useTheme();

        return () => {
          const { dark_theme, ...props } = args;
          theme.is_dark.value = dark_theme;

          return h(IkIcon, props);
        };
      },
    };
  }
};

export const Preview = {
  args: {},
};

export default meta;
