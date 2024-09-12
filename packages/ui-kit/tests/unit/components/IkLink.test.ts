import { renderDeep } from '@ui/tests/tools/utils';
import { IkLink } from '@ui/components/IkLink';

describe('IkLink', () => {
    const getInstance = (options = {}) => renderDeep(IkLink, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toStrictEqual([
            'ik-link',
        ]);
        expect(wrapper.element.tagName).toBe('A');
        expect(wrapper.attributes()).toStrictEqual({
            class: 'ik-link',
            href: 'javascript:void(0);',
        });
    });

    it('works with web url', () => {
        const wrapper = getInstance({
            props: {
                to: 'www.test.com',
            },
        });
        expect(wrapper.attributes('href')).toBe('www.test.com');
    });

    it('works with email', () => {
        const wrapper = getInstance({
            props: {
                to: 'test@test.com',
                type: 'email',
            },
        });
        expect(wrapper.attributes('href')).toBe('mailto:test@test.com');
    });

    it('works with phone', () => {
        const wrapper = getInstance({
            props: {
                to: '111 222 333',
                type: 'phone',
            },
        });
        expect(wrapper.attributes('href')).toBe('tel:111 222 333');
    });

    it('can be underlined', () => {
        const wrapper = getInstance({
            props: {
                to: 'www.test.com',
                type: 'url',
                underline: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-link--underline');
    });

    it('render without styles', () => {
        const wrapper = getInstance({
            props: {
                to: 'www.test.com',
                type: 'url',
                plain: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-link--plain');
    });

    it('can have target', () => {
        const wrapper = getInstance({
            props: {
                to: 'www.test.com',
                target: '_blank',
            },
        });
        expect(wrapper.attributes('target')).toBe('_blank');
    });

    it('renders with default slot', () => {
        const wrapper = getInstance({
            slots: {
                default: '<div>This is link...</div>',
            },
        });
        expect(wrapper.text()).toContain('This is link...');
    });

    it('design classes are added', () => {
        const wrapper = getInstance({
            props: {
                design: 'default',
            },
        });
        expect(wrapper.classes()).toContain('ik-link--default');
    });
});
