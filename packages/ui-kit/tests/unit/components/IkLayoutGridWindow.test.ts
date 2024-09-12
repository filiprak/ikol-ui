import type { RenderOptions } from '@ui/tests/tools/utils';
import { renderShallow } from '@ui/tests/tools/utils';
import { IkLayoutGridWindow } from '@ui/components/IkLayoutGrid';
import { IkButton } from '@ui/components/IkButton';
import { h } from 'vue';
import { getRouterMock } from '@ui/tests/mocks/router';

describe('IkLayoutGridWindow', () => {
    let router = getRouterMock();
    const getInstance = (options: RenderOptions<typeof IkLayoutGridWindow> = {}) => renderShallow(IkLayoutGridWindow, {
        router,
    }, options);

    beforeAll(() => {
        router = getRouterMock();
    });

    it('renders with correct default state', () => {
        const wrapper = getInstance();

        expect(wrapper.classes()).toStrictEqual([
            'ik-layout-grid-window',
        ]);

        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with default slot', () => {
        const wrapper = getInstance({
            slots: {
                default: 'This is default slot...',
            },
        });

        expect(wrapper.text()).toContain('This is default slot...');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with header slot', () => {
        const wrapper = getInstance({
            slots: {
                header: 'This is header slot...',
            },
        });

        expect(wrapper.text()).toContain('This is header slot...');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with top slot', () => {
        const wrapper = getInstance({
            slots: {
                top: 'This is top slot...',
            },
        });

        expect(wrapper.text()).toContain('This is top slot...');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with bottom slot', () => {
        const wrapper = getInstance({
            slots: {
                top: 'This is bottom slot...',
            },
        });

        expect(wrapper.text()).toContain('This is bottom slot...');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with actions slot', () => {
        const wrapper = getInstance({
            slots: {
                actions: () => h('div', 'This is actions slot...'),
            },
        });

        expect(wrapper.text()).toContain('This is actions slot...');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with header prop', () => {
        const wrapper = getInstance({
            props: {
                header: 'This is header slot...',
            },
        });

        expect(wrapper.text()).toContain('This is header slot...');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with new action', () => {
        const wrapper = getInstance({
            attrs: {
                onIkNew: jest.fn(),
            },
        });

        expect(wrapper.findAllComponents(IkButton).at(0)?.isVisible()).toBe(true);
        expect(wrapper.element).toMatchSnapshot();
    });

    it('emits new event', () => {
        const newMock = jest.fn();
        const wrapper = getInstance({
            attrs: {
                onIkNew: newMock,
            },
            global: { stubs: { IkButton } },
        });

        expect(wrapper.findAllComponents(IkButton).at(0)?.isVisible()).toBe(true);

        wrapper.findAllComponents(IkButton).at(0)?.trigger('click');

        expect(newMock).toHaveBeenCalled();
    });

    it('renders with edit action', () => {
        const wrapper = getInstance({
            attrs: {
                onIkEdit: jest.fn(),
            },
        });

        expect(wrapper.findAllComponents(IkButton).at(0)?.isVisible()).toBe(true);
        expect(wrapper.element).toMatchSnapshot();
    });

    it('emits edit event', () => {
        const editMock = jest.fn();
        const wrapper = getInstance({
            attrs: {
                onIkEdit: editMock,
            },
            stubs: { IkButton },
        });

        expect(wrapper.findAllComponents(IkButton).at(0)?.isVisible()).toBe(true);

        wrapper.findAllComponents(IkButton).at(0)?.trigger('click');

        expect(editMock).toHaveBeenCalled();
    });

    it('renders with remove action', () => {
        const wrapper = getInstance({
            attrs: {
                onIkRemove: jest.fn(),
            },
        });

        expect(wrapper.findAllComponents(IkButton).at(0)?.isVisible()).toBe(true);
        expect(wrapper.element).toMatchSnapshot();
    });

    it('emits remove event', () => {
        const removeMock = jest.fn();
        const wrapper = getInstance({
            attrs: {
                onIkRemove: removeMock,
            },
            stubs: { IkButton },
        });

        expect(wrapper.findAllComponents(IkButton).at(0)?.isVisible()).toBe(true);

        wrapper.findAllComponents(IkButton).at(0)?.trigger('click');

        expect(removeMock).toHaveBeenCalled();
    });

    it('renders with clone action', () => {
        const wrapper = getInstance({
            attrs: {
                onIkClone: jest.fn(),
            },
        });

        expect(wrapper.findAllComponents(IkButton).at(0)?.isVisible()).toBe(true);
    });

    it('emits clone event', () => {
        const cloneMock = jest.fn();
        const wrapper = getInstance({
            attrs: {
                onIkClone: cloneMock,
            },
            stubs: { IkButton },
        });

        expect(wrapper.findAllComponents(IkButton).at(0)?.isVisible()).toBe(true);

        wrapper.findAllComponents(IkButton).at(0)?.trigger('click');

        expect(cloneMock).toHaveBeenCalled();
    });

    it('hides action buttons', () => {
        const wrapper = getInstance({
            props: {
                hide_new: true,
                hide_edit: true,
                hide_remove: true,
                hide_clone: true,
            },
            attrs: {
                onIkNew: jest.fn(),
                onIkEdit: jest.fn(),
                onIkRemove: jest.fn(),
                onIkClone: jest.fn(),
            },
        });

        expect(wrapper.findAllComponents(IkButton)).toHaveLength(0);
    });

    it('renders static', () => {
        const wrapper = getInstance({
            props: {
                static: true,
            },
        });

        expect(wrapper.classes()).toContain('ik-layout-grid-window--static');
    });

    it('renders with border', () => {
        const wrapper = getInstance({
            props: {
                border_right: true,
            },
        });

        expect(wrapper.classes()).toContain('ik-layout-grid-window--border');
    });

    it('renders dense', () => {
        const wrapper = getInstance({
            props: {
                dense: true,
            },
        });

        expect(wrapper.classes()).toContain('ik-layout-grid-window--dense');
    });

    it('renders without header padding', () => {
        const wrapper = getInstance({
            props: {
                no_header_padding: true,
            },
        });

        expect(wrapper.classes()).toContain('ik-layout-grid-window--no-header-pad');
    });
});
