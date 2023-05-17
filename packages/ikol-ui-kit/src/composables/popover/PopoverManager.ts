import { ref } from 'vue';
import type { Ref } from 'vue';

import type { IkPopover } from '@/components/IkPopover';
import { getRandomString } from '@/utils/helpers';

export class PopoverManager {
    private instances: { [id: string]: IkPopover } = {};
    private activators: Ref<{ [id: string]: HTMLElement[] }> = ref({});

    public activate(id: string, activator_id: string) {
        const popover = this.instances[id];
        if (popover) {
            popover.activate(activator_id);
        }
    }

    public close(id: string) {
        const popover = this.instances[id];
        if (popover) {
            popover.close();
        }
    }

    public closeAllExcept(except_ids: string[]) {
        Object
            .keys(this.instances)
            .forEach((id) => {
                if (except_ids.indexOf(id) < 0) {
                    this.instances[id].close();
                }
            });
    }

    public closeAll() {
        Object
            .keys(this.instances)
            .forEach((id) => {
                this.instances[id].close();
            });
    }

    public registerInstance(vm: IkPopover) {
        if (vm) {
            if (vm.id) {
                this.instances[vm.id] = vm;
            } else {
                const random_id = getRandomString(16);
                (vm as any)._popover_random_id = random_id;
                this.instances[random_id] = vm;
            }
        }
    }

    public unregisterInstance(vm: IkPopover) {
        if (vm) {
            if (vm.id) {
                delete this.instances[vm.id];
            } else {
                delete this.instances[(vm as any)._popover_random_id];
            }
        }
    }

    public updateActivator(popover_id: string, activator_id: string, el: HTMLElement) {
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

    public cleanupActivator(popover_id: string, activator_id: string, el: HTMLElement) {
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
