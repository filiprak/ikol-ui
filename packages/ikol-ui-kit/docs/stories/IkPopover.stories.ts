import type { Meta } from '@storybook/vue3';
import { IkPopover } from '@/components/IkPopover';
import { IkButton } from '@/components/IkButton';
import { h } from 'vue';

const LoremIpsum = {
  template: `
    <div class="ik-pa-4">
      Lorem ipsum dolor sit amet,<br/>
      consectetur adipiscing elit,<br/>
      sed do eiusmod tempor incididunt<br/>
      ut labore et dolore magna aliqua.
    </div>
  `,
};

const meta: Meta<typeof IkPopover> = {
  title: 'Components/IkPopover',
  tags: ['autodocs'],
  component: IkPopover,
  render: (args) => {
    return () => h({
      components: {
        IkPopover,
        IkButton,
        LoremIpsum,
      },
      template: `
        <IkPopover v-bind="args">
          <template #activator="{ on }">
            <IkButton v-on="on">Open popover</IkButton>
          </template>
          <LoremIpsum/>
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

export const OpenOnClick: Meta<typeof IkPopover> = {
  args: { open_on_click: true },
};

export const PositionAndAlignment: Meta<typeof IkPopover> = {
  args: {},
  render: (args) => {
    const positions = [
      'top',
      'bottom',
      'horizontal',
      'vertical',
    ];
    const alignments = [
      'start',
      'center',
      'end',
    ];
    return () => h({
      components: {
        IkPopover,
        IkButton,
        LoremIpsum,
      },
      template: `
        <div v-for="position in positions">
          <template v-for="align in alignments">
            <IkPopover v-bind="args" :position="position" :align="align">
              <template #activator="{ on }">
                <IkButton v-on="on" class="ik-mr-4 ik-mb-4">{{position}} - {{align}}</IkButton>
              </template>
              <LoremIpsum/>
            </IkPopover>
          </template>
        </div>
      `,
      setup() {
        return { args, positions, alignments };
      },
    });
  },
};

export const Offset: Meta<typeof IkPopover> = {
  args: { offset: 30 },
};

export const MinMaxSizes: Meta<typeof IkPopover> = {
  args: {},
  render: (args) => {
    return () => h({
      components: {
        IkPopover,
        IkButton,
        LoremIpsum,
      },
      template: `
        <IkPopover v-bind="args" :min_width="400">
          <template #activator="{ on }">
            <IkButton v-on="on" class="ik-mr-4 ik-mb-4">Min width 400px</IkButton>
          </template>
          <LoremIpsum/>
        </IkPopover>
        <IkPopover v-bind="args" :max_width="150">
          <template #activator="{ on }">
            <IkButton v-on="on" class="ik-mr-4 ik-mb-4">Min width 400px</IkButton>
          </template>
          <LoremIpsum/>
        </IkPopover>
        <IkPopover v-bind="args" :min_height="200">
          <template #activator="{ on }">
            <IkButton v-on="on" class="ik-mr-4 ik-mb-4">Min width 400px</IkButton>
          </template>
          <LoremIpsum/>
        </IkPopover>
      `,
      setup() {
        return { args };
      },
    });
  },
};

export const Delay: Meta<typeof IkPopover> = {
  args: {},
  render: (args) => {
    const delays = [0, 200, 1000];
    return () => h({
      components: {
        IkPopover,
        IkButton,
        LoremIpsum,
      },
      template: `
        <IkPopover v-bind="args" v-for="delay in delays" :delay_miliseconds="delay">
          <template #activator="{ on }">
            <IkButton v-on="on" class="ik-mr-4 ik-mb-4">Delay {{delay}}ms</IkButton>
          </template>
          <LoremIpsum/>
        </IkPopover>
      `,
      setup() {
        return { args, delays };
      },
    });
  },
};

export const UesActivatorWidth: Meta<typeof IkPopover> = {
  args: { use_activator_width: true, position: 'horizontal' },
  render: (args) => {
    return () => h({
      components: {
        IkPopover,
        IkButton,
        LoremIpsum,
      },
      template: `
        <IkPopover v-bind="args">
          <template #activator="{ on }">
            <IkButton v-on="on" class="ik-mr-4 ik-mb-4">Use activator width</IkButton>
          </template>
          <LoremIpsum/>
        </IkPopover>
      `,
      setup() {
        return { args };
      },
    });
  },
};

export default meta;
