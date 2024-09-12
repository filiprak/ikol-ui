import type { RenderOptions } from '@ui/tests/tools/utils';
import { renderShallow, wait } from '@ui/tests/tools/utils';
import { IkTextarea } from '@ui/components/IkTextarea';

describe('IkTextarea', () => {
    const getInstance = (options: RenderOptions<typeof IkTextarea> = {}) =>
        renderShallow(IkTextarea, {
            attachTo: document.body,
        }, options);

    beforeEach(() => {
        (document.activeElement as HTMLElement)?.blur();
    });

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toContain('ik-textarea');
        expect(wrapper.classes()).toContain('ik-f-input');
        expect(wrapper.classes()).toContain('ik-textarea--no-resize-x');
        expect(wrapper.element.tagName).toContain('TEXTAREA');
    });

    it('renders with correct custom state', () => {
        const wrapper = getInstance({
            props: {
                modelValue: 'Test value.',
                name: 'unit-test',
                required: true,
                readonly: true,
                disabled: true,
                placeholder: 'Test placeholder...',
                maxlength: 255,
                rows: 3,
                cols: 6,
                resize: true,
                resize_x: true,
                resize_y: false,
                wrap: 'soft',
            },
        });
        expect(wrapper.find('textarea').element.value).toBe('Test value.');
    });

    it('emits input event on value change', async () => {
        const wrapper = getInstance();

        await wrapper.find('textarea').setValue('test');

        expect(wrapper.emitted('update:modelValue')).toEqual([
            ['test'],
        ]);
    });

    it('renders with custom variant', () => {
        const wrapper = getInstance({
            props: {
                variant: 'test',
            },
        });

        expect(wrapper.classes()).toContain('ik-f-input--test');
    });

    it('works with autofocus', async () => {
        const wrapper = getInstance({
            props: {
                autofocus: true,
            },
        });

        await wait(50);
        expect(wrapper.element).toBe(document.activeElement);
    });
});
