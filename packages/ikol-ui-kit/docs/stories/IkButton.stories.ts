import type { Meta } from '@storybook/vue3';
import { IkButton } from '@/components/IkButton';
import { IkButtonGroup } from '@/components/IkButtonGroup';
import { h } from 'vue';
import { UIDesignColor, UIElemSize } from '@/types/utils';


const meta: Meta<typeof IkButton> = {
  title: 'Components/IkButton',
  tags: ['autodocs'],
  component: IkButton,

  render: (args) => {
    return {
      components: {
        IkButton,
      },
      inheritAttrs: false,
      setup() {
        return () => {
          const props = args;

          return Object
            .values(UIDesignColor)
            .map(design => {
              return h(IkButton, { class: 'ik-mr-3', design, ...props }, () => 'Button')
            });
        };
      },
    };
  }
};

export const Default = {
  args: {},
};

export const OutlineVariant = {
  args: { variant: 'outline' },
};

export const OutlineActive = {
  args: { variant: 'outline', active: true },
};

export const FlatVariant = {
  args: { variant: 'flat' },
};

export const FlatActive = {
  args: { variant: 'flat', active: true },
};

export const Round = {
  args: { round: true },
};

export const Circle = {
  args: { circle: true, icon: 'cog', default: '' },
};

export const Size: Meta<typeof IkButton> = {
  args: {},
  render: (args) => {
    return {
      components: {
        IkButton,
        IkButtonGroup,
      },
      inheritAttrs: false,
      template: `
        <div v-for="size in sizes">
          <IkButtonGroup>
            <IkButton :size="size" design="primary">Button</IkButton>
            <IkButton :size="size" design="primary" loading>Button</IkButton>
            <IkButton :size="size" design="success" circle icon="cog"></IkButton>
            <IkButton :size="size" design="error" round>Button</IkButton>
            <IkButton :size="size" design="default" separate icon="cog">Button</IkButton>
          </IkButtonGroup>
        </div>
      `,
      setup() {
        return { args, sizes: UIElemSize };
      },
    };
  }
};

export const Block = {
  args: { block: true, class: 'ik-mb-3' },
};

export const PrependIcon = {
  args: { icon: 'house' },
};

export const AppendIcon = {
  args: { appendIcon: 'house' },
};

export const SeparateIcon = {
  args: { icon: 'plus', separate: true },
};

export const Disabled = {
  args: { disabled: true },
};

export const Loading = {
  args: { loading: true },
};

export const Skeleton = {
  args: { skeleton: true },
};

export default meta;
