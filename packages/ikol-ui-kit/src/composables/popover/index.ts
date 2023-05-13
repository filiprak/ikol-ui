import { PopoverManager } from './PopoverManager';

export const DATA_KEY = 'ik-popover';

const global = new PopoverManager();

export function usePopover(): PopoverManager {
    return global;
}
