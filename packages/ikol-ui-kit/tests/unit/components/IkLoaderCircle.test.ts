import { mount } from '@vue/test-utils';
import { IkLoaderCircle } from '@/components/IkLoaderCircle';


describe('IkLoaderCircle', () => {
    let getInstance = (options = {}) => mount(IkLoaderCircle, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toStrictEqual([
            'ik-loader-circle',
        ]);
        expect(wrapper.find('.ik-loader-circle__bar').exists()).toBeTruthy();
        expect(wrapper.find('.ik-loader-circle__bckg').exists()).toBeTruthy();
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders indeterminate', () => {
        const wrapper = getInstance({
            props: {
                indeterminate: true,
            },
        });
        expect(wrapper.find('.ik-loader-circle__bar').exists()).toBeTruthy();
        expect(wrapper.find('.ik-loader-circle__bckg').exists()).toBeFalsy();
        expect(wrapper.classes()).toContain('ik-loader-circle--indeterminate');
    });

    it('renders with size', () => {
        const wrapper = getInstance({
            props: {
                size: 77,
            },
        });
        expect(wrapper.attributes('style')).toContain('width: 77px');
        expect(wrapper.attributes('style')).toContain('height: 77px');
    });

    it('renders with thickness', () => {
        const wrapper = getInstance({
            props: {
                size: 20,
                thickness: 10,
            },
        });
        expect(wrapper.findAll('circle').at(0)?.attributes('stroke-width')).toContain('40');
        expect(wrapper.findAll('circle').at(1)?.attributes('stroke-width')).toContain('40');
        expect(wrapper.findAll('svg').at(0)?.attributes('viewBox')).toContain('40 40 80 80');
    });

    it('renders with value', () => {
        const wrapper = getInstance({
            props: {
                value: 50,
                size: 20,
                thickness: 10,
            },
        });
        expect(wrapper.findAll('circle').at(1)?.attributes('stroke-dashoffset')).toContain('62.83');
        expect(wrapper.findAll('svg').at(0)?.attributes('viewBox')).toContain('40 40 80 80');
    });

    it('renders with zero value', () => {
        const wrapper = getInstance({
            props: {
                value: 0,
                size: 20,
                thickness: 10,
            },
        });
        expect(wrapper.findAll('circle').at(1)?.attributes('stroke-dashoffset')).toContain('125.66');
        expect(wrapper.findAll('svg').at(0)?.attributes('viewBox')).toContain('40 40 80 80');
    });

    it('renders with full value', () => {
        const wrapper = getInstance({
            props: {
                value: 100,
                size: 20,
                thickness: 10,
            },
        });
        expect(wrapper.findAll('circle').at(1)?.attributes('stroke-dashoffset')).toContain('0px');
        expect(wrapper.findAll('svg').at(0)?.attributes('viewBox')).toContain('40 40 80 80');
    });

    it('renders with overflow value', () => {
        const wrapper = getInstance({
            props: {
                value: 120,
                size: 20,
                thickness: 10,
            },
        });
        expect(wrapper.findAll('circle').at(1)?.attributes('stroke-dashoffset')).toContain('0px');
        expect(wrapper.findAll('svg').at(0)?.attributes('viewBox')).toContain('40 40 80 80');
    });

    it('renders with overflow negative value', () => {
        const wrapper = getInstance({
            props: {
                value: -120,
                size: 20,
                thickness: 10,
            },
        });
        expect(wrapper.findAll('circle').at(1)?.attributes('stroke-dashoffset')).toContain('125.66');
        expect(wrapper.findAll('svg').at(0)?.attributes('viewBox')).toContain('40 40 80 80');
    });

    it('renders rotated', () => {
        const wrapper = getInstance({
            props: {
                rotate: 90,
            },
        });
        expect(wrapper.find('svg').attributes('style')).toContain('transform: rotate(90deg)');
    });

    it('renders with design', () => {
        const wrapper = getInstance({
            props: {
                design: 'accent',
            },
        });
        expect(wrapper.classes()).toContain('ik-loader-circle--accent');
    });

});
