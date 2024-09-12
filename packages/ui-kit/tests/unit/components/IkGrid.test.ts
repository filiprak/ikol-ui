import { renderDeep } from '@ui/tests/tools/utils';
import { IkGrid } from '@ui/components/IkGrid';

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

    it('renders with spacing and tag', () => {
        const wrapper = getInstance({
            props: {
                spacing_x: '3',
                spacing_y: '3',
                tag: 'span',
            },
        });
        expect(wrapper.classes()).toContain('ik-grid--spacing-x-3');
        expect(wrapper.classes()).toContain('ik-grid--spacing-y-3');
        expect(wrapper.html()).toContain('<span');
    });

    it('renders with spacing', () => {
        const wrapper = getInstance({
            props: {
                relative: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-grid--relative');
    });
});
