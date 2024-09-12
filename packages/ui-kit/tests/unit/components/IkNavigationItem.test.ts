import { IkFlex } from '@ui/components/IkFlex';
import { IkIcon } from '@ui/components/IkIcon';
import { IkNavigationItem } from '@ui/components/IkNavigation';
import { IkPopover } from '@ui/components/IkPopover';
import { getRouterMock } from '@ui/tests/mocks/router';
import type { RenderOptions } from '@ui/tests/tools/utils';
import { renderShallow } from '@ui/tests/tools/utils';

const defineRouter = () => {
    return getRouterMock({
        routes: [
            {
                path: '/',
                name: 'IkRoute1',
                component: {},
            },
            {
                path: '/route2',
                name: 'IkRoute2',
                component: {},
            },
            {
                path: '/route3/:id',
                name: 'IkRoute3',
                component: {},
            },
        ],
    });
};

describe('IkNavigationItem', () => {
    let router = defineRouter();
    const getInstance = (options: RenderOptions<typeof IkNavigationItem> = {}) => renderShallow(IkNavigationItem, {
        global: {
            provide: { navigation: { mini: false, computed_mini: false, toggle: jest.fn() } },
        },
        router,
    }, options);

    beforeEach(async () => {
        router = defineRouter();
        await router.push('/');
    });

    it('renders with default state', () => {
        const wrapper = getInstance();

        expect(wrapper.classes()).toStrictEqual([
            'ik-navigation-item',
        ]);

        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with default and icon slots', () => {
        const wrapper = getInstance({
            slots: {
                default: 'This is unit test',
                icon: '<i>Test</i>',
            },
        });

        expect(wrapper.text()).toContain('This is unit test');
        expect(wrapper.find('i').text()).toContain('Test');

        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with icon prop', () => {
        const wrapper = getInstance({
            props: {
                icon: 'home:regular',
            },
        });

        expect(wrapper.findComponent(IkIcon).attributes('icon')).toBe('home:regular');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders active', () => {
        const wrapper = getInstance({
            props: {
                active: true,
            },
        });

        expect(wrapper.classes()).toContain('ik-navigation-item--active');
    });

    it('renders linked', () => {
        const wrapper = getInstance({
            props: {
                link: 'www.test.com/test',
                target: '_blank',
            },
        });

        expect(wrapper.classes()).toContain('ik-navigation-item--clickable');
        expect(wrapper.find('a').isVisible()).toBe(true);
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders clickable', () => {
        const wrapper = getInstance({
            props: {
                onClick: jest.fn(),
            },
        });

        expect(wrapper.classes()).toContain('ik-navigation-item--clickable');
    });

    it('renders mini', () => {
        const wrapper = getInstance({
            props: { icon: 'home' },
            global: {
                provide: {
                    navigation: { mini: true },
                },
                stubs: {
                    IkPopover,
                },
            },
        });

        expect(wrapper.find('.ik-navigation-item__icon').isVisible()).toBe(true);
        expect(wrapper.find('.ik-navigation-item__content').exists()).toBe(false);
    });

    it('closes navigation when close_nav is true', async () => {
        const clickListenerMock = jest.fn();
        const toggleMock = jest.fn();

        const wrapper = getInstance({
            props: {
                close_nav: true,
                onClick: clickListenerMock,
            },
            global: {
                provide: {
                    navigation: { toggle: toggleMock },
                },
            },
        });

        // simulate click
        await wrapper.find('.ik-navigation-item__link').trigger('click');

        expect(toggleMock).toHaveBeenCalledWith(false);
        expect(clickListenerMock).toHaveBeenCalled();
    });

    it('works with route prop as route name', async () => {
        const push = jest.spyOn(router, 'push');
        const wrapper = getInstance({
            props: {
                route: 'IkRoute2',
            },
        });

        // simulate click
        await wrapper.find('.ik-navigation-item__link').trigger('click');
        expect(push).toHaveBeenCalledWith(expect.objectContaining({ name: 'IkRoute2' }));
    });

    it('works with route prop as route object', async () => {
        const push = jest.spyOn(router, 'push');
        const wrapper = getInstance({
            props: {
                route: { name: 'IkRoute3', params: { id: 567 } },
            },
        });

        // simulate click
        await wrapper.find('.ik-navigation-item__link').trigger('click');
        expect(push).toHaveBeenCalledWith(expect.objectContaining({ name: 'IkRoute3', params: { id: 567 } }));
    });

    it('renders with circle icon', () => {
        const wrapper = getInstance({
            props: {
                circle_icon: true,
            },
        });

        expect(wrapper.classes()).toContain('ik-navigation-item--circle-icon');
    });

    it('works with active route match', async () => {
        const wrapper = getInstance({
            props: {
                active_route_match: 'IkRoute2',
            },
        });

        expect(wrapper.classes()).not.toContain('ik-navigation-item--active');

        await router.replace('/route2');

        expect(wrapper.classes()).toContain('ik-navigation-item--active');
    });

    it('works with active route match regex', async () => {
        const wrapper = getInstance({
            props: {
                active_route_match: 'IkRoute*',
            },
        });

        await router.replace({ name: 'IkRoute3', params: { id: 5 } });
        expect(wrapper.classes()).toContain('ik-navigation-item--active');

        await router.replace({ name: 'IkRoute2' });
        expect(wrapper.classes()).toContain('ik-navigation-item--active');

        await router.replace({ name: 'IkRoute1' });
        expect(wrapper.classes()).toContain('ik-navigation-item--active');
    });

    it('reders with label hidden in mini variant', async () => {
        const wrapper = getInstance({
            props: {
                hide_label: true,
            },
            global: {
                provide: { navigation: { mini: true } },
            },
            slots: { default: 'Unit test' },
        });

        expect(wrapper.text()).not.toContain('Unit test');
    });

    it('renders with label visible in normal variant', async () => {
        const wrapper = getInstance({
            props: {
                hide_label: true,
            },
            provide: { navigation: { mini: false } },
            slots: { default: 'Unit test' },
        });

        expect(wrapper.text()).toContain('Unit test');
    });

    it('renders with children in mini variant', async () => {
        const wrapper = getInstance({
            props: {},
            global: {
                provide: { navigation: { mini: true } },
            },
            slots: {
                default: 'Unit test',
                children: 'This is children slot',
            },
        });

        expect(wrapper.findComponent(IkPopover).exists()).toBeTruthy();
    });

    it('renders with children in normal variant', async () => {
        const wrapper = getInstance({
            props: {},
            global: {
                provide: { navigation: { mini: false } },
            },
            slots: {
                default: 'Unit test',
                children: 'This is children slot',
            },
        });

        expect(wrapper.findComponent(IkPopover).exists()).toBeFalsy();
        expect(wrapper.text()).toContain('This is children slot');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with append_icon param', async () => {
        const wrapper = getInstance({
            props: {
                append_icon: 'chevron-right:light',
            },
            global: {
                stubs: { IkFlex },
            },
            slots: { default: 'Unit test' },
        });

        expect(wrapper.findComponent(IkFlex).exists()).toBeTruthy();
        expect(wrapper.findComponent(IkIcon).exists()).toBeTruthy();
        expect(wrapper.findComponent(IkIcon).attributes('icon')).toBe('chevron-right:light');
        expect(wrapper.findComponent(IkFlex).text()).toBe('Unit test');

        expect(wrapper.element).toMatchSnapshot();
    });
});
