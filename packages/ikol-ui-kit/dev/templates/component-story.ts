import type { Meta } from '@storybook/vue3';
import { [[NAME]] } from '@/components/[[NAME]]';
import { h } from 'vue';

const meta: Meta<typeof [[NAME]]> = {
  title: 'Components/[[NAME]]',
  tags: ['autodocs'],
  component: [[NAME]],
  render: (args) => {
    return () => h({
      components: {
        [[NAME]],
      },
      template: `
        <[[NAME]] v-bind="args">
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </[[NAME]]>
      `,
      setup() {
        return { args };
      },
    });
  },
};

export const Default: Meta<typeof [[NAME]]> = {
  args: {},
};

export default meta;
