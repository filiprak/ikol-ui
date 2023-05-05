import { renderDeep } from '@/tests/tools/utils';
import { IkGridItem } from '@/components/IkGrid';

describe('IkGridItem', () => {
    const getInstance = (options = {}) => renderDeep(IkGridItem, options);

    it('renders empty', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toStrictEqual([
            'ik-grid-item',
        ]);
    });

    it('renders with custom props', () => {
        const wrapper = getInstance({
            propsData: {
                md: 6,
                sm: '12',
            },
        });
        expect(wrapper.classes()).toStrictEqual([
            'ik-grid-item',
            'ik-grid-item--col-sm-12',
            'ik-grid-item--col-md-6',
        ]);
    });

    it('renders with custom attrs', () => {
        const wrapper = getInstance({
            attrs: {
                'xs-12': '',
                'md-6': '',
            },
        });
        expect(wrapper.classes()).toStrictEqual([
            'ik-grid-item',
            'ik-grid-item--col-xs-12',
            'ik-grid-item--col-md-6',
        ]);
    });

    it('renders with default slot', () => {
        const wrapper = getInstance({
            slots: {
                default: '<div id="test">This is grid item content</div>',
            },
        });
        expect(wrapper.text()).toContain('This is grid item content');
    });

    it('renders with xs, sm, md, lg props', () => {
        const wrapper = getInstance({
            propsData: {
                xs: 1,
                sm: 2,
                md: 3,
                lg: 4,
                tag: 'span',
            },
        });

        expect(wrapper.classes()).toContain('ik-grid-item--col-xs-1');
        expect(wrapper.classes()).toContain('ik-grid-item--col-sm-2');
        expect(wrapper.classes()).toContain('ik-grid-item--col-md-3');
        expect(wrapper.classes()).toContain('ik-grid-item--col-lg-4');
        expect(wrapper.html()).toStrictEqual('<span class="ik-grid-item ik-grid-item--col-xs-1 ik-grid-item--col-sm-2 ik-grid-item--col-md-3 ik-grid-item--col-lg-4"></span>');
    });
});
