// Types
import type { ComponentPublicInstance, VNode } from 'vue';
import { getCurrentInstance } from 'vue';

export function useRender(render: () => VNode): void {
    const vm = getCurrentInstance() as any;
    vm.render = render;
}

export function useInstance<T = ComponentPublicInstance>(): T {
    const vm = getCurrentInstance();
    const proxy = vm?.proxy;

    if (proxy) {
        return proxy as T;
    } else {
        throw new Error('useInstance(): Failed to get current instance');
    }
}
