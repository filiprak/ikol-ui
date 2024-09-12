import { renderShallow } from '@ui/tests/tools/utils';
import { IkListItem } from '@ui/components/IkList';
import { IkIcon } from '@ui/components/IkIcon';

describe('IkListItem', () => {
    const getInstance = (options = {}) => renderShallow(IkListItem, options);

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toStrictEqual([
            'ik-list-item',
        ]);
        expect(wrapper.element.tagName).toBe('DIV');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with default slot', () => {
        const wrapper = getInstance({
            slots: {
                default: '<div class="test">List item content slot.</div>',
            },
        });
        expect(wrapper.text()).toContain('List item content slot.');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with secondary slot', () => {
        const wrapper = getInstance({
            slots: {
                secondary: 'This is secondary content.',
            },
        });
        expect(wrapper.text()).toContain('This is secondary content.');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders inline', () => {
        const wrapper = getInstance({
            props: {
                inline: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-list-item--inline');
    });

    it('renders active', () => {
        const wrapper = getInstance({
            props: {
                active: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-list-item--active');
    });

    it('renders with bottom border', () => {
        const wrapper = getInstance({
            props: {
                border_bottom: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-list-item--border-bottom');
    });

    it('renders clickable', () => {
        const clickFn = jest.fn();
        const wrapper = getInstance({
            props: {
                onClick: clickFn,
            },
        });
        expect(wrapper.classes()).toContain('ik-list-item--clickable');
    });

    it('renders text wrapped', () => {
        const wrapper = getInstance({
            props: {
                wrap_text: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-list-item--wrap-text');
    });

    it('renders with icon prop', () => {
        const wrapper = getInstance({
            props: {
                icon: 'user:light',
            },
        });

        expect(wrapper.findAllComponents(IkIcon).at(0)?.attributes('icon')).toBe('user:light');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with disabled prop', () => {
        const wrapper = getInstance({
            props: {
                disabled: true,
            },
        });

        expect(wrapper.classes()).toContain('ik-list-item--disabled');
    });

    it('renders with append slot', () => {
        const wrapper = getInstance({
            slots: {
                append: '<span>Append slot...</span>',
            },
        });

        expect(wrapper.text()).toContain('Append slot...');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with prepend slot', () => {
        const wrapper = getInstance({
            slots: {
                prepend: '<span>Prepend slot...</span>',
            },
        });

        expect(wrapper.text()).toContain('Prepend slot...');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with link option', async () => {
        const wrapper = getInstance({
            props: {
                link: '/test?unit=true',
            },
        });

        expect(wrapper.element.tagName).toBe('A');
        expect(wrapper.find('a').attributes('href')).toBe('/test?unit=true');
        expect(wrapper.classes()).toContain('ik-list-item--clickable');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders not text-selectable', () => {
        const wrapper = getInstance({
            props: {
                no_select: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-list-item--no-select');
    });

    it('renders without padding', () => {
        const wrapper = getInstance({
            props: {
                no_padding: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-list-item--no-padding');
    });

    it('renders without hover effect', () => {
        const wrapper = getInstance({
            props: {
                no_hover: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-list-item--no-hover');
    });

    it('renders aligned to the top', () => {
        const wrapper = getInstance({
            props: {
                align_start: true,
            },
        });

        expect(wrapper.classes()).toContain('ik-list-item--align-start');
    });

    it('renders text wrapped to n lines', () => {
        const wrapper = getInstance({
            props: {
                lines: 3,
            },
        });

        expect(wrapper.classes()).toContain('ik-list-item--lines');
        expect(wrapper.classes()).toContain('ik-list-item--lines-3');
    });
});
