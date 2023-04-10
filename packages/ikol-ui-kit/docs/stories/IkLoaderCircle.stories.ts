import type { Meta } from '@storybook/vue3';
import { IkLoaderCircle } from '@/components/IkLoaderCircle';
import { h } from 'vue';
import { useTheme } from '@/composables';


const meta: Meta<typeof IkLoaderCircle> = {
  title: 'Components/IkLoaderCircle',
  tags: ['autodocs'],
  component: IkLoaderCircle,

  render: (args) => {
    return {
      components: {
        IkLoaderCircle,
      },
      inheritAttrs: false,
      setup(abc) {
        const theme = useTheme();

        return () => {
          const { dark_theme, ...props } = args;
          theme.is_dark.value = dark_theme;

          return h(IkLoaderCircle, props);
        };
      },
    };
  }
};

export const Preview = {
  args: {},
};

export default meta;
