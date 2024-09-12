import type { RenderOptions } from '@ui/tests/tools/utils';
import { renderShallow } from '@ui/tests/tools/utils';
import { IkAppContent } from '@ui/components/IkApp';

describe('IkAppContent', () => {
    const getInstance = (options: RenderOptions<typeof IkAppContent> = {}) => renderShallow(IkAppContent, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();

        expect(wrapper.classes()).toStrictEqual([
            'ik-app-content',
        ]);

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
                default: '<div class="test">Default slot test.</div>',
            },
        });
        expect(wrapper.text()).toContain('Default slot test.');
    });
});
