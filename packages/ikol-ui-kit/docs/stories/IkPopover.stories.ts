import type { Meta } from '@storybook/vue3';
import { IkPopover } from '@/components/IkPopover';
import { h } from 'vue';

const meta: Meta<typeof IkPopover> = {
  title: 'Components/IkPopover',
  tags: ['autodocs'],
  component: IkPopover,
  render: (args) => {
    return () => h({
      components: {
        IkPopover,
      },
      template: `
        <IkPopover v-bind="args">
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </IkPopover>
      `,
      setup() {
        return { args };
      },
    });
  },
};

export const Default: Meta<typeof IkPopover> = {
  args: {},
};

export default meta;
