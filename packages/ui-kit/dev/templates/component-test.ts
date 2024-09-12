import type { RenderOptions } from '@ui/tests/tools/utils';
import { renderShallow } from '@ui/tests/tools/utils';
import { h } from 'vue';
import { [[NAME]] } from '@ui/components/[[NAME]]';

describe('[[NAME]]', () => {
    const getInstance = (options: RenderOptions<typeof [[NAME]]> = {}) => renderShallow([[NAME]], {}, options);

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
                default: () => h('div', 'Default slot test.'),
            },
        });
        expect(wrapper.text()).toContain('Default slot test.');
    });
});
