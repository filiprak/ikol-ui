import type { RenderOptions } from '@ui/tests/tools/utils';
import { renderDeep } from '@ui/tests/tools/utils';
import { IkPopover } from '@ui/components/IkPopover';
import { withDirectives, h, toHandlers } from 'vue';
import { vPopoverActivator } from '@ui/directives/popover';

describe('IkPopover', () => {
    const getInstance = (options: RenderOptions<typeof IkPopover> = {}) => renderDeep(IkPopover, {
        attachTo: document.body,
    }, options);

    const getActivator = (options: any = {}) => renderDeep({
        render: () => withDirectives(h('div'), [[vPopoverActivator, options.value, options.event]]),
    }, { attachTo: document.body });

    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toStrictEqual([
            'ik-popover__root',
        ]);
        expect(document.body).toMatchSnapshot();
    });

    it('renders with activator slot', async () => {
        const wrapper = getInstance({
            slots: {
                activator: h('span', 'Activator...'),
            },
        });

        await wrapper.vm.$nextTick();

        expect(document.body.innerHTML).toContain('Activator...');
        expect(document.body).toMatchSnapshot();
    });

    it('renders with default slot', async () => {
        const wrapper = getInstance({
            slots: {
                default: h('div', 'Popover content...'),
                activator: h('span', 'Activator...'),
            },
        });

        await wrapper.vm.$nextTick();
        await wrapper.vm.open();

        expect(document.body.innerHTML).toContain('Popover content...');
    });

    it('renders with arrow', async () => {
        const wrapper = getInstance({
            props: {
                arrow: true,
            },
            slots: {
                default: h('div', 'Popover content...'),
                activator: h('span', 'Activator...'),
            },
        });

        await wrapper.vm.$nextTick();
        await wrapper.vm.open();

        expect(document.body.innerHTML).toContain('ik-popover__arrow');
    });

    it('opens on activator click', async () => {
        const wrapper = getInstance({
            props: {
                open_on_click: true,
            },
            slots: {
                default: h('div', 'Popover content...'),
                activator: (props: any) => h('span', {
                    id: 'activator',
                    ...toHandlers(props.on),
                }, ['Activator...']),
            },
        });

        await wrapper.vm.$nextTick();

        // simulate mouse click
        document
            .getElementById('activator')
            ?.dispatchEvent(new MouseEvent('click'));

        await wrapper.vm.$nextTick();

        expect(document.body.innerHTML).toContain('Popover content...');
        expect(wrapper.emitted('ik-open')).toStrictEqual([
            [],
        ]);
    });

    it('opens on open() call', async () => {
        const wrapper = getInstance({
            slots: {
                default: h('div', 'Popover content...'),
                activator: (props: any) => h('span', {
                    id: 'activator',
                    ...toHandlers(props.on),
                }, ['Activator...']),
            },
        });
        await wrapper.vm.$nextTick();

        wrapper.vm.open();

        await wrapper.vm.$nextTick();

        expect(document.body.innerHTML).toContain('Popover content...');
        expect(wrapper.emitted('ik-open')).toStrictEqual([
            [],
        ]);
    });

    it('works with toggle() method', async () => {
        const wrapper = getInstance({
            slots: {
                default: h('div', 'Popover content...'),
                activator: (props: any) => h('span', {
                    id: 'activator',
                    ...toHandlers(props.on),
                }, ['Activator...']),
            },
        });
        await wrapper.vm.$nextTick();

        wrapper.vm.toggle();
        await wrapper.vm.$nextTick();

        wrapper.vm.toggle();
        await wrapper.vm.$nextTick();

        wrapper.vm.toggle();
        await wrapper.vm.$nextTick();

        expect(document.body.innerHTML).toContain('Popover content...');
        expect(wrapper.emitted('ik-open')).toStrictEqual([
            [],
            [],
        ]);
        expect(wrapper.emitted('ik-close')).toStrictEqual([
            [],
        ]);
    });

    it('closes on outside click', async () => {
        const wrapper = getInstance({
            props: {
                open_on_click: true,
            },
            slots: {
                default: h('div', 'Popover content...'),
                activator: (props: any) => h('span', {
                    id: 'activator',
                    ...toHandlers(props.on),
                }, ['Activator...']),
            },
        });
        await wrapper.vm.$nextTick();

        await wrapper.vm.open();
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('ik-open')).toStrictEqual([
            [],
        ]);

        // simulate outside mouse click
        document.body.dispatchEvent(new MouseEvent('mousedown'));
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('ik-open')).toStrictEqual([
            [],
        ]);
        expect(wrapper.emitted('ik-close')).toStrictEqual([
            [],
        ]);
    });

    it('closes on close() call', async () => {
        const wrapper = getInstance({
            slots: {
                default: h('div', 'Popover content...'),
                activator: (props: any) => h('span', {
                    id: 'activator',
                    ...toHandlers(props.on),
                }, ['Activator...']),
            },
        });
        await wrapper.vm.$nextTick();

        wrapper.vm.open();
        await wrapper.vm.$nextTick();

        wrapper.vm.close();
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('ik-open')).toStrictEqual([
            [],
        ]);
        expect(wrapper.emitted('ik-close')).toStrictEqual([
            [],
        ]);
    });

    it('removes detached elements after destroy', async () => {
        const wrapper = getInstance({
            props: {
                open_on_click: true,
            },
            slots: {
                default: h('div', 'Popover content...'),
                activator: (props: any) => h('span', {
                    id: 'activator',
                    ...toHandlers(props.on),
                }, ['Activator...']),
            },
        });

        await wrapper.vm.$nextTick();
        await wrapper.vm.open();

        wrapper.unmount();

        expect(document.getElementsByClassName('ik-popover')).toHaveLength(0);
        expect(document.getElementById('activator')).toBeFalsy();
    });

    it('works with dynamically binded activator', async () => {
        const wrapper = getInstance({
            props: {
                id: 'unit-test',
                activator_id: null,
            },
            slots: {
                default: h('div', 'Popover content...'),
            },
        });

        const activator = getActivator({
            value: { id: 'unit-test', activator_id: 'test-activator' },
            event: 'click',
        });

        await wrapper.vm.$nextTick();
        await activator.trigger('click');
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('update:activator_id')).toStrictEqual([
            ['test-activator', null],
        ]);
    });

    it('works with dynamically binded activator and hover event', async () => {
        const wrapper = getInstance({
            props: {
                id: 'unit-test',
                activator_id: null,
            },
            slots: {
                default: h('div', 'Popover content...'),
            },
        });

        const activator = getActivator({
            value: { id: 'unit-test', activator_id: 'test-activator' },
            event: 'hover',
        });

        await wrapper.vm.$nextTick();
        await activator.trigger('mouseenter');
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('update:activator_id')).toStrictEqual([
            ['test-activator', null],
        ]);
    });

    it('works with transition', async () => {
        const wrapper = getInstance({
            props: {
                transition: true,
            },
            slots: {
                default: h('div', 'Popover content...'),
            },
        });
        wrapper.vm.open();

        expect(document.getElementsByClassName('ik-popover')[0].className)
            .toContain('ik-popover--transition');
    });

    it('works with min and max sizes', async () => {
        const wrapper = getInstance({
            props: {
                min_width: 333,
                max_width: 444,
                min_height: 555,
            },
            slots: {
                default: h('div', 'Popover content...'),
            },
        });

        await wrapper.vm.open();
        await wrapper.vm.$nextTick();

        const content = document.getElementsByClassName('ik-popover')[0].outerHTML;

        expect(content).toContain('min-width: 333px');
        expect(content).toContain('max-width: 444px');
        expect(content).toContain('min-height: 555px');
    });

    it('works with use of activator width', async () => {
        const wrapper = getInstance({
            props: {
                use_activator_width: true,
            },
            slots: {
                default: h('div', 'Popover content...'),
            },
        });

        await wrapper.vm.open();
        await wrapper.vm.$nextTick();

        const content = document.getElementsByClassName('ik-popover')[0]?.outerHTML;

        expect(content).toContain('width: 0');
    });

    it('adds content css class', async () => {
        const wrapper = getInstance({
            props: {
                content_class: 'unit-test',
            },
            slots: {
                default: h('div', 'Popover content...'),
            },
        });

        await wrapper.vm.open();
        await wrapper.vm.$nextTick();

        const content = document.getElementsByClassName('ik-popover')[0];

        expect(content.className).toContain('unit-test');
    });

    it('adds content css class as object', async () => {
        const wrapper = getInstance({
            props: {
                content_class: { 'unit-test-0': false, 'unit-test-1': true },
            },
            slots: {
                default: h('div', 'Popover content...'),
            },
        });

        await wrapper.vm.open();
        await wrapper.vm.$nextTick();

        const content = document.getElementsByClassName('ik-popover')[0];

        expect(content.className).toContain('ik-popover');
        expect(content.className).not.toContain('unit-test-0');
        expect(content.className).toContain('unit-test-1');
    });

    it('works with modal prop', async () => {
        const wrapper = getInstance({
            props: {
                modal: true,
            },
        });

        await wrapper.vm.open();
        await wrapper.vm.$nextTick();

        expect(document.getElementsByClassName('ik-popover__backdrop')).toHaveLength(1);
    });

    it('works with activate method', async () => {
        const wrapper = getInstance({
            props: {
                id: 'unit-test',
            },
        });

        await wrapper.vm.$nextTick();

        getActivator({
            value: { id: 'unit-test', activator_id: 'test-activator' },
            event: 'click',
        });

        await wrapper.vm.$nextTick();

        wrapper.vm.activate('test-activator');

        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('update:activator_id')).toStrictEqual([
            ['test-activator'],
        ]);
    });
});
