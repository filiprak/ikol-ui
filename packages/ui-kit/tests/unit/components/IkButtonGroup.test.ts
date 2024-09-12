import { renderDeep } from '@ui/tests/tools/utils';
import { IkButtonGroup } from '@ui/components/IkButtonGroup';
import { h } from 'vue';

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
                default: () => [
                    h('div', 'Test'),
                ],
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

    it('renders stack', () => {
        const wrapper = getInstance({
            props: {
                stack: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-button-group--stack');
    });

    it('renders reverse', () => {
        const wrapper = getInstance({
            props: {
                reverse: true,
            },
            slots: {
                default: () => [
                    h('div', { class: 'child-1' }),
                    h('div', { class: 'child-2' }),
                    h('div', { class: 'child-3' }),
                ],
            },
        });
        expect(wrapper.html()).toMatchSnapshot();
    });
});
