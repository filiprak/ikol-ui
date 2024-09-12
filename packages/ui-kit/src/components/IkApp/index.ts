import IkApp from './IkApp.vue';
import IkAppContent from './IkAppContent.vue';
import IkAppBar from './IkAppBar.vue';

export interface IkAppContent extends InstanceType<typeof IkAppContent> { };
export interface IkAppBar extends InstanceType<typeof IkAppBar> { };
export interface IkApp extends InstanceType<typeof IkApp> { };

export { IkApp };
export { IkAppContent };
export { IkAppBar };
