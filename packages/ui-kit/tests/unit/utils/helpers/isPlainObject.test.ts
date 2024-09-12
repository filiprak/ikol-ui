import { isPlainObject } from '@ui/utils/helpers';

describe('isPlainObject', () => {
    it('works with non-plain-object values', () => {
        expect(isPlainObject(undefined)).toBe(false);
        expect(isPlainObject(0)).toBe(false);
        expect(isPlainObject(1)).toBe(false);
        expect(isPlainObject(false)).toBe(false);
        expect(isPlainObject(true)).toBe(false);
        expect(isPlainObject(null)).toBe(false);
        expect(isPlainObject(NaN)).toBe(false);
        expect(isPlainObject(Infinity)).toBe(false);
        expect(isPlainObject('')).toBe(false);
        expect(isPlainObject('abc')).toBe(false);
        expect(isPlainObject(' ')).toBe(false);
        expect(isPlainObject([])).toBe(false);
        expect(isPlainObject([1, 2, 3])).toBe(false);
        expect(isPlainObject(Symbol())).toBe(false);
        expect(isPlainObject(new Array())).toBe(false);
        expect(isPlainObject(new Date())).toBe(false);
        expect(isPlainObject(BigInt('7238532'))).toBe(false);
        expect(isPlainObject(() => { })).toBe(false);
    });

    it('works with plain object values', () => {
        expect(isPlainObject({})).toBe(true);
        expect(isPlainObject({ x: 1 })).toBe(true);
    });
});
