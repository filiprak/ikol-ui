import { isObject } from '@ui/utils/helpers';

describe('isObject', () => {
    it('works with non-object values', () => {
        expect(isObject(undefined)).toBe(false);
        expect(isObject(0)).toBe(false);
        expect(isObject(1)).toBe(false);
        expect(isObject(false)).toBe(false);
        expect(isObject(true)).toBe(false);
        expect(isObject(null)).toBe(false);
        expect(isObject(NaN)).toBe(false);
        expect(isObject(Infinity)).toBe(false);
        expect(isObject('')).toBe(false);
        expect(isObject('abc')).toBe(false);
        expect(isObject(' ')).toBe(false);
        expect(isObject([])).toBe(false);
        expect(isObject([1, 2, 3])).toBe(false);
        expect(isObject(Symbol())).toBe(false);
        expect(isObject(new Array())).toBe(false);
        expect(isObject(BigInt('7238532'))).toBe(false);
        expect(isObject(() => { })).toBe(false);
    });

    it('works with object values', () => {
        expect(isObject({})).toBe(true);
        expect(isObject({ x: 1 })).toBe(true);
        expect(isObject(new Date())).toBe(true);
    });
});
