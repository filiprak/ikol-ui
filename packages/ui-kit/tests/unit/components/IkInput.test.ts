import type { RenderOptions } from '@ui/tests/tools/utils';
import { renderDeep, wait } from '@ui/tests/tools/utils';
import { IkInput } from '@ui/components/IkInput';
import { IkIcon } from '@ui/components/IkIcon';

describe('IkInput', () => {
    const getInstance = (options: RenderOptions<typeof IkInput> = {}) => renderDeep(IkInput, {
        attachTo: document.body,
    }, options);

    beforeEach(() => {
        (document.activeElement as HTMLElement)?.blur();
    });

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toStrictEqual([
            'ik-input',
        ]);
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with correct custom state', () => {
        const wrapper = getInstance({
            props: {
                modelValue: 'Test value.',
                type: 'password',
                name: 'unit-test',
                size: 'sm',
                required: true,
                readonly: true,
                disabled: true,
                autocomplete: 'on',
                placeholder: 'Test placeholder...',
                min: 0,
                max: 15,
                maxlength: 100,
                minlength: 4,
                step: 55,
            },
        });
        expect(wrapper.find('input').element.value).toBe('Test value.');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with size', () => {
        const wrapper = getInstance({
            props: {
                size: 'lg',
            },
        });
        expect(wrapper.find('input').classes()).toContain('ik-f-input--size-lg');
    });

    it('emits input event on value change', async () => {
        const wrapper = getInstance();

        await wrapper.find('input').setValue('test');

        expect(wrapper.emitted('update:modelValue')).toEqual([
            ['test'],
        ]);
    });

    it('works with focus() method', () => {
        const wrapper = getInstance();

        wrapper.vm.focus();

        expect(document.activeElement).toBe(wrapper.find('input').element);
    });

    it('works with hasFocus() method', () => {
        const wrapper = getInstance();

        expect(wrapper.vm.hasFocus()).toBe(false);

        wrapper.vm.focus();
        expect(wrapper.vm.hasFocus()).toBe(true);
    });

    it('works with decimals format', async () => {
        const wrapper = getInstance({
            props: {
                decimals: 1,
            },
        });

        expect(wrapper.find('input').element.value).toBe('');

        await wrapper.setProps({ modelValue: 5 });
        expect(wrapper.find('input').element.value).toBe('5.0');

        await wrapper.setProps({ modelValue: 'test' });
        expect(wrapper.find('input').element.value).toBe('test');
    });

    it('does not format decimals when focused', async () => {
        const wrapper = getInstance({
            props: {
                decimals: 1,
            },
        });

        wrapper.vm.focus();
        expect(wrapper.vm.hasFocus()).toBeTruthy();

        expect(wrapper.find('input').element.value).toBe('');

        await wrapper.setProps({ modelValue: 5 });
        expect(wrapper.find('input').element.value).toBe('5');

        await wrapper.setProps({ modelValue: 'test' });
        expect(wrapper.find('input').element.value).toBe('test');
    });

    it('emits event on focusout when have decimals', async () => {
        const wrapper = getInstance({
            props: {
                decimals: 3,
            },
        });

        wrapper.vm.focus();
        expect(wrapper.vm.hasFocus()).toBeTruthy();

        wrapper.find('input').element.value = '8';

        await wrapper.find('input').trigger('focusout');

        expect(wrapper.emitted('update:modelValue')).toStrictEqual([
            ['8.000'],
        ]);
        expect(wrapper.emitted('focusout')).toHaveLength(1);
        expect(wrapper.emitted('focusout')?.[0][0]).toStrictEqual(expect.any(FocusEvent));
    });

    it('renders with custom variant', () => {
        const wrapper = getInstance({
            props: {
                variant: 'flat',
            },
        });

        expect(wrapper.find('input').classes()).toContain('ik-f-input--flat');
    });

    it('renders with prepend slot', () => {
        const wrapper = getInstance({
            slots: {
                prepend: 'Unit test...',
            },
        });

        expect(wrapper.classes()).toContain('ik-input');
        expect(wrapper.classes()).toContain('ik-input--prepend');
        expect(wrapper.text()).toContain('Unit test...');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with append slot', () => {
        const wrapper = getInstance({
            slots: {
                append: 'Unit test...',
            },
        });

        expect(wrapper.classes()).toContain('ik-input');
        expect(wrapper.classes()).toContain('ik-input--append');
        expect(wrapper.text()).toContain('Unit test...');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with prepend icon', () => {
        const wrapper = getInstance({
            props: {
                prepend_icon: 'times:light',
            },
        });

        expect(wrapper.classes()).toContain('ik-input');
        expect(wrapper.classes()).toContain('ik-input--prepend');
        expect(wrapper.findComponent(IkIcon).props('icon')).toBe('times:light');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with icon', () => {
        const wrapper = getInstance({
            props: {
                icon: 'times:light',
            },
        });

        expect(wrapper.classes()).toContain('ik-input');
        expect(wrapper.classes()).toContain('ik-input--prepend');
        expect(wrapper.findComponent(IkIcon).props('icon')).toBe('times:light');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with append icon', () => {
        const wrapper = getInstance({
            props: {
                append_icon: 'times:light',
            },
        });

        expect(wrapper.classes()).toContain('ik-input');
        expect(wrapper.classes()).toContain('ik-input--append');
        expect(wrapper.findComponent(IkIcon).props('icon')).toBe('times:light');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('emits append and prepend click events', async () => {
        const prependClickFn = jest.fn();
        const appendClickFn = jest.fn();

        const wrapper = getInstance({
            props: {
                prepend_icon: 'times:light',
                append_icon: 'home',
            },
            attrs: {
                onIkClickPrepend: prependClickFn,
                onIkClickAppend: appendClickFn,
            },
        });

        await wrapper.findAllComponents(IkIcon).at(0)?.trigger('click');
        await wrapper.findAllComponents(IkIcon).at(1)?.trigger('click');

        expect(prependClickFn).toHaveBeenCalled();
        expect(appendClickFn).toHaveBeenCalled();
    });

    it('works with autofocus', async () => {
        const wrapper = getInstance({
            props: {
                autofocus: true,
            },
        });

        await wait(50);

        expect(wrapper.find('input').element).toBe(document.activeElement);
    });

    it('works with append_clear_icon', async () => {
        const wrapper = getInstance({
            props: {
                modelValue: '',
                append_clear_icon: true,
            },
        });

        expect(wrapper.findComponent(IkIcon).isVisible()).toBe(false);

        await wrapper.setProps({ modelValue: 'xyz' });

        expect(wrapper.findComponent(IkIcon).isVisible()).toBe(true);

        await wrapper.findComponent(IkIcon).trigger('click');

        expect(wrapper.emitted('update:modelValue')).toEqual([
            [''],
        ]);
    });

    it('clamps number value to range', async () => {
        const wrapper = getInstance({
            props: {
                type: 'number',
                min: 0,
                max: 99,
            },
        });

        await wrapper.find('input').setValue('-1');

        expect(wrapper.emitted('update:modelValue')).toEqual([
            ['0'],
        ]);

        await wrapper.find('input').setValue('0');

        expect(wrapper.emitted('update:modelValue')).toEqual([
            ['0'],
            ['0'],
        ]);

        await wrapper.find('input').setValue('100');

        expect(wrapper.emitted('update:modelValue')).toEqual([
            ['0'],
            ['0'],
            ['99'],
        ]);

        await wrapper.find('input').setValue('99.001');

        expect(wrapper.emitted('update:modelValue')).toEqual([
            ['0'],
            ['0'],
            ['99'],
            ['99'],
        ]);
    });

    it('clamps number value to float range', async () => {
        const wrapper = getInstance({
            props: {
                type: 'number',
                min: '0.00',
                max: '99.77',
                decimals: 2,
            },
        });

        await wrapper.find('input').setValue('-1');

        expect(wrapper.emitted('update:modelValue')).toEqual([
            ['0'],
        ]);

        await wrapper.find('input').setValue('0');

        expect(wrapper.emitted('update:modelValue')).toEqual([
            ['0'],
            ['0'],
        ]);

        await wrapper.find('input').setValue('100');

        expect(wrapper.emitted('update:modelValue')).toEqual([
            ['0'],
            ['0'],
            ['99.77'],
        ]);

        await wrapper.find('input').setValue('99.771');

        expect(wrapper.emitted('update:modelValue')).toEqual([
            ['0'],
            ['0'],
            ['99.77'],
            ['99.77'],
        ]);

        await wrapper.find('input').setValue('99.77');

        expect(wrapper.emitted('update:modelValue')).toEqual([
            ['0'],
            ['0'],
            ['99.77'],
            ['99.77'],
            ['99.77'],
        ]);
    });

    it('works with simple decimal type', async () => {
        const wrapper = getInstance({
            props: {
                type: 'decimal',
            },
        });

        await wrapper.find('input').setValue('');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
        expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([
            [''],
        ]);

        await wrapper.find('input').setValue('0');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(2);
        expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([
            ['0'],
        ]);

        await wrapper.find('input').setValue('0.0');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(3);
        expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([
            ['0.0'],
        ]);

        await wrapper.find('input').setValue('0,01');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(4);
        expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([
            ['0.01'],
        ]);

        await wrapper.find('input').setValue('-6,79');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(5);
        expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([
            ['-6.79'],
        ]);

        await wrapper.find('input').setValue('  ');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(6);
        expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([
            ['0'],
        ]);

        await wrapper.find('input').setValue('xxx');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(7);
        expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([
            ['0'],
        ]);

        await wrapper.find('input').setValue('--7');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(8);
        expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([
            ['0'],
        ]);

        await wrapper.find('input').setValue('-9.99.993');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(9);
        expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([
            ['-999.993'],
        ]);

        await wrapper.find('input').setValue('-9,99.993');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(10);
        expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([
            ['-999.993'],
        ]);

        await wrapper.find('input').setValue('-9,99.');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(11);
        expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([
            ['-999.'],
        ]);
    });

    it('works with complex decimal type', async () => {
        const wrapper = getInstance({
            props: {
                type: 'decimal',
                min: 0,
                max: 13,
                decimals: 3,
            },
        });

        await wrapper.find('input').setValue('');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
        expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([
            [''],
        ]);

        await wrapper.find('input').setValue('0');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(2);
        expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([
            ['0'],
        ]);

        await wrapper.find('input').setValue('0.0');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(3);
        expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([
            ['0.0'],
        ]);

        await wrapper.find('input').setValue('0,01');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(4);
        expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([
            ['0.01'],
        ]);

        await wrapper.find('input').setValue('-6,79');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(5);
        expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([
            ['0'],
        ]);

        await wrapper.find('input').setValue('  ');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(6);
        expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([
            ['0'],
        ]);

        await wrapper.find('input').setValue('xxx');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(7);
        expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([
            ['0'],
        ]);

        await wrapper.find('input').setValue('--7');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(8);
        expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([
            ['0'],
        ]);

        await wrapper.find('input').setValue('1.2.99311');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(9);
        expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([
            ['12.99311'],
        ]);

        await wrapper.find('input').setValue('1,1,93');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(10);
        expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([
            ['11.93'],
        ]);

        await wrapper.find('input').setValue('9,.');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(11);
        expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([
            ['9.'],
        ]);

        await wrapper.find('input').setValue('99');
        expect(wrapper.emitted('update:modelValue')).toHaveLength(12);
        expect(wrapper.emitted('update:modelValue')?.slice(-1)).toEqual([
            ['13'],
        ]);
    });
});
