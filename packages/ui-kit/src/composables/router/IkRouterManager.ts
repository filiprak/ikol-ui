import { IkRouteManager } from '@ui/composables/router/IkRouteManager';
import type { App } from 'vue';
import { computed } from 'vue';
import type {
    NavigationGuardWithThis,
    RouteLocationRaw,
    Router,
} from 'vue-router';

export class IkRouterManager {
    route = computed(() => {
        return new IkRouteManager(this._router.currentRoute.value);
    });

    private _router: Router;

    constructor(router: Router) {
        this._router = router;
    }

    push(to: RouteLocationRaw) {
        return this._router.push(to);
    }

    go(delta: number) {
        return this._router.go(delta);
    }

    replace(to: RouteLocationRaw) {
        return this._router.replace(to);
    }

    getCurrentRoute() {
        return new IkRouteManager(this._router.currentRoute.value);
    }

    backWithFallback(fallback?: RouteLocationRaw) {
        fallback = fallback || this.getCurrentRoute().getMetaParam('back_fallback', null);

        if (window.history.length > 1) {
            return this.go(-1);
        } else if (fallback) {
            return this.replace(fallback);
        } else {
            return this.replace('/');
        }
    }

    beforeEach(guard: NavigationGuardWithThis<undefined>) {
        return this._router.beforeEach(guard);
    }

    install(app: App) {
        app.use(this._router);
    }
}
