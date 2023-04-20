import type { ComponentMountingOptions } from '@vue/test-utils';
import { mount, shallowMount } from '@vue/test-utils';
import type { Component } from 'vue';

export function renderShallow<T extends Component>(component: T, options?: ComponentMountingOptions<T>) {
    return shallowMount(component as any, options);
}

export function renderDeep<T extends Component>(component: T, options?: ComponentMountingOptions<T>) {
    return mount(component as any, options);
}
