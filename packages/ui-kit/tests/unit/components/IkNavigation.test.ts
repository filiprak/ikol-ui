import type { RenderOptions } from '@ui/tests/tools/utils';
import { renderShallow } from '@ui/tests/tools/utils';
import { IkApp } from '@ui/components/IkApp';
import { IkNavigation } from '@ui/components/IkNavigation';

describe('IkNavigation', () => {
    const getInstance = (options: RenderOptions<typeof IkNavigation> = {}) => renderShallow(IkNavigation, {
        global: {
            provide: { app: getAppInstance() },
        },
    }, options);

    const getAppInstance = () => renderShallow(IkApp).vm;

    it('renders with default state', () => {
        const wrapper = getInstance();

        expect(wrapper.classes()).toStrictEqual([
            'ik-navigation',
        ]);

        expect(wrapper.element.tagName).toBe('NAV');
        expect(wrapper.attributes('style')).toBe(
            'height: 100vh; top: 0px; max-height: 100%; transform: translateX(-100%); width: 256px;'
        );
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders on mobile', () => {
        const wrapper = getInstance({
            props: { open: true, mini: false },
            device: { mobile: true },
        });

        expect(wrapper.classes()).toContain('ik-navigation--mobile');
    });

    it('renders opened', () => {
        const wrapper = getInstance({
            props: { open: true },
        });
        expect(wrapper.attributes('style')).toBe(
            'height: 100vh; top: 0px; max-height: 100%; transform: translateX(0%); width: 256px;'
        );
    });

    it('renders mini', () => {
        const wrapper = getInstance({
            props: { open: true, mini: true },
        });
        expect(wrapper.classes()).toContain('ik-navigation--mini');
        expect(wrapper.attributes('style')).toBe(
            'height: 100vh; top: 0px; max-height: 100%; transform: translateX(0%); width: 72px;'
        );
    });

    it('renders with default slot', () => {
        const wrapper = getInstance({
            global: { renderStubDefaultSlot: true },
            props: { open: true },
            slots: { default: '<div>Nav content...</div>' },
        });
        expect(wrapper.text()).toContain('Nav content...');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with top slot', () => {
        const wrapper = getInstance({
            props: { open: true },
            slots: { top: '<div>Nav top content...</div>' },
        });
        expect(wrapper.find('.ik-navigation__top').text()).toContain('Nav top content...');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with bottom slot', () => {
        const wrapper = getInstance({
            props: { open: true },
            slots: { bottom: '<div>Nav bottom content...</div>' },
        });
        expect(wrapper.find('.ik-navigation__bottom').text()).toContain('Nav bottom content...');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('closes full mode on outside click on desktop', () => {
        const wrapper = getInstance({
            props: { open: true, mini: false },
        });

        document.dispatchEvent(new MouseEvent('mousedown'));

        expect(wrapper.emitted('update:mini')).toStrictEqual([
            [true],
        ]);
    });

    it('closes on mobile on outside touch', () => {
        const wrapper = getInstance({
            props: { open: true, mini: false },
            device: { mobile: true },
        });

        document.dispatchEvent(new MouseEvent('mousedown'));

        expect(wrapper.emitted('update:open')).toStrictEqual([
            [false],
        ]);
    });

    it('renders with custom width', () => {
        const wrapper = getInstance({
            props: { open: true, width: 777 },
        });

        document.dispatchEvent(new MouseEvent('mousedown'));

        expect(wrapper.attributes('style')).toBe(
            'height: 100vh; top: 0px; max-height: 100%; transform: translateX(0%); width: 777px;'
        );
    });

    it('renders with custom mini_width', () => {
        const wrapper = getInstance({
            props: { open: true, mini: true, mini_width: 111 },
        });

        document.dispatchEvent(new MouseEvent('mousedown'));

        expect(wrapper.attributes('style')).toBe(
            'height: 100vh; top: 0px; max-height: 100%; transform: translateX(0%); width: 111px;'
        );
    });

    it('works with toggleMini() method', async () => {
        const wrapper = getInstance({
            props: { open: true, mini: true },
        });

        wrapper.vm.toggleMini();

        expect(wrapper.emitted('update:mini')).toStrictEqual([
            [false],
        ]);

        await wrapper.setProps({ mini: false });

        wrapper.vm.toggleMini(true);

        expect(wrapper.emitted('update:mini')).toStrictEqual([
            [false],
            [true],
        ]);
    });

    it('works with toggle() method on desktop', async () => {
        const wrapper = getInstance({
            props: { open: true, mini: true },
        });

        wrapper.vm.toggle();

        expect(wrapper.emitted('update:mini')).toStrictEqual([
            [false],
        ]);

        await wrapper.setProps({ mini: false });

        wrapper.vm.toggle(false);

        expect(wrapper.emitted('update:mini')).toStrictEqual([
            [false],
            [true],
        ]);
    });

    it('works with toggle() method on mobile', () => {
        const wrapper = getInstance({
            props: { open: false, mini: true },
            device: { mobile: true },
        });

        wrapper.vm.toggle();

        expect(wrapper.emitted('update:open')).toStrictEqual([
            [true],
        ]);
    });

    it('renders as secondary navigation', () => {
        const wrapper = getInstance({
            props: { secondary: true },
        });

        expect(wrapper.classes()).toContain('ik-navigation--secondary');
        expect(wrapper.attributes('style')).not.toBeDefined();
        expect(wrapper.find('ik-navigation__toggle').exists()).toBeFalsy();
        expect(wrapper.element).toMatchSnapshot();
    });
});
