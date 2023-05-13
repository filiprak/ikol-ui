import { renderShallow } from '@/tests/tools/utils';
import { IkDivider } from '@/components/IkDivider';

describe('IkDivider', () => {
    const getInstance = (options = {}) => renderShallow(IkDivider, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toStrictEqual([
            'ik-divider',
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
