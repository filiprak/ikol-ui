import { isArray } from '@ui/utils/helpers';

describe('isArray', () => {
    it('works with non-array values', () => {
        expect(isArray(undefined)).toBe(false);
        expect(isArray(0)).toBe(false);
        expect(isArray(1)).toBe(false);
        expect(isArray(false)).toBe(false);
        expect(isArray(true)).toBe(false);
        expect(isArray(null)).toBe(false);
        expect(isArray(NaN)).toBe(false);
        expect(isArray(Infinity)).toBe(false);
        expect(isArray('')).toBe(false);
        expect(isArray('abc')).toBe(false);
        expect(isArray(' ')).toBe(false);
        expect(isArray({})).toBe(false);
        expect(isArray(new Date())).toBe(false);
        expect(isArray(Symbol())).toBe(false);
        expect(isArray(BigInt('7238532'))).toBe(false);
        expect(isArray(() => { })).toBe(false);
    });

    it('works with array values', () => {
        expect(isArray([])).toBe(true);
        expect(isArray([1, 2, 3])).toBe(true);
        expect(isArray(new Array())).toBe(true);
    });
});
