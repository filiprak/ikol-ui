import type { Meta } from '@storybook/vue3';
import { IkPopover } from '@/components/IkPopover';
import { IkButton } from '@/components/IkButton';
import { h } from 'vue';

const meta: Meta<typeof IkPopover> = {
  title: 'Components/IkPopover',
  tags: ['autodocs'],
  component: IkPopover,
  render: (args) => {
    return () => h({
      components: {
        IkPopover,
        IkButton,
      },
      template: `
        <IkPopover v-bind="args">
          <template #activator="{ on }">
            <IkButton v-on="on">Open popover</IkButton>
          </template>
          <div class="ik-pa-4">
            Lorem ipsum dolor sit amet,<br/>
            consectetur adipiscing elit,<br/>
            sed do eiusmod tempor incididunt<br/>
            ut labore et dolore magna aliqua.
          </div>
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

