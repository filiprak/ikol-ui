import { renderDeep } from '@ui/tests/tools/utils';
import { IkBadge } from '@ui/components/IkBadge';

describe('IkBadge', () => {
    const getInstance = (options = {}) => renderDeep(IkBadge, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toContain('ik-badge');
        expect(wrapper.element.tagName).toBe('DIV');

        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with custom design', () => {
        const wrapper = getInstance({
            props: { design: 'error' },
        });
        expect(wrapper.classes()).toContain('ik-badge--error');
    });

    it('renders with custom size', () => {
        const wrapper = getInstance({
            props: { size: 24 },
        });

        const dot_styles = wrapper.find('.ik-badge__dot').attributes('style');
        const content_styles = wrapper.find('.ik-badge__content').attributes('style');

        expect(dot_styles).toContain('width: 24px');
        expect(dot_styles).toContain('height: 24px');
        expect(content_styles).toContain('circle 14px at calc(100% - 12px) calc(100% - 12px), ');
    });

    it('renders left', () => {
        const wrapper = getInstance({
            props: { size: 24, left: true },
        });

        const dot_styles = wrapper.find('.ik-badge__dot').attributes('style');
        const content_styles = wrapper.find('.ik-badge__content').attributes('style');

        expect(dot_styles).toContain('width: 24px');
        expect(dot_styles).toContain('height: 24px');
        expect(content_styles).toContain('circle 14px at 12px calc(100% - 12px), ');
    });

    it('renders top', () => {
        const wrapper = getInstance({
            props: { size: 24, top: true },
        });

        const dot_styles = wrapper.find('.ik-badge__dot').attributes('style');
        const content_styles = wrapper.find('.ik-badge__content').attributes('style');

        expect(dot_styles).toContain('width: 24px');
        expect(dot_styles).toContain('height: 24px');
        expect(content_styles).toContain('circle 14px at calc(100% - 12px) 12px, ');
    });

    it('renders with default slot', () => {
        const wrapper = getInstance({
            slots: {
                default: '<div>This is badge content...</div>',
            },
        });

        expect(wrapper.find('.ik-badge__content').text())
            .toContain('This is badge content...');
    });

    it('renders with dot content slot', () => {
        const wrapper = getInstance({
            slots: {
                content: '<div>This is dot content</div>',
            },
        });

        expect(wrapper.find('.ik-badge__dot').text())
            .toContain('This is dot content');
    });

    it('renders with dot hidden', () => {
        const wrapper = getInstance({
            props: { show: false },
        });

        expect(wrapper.find('.ik-badge__content').attributes('style')).toBeFalsy();
        expect(wrapper.find('.ik-badge__dot').exists()).toBeFalsy();
    });

    it('renders with number values in dot content', () => {
        let wrapper;

        wrapper = getInstance({ props: { number: 0 } });
        expect(wrapper.find('.ik-badge__dot').exists()).toBeFalsy();

        wrapper = getInstance({ props: { number: 1 } });
        expect(wrapper.find('.ik-badge__dot').text()).toBe('1');

        wrapper = getInstance({ props: { number: -1 } });
        expect(wrapper.find('.ik-badge__dot').text()).toBe('-1');

        wrapper = getInstance({ props: { number: -10 } });
        expect(wrapper.find('.ik-badge__dot').text()).toBe('-10');

        wrapper = getInstance({ props: { number: 9 } });
        expect(wrapper.find('.ik-badge__dot').text()).toBe('9');

        wrapper = getInstance({ props: { number: 10 } });
        expect(wrapper.find('.ik-badge__dot').text()).toBe('9+');

        wrapper = getInstance({ props: { number: 235 } });
        expect(wrapper.find('.ik-badge__dot').text()).toBe('9+');
    });

    it('renders with number values in dot content including zero', () => {
        let wrapper;

        wrapper = getInstance({ props: { show_zero: true, number: 0 } });
        expect(wrapper.find('.ik-badge__dot').text()).toBe('0');

        wrapper = getInstance({ props: { show_zero: true, number: 1 } });
        expect(wrapper.find('.ik-badge__dot').text()).toBe('1');

        wrapper = getInstance({ props: { show_zero: true, number: -1 } });
        expect(wrapper.find('.ik-badge__dot').text()).toBe('-1');

        wrapper = getInstance({ props: { show_zero: true, number: -10 } });
        expect(wrapper.find('.ik-badge__dot').text()).toBe('-10');

        wrapper = getInstance({ props: { show_zero: true, number: 9 } });
        expect(wrapper.find('.ik-badge__dot').text()).toBe('9');

        wrapper = getInstance({ props: { show_zero: true, number: 10 } });
        expect(wrapper.find('.ik-badge__dot').text()).toBe('9+');

        wrapper = getInstance({ props: { show_zero: true, number: 235 } });
        expect(wrapper.find('.ik-badge__dot').text()).toBe('9+');

        wrapper = getInstance({ props: { show: false, show_zero: true, number: 235 } });
        expect(wrapper.find('.ik-badge__dot').exists()).toBeFalsy();
    });

    it('renders with numeric string values in dot content', () => {
        let wrapper;

        wrapper = getInstance({ props: { show_zero: true, number: '0' } });
        expect(wrapper.find('.ik-badge__dot').text()).toBe('0');

        wrapper = getInstance({ props: { show_zero: false, number: '0' } });
        expect(wrapper.find('.ik-badge__dot').exists()).toBeFalsy();

        wrapper = getInstance({ props: { show_zero: true, number: 'abcd' } });
        expect(wrapper.find('.ik-badge__dot').text()).toBe('');
    });

    it('renders outer', () => {
        const wrapper = getInstance({
            props: {
                outer: true,
            },
        });

        expect(wrapper.classes()).toContain('ik-badge--outer');
        expect(wrapper.element).toMatchSnapshot();
    });
});
