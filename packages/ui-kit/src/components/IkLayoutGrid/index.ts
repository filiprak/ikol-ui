import IkLayoutGrid from './IkLayoutGrid.vue';
import IkLayoutGridItem from './IkLayoutGridItem.vue';
import IkLayoutGridWindow from './IkLayoutGridWindow.vue';

export interface IkLayoutGrid extends InstanceType<typeof IkLayoutGrid> { };
export interface IkLayoutGridItem extends InstanceType<typeof IkLayoutGridItem> { };
export interface IkLayoutGridWindow extends InstanceType<typeof IkLayoutGridWindow> { };

export { IkLayoutGrid, IkLayoutGridItem, IkLayoutGridWindow };
