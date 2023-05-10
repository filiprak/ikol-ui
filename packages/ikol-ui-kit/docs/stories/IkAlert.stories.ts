import type { Meta } from '@storybook/vue3';
import { IkIcon } from '@/components/IkIcon';
import { IkButton } from '@/components/IkButton';
import { IkAlert } from '@/components/IkAlert';
import { h } from 'vue';
import { UIDesignColor } from '@/types/utils';

const meta: Meta<typeof IkAlert> = {
  title: 'Components/IkAlert',
  tags: ['autodocs'],
  component: IkAlert,
  render: (args) => {
    return () => h({
      components: {
        IkAlert,
        IkIcon,
        IkButton,
      },
      inheritAttrs: false,
      template: `
        <IkAlert v-bind="args">
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </IkAlert>
      `,
      setup() {
        return { args };
      },
    });
  },
};

export const Default: Meta<typeof IkAlert> = {
  args: {},
};

export const Design: Meta<typeof IkAlert> = {
  args: {},
  render: (args) => {
    return () => h({
      components: {
        IkAlert,
        IkIcon,
        IkButton,
      },
      inheritAttrs: false,
      template: `
        <IkAlert v-for="design in designs" :design="design">
          Design: {{ design }}, Lorem ipsum dolor sit amet consectetur adipisicing elit
        </IkAlert>
      `,
      setup() {
        return { args, designs: UIDesignColor };
      },
    });
  },
};

export const VariantFilled: Meta<typeof IkAlert> = {
  args: {
    variant: 'filled',
  },
  render: (args) => {
    return () => h({
      components: {
        IkAlert,
        IkIcon,
        IkButton,
      },
      inheritAttrs: false,
      template: `
        <IkAlert v-for="design in designs" v-bind="args" :design="design">
          Design: {{ design }}, Lorem ipsum dolor sit amet consectetur adipisicing elit
        </IkAlert>
      `,
      setup() {
        return { args, designs: UIDesignColor };
      },
    });
  },
};

export const Icon: Meta<typeof IkAlert> = {
  args: {
    icon: 'home',
  },
};

export const Append: Meta<typeof IkAlert> = {
  args: {},
  render: (args) => {
    return () => h({
      components: {
        IkAlert,
        IkButton,
      },
      inheritAttrs: false,
      template: `
        <IkAlert v-bind="args">
          Lorem ipsum dolor sit amet consectetur adipisicing elit
          <template #append>
            <IkButton design="primary">Button</IkButton>
          </template>
        </IkAlert>
        <IkAlert v-bind="args">
          Lorem ipsum dolor sit amet consectetur adipisicing elit
          <template #append>
            <IkButton design="primary" variant="flat" icon="pen" circle></IkButton>
            <IkButton design="primary" variant="flat" icon="share" circle></IkButton>
            <IkButton design="primary" variant="flat" icon="cog" circle></IkButton>
          </template>
        </IkAlert>
      `,
      setup() {
        return { args, designs: UIDesignColor };
      },
    });
  },
};

export default meta;
