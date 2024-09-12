import { renderShallow } from '@ui/tests/tools/utils';
import { IkImageStack } from '@ui/components/IkImageStack';

describe('IkImageStack', () => {
    const getInstance = (options = {}) => renderShallow(IkImageStack, options);

    it('correct default state', () => {
        const wrapper = getInstance();

        expect(wrapper.props()).toMatchObject({ size: 24 });
        expect(wrapper.props()).toMatchObject({ max: 5 });
        expect(wrapper.props()).toMatchObject({ value: [] });
        expect(wrapper.classes()).toStrictEqual([
            'ik-image-stack',
            'ik-image-stack--view',
        ]);
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with more then max items', () => {
        const wrapper = getInstance({
            propsData: {
                max: 5,
                value: [
                    'http://test.com/image1',
                    'http://test.com/image2',
                    'http://test.com/image3',
                    'http://test.com/image4',
                    'http://test.com/image5',
                    'http://test.com/image6',
                    'http://test.com/image7',
                ],
            },
        });

        expect(wrapper.vm.visible_images).toStrictEqual([
            'http://test.com/image1',
            'http://test.com/image2',
            'http://test.com/image3',
            'http://test.com/image4',
            'http://test.com/image5',
        ]);

        expect(wrapper.vm.hidden_count).toBe('+2');
        expect(wrapper.findAll('.ik-image-stack__image-wrapper').length).toBe(6);
        expect(wrapper.find('.ik-image-stack__count').attributes().style).toContain('font-size: 8px');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with less then max items', () => {
        const wrapper = getInstance({
            propsData: {
                max: 5,
                value: [
                    'http://test.com/image1',
                    'http://test.com/image2',
                    'http://test.com/image3',
                ],
            },
        });

        expect(wrapper.findAll('.ik-image-stack__image-wrapper').length).toBe(4);
        expect(wrapper.find('.ik-image-stack__add').attributes().style).toContain('width: 24px');
        expect(wrapper.find('.ik-image-stack__add').attributes().style).toContain('height: 24px');
        expect(wrapper.find('.ik-image-stack__add').attributes().style).toContain('font-size: 10px');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('items has correct styles', () => {
        const wrapper = getInstance({
            props: {
                max: 3,
                size: 30,
                value: [
                    'http://test.com/image1',
                    'http://test.com/image2',
                    'http://test.com/image3',
                    'http://test.com/image4',
                ],
            },
        });
        const items = wrapper.findAll('.ik-image-stack__image-wrapper');

        items.forEach((item, index) => {
            expect(item.attributes().style).toContain(index > 1 ? 'margin-left: -9px' : '');
            expect(item.attributes().style).toContain('border-width: 2px');
            expect(item.attributes().style).toContain('z-index: ' + (items.length - index - 1));
        });
    });

    it('renders without add button', () => {
        const wrapper = getInstance({
            propsData: {
                max: 3,
                size: 30,
                view_mode: true,
                value: [
                    'http://test.com/image1',
                    'http://test.com/image2',
                    'http://test.com/image3',
                    'http://test.com/image4',
                ],
            },
        });
        const add_button = wrapper.find('.ik-image-stack__add');

        expect(add_button.exists()).toBeFalsy();

        expect(wrapper.classes()).toStrictEqual([
            'ik-image-stack',
        ]);
    });

    it('renders with disabled images', () => {
        const wrapper = getInstance({
            propsData: {
                max: 5,
                value: [
                    'http://test.com/image1',
                    'http://test.com/image2',
                    'http://test.com/image3',
                ],
                disabled: [
                    'http://test.com/image1',
                ],
            },
        });

        const items = wrapper.findAll('.ik-image-stack__image-wrapper');
        const disabled_item = items[0];

        expect(disabled_item.classes()).toContain('ik-image-stack__image-wrapper--disabled');
    });
});
