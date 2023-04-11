import { mount } from '@vue/test-utils';
import { IkThemeProvider } from '@/components/IkThemeProvider';
import { useTheme } from '@/composables';

describe('IkThemeProvider', () => {
    const Child = {
        template: '<div>{{ theme }}</div>',
        setup: () => ({ theme: useTheme() }),
    };

    it('renders with default state', () => {
        const wrapper = mount(IkThemeProvider);
        expect(wrapper.classes()).toContain('ik-theme-provider');
        expect(wrapper.classes()).toContain('ik-theme--light');
    });

    it('should provide theme to children', () => {
        const wrapper = mount({
            components: {
                IkThemeProvider,
                Child,
            },
            template: `
                <IkThemeProvider theme="dark" variant="7">
                    <Child/>
                </IkThemeProvider>
            `,
        });
        expect(wrapper.classes()).toContain('ik-theme--dark');
        expect(wrapper.classes()).toContain('ik-theme--7');
        expect(wrapper.findComponent(Child).text()).toContain('"type": "dark"');
        expect(wrapper.findComponent(Child).text()).toContain('"is_dark": true');
        expect(wrapper.findComponent(Child).text()).toContain('"variant": 7');
    });

    it('should render with custom tag', () => {
        const wrapper = mount(IkThemeProvider, {
            props: {
                tag: 'span',
            },
        });
        expect(wrapper.element.tagName).toBe('SPAN');
    });
});
