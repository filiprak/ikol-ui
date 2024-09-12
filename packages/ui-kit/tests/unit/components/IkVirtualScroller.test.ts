import type { RenderOptions } from '@ui/tests/tools/utils';
import { renderDeep } from '@ui/tests/tools/utils';
import { IkVirtualScroller } from '@ui/components/IkVirtualScroller';

describe('IkVirtualScroller', () => {
    const getInstance = (options: RenderOptions<typeof IkVirtualScroller> = {}) => renderDeep(IkVirtualScroller, {}, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance({
            props: {
                items: [],
            },
        });
        expect(wrapper.classes()).toContain('ik-virtual-scroller');
    });

    it('renders with item slot', () => {
        const wrapper = getInstance({
            props: {
                items: [
                    { id: 1, text: 'Item 1' },
                    { id: 2, text: 'Item 2' },
                ],
            },
            slots: {
                item ({ item }) {
                    return JSON.stringify(item);
                },
            },
        });
        expect(wrapper.text()).toContain('{"id":1,"text":"Item 1"}');
    });
});
