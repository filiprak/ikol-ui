import type { RenderOptions } from '@ui/tests/tools/utils';
import { renderShallow } from '@ui/tests/tools/utils';
import { h } from 'vue';
import { IkModal } from '@ui/components/IkModal';

describe('IkModal', () => {
    const getInstance = (options: RenderOptions<typeof IkModal> = {}) => renderShallow(IkModal, {
        global: {
            provide: { controller: {} },
        },
    }, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toStrictEqual([
            'ik-modal',
            'ik-modal--size-md',
        ]);
        expect(wrapper.element.tagName).toBe('DIV');
    });

    it('renders with default slot', () => {
        const wrapper = getInstance({
            slots: {
                default: () => h('div', 'Default slot test.'),
            },
        });
        expect(wrapper.html()).toContain('Default slot test.');
    });
});
