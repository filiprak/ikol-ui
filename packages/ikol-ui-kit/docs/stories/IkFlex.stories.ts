import type { Meta } from '@storybook/vue3';
import { IkFlex } from '@/components/IkFlex';
import { h } from 'vue';

const ExampleContent = {
  template: `
    <div class="item" style="padding: 10px; border: 1px dashed red; background: #ff000030"><slot/></div>
  `,
};

const meta: Meta<typeof IkFlex> = {
  title: 'Components/IkFlex',
  tags: ['autodocs'],
  component: IkFlex,
  render: (args) => {
    return () => h({
      components: {
        IkFlex,
        ExampleContent,
      },
      inheritAttrs: false,
      template: `
        <IkFlex v-bind="args">
          <ExampleContent>Example 1</ExampleContent>
          <ExampleContent>Example 2</ExampleContent>
        </IkFlex>
      `,
      setup() {
        return { args };
      },
    });
  },
};

export const Default: Meta<typeof IkFlex> = {
  args: {},
};

export const Column: Meta<typeof IkFlex> = {
  args: { column: true },
};

export const FullWidthItems: Meta<typeof IkFlex> = {
  args: { fullWidthItems: true },
};

export const FixedAndGrow: Meta<typeof IkFlex> = {
  args: { fixedAndGrow: true },
};

export const GrowAndFixed: Meta<typeof IkFlex> = {
  args: { growAndFixed: true },
};

export const JustifyStart: Meta<typeof IkFlex> = {
  args: { justifyStart: true },
};

export const JustifyEnd: Meta<typeof IkFlex> = {
  args: { justifyEnd: true },
};

export const JustifySpace: Meta<typeof IkFlex> = {
  args: { justifySpace: true },
};

export const Reverse: Meta<typeof IkFlex> = {
  args: { reverse: true },
};

export default meta;
