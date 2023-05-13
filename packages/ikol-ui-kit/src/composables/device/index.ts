import { DeviceManager } from './DeviceManager';

const global = new DeviceManager();

export function useDevice(): DeviceManager {
    return global;
}
