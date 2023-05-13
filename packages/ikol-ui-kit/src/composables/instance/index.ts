import type { ComponentPublicInstance } from 'vue';
import { getCurrentInstance } from 'vue';

export function useInstance<T = ComponentPublicInstance>(): T {
    const vm = getCurrentInstance();
    const proxy = vm?.proxy;

    if (proxy) {
        return proxy as T;
    } else {
        throw new Error('useInstance(): Failed to get current instance');
    }
}
