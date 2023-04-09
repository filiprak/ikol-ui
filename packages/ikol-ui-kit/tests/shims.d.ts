import { VueWrapper, ComponentMountingOptions } from '@vue/test-utils';

import { DefineComponent } from 'vue';

declare module '@vue/test-utils' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    export function mount<T extends DefineComponent<{}, {}, any>>(
        component: T,
        options?: ComponentMountingOptions<T>
    ): VueWrapper<InstanceType<T>>;
}
