import type { Meta } from '@storybook/vue3';
import { IkLoaderCircle } from '@/components/IkLoaderCircle';

const meta: Meta<typeof IkLoaderCircle> = {
  title: 'Components/IkLoaderCircle',
  tags: ['autodocs'],
  component: IkLoaderCircle,

  render: (args) => ({
    components: {
      IkLoaderCircle,
    },
    setup() {
      return {
        args,
      };
    },
    template: '<IkLoaderCircle v-bind="args"/>',
  }),
};

export const Preview = {
  args: {},
};

export default meta;
