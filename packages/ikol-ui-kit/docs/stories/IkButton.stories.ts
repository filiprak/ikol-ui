import type { Meta } from '@storybook/vue3';
import { IkButton } from '@/components/IkButton';
import { h } from 'vue';
import { useTheme } from '@/composables';
import { UIDesignColor } from '@/types/utils';


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
        const theme = useTheme();

        return () => {
          const { dark_theme, ...props } = args;
          theme.is_dark.value = dark_theme;

          return Object
            .values(UIDesignColor)
            .map(design => {
              return h(IkButton, { class: 'ik-mr-3', design, ...props }, props.default !== undefined ? props.default : 'Button')
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

export const Large = {
  args: { size: 'lg' },
};

export const Block = {
  args: { block: true, class: 'ik-mb-3' },
};

export const PrependIcon = {
  args: { icon: 'house' },
};

export const AppendIcon = {
  args: { append_icon: 'house' },
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
