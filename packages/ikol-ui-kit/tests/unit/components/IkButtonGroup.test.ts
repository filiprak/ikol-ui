import { renderDeep } from '@/tests/tools/utils';
import { IkButtonGroup } from '@/components/IkButtonGroup';

describe('IkButtonGroup', () => {
    const getInstance = (options = {}) => renderDeep(IkButtonGroup, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toContain('ik-button-group');
        expect(wrapper.element.tagName).toBe('DIV');
    });

    it('renders with default slot', () => {
        const wrapper = getInstance({
            slots: {
                default: 'Test',
            },
        });
        expect(wrapper.text()).toContain('Test');
    });

    it('renders equal', () => {
        const wrapper = getInstance({
            props: {
                equal: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-button-group--equal');
    });
});
