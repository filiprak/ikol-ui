import { ComponentInternalInstance, ComponentPublicInstance, markRaw, onBeforeMount, onUnmounted, proxyRefs } from 'vue';
import { getCurrentInstance } from 'vue';

function getPublicInstance<T = ComponentPublicInstance>(): T {
    const vm = getCurrentInstance() as ComponentInternalInstance & { __ikolProxy: T };
    const public_proxy = vm.proxy || {};

    if (!vm.__ikolProxy) {
        vm.__ikolProxy = new Proxy(proxyRefs(markRaw(vm.exposed || {})), {
            get(target, key) {
                if (key in target) {
                    return (target as any)[key];

                } else if (key in public_proxy) {
                    return (public_proxy as any)[key];
                }
            },
            has(target, key) {
                return key in target || key in public_proxy;
            },
        }) as T;
    }
    return vm.__ikolProxy;
}

export function useInstance<T = ComponentPublicInstance>() {
    const vm = getCurrentInstance();

    if (!vm) {
        throw new Error('useInstance(): Must be called from inside a setup function');
    }

    if (!vm) {
        throw new Error('useInstance(): Must be called from inside a setup function');
    }

    let instance: T;
    let createHook: (instance: T) => void,
        destroyHook: (instance: T) => void;

    function getInstance(): T {
        if (!instance) {
            throw new Error('useInstance(): Instance cannot be accessed before onBeforeMount hook is resolved');
        }
        return instance;
    }

    function onCreate(hook: (instance: T) => void): void {
        createHook = hook;
    }

    function onDestroy(hook: (instance: T) => void): void {
        destroyHook = hook;
    }

    onBeforeMount(() => {
        instance = getPublicInstance<T>();
        createHook && createHook(instance);
    });

    onUnmounted(() => {
        instance = getPublicInstance<T>();
        destroyHook && destroyHook(instance);
    });

    return {
        getInstance,
        onCreate,
        onDestroy,
    };
}
