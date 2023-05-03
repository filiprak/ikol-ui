import type { Meta } from '@storybook/vue3';
import { IkIcon } from '@/components/IkIcon';
import { h } from 'vue';
import { UIDesignColor } from '@/types/utils';


const meta: Meta<typeof IkIcon> = {
  title: 'Components/IkIcon',
  tags: ['autodocs'],
  component: IkIcon,

  render: (args) => {
    return {
      components: {
        IkIcon,
      },
      inheritAttrs: false,
      setup() {
        return () => {
          const props = args;

          return Object
            .values(UIDesignColor)
            .map(design => {
              return h(IkIcon, { class: 'ik-mr-3', design, ...props })
            });
        };
      },
    };
  }
};

export const Default = {
  args: { icon: 'house' },
};

export const Circle = {
  args: { icon: 'house', circle: true },
};

export const Size2x = {
  args: { icon: 'house', size: 2 },
};

export const Disabled = {
  args: { icon: 'house', disabled: true, size: 2 },
};

export const Size30px = {
  args: { icon: 'house', size_px: 30 },
};

export const CircleSize30px = {
  args: { icon: 'house', size_px: 30, circle: true },
};

export const FilledCircleVariant = {
  args: { icon: 'house', size_px: 30, circle: true, variant: 'filled' },
};

export const RegularThicness = {
  args: { icon: 'user:regular', size_px: 30, circle: true },
};

export const SolidThicness = {
  args: { icon: 'user', size_px: 30, circle: true },
};

export default meta;
