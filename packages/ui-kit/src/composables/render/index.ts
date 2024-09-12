import { getCurrentInstance } from '@ui/utils/core';
import type { VNode } from 'vue';

export function useRender(render: () => VNode | null): void {
    const vm = getCurrentInstance('useRender');

    if (!vm) {
        throw new Error('[useRender] must be called from inside a setup function');
    }

    Object.defineProperty(vm, 'render', {
        get: () => render,
        set: () => { },
    });

    /**
     * In development mode, assignment render property works fine
     * but in production SFC overwrites it with an empty function
     * because no <template> section defined.
     *
     * Filthy hack to avoid this in production.
     * https://github.com/vuejs/core/issues/4980
     */
    // if ((import.meta as any)?.env?.DEV) {
    //     (vm as any).render = render;
    // } else {
    //     Object.defineProperty(vm, 'render', {
    //         get: () => render,
    //         set: () => { },
    //     });
    // }
}
