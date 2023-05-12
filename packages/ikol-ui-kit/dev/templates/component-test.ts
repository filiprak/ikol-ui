import { renderShallow } from '@/tests/tools/utils';
import { [[NAME]] } from '@/components/[[NAME]]';

describe('[[NAME]]', () => {
    const getInstance = (options = {}) => renderShallow([[NAME]], options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toStrictEqual([
            '[[NAME_KEBAB]]',
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
