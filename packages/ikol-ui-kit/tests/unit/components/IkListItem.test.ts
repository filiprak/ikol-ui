import { renderShallow } from '@/tests/tools/utils';
import { IkListItem } from '@/components/IkList';
import { IkIcon } from '@/components/IkIcon';

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
            propsData: {
                inline: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-list-item--inline');
    });

    it('renders active', () => {
        const wrapper = getInstance({
            propsData: {
                active: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-list-item--active');
    });

    it('renders with bottom border', () => {
        const wrapper = getInstance({
            propsData: {
                borderBottom: true,
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
            propsData: {
                wrapText: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-list-item--wrap-text');
    });

    it('renders with icon prop', () => {
        const wrapper = getInstance({
            propsData: {
                icon: 'user:light',
            },
        });

        expect(wrapper.findAllComponents(IkIcon).at(0)?.attributes('icon')).toBe('user:light');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with disabled prop', () => {
        const wrapper = getInstance({
            propsData: {
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
            propsData: {
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
            propsData: {
                noSelect: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-list-item--no-select');
    });

    it('renders aligned to the top', () => {
        const wrapper = getInstance({
            propsData: {
                alignStart: true,
            },
        });

        expect(wrapper.classes()).toContain('ik-list-item--align-start');
    });

    it('renders text wrapped to n lines', () => {
        const wrapper = getInstance({
            propsData: {
                lines: 3,
            },
        });

        expect(wrapper.classes()).toContain('ik-list-item--lines');
        expect(wrapper.classes()).toContain('ik-list-item--lines-3');
    });
});
