import type { Meta } from '@storybook/vue3';
import { IkGrid, IkGridItem } from '@/components/IkGrid';
import { h } from 'vue';
import { useTheme } from '@/composables';


const meta: Meta<typeof IkGrid> = {
  title: 'Components/IkGrid',
  tags: ['autodocs'],
  component: IkGrid,

  render: (args) => {
    return {
      components: {
        IkGrid,
        IkGridItem,
      },
      inheritAttrs: false,
      setup() {
        const theme = useTheme();

        return () => {
          const { dark_theme, breakpoints = [], ...props } = args;
          theme.is_dark.value = dark_theme;

          const style = { padding: '5px', border: '1px solid red' };

          return h(IkGrid, props, breakpoints.map(
            (bp = {}) => h(IkGridItem, { ...bp }, h('div', { style }, 'Item 1')))
          );
        };
      },
    };
  }
};

export const Default = {
  args: {
    breakpoints: [
      { xs: 3 },
      { xs: 3 },
      { xs: 3 },
      { xs: 3 },
    ],
  },
};

export default meta;
