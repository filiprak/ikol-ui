import type { Component, VNode, VNodeArrayChildren } from 'vue';
import { getCurrentInstance as _getCurrentInstance } from 'vue';
import { isArray, isObject, isString } from './helpers';

export function getCurrentInstance(name: string, message?: string) {
    const vm = _getCurrentInstance();

    if (!vm) {
        throw new Error(`[@ikol/ui-kit] ${name} ${message || 'must be called from inside a setup function'}`);
    }

    return vm;
}

export function logError(message: any, ...args: any[]) { // eslint-disable-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line no-console
    console.error(message, ...args);
}

export function logWarn(message: any, ...args: any[]) { // eslint-disable-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line no-console
    console.warn(message, ...args);
}

export function mergeVNodes(target: VNode[], src: VNode[]) {
    src.forEach(node => {
        if (target.indexOf(node) < 0) {
            target.push(node);
        }
    });
    return target;
}

export function extractElementVNodes(vnodes: VNodeArrayChildren, result: VNode[] = []) {
    vnodes.forEach(node => {
        if (isArray(node)) {
            result = mergeVNodes(result, extractElementVNodes(node, result));
        } else if (isObject(node)) {
            if (isObject(node.type) || isString(node.type)) {
                result = mergeVNodes(result, [node]);
            } else if (isArray(node.children)) {
                result = mergeVNodes(result, extractElementVNodes(node.children, result));
            }
        }
    });
    return result;
}

export function vNodesToComponents<T extends Component>(vnodes: VNode[], constructor: Component) {
    return extractElementVNodes(vnodes)
        .filter(i => i.type === constructor)
        .map(i => i.component?.proxy as unknown as T);
}
