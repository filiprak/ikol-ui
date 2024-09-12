import { renderShallow } from '@ui/tests/tools/utils';
import { IkSVGIcon } from '@ui/components/IkSVGIcon';

describe('IkSVGIcon', () => {
    const getInstance = (options = {}) => renderShallow(IkSVGIcon, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toContain('ik-svg-icon');
        expect(wrapper.element.tagName).toBe('DIV');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with correct src', () => {
        const src = '/docs/stories/assets/plugin.svg';

        getInstance({
            props: {
                src,
            },
        });

        expect(window.fetch).toHaveBeenCalledWith(src);
    });

    it('renders as circle', () => {
        const wrapper = getInstance({
            props: {
                circle: true,
            },
        });

        expect(wrapper.classes()).toContain('ik-svg-icon--circle');
        expect(wrapper.attributes().style).toContain('width: 28px');
        expect(wrapper.attributes().style).toContain('height: 28px');
    });

    it('renders with pixel size', () => {
        const wrapper = getInstance({
            props: {
                size_px: 35,
            },
        });

        expect(Object.keys(wrapper.attributes())).toContain('style');
        expect(wrapper.attributes().style).toContain('width: 35px');
        expect(wrapper.attributes().style).toContain('height: 35px');
    });

    it('renders with pixel size as circle', () => {
        const wrapper = getInstance({
            props: {
                size_px: 35,
                circle: true,
            },
        });

        expect(Object.keys(wrapper.attributes())).toContain('style');
        expect(wrapper.classes()).toContain('ik-svg-icon--circle');
        expect(wrapper.attributes().style).toContain('width: 35px');
        expect(wrapper.attributes().style).toContain('height: 35px');
    });

    it('renders with design', () => {
        const wrapper = getInstance({
            props: {
                design: 'success',
            },
        });

        expect(wrapper.classes()).toContain('ik-svg-icon--success');
    });

    it('renders clickable', async () => {
        const clickFn = jest.fn();
        const wrapper = getInstance({
            props: {
                onClick: clickFn,
            },
        });

        await wrapper.find('.ik-svg-icon').trigger('click');

        expect(clickFn).toHaveBeenCalled();
        expect(wrapper.classes()).toContain('ik-svg-icon--clickable');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders disabled', () => {
        const wrapper = getInstance({
            props: {
                disabled: true,
            },
        });

        expect(wrapper.classes()).toContain('ik-svg-icon--disabled');
        expect(wrapper.classes()).not.toContain('ik-svg-icon--clickable');
        expect(wrapper.element).toMatchSnapshot();
    });
});
