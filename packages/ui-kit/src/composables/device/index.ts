import { inject } from 'vue';
import type { InjectionKey } from 'vue';
import { IkDeviceManager } from './IkDeviceManager';

import { getCurrentInstance, logError } from '@ui/utils/core';

export const DEVICE_SYMBOL: InjectionKey<IkDeviceManager> = Symbol.for('ik-device');

export function createDevice(): IkDeviceManager {
    return new IkDeviceManager();
}

export function useDevice(): IkDeviceManager {
    let device;

    if (getCurrentInstance('useDevice')) {
        device = inject(DEVICE_SYMBOL);
    }

    if (!device) {
        logError('Injection "device" not found');
        device = createDevice();
    }

    return device;
}
