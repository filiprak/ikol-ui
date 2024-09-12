import type { IkPopover } from '@ui/components/IkPopover';
import { IkPopoverManager } from './IkPopoverManager';

export const DATA_KEY = 'ik-popover';
export const CONTENT_DATA_KEY = 'ik-popover-content';

const global = new IkPopoverManager();

export class IkVPopoverData {
    id: string | null = null;
    activator_id: string | null = null;
    event: ('click' | 'hover') = 'click';
    data: any = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
    popover: IkPopover | null = null;
    autoopen = false;
}

export interface HTMLVPopoverElement extends HTMLElement {
    [CONTENT_DATA_KEY]?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    [DATA_KEY]?: IkVPopoverData;
}

export function usePopover(): IkPopoverManager {
    return global;
}
