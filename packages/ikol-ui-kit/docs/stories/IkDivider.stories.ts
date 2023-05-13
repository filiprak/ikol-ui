import type { Meta } from '@storybook/vue3';
import { IkDivider } from '@/components/IkDivider';
import { h } from 'vue';

const meta: Meta<typeof IkDivider> = {
  title: 'Components/IkDivider',
  tags: ['autodocs'],
  component: IkDivider,
  render: (args) => {
    return () => h({
      components: {
        IkDivider,
      },
      template: `
        <IkDivider v-bind="args">
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </IkDivider>
      `,
      setup() {
        return { args };
      },
    });
  },
};

export const Default: Meta<typeof IkDivider> = {
  args: {},
};

export default meta;
