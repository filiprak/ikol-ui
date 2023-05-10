import { renderShallow } from '@/tests/tools/utils';
import { IkAlert } from '@/components/IkAlert';
import { IkIcon } from '@/components/IkIcon';

describe('IkAlert', () => {
    const getInstance = (options = {}) => renderShallow(IkAlert, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toStrictEqual([
            'ik-alert',
        ]);
        expect(wrapper.element.tagName).toBe('DIV');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with default slot', () => {
        const wrapper = getInstance({
            slots: {
                default: '<div class="test">List item content slot.</div>',
            },
        });
        expect(wrapper.text()).toContain('List item content slot.');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with design', () => {
        const wrapper = getInstance({
            propsData: {
                design: 'error',
            },
        });
        expect(wrapper.classes()).toContain('ik-alert--error');
    });

    it('renders with variant', () => {
        const wrapper = getInstance({
            propsData: {
                variant: 'filled',
            },
        });
        expect(wrapper.classes()).toContain('ik-alert--filled');
    });

    it('renders with icon prop', () => {
        const wrapper = getInstance({
            propsData: {
                icon: 'user:light',
            },
        });

        expect(wrapper.findAllComponents(IkIcon).at(0)?.attributes('icon')).toBe('user:light');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with append slot', () => {
        const wrapper = getInstance({
            slots: {
                append: '<span>Append slot...</span>',
            },
        });

        expect(wrapper.text()).toContain('Append slot...');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with prepend slot', () => {
        const wrapper = getInstance({
            slots: {
                prepend: '<span>Prepend slot...</span>',
            },
        });

        expect(wrapper.text()).toContain('Prepend slot...');
        expect(wrapper.element).toMatchSnapshot();
    });
});
