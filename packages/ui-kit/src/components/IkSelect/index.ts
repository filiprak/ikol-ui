import type { IkExtractExposed } from '@ui/types/utils';
import IkSelect from './IkSelect.vue';
import IkSelectChip from './IkSelectChip.vue';
import IkSelectItem from './IkSelectItem.vue';
import IkSelectScroll from './IkSelectScroll.vue';

export interface IkSelectItemsChunkRequest {
    offset: number,
    limit: number,
    search_string: string,
}

interface IkSelectItemsChunk<T extends {}> {
    items: T[],
    offset?: number,
    has_more?: boolean,
}

export type IkSelectItemLoader<T extends object> = (req?: IkSelectItemsChunkRequest) => Promise<IkSelectItemsChunk<T>>
export interface IkSelect extends IkExtractExposed<typeof IkSelect> { };
export interface IkSelectChip extends InstanceType<typeof IkSelectChip> { };
export interface IkSelectItem extends InstanceType<typeof IkSelectItem> { };
export interface IkSelectScroll extends IkExtractExposed<typeof IkSelectScroll> { };

export { IkSelect, IkSelectChip, IkSelectItem, IkSelectScroll };
