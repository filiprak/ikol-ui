import { DEVICE_SYMBOL, createDevice } from '@ui/composables/device';
import { ROUTER_SYMBOL } from '@ui/composables/router';
import type { IkRouterManager } from '@ui/composables/router/IkRouterManager';
import { THEME_SYMBOL, createTheme } from '@ui/composables/theme';
import type { ComponentMountingOptions, VueWrapper } from '@vue/test-utils';
import { DOMWrapper, mount, shallowMount } from '@vue/test-utils';

import type { GlobalMountOptions } from '@vue/test-utils/dist/types';
import type { Component } from 'vue';
import { h } from 'vue';

export interface RenderOptions<T extends Component> extends ComponentMountingOptions<T> {
    device?: { mobile?: boolean },
    router?: IkRouterManager,
}

function mergeStubs(target: Record<string, any>, source: GlobalMountOptions) {
    if (source.stubs) {
        if (Array.isArray(source.stubs)) {
            source.stubs.forEach((x: string) => (target[x] = true));
        } else {
            for (const [k, v] of Object.entries(source.stubs)) {
                target[k] = v;
            }
        }
    }
}

export function merge<T extends Component>(target: RenderOptions<T> = {}, src: RenderOptions<T> = {}): RenderOptions<T> {
    const { global: t_global, ...t_other } = target;
    const { global: s_global, ...s_other } = src;

    const stubs: Record<string, any> = {};
    t_global && mergeStubs(stubs, t_global);
    s_global && mergeStubs(stubs, s_global);

    return {
        global: {
            plugins: [...(t_global?.plugins || []), ...(s_global?.plugins || [])],
            mixins: [...(t_global?.mixins || []), ...(s_global?.mixins || [])],
            provide: { ...t_global?.provide, ...s_global?.provide },
            mocks: { ...t_global?.mocks, ...s_global?.mocks },
            components: { ...t_global?.components, ...s_global?.components },
            directives: { ...t_global?.directives, ...s_global?.directives },
            config: { ...t_global?.config, ...s_global?.config },
            renderStubDefaultSlot: s_global?.renderStubDefaultSlot,
            stubs,
        },
        ...t_other,
        ...s_other,
    };
}

export function createOptions<T extends Component>(options: RenderOptions<T> = {}): ComponentMountingOptions<T> {
    const { device, router, ...other } = options;

    const device_m = createDevice();
    const theme_m = createTheme();

    device_m.mobile.value = !!device?.mobile;

    return merge({
        global: {
            provide: {
                [DEVICE_SYMBOL as symbol]: device_m,
                [THEME_SYMBOL as symbol]: theme_m,
                [ROUTER_SYMBOL as symbol]: router,
            },
        },
    }, other);
}

export function renderShallow<T extends Component>(component: T, options: RenderOptions<T> = {}, base: RenderOptions<T> = {}): VueWrapper<T> {
    return shallowMount(component as any, createOptions(merge(options, base)));
}

export function renderDeep<T extends Component>(component: T, options?: RenderOptions<T>, base: RenderOptions<T> = {}): VueWrapper<T> {
    return mount(component as any, createOptions(merge(options, base)));
}

export function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export function getBody() {
    return new DOMWrapper(document.body);
};

export function divStub(): Component {
    return {
        setup(props, { slots }) {
            return () => h('div', slots.default?.());
        },
    };
};
