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
  render: (args) => {
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
  },
};

export const Default: Meta<typeof IkGrid> = {
  args: {},
};

export const SpacingXY: Meta<typeof IkGrid> = {
  args: { spacingX: 6, spacingY: 6 },
};

export const NoSpacing: Meta<typeof IkGrid> = {
  args: { spacingY: 0, spacingX: 0 },
};

export const Stacked: Meta<typeof IkGrid> = {
  args: {},
  render: (args) => {
    return () => h({
      components: {
        IkGrid,
        IkGridItem,
        ExampleContent,
      },
      inheritAttrs: false,
      template: `
        <IkGrid v-bind="args">
          <IkGridItem xs-12><ExampleContent/></IkGridItem>
          <IkGridItem xs-12><ExampleContent/></IkGridItem>
          <IkGridItem xs-12><ExampleContent/></IkGridItem>
        </IkGrid>
      `,
      setup() {
        return { args };
      },
    });
  },
};

export default meta;
