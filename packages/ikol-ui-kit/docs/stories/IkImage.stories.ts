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
        <IkImage v-bind="args"/>
      `,
      setup() {
        return { args };
      },
    });
  },
};

export const Default: Meta<typeof IkImage> = {
  args: { src: 'https://picsum.photos/300/200' },
};

export const Loader: Meta<typeof IkImage> = {
  args: { src: 'http://picsum.photos/300/200', loader: true, size: 200 },
};

export const Size: Meta<typeof IkImage> = {
  args: { src: 'https://picsum.photos/300/200', size: 150 },
};

export const WidthAndHeight: Meta<typeof IkImage> = {
  args: { src: 'https://picsum.photos/300/200', width: 250, height: 150 },
};

export const Round: Meta<typeof IkImage> = {
  args: { src: 'https://picsum.photos/200/200', round: true },
};

export const Contain: Meta<typeof IkImage> = {
  args: { src: 'http://picsum.photos/300/200', contain: true, size: 300 },
};

export const Cover: Meta<typeof IkImage> = {
  args: { src: 'http://picsum.photos/300/200', cover: true, size: 300 },
};

export default meta;
