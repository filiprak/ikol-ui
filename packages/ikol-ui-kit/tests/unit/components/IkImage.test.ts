import { renderShallow } from '@/tests/tools/utils';
import { IkImage } from '@/components/IkImage';

describe('IkImage', () => {
    const getInstance = (options = {}) => renderShallow(IkImage, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toStrictEqual([
            'ik-image',
        ]);
        expect(wrapper.element.tagName).toBe('DIV');
    });

    it('renders with default slot', () => {
        const wrapper = getInstance({
            slots: {
                default: '<div class="test">Default slot test.</div>',
            },
        });
        expect(wrapper.text()).toContain('Default slot test.');
    });
});
