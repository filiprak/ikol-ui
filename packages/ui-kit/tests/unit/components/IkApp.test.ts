import { renderShallow } from '@ui/tests/tools/utils';
import { IkApp } from '@ui/components/IkApp';

describe('IkApp', () => {
    const getInstance = (options = {}) => renderShallow(IkApp, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toStrictEqual([
            'ik-app',
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
});
