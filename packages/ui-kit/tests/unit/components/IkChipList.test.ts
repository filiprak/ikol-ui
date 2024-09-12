import { renderDeep } from '@ui/tests/tools/utils';
import { IkChipList } from '@ui/components/IkChipList';

describe('IkChipList', () => {
    const getInstance = (options = {}) => renderDeep(IkChipList, options);
    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toContain('ik-chip-list');
        expect(wrapper.element.tagName).toBe('DIV');
        expect(wrapper.element).toMatchSnapshot();
    });
});
