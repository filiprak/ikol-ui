import { IkFormManager } from './IkFormManager';

const global = new IkFormManager();

export function useForm(): IkFormManager {
    return global;
}

export { useFormField, makeFieldProps, getFieldPropDefaults } from './field';
export { useFormRadio } from './radio';
export type { IkField } from './field';
export type { IkFieldProps } from './field';
