import type { Meta } from '@storybook/vue3';
import { IkButtonGroup } from '@/components/IkButtonGroup';
import { IkButton } from '@/components/IkButton';
import { h } from 'vue';


const meta: Meta<typeof IkButtonGroup> = {
  title: 'Components/IkButtonGroup',
  tags: ['autodocs'],
  component: IkButtonGroup,

  render: (args) => {
    return {
      components: {
        IkButtonGroup,
        IkButton,
      },
      inheritAttrs: false,
      setup() {
        return () => {
          const props = args;

          return h(IkButtonGroup, props, () => [
            h(IkButton, {}, () => 'Buttom 1'),
            h(IkButton, {}, () => 'Buttom 2'),
            h(IkButton, {}, () => 'Buttom 3'),
          ]);
        };
      },
    };
  }
};

export const Default = {
  args: {},
};

export const Equal = {
  args: { equal: true },
};

export default meta;
