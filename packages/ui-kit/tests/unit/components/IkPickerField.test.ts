import { IkPickerField } from '@ui/components/IkPickerField';
import { type RenderOptions, renderDeep } from '@ui/tests/tools/utils';

describe('IkPickerFieldItem', () => {
    let form = {
        registerField: jest.fn(),
        unregisterField: jest.fn(),
        validate: jest.fn(),
        emitVModel: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        form = {
            registerField: jest.fn(),
            unregisterField: jest.fn(),
            validate: jest.fn(),
            emitVModel: jest.fn(),
        };
    });
    const getInstance = (options: RenderOptions<typeof IkPickerField> = {}) => renderDeep(IkPickerField, options, {
        global: {
            provide: {
                form,
            },
        },
    });

    it('does not inherit attributes', () => {
        const wrapper = getInstance({
            props: {
                modelValue: 13,
                items: [
                    { value: 0, text: 'Test 0', color: 'FFFFFF' },
                    { value: 13, text: 'Test 13', color: 'FFFFFF' },
                ],
            },
        });
        expect(wrapper.vm.$options.inheritAttrs).toBe(false);
    });

    it('renders with default state', () => {
        const wrapper = getInstance({
            props: {
                modelValue: 13,
                items: [
                    { value: 0, text: 'Test 0', color: 'FFFFFF' },
                    { value: 13, text: 'Test 13', color: 'FFFFFF' },
                ],
            },
        });

        expect(wrapper.classes()).toStrictEqual([
            'ik-form-field',
            'ik-picker-field',
        ]);
        expect(wrapper.element).toMatchSnapshot();
    });

    // it('emits new value when child select updated', async () => {
    //     const wrapper = getInstance({
    //         props: {
    //             modelValue: 13,
    //             items: [
    //                 { value: 0, text: 'Test 0', color: 'FFFFFF' },
    //                 { value: 13, text: 'Test 13', color: 'FFFFFF' },
    //             ]
    //         }
    //     });

    //     // @todo fix wrapper.findComponent returns empty wrapper
    //     await wrapper.findComponent(typeof IkSelect).vm.$emit('update: modelValue', 0);
    //     expect(wrapper.emitted('input')).toStrictEqual([
    //         [0]
    //     ]);
    // });

    it('renders correctly with disabled property', () => {
        const wrapper = getInstance({
            props: {
                modelValue: 13,
                disabled: true,
                items: [
                    { value: 0, text: 'Test 0', color: 'FFFFFF' },
                    { value: 13, text: 'Test 13', color: 'FFFFFF' },
                ],
            },
        });

        expect(wrapper.html()).toContain('ik-list-item--disabled');
        expect(wrapper.element).toMatchSnapshot();
    });
});
