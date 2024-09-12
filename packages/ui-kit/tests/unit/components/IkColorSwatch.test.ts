import { renderDeep } from '@ui/tests/tools/utils';
import { IkColorSwatch } from '@ui/components/IkColorSwatch';

describe('IkColorSwatch', () => {
    const getInstance = (options = {}) => renderDeep(IkColorSwatch, options);

    it('has correct classes, style and default props', () => {
        const wrapper = getInstance();
        expect(wrapper.vm.format).toEqual('hex');
        expect(wrapper.vm.color).toEqual(undefined);
        expect(wrapper.vm.round).toEqual(false);

        expect(wrapper.vm.root_class).toEqual({
            'ik-color-swatch': true,
            'ik-color-swatch--round': false,
        });
        expect(wrapper.vm.root_style).toEqual({});
        expect(wrapper.element).toMatchSnapshot();
    });

    it('has correct classes and style when round', () => {
        const wrapper = getInstance({
            propsData: {
                round: true,
            },
        });
        expect(wrapper.vm.root_class).toEqual({
            'ik-color-swatch': true,
            'ik-color-swatch--round': true,
        });
        expect(wrapper.vm.root_style).toEqual({});
        expect(wrapper.element).toMatchSnapshot();
    });

    it('has correct style for hex color', () => {
        const wrapper = getInstance({
            propsData: {
                round: true,
                format: 'hex',
                color: 'ff00aa',
            },
        });
        expect(wrapper.vm.root_style).toEqual({ backgroundColor: '#ff00aa' });
        expect(wrapper.element).toMatchSnapshot();
    });

    it('has correct style for rgb format', () => {
        const wrapper = getInstance({
            propsData: {
                round: true,
                format: 'rgb',
                color: 'rgb(0.1, 0.0, 1.0)',
            },
        });
        expect(wrapper.vm.root_style).toEqual({ backgroundColor: 'rgb(0.1, 0.0, 1.0)' });
    });

    it('has correct style for rgb array format', () => {
        const wrapper = getInstance({
            propsData: {
                round: true,
                format: 'rgb',
                color: [0.1, 0.0, 1.0],
            },
        });
        expect(wrapper.vm.root_style).toEqual({ backgroundColor: 'rgb(0.1, 0, 1)' });
    });

    it('has correct style for rgba format', () => {
        const wrapper = getInstance({
            propsData: {
                round: true,
                format: 'rgba',
                color: 'rgba(0.1, 0.0, 1.0, 1.0)',
            },
        });
        expect(wrapper.vm.root_style).toEqual({ backgroundColor: 'rgba(0.1, 0.0, 1.0, 1.0)' });
    });

    it('has correct style for rgba array format', () => {
        const wrapper = getInstance({
            propsData: {
                round: true,
                format: 'rgba',
                color: [0.1, 0.0, 1.0, 1.0],
            },
        });
        expect(wrapper.vm.root_style).toEqual({ backgroundColor: 'rgba(0.1, 0, 1, 1)' });
    });

    it('has correct style for css format', () => {
        const wrapper = getInstance({
            propsData: {
                round: true,
                format: 'css',
                color: '#3344ff',
            },
        });
        expect(wrapper.vm.root_style).toEqual({ backgroundColor: '#3344ff' });
    });

    it('renders with custom size', () => {
        const wrapper = getInstance({
            propsData: {
                size: 'lg',
            },
        });
        expect(wrapper.classes()).toContain('ik-color-swatch--lg');
    });
});
