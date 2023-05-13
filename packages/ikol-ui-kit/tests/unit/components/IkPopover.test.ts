import { renderShallow } from '@/tests/tools/utils';
import { IkPopover } from '@/components/IkPopover';

describe('IkPopover', () => {
    const getInstance = (options = {}) => renderShallow(IkPopover, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toStrictEqual([
            'ik-popover',
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
