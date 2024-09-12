import { getRandomString } from '@ui/utils/helpers';
import type { Component } from 'vue';
import { reactive, markRaw, watch } from 'vue';
import type { IkModalOptions, IkModalConstructor } from '.';

export interface IkModalController<T extends IkModalConstructor = IkModalConstructor> {
    id: string;
    component: Component;
    options: IkModalOptions<T>;

    resolve: () => void,
    close: () => void;
    registerVm: (vm: InstanceType<T>) => void,
    isOnTop: () => boolean;
}

export class IkModalManager {
    public instances: Map<string, IkModalController> = reactive(new Map());

    constructor() {
        watch(this.instances, (instances) => {
            document.body.classList.toggle('ik-modal-open', instances.size > 0);
        });
    }

    public open<T extends IkModalConstructor>(component: T, options?: IkModalOptions<typeof component>) {
        const id = getRandomString(16);
        let _resolve: (vm: InstanceType<T>) => void;
        let _vm: InstanceType<T>;

        const controller = markRaw<IkModalController<T>>({
            id,
            component,
            options: options || {},

            close: () => {
                this.close(id);
            },
            isOnTop: () => {
                return this.isOnTop(id);
            },
            registerVm(vm) {
                _vm = vm;
            },
            resolve() {
                _resolve(_vm);
            },
        });

        this.instances.set(id, controller as IkModalController);

        return new Promise<InstanceType<T>>(resolve => {
            _resolve = resolve;
        });
    }

    public close(id: string) {
        const controller = this.instances.get(id);

        if (controller) {
            controller.resolve();

            this.instances.delete(id);
        }
    }

    public isOnTop(id: string) {
        const last_id = [...this.instances][this.instances.size - 1][0];

        return last_id === id;
    }

    public closeTop() {
        const last_id = [...this.instances][this.instances.size - 1][0];

        this.close(last_id);
    }
};
