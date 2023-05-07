import type { Meta } from '@storybook/vue3';
import { IkIcon } from '@/components/IkIcon';
import { IkButton } from '@/components/IkButton';
import { IkList, IkListItem } from '@/components/IkList';
import { h } from 'vue';

const meta: Meta<typeof IkListItem> = {
  title: 'Components/IkListItem',
  tags: ['autodocs'],
  component: IkListItem,
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
            Item
          </IkListItem>
        </IkList>
      `,
      setup() {
        return { args };
      },
    });
  },
};

export const Default: Meta<typeof IkListItem> = {
  args: {},
};

export const Icon: Meta<typeof IkListItem> = {
  args: { icon: 'home' },
};

export const SecondaryText: Meta<typeof IkListItem> = {
  args: {},
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
            <template #secondary>
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </template>
          </IkListItem>
          <IkListItem v-bind="args">
            Item Two
            <template #secondary>
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </template>
          </IkListItem>
          <IkListItem v-bind="args">
            Item Three
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

export const Prepend: Meta<typeof IkListItem> = {
  args: {},
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

export const Append: Meta<typeof IkListItem> = {
  args: {},
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
            <template #secondary>
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </template>
            <template #append>
              <IkButton icon="cog" circle variant design="default"/>
            </template>
          </IkListItem>
          <IkListItem v-bind="args">
            Item Two
            <template #secondary>
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </template>
            <template #append>
              <IkButton icon="cog" circle variant design="default"/>
            </template>
          </IkListItem>
          <IkListItem v-bind="args">
            Item Three
            <template #secondary>
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </template>
            <template #append>
              <IkButton icon="cog" circle variant design="default"/>
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

export const TwoLines: Meta<typeof IkListItem> = {
  args: { lines: 2 },
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
            <template #secondary>
              Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit
            </template>
          </IkListItem>
          <IkListItem v-bind="args">
            Item Two
            <template #secondary>
              Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit
            </template>
          </IkListItem>
          <IkListItem v-bind="args">
            Item Three
            <template #secondary>
              Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit
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

export const Inline: Meta<typeof IkListItem> = {
  args: { inline: true },
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
            <template #secondary>
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </template>
            <template #append>
              <IkButton icon="cog" circle variant design="default"/>
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

export const WrapText: Meta<typeof IkListItem> = {
  args: { wrapText: true },
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
            <template #secondary>
              Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit
            </template>
            <template #append>
              <IkButton icon="cog" circle variant design="default"/>
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

export const Disabled: Meta<typeof IkListItem> = {
  args: { disabled: true },
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
            <template #secondary>
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </template>
            <template #append>
              <IkButton icon="cog" circle variant design="default"/>
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

export const Clickable: Meta<typeof IkListItem> = {
  args: {},
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
          <IkListItem v-bind="args" @click="() => {}">
            Item One
            <template #secondary>
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </template>
            <template #append>
              <IkButton icon="cog" circle variant design="default"/>
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

export const Active: Meta<typeof IkListItem> = {
  args: { active: true },
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
            <template #secondary>
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </template>
            <template #append>
              <IkButton icon="cog" circle variant design="default"/>
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

export const BorderBottom: Meta<typeof IkListItem> = {
  args: { borderBottom: true },
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
            <template #secondary>
              Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit
            </template>
          </IkListItem>
          <IkListItem v-bind="args">
            Item Two
            <template #secondary>
              Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit
            </template>
          </IkListItem>
          <IkListItem v-bind="args">
            Item Three
            <template #secondary>
              Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit
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

export const AlignStart: Meta<typeof IkListItem> = {
  args: { alignStart: true, wrapText: true },
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit
            </template>
          </IkListItem>
          <IkListItem v-bind="args">
            Item Two
            <template #prepend>
              <IkIcon icon="user" circle design="default" size-px="32"/>
            </template>
            <template #secondary>
              Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit
            </template>
          </IkListItem>
          <IkListItem v-bind="args">
            Item Three
            <template #prepend>
              <IkIcon icon="user" circle design="default" size-px="32"/>
            </template>
            <template #secondary>
              Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit
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

export default meta;
