import type { Meta } from '@storybook/vue3';
import { IkGrid, IkGridItem } from '@/components/IkGrid';
import { ref, watchEffect } from 'vue';
import { useTheme } from '@/composables';

const n = ref(1);

const Item = {
  template: `
    <div class="item" style="padding: 5px; border: 1px solid red;">Item {{ c }}</div>
  `,
  setup() {
    const c = n.value++;
    return { c };
  },
};

const meta: Meta<typeof IkGrid> = {
  title: 'Components/IkGrid',
  tags: ['autodocs'],
  component: IkGrid,

  render: (args) => {
    return {
      components: {
        IkGrid,
        IkGridItem,
        Item,
      },
      inheritAttrs: false,
      template: `
        <IkGrid v-bind="props">
          <IkGridItem xs-4><Item/></IkGridItem>
          <IkGridItem xs-4><Item/></IkGridItem>
          <IkGridItem xs-4><Item/></IkGridItem>
        </IkGrid>
      `,
      setup() {
        const theme = useTheme();
        const { dark_theme, ...props } = args;

        watchEffect(() => {
          const { dark_theme } = args;
          theme.is_dark.value = dark_theme;
        });

        return {
          props
        };
      },
    };
  }
};

export const Default = {
  args: {},
};

export const Stacked = {
  args: {},
};

export default meta;
