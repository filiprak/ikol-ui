import type { VueWrapper, ComponentMountingOptions, DefineComponent } from '@vue/test-utils';
import type WrapperLike from '@vue/test-utils/dist/interfaces/wrapperLike';

declare module '@vue/test-utils' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    export function mount<T extends DefineComponent<{}, {}, any>>(
        component: T,
        options?: ComponentMountingOptions<T>
    ): VueWrapper<InstanceType<T>>;

    declare abstract class BaseWrapper<ElementType extends Node> implements WrapperLike {
        findComponent<T extends DefineComponent<{}, {}, any>>(selector: T): VueWrapper<InstanceType<T>>;
        findAllComponents<T extends DefineComponent<{}, {}, any>>(selector: T): VueWrapper<InstanceType<T>>[];
    }
}
