import { addons } from '@storybook/manager-api';
import { branding } from './branding';

addons.setConfig({
    theme: branding,
});
