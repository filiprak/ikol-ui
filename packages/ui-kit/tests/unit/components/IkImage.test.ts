import { renderShallow } from '@ui/tests/tools/utils';
import { IkImage } from '@ui/components/IkImage';
import { IkLoaderCircle } from '@ui/components/IkLoaderCircle';

describe('IkImage', () => {
    const getInstance = (options = {}) => renderShallow(IkImage, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toStrictEqual([
            'ik-image',
            'ik-image--empty',
        ]);
        expect(wrapper.element.tagName).toBe('DIV');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with src and alt prop', () => {
        const wrapper = getInstance({
            props: {
                src: 'http://image.com/image.png',
                alt: 'Image Alt',
            },
        });
        expect(wrapper.element.tagName).toBe('IMG');
        expect(wrapper.attributes('src')).toBe('http://image.com/image.png');
        expect(wrapper.attributes('alt')).toBe('Image Alt');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders rounded', () => {
        const wrapper = getInstance({
            props: {
                src: 'http://image.com/image.png',
                round: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-image--round');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders optimized for window size', () => {
        const wrapper = getInstance({
            props: {
                src: 'http://image.com/image.png',
                contain: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-image--contain');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with custom size', () => {
        const wrapper = getInstance({
            props: {
                src: 'http://image.com/image.png',
                size: 97,
            },
        });
        expect(wrapper.attributes('style')).toContain('width: 97px;');
        expect(wrapper.attributes('style')).toContain('height: 97px;');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with custom width', () => {
        const wrapper = getInstance({
            props: {
                src: 'http://image.com/image.png',
                width: 59,
            },
        });
        expect(wrapper.attributes('style')).toContain('width: 59px;');
        expect(wrapper.attributes('style')).not.toContain('height');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with custom height', () => {
        const wrapper = getInstance({
            props: {
                src: 'http://image.com/image.png',
                height: 59,
            },
        });
        expect(wrapper.attributes('style')).toContain('height: 59px;');
        expect(wrapper.attributes('style')).not.toContain('width');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with contain param', () => {
        const wrapper = getInstance({
            props: {
                src: 'http://image.com/image.png',
                contain: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-image--contain');
    });

    it('renders with cover param', () => {
        const wrapper = getInstance({
            props: {
                src: 'http://image.com/image.png',
                cover: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-image--cover');
    });

    it('passes click listener', () => {
        const clickMock = jest.fn();

        const wrapper = getInstance({
            props: {
                src: 'http://image.com/image.png',
                onClick: clickMock,
            },
        });
        wrapper.find('img').trigger('click');

        expect(clickMock).toHaveBeenCalled();
    });

    it('adds custom attribute class', () => {
        const wrapper = getInstance({
            props: {
                src: 'http://image.com/image.png',
            },
            attrs: { class: 'unit-test ikol' },
        });
        wrapper.find('img').trigger('click');

        expect(wrapper.classes()).toContain('unit-test');
        expect(wrapper.classes()).toContain('ikol');
    });

    it('works with loader', () => {
        const wrapper = getInstance({
            props: {
                src: 'http://image.com/image.png',
                loader: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-image--loading');
        expect(wrapper.findComponent(IkLoaderCircle).isVisible()).toBeTruthy();
        expect(wrapper.find('img').isVisible()).toBeTruthy();
    });

    it('renders with width attribute', () => {
        const wrapper = getInstance({
            props: {
                src: 'http://image.com/image.png',
                width_attr: 59,
            },
        });
        expect(wrapper.attributes('width')).toBe('59');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with height attribute', () => {
        const wrapper = getInstance({
            props: {
                src: 'http://image.com/image.png',
                height_attr: 59,
            },
        });
        expect(wrapper.attributes('height')).toBe('59');
        expect(wrapper.element).toMatchSnapshot();
    });
});
