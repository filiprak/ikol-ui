import type { Meta } from '@storybook/vue3';
import { IkLink } from '@/components/IkLink';
import { h } from 'vue';
import { UIDesignColor } from '@/types/utils';

const meta: Meta<typeof IkLink> = {
  title: 'Components/IkLink',
  tags: ['autodocs'],
  component: IkLink,
  render: (args) => {
    return () => h({
      components: {
        IkLink,
      },
      template: `
        <IkLink v-bind="args">
          This is link
        </IkLink>
      `,
      setup() {
        return { args };
      },
    });
  },
};

export const Default: Meta<typeof IkLink> = {
  args: { to: 'https://google.com' },
};

export const Underline: Meta<typeof IkLink> = {
  args: { to: 'https://google.com', underline: true },
};

export const NewTab: Meta<typeof IkLink> = {
  args: { to: 'https://google.com', target: '_blank' },
};

export const Email: Meta<typeof IkLink> = {
  args: { to: 'test@example.com', type: 'email' },
};

export const Plain: Meta<typeof IkLink> = {
  args: { to: 'https://google.com', plain: true },
};

export const Design: Meta<typeof IkLink> = {
  args: { to: 'https://google.com' },
  render: (args) => {
    return () => h({
      components: {
        IkLink,
      },
      template: `
        <div v-for="design in designs">          
          <IkLink v-bind="args" :design="design">
            This is link
          </IkLink>
        </div>
      `,
      setup() {
        return { args, designs: UIDesignColor };
      },
    });
  },
};

export default meta;
