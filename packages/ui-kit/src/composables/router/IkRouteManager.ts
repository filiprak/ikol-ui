import { isFunction } from '@ui/utils/helpers';
import type {
    RouteLocationNormalizedLoaded,
} from 'vue-router';

export class IkRouteManager {
    private _route: RouteLocationNormalizedLoaded;

    constructor(route: RouteLocationNormalizedLoaded) {
        this._route = route;
    }

    get params() {
        return this._route.params as Record<string, string>;
    }

    get path() {
        return this._route.path;
    }

    get name() {
        return String(this._route.name);
    }

    getMetaParam<T>(key: string, alternate?: T) {
        let value;
        const matched = this._route?.matched;

        if (matched) {
            for (let i = 0; i < matched.length; i++) {
                if (matched[i].meta[key] !== undefined) {
                    value = matched[i].meta[key];
                }
            }
        }

        if (value !== undefined) {
            if (isFunction(value)) {
                return value(this);
            } else {
                return value;
            }
        }
        return alternate;
    }
}
