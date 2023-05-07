import type { Meta } from '@storybook/vue3';
import { IkIcon } from '@/components/IkIcon';
import { IkButton } from '@/components/IkButton';
import { IkList, IkListItem } from '@/components/IkList';
import { h } from 'vue';

const meta: Meta<typeof IkList> = {
  title: 'Components/IkList',
  tags: ['autodocs'],
  component: IkList,
  render: (args) => {
    return () => h({
      components: {
        IkList,
        IkListItem,
        IkIcon,
        IkButton,
      },
      inheritAttrs: false,
      template: `
        <IkList>
          <IkListItem v-bind="args">
            Item One
            <template #prepend>
              <IkIcon icon="user" circle design="default" size-px="32"/>
            </template>
            <template #secondary>
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </template>
          </IkListItem>
          <IkListItem v-bind="args">
            Item Two
            <template #prepend>
              <IkIcon icon="user" circle design="default" size-px="32"/>
            </template>
            <template #secondary>
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </template>
          </IkListItem>
          <IkListItem v-bind="args">
            Item Three
            <template #prepend>
              <IkIcon icon="user" circle design="default" size-px="32"/>
            </template>
            <template #secondary>
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </template>
          </IkListItem>
        </IkList>
      `,
      setup() {
        return { args };
      },
    });
  },
};

export const Default: Meta<typeof IkList> = {
  args: {},
};

export default meta;
