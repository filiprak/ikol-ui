import { renderDeep } from "@/tests/tools/utils";
import { IkFlex } from '@/components/IkFlex';

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
            propsData: {
                column: true,
                inline: true,
                wrapText: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-flex--column');
        expect(wrapper.classes()).toContain('ik-flex--inline');
        expect(wrapper.classes()).toContain('ik-flex--wrap-text');
    });

    it('justifies items to start', () => {
        const wrapper = getInstance({
            propsData: {
                justifyStart: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-flex--justify-start');
    });

    it('justifies items space around', () => {
        const wrapper = getInstance({
            propsData: {
                justifySpace: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-flex--justify-space');
    });

    it('justifies items to end', () => {
        const wrapper = getInstance({
            propsData: {
                justifyEnd: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-flex--justify-end');
    });

    it('aligns items to start', () => {
        const wrapper = getInstance({
            propsData: {
                alignStart: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-flex--align-start');
    });

    it('aligns items to end', () => {
        const wrapper = getInstance({
            propsData: {
                alignEnd: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-flex--align-end');
    });

    it('stretches last child item', () => {
        const wrapper = getInstance({
            propsData: {
                fixedAndGrow: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-flex--fixed-grow');
    });

    it('stretches first child item', () => {
        const wrapper = getInstance({
            propsData: {
                growAndFixed: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-flex--grow-fixed');
    });

    it('stretches child items width and height', () => {
        const wrapper = getInstance({
            propsData: {
                fullWidthItems: true,
                fullHeightItems: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-flex--full-width-items');
        expect(wrapper.classes()).toContain('ik-flex--full-height-items');
    });

    it('renders with custom tag', () => {
        const wrapper = getInstance({
            propsData: {
                tag: 'td',
            },
        });
        expect(wrapper.element.tagName).toBe('TD');
    });

    it('wraps children', () => {
        const wrapper = getInstance({
            propsData: {
                wrap: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-flex--wrap');
    });

    it('renders reversed', () => {
        const wrapper = getInstance({
            propsData: {
                reverse: true,
            },
        });
        expect(wrapper.classes()).toContain('ik-flex--reverse');
    });

});
