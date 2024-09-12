import { renderDeep } from '@ui/tests/tools/utils';
import { IkChip } from '@ui/components/IkChip';
import { IkIcon } from '@ui/components/IkIcon';

describe('IkChip', () => {
    const getInstance = (options = {}) => renderDeep(IkChip, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toContain('ik-chip');
        expect(wrapper.classes()).toContain('ik-chip--size-md');
        expect(wrapper.element.tagName).toBe('DIV');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders disabled', () => {
        const wrapper = getInstance({
            props: {
                disabled: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-chip--disabled');
    });

    it('renders with default slot text', () => {
        const wrapper = getInstance({
            slots: {
                default: 'Test',
            },
        });
        expect(wrapper.text()).toContain('Test');
    });

    it('renders with design parameter', () => {
        const wrapper = getInstance({
            props: {
                design: 'primary',
            },
        });
        expect(wrapper.classes()).toContain('ik-chip--primary');
    });

    it('renders removable', () => {
        const wrapper = getInstance({
            props: {
                removable: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-chip--removable');
        expect(wrapper.findComponent(IkIcon).props('icon')).toContain('times:light');
    });

    it('renders with custom_action', () => {
        const wrapper = getInstance({
            props: {
                custom_action: 'pen',
            },
        });
        expect(wrapper.findComponent(IkIcon).props('icon')).toContain('pen');
    });

    it('renders with size', () => {
        const wrapper = getInstance({
            props: {
                size: 'sm',
            },
        });
        expect(wrapper.classes()).toContain('ik-chip--size-sm');
    });

    it('renders with custom background color', () => {
        const wrapper = getInstance({
            props: {
                color: 'ffa500',
            },
        });
        expect(wrapper.html()).toContain('background-color: rgb(255, 165, 0);');
    });
});
