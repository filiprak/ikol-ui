import type { Meta } from '@storybook/vue3';
import { IkButtonGroup } from '@/components/IkButtonGroup';
import { IkButton } from '@/components/IkButton';
import { h } from 'vue';
import { useTheme } from '@/composables';


const meta: Meta<typeof IkButtonGroup> = {
  title: 'Components/IkButtonGroup',
  tags: ['autodocs'],
  component: IkButtonGroup,

  render: (args) => {
    return {
      components: {
        IkButtonGroup,
        IkButton,
      },
      inheritAttrs: false,
      setup() {
        const theme = useTheme();

        return () => {
          const { dark_theme, ...props } = args;
          theme.is_dark.value = dark_theme;

          return h(IkButtonGroup, props, [
            h(IkButton, {}, 'Buttom 1'),
            h(IkButton, {}, 'Buttom 2'),
            h(IkButton, {}, 'Buttom 3'),
            h(IkButton, {}, 'Buttom 3'),
            h(IkButton, {}, 'Buttom 3'),
            h(IkButton, {}, 'Buttom 3'),
            h(IkButton, {}, 'Buttom 3'),
            h(IkButton, {}, 'Buttom 3'),
          ]);
        };
      },
    };
  }
};

export const Default = {
  args: {},
};

export default meta;
