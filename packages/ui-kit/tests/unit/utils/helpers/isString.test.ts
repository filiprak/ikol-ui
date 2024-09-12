import { isString } from '@ui/utils/helpers';

describe('isString', () => {
    it('works with non-string values', () => {
        expect(isString(undefined)).toBe(false);
        expect(isString(0)).toBe(false);
        expect(isString(1)).toBe(false);
        expect(isString(false)).toBe(false);
        expect(isString(true)).toBe(false);
        expect(isString(null)).toBe(false);
        expect(isString(NaN)).toBe(false);
        expect(isString(Infinity)).toBe(false);
        expect(isString([])).toBe(false);
        expect(isString([1, 2, 3])).toBe(false);
        expect(isString(Symbol())).toBe(false);
        expect(isString(new Array())).toBe(false);
        expect(isString(new Date())).toBe(false);
        expect(isString(BigInt('7238532'))).toBe(false);
        expect(isString(() => { })).toBe(false);
        expect(isString({})).toBe(false);
        expect(isString({ x: 1 })).toBe(false);
    });

    it('works with string values', () => {
        expect(isString('')).toBe(true);
        expect(isString('abc')).toBe(true);
        expect(isString(' ')).toBe(true);
        expect(isString(String())).toBe(true);
        expect(isString(String(''))).toBe(true);
    });
});
