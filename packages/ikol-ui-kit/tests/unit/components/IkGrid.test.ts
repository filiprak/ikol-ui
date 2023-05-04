import { renderDeep } from '@/tests/tools/utils';
import { IkGrid } from '@/components/IkGrid';

describe('IkGrid', () => {
    const getInstance = (options = {}) => renderDeep(IkGrid, options);

    it('renders empty', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toStrictEqual([
            'ik-grid',
        ]);
    });

    it('renders with default slot', () => {
        const wrapper = getInstance({
            slots: {
                default: '<div>This is grid test content</div>',
            },
        });
        expect(wrapper.text()).toContain('This is grid test content');
    });

    it('renders with spacing', () => {
        const wrapper = getInstance({
            propsData: {
                spacingX: '3',
                spacingY: '3',
                tag: 'span',
            },
        });
        expect(wrapper.classes()).toContain('ik-grid--spacing-x-3');
        expect(wrapper.classes()).toContain('ik-grid--spacing-y-3');
        expect(wrapper.html()).toContain('<span class="ik-grid ik-grid--spacing-x-3 ik-grid--spacing-y-3"></span>');
    });
});
