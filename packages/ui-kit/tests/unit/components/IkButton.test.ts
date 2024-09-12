import { renderDeep } from '@ui/tests/tools/utils';
import { IkButton } from '@ui/components/IkButton';
import { IkIcon } from '@ui/components/IkIcon';

describe('IkButton', () => {
    const getInstance = (options = {}) => renderDeep(IkButton, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toContain('ik-button');
        expect(wrapper.classes()).toContain('ik-button--default');
        expect(wrapper.classes()).toContain('ik-button--filled');
        expect(wrapper.element.tagName).toBe('BUTTON');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with custom tag', () => {
        const wrapper = getInstance({
            props: {
                tag: 'span',
            },
        });
        expect(wrapper.element.tagName).toBe('SPAN');
    });

    it('renders with default slot', () => {
        const wrapper = getInstance({
            slots: {
                default: 'Test',
            },
        });
        expect(wrapper.text()).toContain('Test');
    });

    it('renders with type', () => {
        const wrapper = getInstance({
            props: {
                type: 'submit',
            },
        });
        expect(wrapper.attributes('type')).toBe('submit');
    });

    it('renders with design', () => {
        const wrapper = getInstance({
            props: {
                design: 'primary',
            },
        });
        expect(wrapper.classes()).toContain('ik-button--primary');
    });

    it('renders as block', () => {
        const wrapper = getInstance({
            props: {
                block: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-button--block');
    });

    it('renders separate', () => {
        const wrapper = getInstance({
            props: {
                separate: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-button--separate');
    });

    it('renders disabled', () => {
        const wrapper = getInstance({
            props: {
                disabled: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-button--disabled');
    });

    it('renders active', () => {
        const wrapper = getInstance({
            props: {
                active: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-button--active');
    });

    it('renders circle', () => {
        const wrapper = getInstance({
            props: {
                circle: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-button--circle');
    });

    it('renders round', () => {
        const wrapper = getInstance({
            props: {
                round: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-button--round');
    });

    it('renders fab', () => {
        const wrapper = getInstance({
            props: {
                fab: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-button--fab');
    });

    it('renders loading', () => {
        const wrapper = getInstance({
            props: {
                loading: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-button--loading');
        expect(wrapper.text()).not.toContain('Loading');
    });

    it('renders loading with default slot', () => {
        const wrapper = getInstance({
            props: {
                loading: true,
            },
            slots: {
                default: 'Test',
            },
        });
        expect(wrapper.classes()).toContain('ik-button--loading');
        expect(wrapper.text()).toContain('Loading');
    });

    it('renders with size', () => {
        const wrapper = getInstance({
            props: {
                size: 'lg',
            },
        });
        expect(wrapper.classes()).toContain('ik-button--size-lg');
    });

    it('renders with variants', () => {
        const wrapper = getInstance({
            props: {
                variant: 'flat',
            },
        });
        expect(wrapper.classes()).toContain('ik-button--flat');
    });

    it('renders with quick variants', () => {
        const wrapper = getInstance({
            props: {
                flat: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-button--flat');
    });

    it('renders as skeleton', () => {
        const wrapper = getInstance({
            props: {
                skeleton: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-button--skeleton');
    });

    it('renders with prepend icon', () => {
        const wrapper = getInstance({
            props: {
                prepend_icon: 'home',
            },
            slots: {
                default: 'Test',
            },
        });
        expect(wrapper.findComponent(IkIcon).props('icon')).toContain('home');
        expect(wrapper.text()).toContain('Test');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with icon', () => {
        const wrapper = getInstance({
            props: {
                icon: 'home',
            },
            slots: {
                default: 'Test',
            },
        });
        expect(wrapper.findComponent(IkIcon).props('icon')).toContain('home');
        expect(wrapper.text()).toContain('Test');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with append icon', () => {
        const wrapper = getInstance({
            props: {
                append_icon: 'home',
            },
            slots: {
                default: 'Test',
            },
        });
        expect(wrapper.findComponent(IkIcon).props('icon')).toContain('home');
        expect(wrapper.text()).toContain('Test');
        expect(wrapper.element).toMatchSnapshot();
    });
});
