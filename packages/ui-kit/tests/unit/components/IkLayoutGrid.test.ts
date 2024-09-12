import type { RenderOptions } from '@ui/tests/tools/utils';
import { renderShallow } from '@ui/tests/tools/utils';
import { h } from 'vue';
import { IkLayoutGrid } from '@ui/components/IkLayoutGrid';

describe('IkLayoutGrid', () => {
    const getInstance = (options: RenderOptions<typeof IkLayoutGrid> = {}) => renderShallow(IkLayoutGrid, {}, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toStrictEqual([
            'ik-layout-grid',
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
