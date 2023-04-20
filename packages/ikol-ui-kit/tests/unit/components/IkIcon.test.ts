import { mount } from '@vue/test-utils';
import { IkIcon } from '@/components/IkIcon';

describe('IkIcon', () => {
    const getInstance = (options = {}) => mount(IkIcon, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toStrictEqual([
            'ik-icon',
        ]);
        expect(wrapper.element.tagName).toBe('I');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with correct fa class', () => {
        const wrapper = getInstance({
            props: {
                icon: 'cogs:light',
            },
        });
        expect(wrapper.element.tagName).toBe('I');
        expect(wrapper.classes()).toStrictEqual([
            'ik-icon',
            'fa-light',
            'fa-cogs',
        ]);
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with custom tag', () => {
        const wrapper = getInstance({
            props: {
                tag: 'span',
            },
        });
        expect(wrapper.element.tagName).toBe('SPAN');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with custom size', () => {
        const wrapper = getInstance({
            props: {
                size: 5,
            },
        });
        expect(wrapper.classes()).toContain('fa-5x');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders disabled', () => {
        const wrapper = getInstance({
            props: {
                disabled: true,
            },
        });

        expect(wrapper.classes()).toContain('ik-icon--disabled');
        expect(wrapper.classes()).not.toContain('ik-icon--clickable');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders clickable', async () => {
        const clickFn = jest.fn();
        const wrapper = getInstance({
            props: {
                onClick: clickFn,
            },
        });

        await wrapper.find('.ik-icon').trigger('click');

        expect(clickFn).toHaveBeenCalled();
        expect(wrapper.classes()).toContain('ik-icon--clickable');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders as circle', () => {
        const wrapper = getInstance({
            props: {
                icon: 'home:light',
                circle: true,
            },
        });

        expect(wrapper.classes()).toContain('fa-light');
        expect(wrapper.classes()).toContain('fa-home');
        expect(wrapper.classes()).toContain('ik-icon--circle');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with design', () => {
        const wrapper = getInstance({
            props: {
                icon: 'home:light',
                design: 'success',
            },
        });

        expect(wrapper.classes()).toContain('fa-light');
        expect(wrapper.classes()).toContain('fa-home');
        expect(wrapper.classes()).toContain('ik-icon--success');
    });

    it('renders with pixel size', () => {
        const wrapper = getInstance({
            props: {
                icon: 'home',
                size_px: 37,
            },
        });

        expect(wrapper.classes()).toContain('fa-solid');
        expect(wrapper.classes()).toContain('fa-home');
        expect(wrapper.attributes('style')).toContain('font-size: 37px;');
    });

    it('renders with pixel size as circle', () => {
        const wrapper = getInstance({
            props: {
                icon: 'home:light',
                size_px: 37,
                circle: true,
            },
        });

        expect(wrapper.classes()).toContain('fa-light');
        expect(wrapper.classes()).toContain('fa-home');
        expect(wrapper.attributes('style')).toContain('width: 37px;');
        expect(wrapper.attributes('style')).toContain('height: 37px;');
        expect(wrapper.attributes('style')).toContain('font-size: 18.5px;');
    });
});
