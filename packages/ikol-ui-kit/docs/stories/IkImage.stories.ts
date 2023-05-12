import type { Meta } from '@storybook/vue3';
import { IkImage } from '@/components/IkImage';
import { h } from 'vue';

const meta: Meta<typeof IkImage> = {
  title: 'Components/IkImage',
  tags: ['autodocs'],
  component: IkImage,
  render: (args) => {
    return () => h({
      components: {
        IkImage,
      },
      template: `
        <IkImage v-bind="args">
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </IkImage>
      `,
      setup() {
        return { args };
      },
    });
  },
};

export const Default: Meta<typeof IkImage> = {
  args: {},
};

export default meta;
