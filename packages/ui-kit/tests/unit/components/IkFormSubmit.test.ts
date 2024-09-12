import { renderDeep } from '@ui/tests/tools/utils';
import { IkButton } from '@ui/components/IkButton';
import { IkFormSubmit } from '@ui/components/IkFormSubmit';

describe('IkFormSubmit', () => {
    const getInstance = (options = {}) => renderDeep(IkFormSubmit, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        const button = wrapper.findAllComponents(IkButton).at(1);
        expect(button).toBeDefined();
        expect(button?.props('icon')).toContain('check:light');
        expect(button?.props('disabled')).toBe(false);
        expect(button?.props('size')).toBe('lg');
    });

    it('renders with submit disabled', () => {
        const wrapper = getInstance({
            props: {
                disabled: true,
            },
        });
        expect(wrapper.findAllComponents(IkButton).at(1)?.props('disabled')).toBe(true);
    });

    it('renders loading spinner', async () => {
        const wrapper = getInstance({
            props: {
                loading: true,
            },
        });
        expect(wrapper.findAllComponents(IkButton).at(1)?.props('loading')).toBe(true);
    });

    it('emits ik-cancel on disabled', async () => {
        const wrapper = getInstance({
            props: {
                disabled: true,
            },
        });
        await wrapper.findAllComponents(IkButton).at(0)?.trigger('click');
        expect(wrapper.emitted('ik-cancel')).toHaveLength(1);
    });

    it('emits ik-cancel on enabled', async () => {
        const wrapper = getInstance({
            props: {
                disabled: false,
            },
        });
        await wrapper.findAllComponents(IkButton).at(0)?.trigger('click');
        expect(wrapper.emitted('ik-cancel')).toHaveLength(1);
    });

    it('emits ik-reset', async () => {
        const wrapper = getInstance({
            props: {
                show_reset: true,
            },
        });
        await wrapper.findAllComponents(IkButton).at(1)?.trigger('click');
        expect(wrapper.emitted('ik-reset')).toHaveLength(1);
    });

    it('emits ik-submit on enabled', async () => {
        const wrapper = getInstance({
            props: {
                disabled: false,
            },
        });
        await wrapper.findAllComponents(IkButton).at(1)?.trigger('click');
        expect(wrapper.emitted('ik-submit')).toHaveLength(1);
    });

    it('does not emit ik-submit on disabled', async () => {
        const wrapper = getInstance({
            props: {
                disabled: true,
            },
        });
        await wrapper.findAllComponents(IkButton).at(1)?.trigger('click');
        expect(wrapper.emitted('ik-submit')).toBeUndefined();
        expect(wrapper.emitted('ik-cancel')).toBeUndefined();
    });

    it('adds form prop to button', async () => {
        const wrapper = getInstance({
            props: {
                form: 'test-1',
            },
        });
        expect(wrapper.findAllComponents(IkButton).at(1)?.attributes('form')).toBe('test-1');
    });

    it('renders with design', async () => {
        const wrapper = getInstance({
            props: {
                design: 'accent',
            },
        });
        expect(wrapper.findAllComponents(IkButton).at(1)?.props('design')).toBe('accent');
    });

    it('renders reset button', async () => {
        const wrapper = getInstance({
            props: {
                show_reset: true,
            },
        });
        expect(wrapper.html()).toContain('Reset');
        expect(wrapper.findAllComponents(IkButton).at(1)?.props('design')).toBe('default');
    });

    it('renders without reset button', async () => {
        const wrapper = getInstance({
            props: {
                show_reset: false,
            },
        });
        expect(wrapper.findAllComponents(IkButton).at(1)?.props('icon')).toContain('check:light');
    });

    it('renders with submit icon', async () => {
        const wrapper = getInstance({
            props: {
                submit_icon: 'home:light',
            },
        });
        expect(wrapper.findAllComponents(IkButton).at(1)?.props('icon')).toBe('home:light');
    });

    it('renders with submit label slot', async () => {
        const wrapper = getInstance({
            slots: {
                'submit-label': '<span>Unit Test</span>',
            },
        });
        expect(wrapper.findAllComponents(IkButton).at(1)?.props('circle')).toBe(false);
        expect(wrapper.findAllComponents(IkButton).at(1)?.text()).toContain('Unit Test');
    });

    it('renders with cancel label slot', async () => {
        const wrapper = getInstance({
            slots: {
                'cancel-label': '<span>Unit Test</span>',
            },
        });
        expect(wrapper.findAllComponents(IkButton).at(0)?.text()).toContain('Unit Test');
    });
});
