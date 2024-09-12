import type { RenderOptions } from '@ui/tests/tools/utils';
import { renderShallow } from '@ui/tests/tools/utils';
import { IkLayoutGridItem } from '@ui/components/IkLayoutGrid';
import { getRouterMock } from '@ui/tests/mocks/router';

const defineRouter = () => {
    return getRouterMock({
        routes: [
            {
                path: '/',
                name: 'UnitTestRoute',
                component: {},
            },
            {
                path: '/other',
                name: 'UnitTestRouteOther',
                component: {},
            },
            {
                path: '/unit',
                name: 'UnitTestRouteUnit',
                component: {},
            },
        ],
    });
};

describe('IkLayoutGridItem', () => {
    let router = defineRouter();

    const getInstance = (options: RenderOptions<typeof IkLayoutGridItem> = {}) => renderShallow(IkLayoutGridItem, {
        router,
    }, options);

    beforeAll(async () => {
        router = defineRouter();

        await router.push('/');
    });

    it('renders with correct default state', () => {
        const wrapper = getInstance();

        expect(wrapper.classes()).toStrictEqual([
            'ik-layout-grid-item',
        ]);

        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with default slot', () => {
        const wrapper = getInstance({
            slots: {
                default: 'This is default slot...',
            },
        });

        expect(wrapper.text()).toContain('This is default slot...');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders as row', () => {
        const wrapper = getInstance({
            props: {
                row: true,
            },
        });

        expect(wrapper.classes()).toContain('ik-layout-grid-item--row');
    });

    it('renders with size', () => {
        const wrapper = getInstance({
            props: {
                size: 99,
            },
        });

        expect(wrapper.attributes('style')).toContain('flex-basis: 99%');
    });

    it('renders on mobile as full size', async () => {
        const wrapper = getInstance({
            props: {
                mobile_route: 'UnitTestRoute',
            },
            device: { mobile: true },
        });

        expect(wrapper.attributes('style')).toContain('flex-basis: 100%');
    });

    it('hides on mobile when does not match route', async () => {
        const wrapper = getInstance({
            props: {
                mobile_route: 'UnitTestRouteOther',
            },
            device: { mobile: true },
        });

        expect(wrapper.attributes('style')).toContain('display: none;');
    });

    it('shows on mobile when matches any of given routes', async () => {
        await router.replace('/unit');

        const wrapper = getInstance({
            props: {
                mobile_route: 'UnitTestRouteOther,UnitTestRouteUnit',
            },
            device: { mobile: true },
        });

        expect(wrapper.attributes('style')).not.toContain('display: none;');
    });
});
