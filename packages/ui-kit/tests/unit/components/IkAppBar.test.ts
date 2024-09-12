import type { RenderOptions } from '@ui/tests/tools/utils';
import { renderShallow } from '@ui/tests/tools/utils';
import { IkApp, IkAppBar } from '@ui/components/IkApp';
import { IkIcon } from '@ui/components/IkIcon';
import { getRouterMock } from '@ui/tests/mocks/router';

describe('IkAppBar', () => {
    let router = getRouterMock();

    const getInstance = (options?: RenderOptions<typeof IkAppBar>) => renderShallow(IkAppBar, {
        global: {
            provide: { app: getAppInstance() },
        },
        router,
    }, options);
    const getAppInstance = () => renderShallow(IkApp).vm;

    beforeEach(() => {
        router = getRouterMock();
    });

    it('renders with correct default state', () => {
        const wrapper = getInstance();

        expect(wrapper.classes()).toStrictEqual([
            'ik-app-bar',
        ]);

        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with correct default mobile state', () => {
        const wrapper = getInstance({
            device: { mobile: true },
        });

        expect(wrapper.classes()).toStrictEqual([
            'ik-app-bar',
        ]);

        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with custom width', () => {
        const wrapper = getInstance({
            props: { height: 77 },
        });

        expect(wrapper.attributes('style')).toContain('left: 0px; height: 77px;');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with default slot', () => {
        const wrapper = getInstance({
            slots: {
                default: 'This is app bar content...',
            },
        });

        expect(wrapper.text()).toContain('This is app bar content...');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with title slot', () => {
        const wrapper = getInstance({
            slots: {
                title: 'This is title...',
            },
        });

        expect(wrapper.text()).toContain('This is title...');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with back nav button', async () => {
        const replace = jest.spyOn(router, 'replace');

        const wrapper = getInstance({
            props: {
                back: true,
            },
            global: {
                stubs: { IkIcon },
            },
        });

        const icon = wrapper.find('.ik-app-bar__back').findComponent(IkIcon);

        await router.push('/route2');
        await icon.trigger('click');

        expect(icon.isVisible()).toBeTruthy();
        expect(replace).toHaveBeenCalledWith('/');
    });

    it('toggles nav on burger click', async () => {
        const toggleMock = jest.fn();
        const wrapper = getInstance({
            device: { mobile: true },
            global: {
                provide: { app: { nav: { toggle: toggleMock }, registerBar: jest.fn() } },
            },
        });

        await wrapper.find('.ik-app-bar__burger').findComponent(IkIcon).trigger('click');

        expect(toggleMock).toHaveBeenCalled();
    });

    it('applies title size', () => {
        const wrapper = getInstance({
            props: {
                title_size: 77,
            },
            slots: {
                title: 'This is title...',
            },
        });

        expect(wrapper.find('.ik-app-bar__title').attributes('style')).toContain('width: 77%');
    });
});
