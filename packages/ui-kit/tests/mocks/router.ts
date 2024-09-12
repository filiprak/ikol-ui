import { IkRouterManager } from '@ui/composables/router/IkRouterManager';
import type { RouteRecordRaw } from 'vue-router';
import { injectRouterMock, createRouterMock } from 'vue-router-mock';

export interface IkRouterMockOptions {
    routes?: RouteRecordRaw[],
}

export const getRouterMock = (options: IkRouterMockOptions = {}) => {
    const router = createRouterMock();

    if (options.routes) {
        options.routes.forEach(r => {
            router.addRoute(r);
        });
    } else {
        router.addRoute({
            path: '/',
            name: 'IkRoute1',
            component: {},
        });

        router.addRoute({
            path: '/route2',
            name: 'IkRoute2',
            component: {},
        });

        router.addRoute({
            path: '/route3/:id',
            name: 'IkRoute3',
            component: {},
        });
    }

    injectRouterMock(router);

    return new IkRouterManager(router);
};
