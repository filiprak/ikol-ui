import { mount } from '@vue/test-utils';
import { IkButton } from '@/components/IkButton';

describe('IkButton', () => {
    const getInstance = (options = {}) => mount(IkButton, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toContain('ik-button');
        expect(wrapper.classes()).toContain('ik-button--default');
        expect(wrapper.classes()).toContain('ik-button--filled');
        expect(wrapper.element.tagName).toBe('BUTTON');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with design', () => {
        const wrapper = getInstance({
            props: {
                design: 'primary',
            },
        });
        expect(wrapper.classes()).toContain('ik-button--primary');
    });

});
