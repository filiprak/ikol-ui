import { isNumber } from '@ui/utils/helpers';

describe('isNumber', () => {
    it('works with non-number values', () => {
        expect(isNumber(undefined)).toBe(false);
        expect(isNumber('')).toBe(false);
        expect(isNumber('1')).toBe(false);
        expect(isNumber('4.676')).toBe(false);
        expect(isNumber('abc')).toBe(false);
        expect(isNumber(' ')).toBe(false);
        expect(isNumber(false)).toBe(false);
        expect(isNumber(true)).toBe(false);
        expect(isNumber(null)).toBe(false);
        expect(isNumber([])).toBe(false);
        expect(isNumber([1, 2, 3])).toBe(false);
        expect(isNumber(Symbol())).toBe(false);
        expect(isNumber(new Array())).toBe(false);
        expect(isNumber(new Date())).toBe(false);
        expect(isNumber(BigInt('7238532'))).toBe(false);
        expect(isNumber(() => { })).toBe(false);
        expect(isNumber({})).toBe(false);
        expect(isNumber({ x: 1 })).toBe(false);
    });

    it('works with number values', () => {
        expect(isNumber(-1)).toBe(true);
        expect(isNumber(0)).toBe(true);
        expect(isNumber(1)).toBe(true);
        expect(isNumber(1.345)).toBe(true);
        expect(isNumber(1.345)).toBe(true);
        expect(isNumber(1.2e6)).toBe(true);
        expect(isNumber(Number(123))).toBe(true);
        expect(isNumber(NaN)).toBe(true);
        expect(isNumber(Infinity)).toBe(true);
    });
});
