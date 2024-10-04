import type { IkExtractExposed } from '@ui/types/utils';
import IkVirtualScroller from './IkVirtualScroller.vue';
import IkVirtualScrollerItem from './IkVirtualScrollerItem.vue';
export interface IkVirtualScroller<T> extends IkExtractExposed<typeof IkVirtualScroller<T>> { };
export interface IkVirtualScrollerItem extends IkExtractExposed<typeof IkVirtualScrollerItem> { };
export { IkVirtualScroller, IkVirtualScrollerItem };
