import { renderShallow } from '@ui/tests/tools/utils';
import { IkDivider } from '@ui/components/IkDivider';

describe('IkDivider', () => {
    const getInstance = (options = {}) => renderShallow(IkDivider, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toStrictEqual([
            'ik-divider',
        ]);
        expect(wrapper.element.tagName).toBe('DIV');
    });

    it('renders with default slot', () => {
        const wrapper = getInstance({
            slots: {
                default: '<div class="test">Default slot test.</div>',
            },
        });
        expect(wrapper.text()).toContain('Default slot test.');
    });

    it('renders with no bottom margin', () => {
        const wrapper = getInstance({
            props: {
                no_bottom_margin: true,
            },
        });

        expect(wrapper.classes()).toContain('ik-divider--no-b-margin');
    });

    it('renders with no margin', () => {
        const wrapper = getInstance({
            props: {
                no_margin: true,
            },
        });

        expect(wrapper.classes()).toContain('ik-divider--no-margin');
    });

    it('renders darken', () => {
        const wrapper = getInstance({
            props: {
                darken: true,
            },
        });

        expect(wrapper.classes()).toContain('ik-divider--darken');
    });
});
