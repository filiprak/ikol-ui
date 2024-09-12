import type { ExtractPropTypes } from 'vue';

/* eslint-disable @typescript-eslint/naming-convention */
export type IkExtractProps<T> =
    T extends new (...angs: any) => { $props: infer P; } ? NonNullable<P> : // eslint-disable-line @typescript-eslint/no-explicit-any
    T extends (props: infer P, ...args: any) => any ? P : // eslint-disable-line @typescript-eslint/no-explicit-any
    {};

export type IkExtractPropTypes<T> = Prettify<Readonly<ExtractPropTypes<T>>>;

export type IkExtractExposed<T> =
    T extends new (...angs: any) => infer E ? E : // eslint-disable-line @typescript-eslint/no-explicit-any
    T extends (props: any, ctx: any, expose: (exposed: infer E) => any, ...args: any) => any ? NonNullable<E> : // eslint-disable-line @typescript-eslint/no-explicit-any
    {};

export type IkKeysByType<T, U> = keyof {
    [K in keyof T as T[K] extends U ? K : never]: T[K];
};

export enum IkUIDesignColor {
    primary = 'primary',
    success = 'success',
    error = 'error',
    accent = 'accent',
    default = 'default',
}

export enum IkUIElemSize {
    xs = 'xs',
    sm = 'sm',
    md = 'md',
    lg = 'lg',
}

export enum IkUIVariant {
    flat = 'flat',
    filled = 'filled',
    outline = 'outline',
    pill = 'pill',
}

export enum IkPosition {
    top = 'top',
    right = 'right',
    bottom = 'bottom',
    left = 'left',
    horizontal = 'horizontal',
    vertical = 'vertical',
}

export enum IkAlignment {
    start = 'start',
    center = 'center',
    end = 'end',
}

export type EnumT = Record<string, string> | Record<string | number, string | number>;
export type ObjValueT<T> = T[keyof T];
export type DefinedKeys<T> = { [K in keyof T]: undefined extends T[K] ? never : K }[keyof T];
export type OmitUndefined<T> = { [K in DefinedKeys<T>]: T[K] };
export type NotArray<T> = T extends any[] ? never : T; // eslint-disable-line @typescript-eslint/no-explicit-any
export type DefinedComponent = new (...args: any[]) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
