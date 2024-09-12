import type { InjectionKey, Ref } from 'vue';
import { inject } from 'vue';
import { getCurrentInstance, logError } from '@ui/utils/core';
import { IkRouterManager } from '@ui/composables/router/IkRouterManager';
import type { IkRouteManager } from '@ui/composables/router/IkRouteManager';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter as _createRouter, createWebHashHistory } from 'vue-router';

export const ROUTER_SYMBOL: InjectionKey<IkRouterManager> = Symbol.for('ik-router');

export interface IkRouterOptions {
    routes: Readonly<RouteRecordRaw[]>
}

export function createRouter(options: IkRouterOptions): IkRouterManager {
    return new IkRouterManager(
        _createRouter({
            history: createWebHashHistory(),
            routes: options.routes,
        })
    );
}

export function useRouter(): IkRouterManager {
    let router;

    if (getCurrentInstance('useRouter')) {
        router = inject(ROUTER_SYMBOL);
    }

    if (!router) {
        router = createRouter({ routes: [] });
        logError('Injection "router" not found');
    }

    return router;
}

export function useRoute(): Ref<IkRouteManager> {
    let router;

    if (getCurrentInstance('useRoute')) {
        router = inject(ROUTER_SYMBOL);
    }

    if (!router) {
        router = createRouter({ routes: [] });
        logError('Injection "router" not found');
    }

    return router.route;
}
