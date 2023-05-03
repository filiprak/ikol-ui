import type { Meta } from '@storybook/vue3';
import { IkGrid, IkGridItem } from '@/components/IkGrid';
import { h } from 'vue';

const ExampleContent = {
  template: `
    <div class="item" style="padding: 10px; border: 1px dashed red; background: #ff000030">Example</div>
  `,
};

const meta: Meta<typeof IkGrid> = {
  title: 'Components/IkGrid',
  tags: ['autodocs'],
  component: IkGrid,

  render: (args, context) => {
    return () => h({
      components: {
        IkGrid,
        IkGridItem,
        ExampleContent,
      },
      inheritAttrs: false,
      template: `
        <IkGrid v-bind="args">
          <IkGridItem xs-4><ExampleContent/></IkGridItem>
          <IkGridItem xs-4><ExampleContent/></IkGridItem>
          <IkGridItem xs-4><ExampleContent/></IkGridItem>
          <IkGridItem xs-4><ExampleContent/></IkGridItem>
          <IkGridItem xs-4><ExampleContent/></IkGridItem>
          <IkGridItem xs-4><ExampleContent/></IkGridItem>
        </IkGrid>
      `,
      setup() {
        return { args };
      },
    });
  }
};

export const Default = {
  args: {},
};

export const Stacked = {
  args: {},
};

export default meta;
