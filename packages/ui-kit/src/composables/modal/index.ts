import type { IkModalController } from './IkModalManager';
import { IkModalManager } from './IkModalManager';
import { getCurrentInstance } from '@ui/utils/core';
import { inject } from 'vue';
import { IkModalConfirm, IkModalQuick } from '@ui/components/IkModal';

import type { IkExtractProps, IkUIDesignColor } from '@ui/types/utils';

const global = new IkModalManager();

export type IkModalConstructor = new (...args: any[]) => {}; // eslint-disable-line @typescript-eslint/no-explicit-any

export interface IkModalActionOptions {
    design?: `${IkUIDesignColor}`;
    icon?: string;
    label?: string;
    close_on_click?: boolean;
    onClick?: () => void;
};

export interface IkModalConfirmActionOptions extends IkModalActionOptions {
    confirm_on_click?: boolean;
    reject_on_click?: boolean;
    cancel_on_click?: boolean;
}

export interface IkModalOptions<T extends IkModalConstructor> {
    id?: string;
    keep_alive?: boolean;
    props?: Partial<IkExtractProps<T>>;
}

export function useModalManager(): IkModalManager {
    return global;
}

export function useModal() {
    if (getCurrentInstance('useModal')) {
        return inject<IkModalController>('controller');
    } else {
        return undefined;
    }
}

export function showModal<T extends IkModalConstructor>(component: T, options?: IkModalOptions<typeof component>) {
    return global.open(component, options);
}

export function showQuickModal(options?: IkModalOptions<typeof IkModalQuick>) {
    return global
        .open(IkModalQuick, options)
        .then(vm => vm.resolve());
}

export function showConfirmModal(options?: IkModalOptions<typeof IkModalConfirm>) {
    return global
        .open(IkModalConfirm, options)
        .then(vm => vm.resolve());
}
