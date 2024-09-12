import { isBoolean } from '@ui/utils/helpers';

describe('isBoolean', () => {
    it('works with non-boolean values', () => {
        expect(isBoolean(undefined)).toBe(false);
        expect(isBoolean(0)).toBe(false);
        expect(isBoolean(1)).toBe(false);
        expect(isBoolean('')).toBe(false);
        expect(isBoolean('abc')).toBe(false);
        expect(isBoolean(' ')).toBe(false);
        expect(isBoolean(null)).toBe(false);
        expect(isBoolean(NaN)).toBe(false);
        expect(isBoolean(Infinity)).toBe(false);
        expect(isBoolean([])).toBe(false);
        expect(isBoolean([1, 2, 3])).toBe(false);
        expect(isBoolean(Symbol())).toBe(false);
        expect(isBoolean(new Array())).toBe(false);
        expect(isBoolean(new Date())).toBe(false);
        expect(isBoolean(BigInt('7238532'))).toBe(false);
        expect(isBoolean(() => { })).toBe(false);
        expect(isBoolean({})).toBe(false);
        expect(isBoolean({ x: 1 })).toBe(false);
    });

    it('works with boolean values', () => {
        expect(isBoolean(false)).toBe(true);
        expect(isBoolean(true)).toBe(true);
    });
});
