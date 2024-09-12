import { renderShallow } from '@ui/tests/tools/utils';
import { IkList } from '@ui/components/IkList';

describe('IkList', () => {
    const getInstance = (options = {}) => renderShallow(IkList, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toStrictEqual([
            'ik-list',
        ]);
        expect(wrapper.element.tagName).toBe('DIV');
    });

    it('renders with default slot', () => {
        const wrapper = getInstance({
            slots: {
                default: '<div class="test">List content slot.</div>',
            },
        });
        expect(wrapper.text()).toContain('List content slot.');
    });
});
