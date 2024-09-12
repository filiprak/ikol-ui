import type { RenderOptions } from '@ui/tests/tools/utils';
import { IkApp } from '@ui/components/IkApp';
import { renderShallow } from '@ui/tests/tools/utils';
import { IkResource } from '@ui/components/IkResource';
import { getRouterMock } from '@ui/tests/mocks/router';
import { mockSelectionAPI } from '@ui/tests/mocks/selectionAPI';
import { mockNavigationAPI } from '@ui/tests/mocks/navigationAPI';

describe('IkResource', () => {
    let router = getRouterMock();
    const getInstance = (options?: RenderOptions<typeof IkResource>) => renderShallow(IkResource, {
        global: {
            provide: { app: getAppInstance() },
        },
        router,
    }, options);
    const getAppInstance = () => renderShallow(IkApp).vm;

    beforeEach(() => {
        router = getRouterMock();
    });

    it('renders with correct default state', () => {
        const wrapper = getInstance();
        expect(wrapper.classes()).toStrictEqual(['ik-resource', 'ik-resource--empty']);
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders copyable', () => {
        const wrapper = getInstance({ props: { copyable: true } });
        expect(wrapper.findAll('.ik-resource__action')).toHaveLength(1);
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders as uri link', () => {
        const wrapper = getInstance({ props: { uri: 'http://amazon.com' } });
        expect(wrapper.findAll('.ik-resource__action')).toHaveLength(1);
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders copyable and as uri link', () => {
        const wrapper = getInstance({ props: { copyable: true, uri: 'http://amazon.com' } });
        expect(wrapper.findAll('.ik-resource__action')).toHaveLength(2);
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with default slot', () => {
        const wrapper = getInstance({ props: { copyable: true }, slots: { default: '<span>This is</span>Resource<b>Component</b>' } });
        expect(wrapper.find('.ik-resource__content').text()).toContain('This isResourceComponent');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('copies text value to clipboard', () => {
        mockSelectionAPI();

        const wrapper = getInstance({ props: { copyable: true }, slots: { default: 'resource' } });
        wrapper.find('.ik-resource__content').trigger('mouseup');
        expect(document.execCommand).toHaveBeenCalledWith('copy');
    });

    it('navigates to uri', () => {
        mockNavigationAPI();

        const wrapper = getInstance({ props: { uri: 'http:/unit.test.com?c=1&b=5#param=test' }, slots: { default: 'Uri test' } });
        wrapper.find('.ik-resource__content').trigger('mouseup', { button: 2 });
        expect(window.open).toHaveBeenCalledTimes(1);
        expect(window.open).toHaveBeenCalledWith('http:/unit.test.com?c=1&b=5#param=test', '_blank');

        wrapper.find('.ik-resource__content').trigger('mouseup', { button: 1 });
        expect(window.open).toHaveBeenCalledTimes(2);
        expect(window.open).toHaveBeenCalledWith('http:/unit.test.com?c=1&b=5#param=test', '_blank');

        wrapper.find('.ik-resource__content').trigger('mouseup', { button: 4 });
        expect(window.open).toHaveBeenCalledTimes(2);
    });

    it('opens blank tab if middle mouse button clicked', () => {
        mockNavigationAPI();

        const wrapper = getInstance({ props: { uri: 'http:/unit.test.com?c=1&b=5#param=test', target: '_self' }, slots: { default: 'Uri test' } });
        wrapper.find('.ik-resource__content').trigger('mouseup', { button: 2 });
        expect(window.open).toHaveBeenLastCalledWith('http:/unit.test.com?c=1&b=5#param=test', '_self');

        wrapper.find('.ik-resource__content').trigger('mouseup', { button: 1 });
        expect(window.open).toHaveBeenLastCalledWith('http:/unit.test.com?c=1&b=5#param=test', '_blank');
    });

    it('works with copy action button', () => {
        mockSelectionAPI();

        const wrapper = getInstance({ props: { copyable: true }, slots: { default: 'Uri test' } });
        wrapper.find('.ik-resource__action').trigger('click');
        expect(document.execCommand).toHaveBeenCalledWith('copy');
    });

    it('works with uri action button', () => {
        mockNavigationAPI();

        const wrapper = getInstance({ props: { uri: 'http:/unit.test.com?c=1&b=5#param=test', target: '_self' }, slots: { default: 'Uri test' } });
        wrapper.find('.ik-resource__action').trigger('click', { button: 0 });
        expect(window.open).toHaveBeenLastCalledWith('http:/unit.test.com?c=1&b=5#param=test', '_self');
    });

    it('renders in no wrap mode', () => {
        const wrapper = getInstance({ props: { uri: 'http:/unit.test.com?c=1&b=5#param=test', target: '_self', no_wrap: true }, slots: { default: 'Uri test' } });
        expect(wrapper.classes()).toContain('ik-resource--no-wrap');
        expect(wrapper.element).toMatchSnapshot();
    });

    it('works with phone uri', () => {
        mockNavigationAPI();

        const wrapper = getInstance({ props: { phone: true, uri: '+48 123 213 213', target: '_self' }, slots: { default: 'Uri test' } });
        wrapper.find('.ik-resource__action').trigger('click', { button: 0 });
        expect(window.open).toHaveBeenLastCalledWith('tel:+48 123 213 213', '_self');
    });

    it('works with email uri', () => {
        mockNavigationAPI();

        const wrapper = getInstance({ props: { email: true, uri: 'adam.kowalski@testikol.pl', target: '_self' }, slots: { default: 'Uri test' } });
        wrapper.find('.ik-resource__action').trigger('click', { button: 0 });
        expect(window.open).toHaveBeenLastCalledWith('mailto:adam.kowalski@testikol.pl', '_self');
    });
});
