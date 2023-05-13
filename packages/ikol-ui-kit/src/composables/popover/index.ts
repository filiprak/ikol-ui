import type { Ref } from 'vue';
import { ref } from 'vue';
import type { IkPopoverT } from '@/components/IkPopover';
import { getRandomString } from '@/utils/helpers';

export const DATA_KEY = 'ik-popover';

class PopoverManager {
    private INSTANCES: { [id: string]: IkPopoverT } = {};
    private activators: Ref<{ [id: string]: HTMLElement[] }> = ref({});

    activate(id: string, activator_id: string) {
        const popover = this.INSTANCES[id];
        if (popover) {
            popover.activate(activator_id);
        }
    }

    close(id: string) {
        const popover = this.INSTANCES[id];
        if (popover) {
            popover.close();
        }
    }

    closeAllExcept(except_ids: string[]) {
        Object
            .keys(this.INSTANCES)
            .forEach((id) => {
                if (except_ids.indexOf(id) < 0) {
                    this.INSTANCES[id].close();
                }
            });
    }

    closeAll() {
        Object
            .keys(this.INSTANCES)
            .forEach((id) => {
                this.INSTANCES[id].close();
            });
    }

    registerInstance(vm: IkPopoverT) {
        if (vm) {
            if (vm.id) {
                this.INSTANCES[vm.id] = vm;
            } else {
                const random_id = getRandomString(16);
                (vm as any)._popover_random_id = random_id;
                this.INSTANCES[random_id] = vm;
            }
        }
    }

    unregisterInstance(vm: IkPopoverT) {
        if (vm) {
            if (vm.id) {
                delete this.INSTANCES[vm.id];
            } else {
                delete this.INSTANCES[(vm as any)._popover_random_id];
            }
        }
    }

    _updateActivator(popover_id: string, activator_id: string, el: HTMLElement) {
        if (popover_id && activator_id) {
            const key = [popover_id, activator_id].join('');

            if (el) {
                if (this.activators.value[key]) {
                    if (this.activators.value[key].indexOf(el) < 0) {
                        this.activators.value[key].unshift(el);
                    }
                } else {
                    this.activators.value[key] = [el];
                }
            }
        }
    }

    _cleanupActivator(popover_id: string, activator_id: string, el: HTMLElement) {
        if (popover_id && activator_id) {
            const key = [popover_id, activator_id].join('');

            if (this.activators.value[key]) {
                this.activators.value[key] = this.activators.value[key].filter((activator) => {
                    return activator !== el;
                });
                if (this.activators.value[key].length < 1) {
                    delete this.activators.value[key];
                }
            }
        }
    }
};

const manager = (window.parent as any).w = new PopoverManager();

export function usePopover(): PopoverManager {
    return manager;
}
