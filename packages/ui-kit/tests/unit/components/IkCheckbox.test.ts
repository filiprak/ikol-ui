import { renderShallow, type RenderOptions } from '@ui/tests/tools/utils';
import { IkCheckbox } from '@ui/components/IkCheckbox';

describe('IkCheckbox', () => {
    const getInstance = (options: RenderOptions<typeof IkCheckbox> = {}) => renderShallow(IkCheckbox, {
        attachTo: document.body,
    }, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toStrictEqual([
            'ik-checkbox',
            'ik-checkbox--basic',
        ]);
        expect(wrapper.vm.internal_checked).toBe(false);
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with default slot', () => {
        const wrapper = getInstance({
            slots: {
                default: '<span>This is checkbox text...</span>',
            },
        });

        expect(wrapper.text()).toContain('This is checkbox text');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders checked', () => {
        const wrapper = getInstance({
            props: {
                modelValue: true,
            },
        });

        expect(wrapper.vm.internal_checked).toBe(true);
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders disabled', () => {
        const wrapper = getInstance({
            props: {
                disabled: true,
            },
        });

        expect(wrapper.classes()).toContain('ik-checkbox--disabled');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders indeterminate', () => {
        const wrapper = getInstance({
            props: {
                indeterminate: true,
            },
        });

        expect(wrapper.find('ik-icon-stub').attributes().icon).toBe('minus');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('emits event when toggled', () => {
        const wrapper = getInstance({
            props: {
                modelValue: true,
                name: 'checked1',
            },
        });

        wrapper.find('input').trigger('click');
        wrapper.find('input').trigger('click');

        expect(wrapper.emitted('update:modelValue')).toStrictEqual([
            [false],
            [true],
        ]);
    });

    it('emits event when string type', async () => {
        const wrapper = getInstance({
            props: {
                modelValue: 'string',
                name: 'test-1',
            },
        });

        wrapper.find('input').trigger('click');
        wrapper.find('input').trigger('click');

        expect(wrapper.emitted('update:modelValue')).toStrictEqual([
            ['test-1'],
            [''],
        ]);
    });

    it('emits event when string type with initial model', () => {
        const wrapper = getInstance({
            props: {
                name: 'test-1',
                modelValue: 'test-1',
            },
        });

        wrapper.find('input').trigger('click');
        wrapper.find('input').trigger('click');

        expect(wrapper.emitted('update:modelValue')).toStrictEqual([
            [''],
            ['test-1'],
        ]);
    });

    it('emits event when string type with initial model 2', () => {
        const wrapper = getInstance({
            props: {
                name: 'test-1',
                modelValue: 'xyz',
            },
        });

        wrapper.find('input').trigger('click');
        wrapper.find('input').trigger('click');

        expect(wrapper.emitted('update:modelValue')).toStrictEqual([
            ['test-1'],
            [''],
        ]);
    });

    it('emits event when array type', () => {
        const wrapper = getInstance({
            props: {
                name: 'test-1',
                modelValue: [],
            },
        });

        wrapper.find('input').trigger('click');

        expect(wrapper.emitted('update:modelValue')).toStrictEqual([
            [['test-1']],
        ]);
    });

    it('emits event when array type with initial model', async () => {
        const wrapper = getInstance({
            props: {
                name: 'test-1',
                modelValue: ['a', 'b', 'test-1'],
            },
        });

        wrapper.find('input').trigger('click');
        expect(wrapper.emitted('update:modelValue')).toStrictEqual([
            [['a', 'b']],
        ]);

        await wrapper.setProps({ modelValue: ['a', 'b'] });

        wrapper.find('input').trigger('click');
        expect(wrapper.emitted('update:modelValue')).toStrictEqual([
            [['a', 'b']],
            [['a', 'b', 'test-1']],
        ]);
    });

    it('renders in basic variant', () => {
        const wrapper = getInstance({
            props: {
                variant: 'basic',
            },
        });

        expect(wrapper.classes()).toContain('ik-checkbox--basic');
    });

    it('renders in switch variant', () => {
        const wrapper = getInstance({
            props: {
                variant: 'switch',
            },
        });

        expect(wrapper.classes()).toContain('ik-checkbox--switch');
        expect(wrapper.find('.ik-checkbox__switch').isVisible()).toBeTruthy();
    });

    it('renders without label margin', () => {
        const wrapper = getInstance({
            props: {
                no_margin: true,
            },
        });

        expect(wrapper.classes()).toContain('ik-checkbox--no-margin');
    });
});
