import { IkPickerFieldItem } from '@ui/components/IkPickerField';
import { type RenderOptions, renderDeep } from '@ui/tests/tools/utils';

describe('IkPickerFieldItem', () => {
    const getInstance = (options: RenderOptions<typeof IkPickerFieldItem> = {}) => renderDeep(IkPickerFieldItem, options);

    it('renders with default state', () => {
        const wrapper = getInstance({
            props: {},
        });

        expect(wrapper.text()).toContain('Not set');
    });

    it('renders with value', () => {
        const wrapper = getInstance({
            props: {
                modelValue: {
                    code: 'COMPLETE',
                    color: 'BBC7D0',
                    text: 'Complete',
                },
            },
        });

        expect(wrapper.text()).toContain('Complete');
    });

    it('renders with text expression', () => {
        const wrapper = getInstance({
            props: {
                modelValue: {
                    code: 'COMPLETE',
                    color: 'BBC7D0',
                    text: 'Complete',
                },
                text_expression: (value: any) => {
                    return value.text.toUpperCase();
                },
            },
        });

        expect(wrapper.text()).toContain('COMPLETE');
    });

    it('renders disabled', () => {
        const wrapper = getInstance({
            props: {
                modelValue: {
                    code: 'COMPLETE',
                    color: 'BBC7D0',
                    text: 'Complete',
                },
                disabled: true,
                text_expression: (value: any) => {
                    return value.text.toUpperCase();
                },
            },
        });

        expect(wrapper.html()).toContain('ik-picker-field-item--disabled');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders action text as CHOOSE when modelValue is falsy', () => {
        const wrapper = getInstance({
            props: {},
        });

        expect(wrapper.text()).toContain('CHOOSE');
    });

    it('renders action text as UPDATE when modelValue is truthy', () => {
        const wrapper = getInstance({
            props: {
                modelValue: {
                    code: 'COMPLETE',
                    color: 'BBC7D0',
                    text: 'Complete',
                },
            },
        });

        expect(wrapper.text()).toContain('UPDATE');
    });

    it('renders custom action text through slot', () => {
        const wrapper = getInstance({
            props: {
                modelValue: {
                    code: 'COMPLETE',
                    color: 'BBC7D0',
                    text: 'Complete',
                },
            },
            slots: {
                'action-text': '<span>Custom Action</span>',
            },
        });

        expect(wrapper.text()).toContain('Custom Action');
    });
});
