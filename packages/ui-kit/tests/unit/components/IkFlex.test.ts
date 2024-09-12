import { renderDeep } from '@ui/tests/tools/utils';
import { IkFlex } from '@ui/components/IkFlex';

describe('IkFlex', () => {
    const getInstance = (options = {}) => renderDeep(IkFlex, options);

    it('renders in default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toStrictEqual([
            'ik-flex',
        ]);
        expect(wrapper.element.tagName).toBe('DIV');
    });

    it('renders with column inline and wrap text mode', () => {
        const wrapper = getInstance({
            props: {
                column: true,
                inline: true,
                wrap_text: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-flex--column');
        expect(wrapper.classes()).toContain('ik-flex--inline');
        expect(wrapper.classes()).toContain('ik-flex--wrap-text');
    });

    it('justifies items to start', () => {
        const wrapper = getInstance({
            props: {
                justify_start: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-flex--justify-start');
    });

    it('justifies items space around', () => {
        const wrapper = getInstance({
            props: {
                justify_space: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-flex--justify-space');
    });

    it('justifies items to end', () => {
        const wrapper = getInstance({
            props: {
                justify_end: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-flex--justify-end');
    });

    it('aligns items to start', () => {
        const wrapper = getInstance({
            props: {
                align_start: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-flex--align-start');
    });

    it('aligns items to end', () => {
        const wrapper = getInstance({
            props: {
                align_end: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-flex--align-end');
    });

    it('stretches last child item', () => {
        const wrapper = getInstance({
            props: {
                fixed_and_grow: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-flex--fixed-grow');
    });

    it('stretches first child item', () => {
        const wrapper = getInstance({
            props: {
                grow_and_fixed: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-flex--grow-fixed');
    });

    it('stretches child items width and height', () => {
        const wrapper = getInstance({
            props: {
                full_width_items: true,
                full_height_items: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-flex--full-width-items');
        expect(wrapper.classes()).toContain('ik-flex--full-height-items');
    });

    it('renders with custom tag', () => {
        const wrapper = getInstance({
            props: {
                tag: 'td',
            },
        });
        expect(wrapper.element.tagName).toBe('TD');
    });

    it('wraps children', () => {
        const wrapper = getInstance({
            props: {
                wrap: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-flex--wrap');
    });

    it('renders reversed', () => {
        const wrapper = getInstance({
            props: {
                reverse: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-flex--reverse');
    });
});
