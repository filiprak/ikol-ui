import IkButton from './IkButton.vue';
export interface IkButton extends InstanceType<typeof IkButton> { };
export interface IkButtonProps extends Omit<InstanceType<typeof IkButton>, `$${string}`> { };
export { IkButton };
