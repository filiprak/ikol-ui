import type { Meta } from '@storybook/vue3';
import { IkLoaderCircle } from '@/components/IkLoaderCircle';
import { h } from 'vue';
import { useTheme } from '@/composables';
import { UIDesignColor } from '@/types/utils';


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
      setup() {
        const theme = useTheme();

        return () => {
          const { dark_theme, ...props } = args;
          theme.is_dark.value = dark_theme;

          return Object
            .values(UIDesignColor)
            .map(design => {
              return h(IkLoaderCircle, { class: 'ik-mr-3', design, ...props })
            });
        };
      },
    };
  }
};

export const Default = {
  args: { value: 66 },
};

export const Indeterminate = {
  args: { indeterminate: true },
};

export const Progress = {
  args: { value: 30 },
};

export const Rotate = {
  args: { rotate: 90, value: 30 },
};

export const Thicnkess = {
  args: { thickness: 6, value: 30 },
};

export const Size = {
  args: { size: 40, value: 30 },
};

export default meta;
