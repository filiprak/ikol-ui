import IkForm from './IkForm.vue';
import IkFormField from './IkFormField.vue';
import IkFormFieldViewMode from './IkFormFieldViewMode.vue';

export interface IkForm extends InstanceType<typeof IkForm> { };
export interface IkFormField extends InstanceType<typeof IkFormField> { };
export interface IkFormFieldViewMode extends InstanceType<typeof IkFormFieldViewMode> { };

export { IkForm, IkFormField, IkFormFieldViewMode };
