import { useTheme } from '@/composables';

export function setupTheme(context: any) {
  const theme = useTheme();

  theme.is_dark.value = context?.globals?.theme === 'dark';

  return theme;
}
