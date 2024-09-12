import type { RenderOptions } from '@ui/tests/tools/utils';
import { renderShallow } from '@ui/tests/tools/utils';
import { IkScrollArea } from '@ui/components/IkScrollArea';
import SimpleBar from 'simplebar';
import { IkLoaderCircle } from '@ui/components/IkLoaderCircle';

describe('IkScrollArea', () => {
    const getInstance = (options: RenderOptions<typeof IkScrollArea> = {}) => renderShallow(IkScrollArea, {}, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toStrictEqual([
            'ik-scroll-area',
        ]);
        expect(wrapper.element.tagName).toBe('DIV');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with default slot', () => {
        const wrapper = getInstance({
            slots: {
                default: '<div class="test">Area scroll content...</div>',
            },
        });
        expect(wrapper.text()).toContain('Area scroll content...');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('has simplebar attribute', () => {
        const wrapper = getInstance();
        expect(wrapper.attributes('data-simplebar')).toBe('');
    });

    it('calls SimpleBar.unMount() on destroy', () => {
        const wrapper = getInstance();

        const instance = new SimpleBar(wrapper.vm.$el);
        const unMount = jest.spyOn(instance, 'unMount');

        wrapper.unmount();

        expect(unMount).toHaveBeenCalled();
    });

    it('renders loader when loading and not all items loaded', () => {
        const wrapper = getInstance({
            props: {
                loading: true,
                pagination: {
                    offset: 8,
                    has_more: true,
                },
            },
            slots: {
                default: '<div class="test">Infinite scroll content...</div>',
            },
            attrs: {
                onIkLoadMore: jest.fn(),
            },
        });
        expect(wrapper.findComponent(IkLoaderCircle).isVisible()).toBe(true);
        expect(wrapper.text()).toContain('Infinite scroll content...');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('does not render loader when all items loaded', () => {
        const wrapper = getInstance({
            props: {
                loading: true,
                pagination: {
                    offset: 9,
                    has_more: false,
                },
            },
            slots: {
                default: '<div class="test">Infinite scroll content...</div>',
            },
            attrs: {
                onIkLoadMore: jest.fn(),
            },
        });
        expect(wrapper.findComponent(IkLoaderCircle).exists()).toBe(false);
        expect(wrapper.text()).toContain('Infinite scroll content...');
    });

    it('emits event when scrolled bottom element', () => {
        const wrapper = getInstance({
            props: {
                loading: false,
                pagination: {
                    offset: 9,
                    has_more: true,
                },
            },
            slots: {
                default: '<div class="test">Infinite scroll content...</div>',
            },
            attrs: {
                onIkLoadMore: jest.fn(),
            },
        });

        wrapper
            .find('.simplebar-content-wrapper')
            .trigger('scroll');

        expect(wrapper.emitted('ik-load-more')).toStrictEqual([
            [expect.objectContaining({ pagination: expect.any(Object) })],
        ]);
    });

    it('does not emit event when loading', () => {
        const wrapper = getInstance({
            props: {
                loading: true,
                pagination: {
                    offset: 9,
                    has_more: true,
                },
            },
            slots: {
                default: '<div class="test">Infinite scroll content...</div>',
            },
            attrs: {
                onIkLoadMore: jest.fn(),
            },
        });

        wrapper
            .find('.simplebar-content-wrapper')
            .trigger('scroll');

        expect(wrapper.emitted('ik-load-more')).toBeUndefined();
    });

    it('does not emit event when all loaded', () => {
        const wrapper = getInstance({
            props: {
                loading: false,
                pagination: {
                    offset: 9,
                    has_more: false,
                },
            },
            slots: {
                default: '<div class="test">Infinite scroll content...</div>',
            },
            attrs: {
                onIkLoadMore: jest.fn(),
            },
        });

        wrapper
            .find('.simplebar-content-wrapper')
            .trigger('scroll');

        expect(wrapper.emitted('ik-load-more')).toBeUndefined();
    });

    it('renders with hide x and hide y', () => {
        const wrapper = getInstance({
            props: {
                hide_x: true,
                hide_y: true,
            },
        });

        expect(wrapper.classes()).toContain('ik-scroll-area--hide-x');
        expect(wrapper.classes()).toContain('ik-scroll-area--hide-y');
    });

    it('renders loading in reverse mode', () => {
        const wrapper = getInstance({
            props: {
                reverse: true,
                loading: true,
                pagination: {
                    offset: 9,
                    has_more: true,
                },
            },
            attrs: {
                onIkLoadMore: jest.fn(),
            },
            slots: {
                default: '<div class="test">Infinite scroll content...</div>',
            },
        });

        expect(wrapper.findComponent(IkLoaderCircle).isVisible()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders without loader', () => {
        const wrapper = getInstance({
            props: {
                hide_loader: true,
                loading: true,
                pagination: {
                    offset: 0,
                    has_more: true,
                },
            },
            attrs: {
                onIkLoadMore: jest.fn(),
            },
            slots: {
                default: '<div class="test">Infinite scroll content...</div>',
            },
        });

        expect(wrapper.findComponent(IkLoaderCircle).exists()).toBeFalsy();
    });

    it('renders with disabled native auto anchoring', () => {
        const wrapper = getInstance({
            props: {
                disable_auto_anchoring: true,
            },
        });

        expect(wrapper.classes()).toContain('ik-scroll-area--no-auto-anchor');
    });
});
