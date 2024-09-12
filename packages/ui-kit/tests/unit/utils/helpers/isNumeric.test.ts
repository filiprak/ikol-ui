import { isNumeric } from '@ui/utils/helpers';

describe('isNumeric', () => {
    it('works with non-number values', () => {
        expect(isNumeric(undefined)).toBe(false);
        expect(isNumeric('')).toBe(false);
        expect(isNumeric('abc')).toBe(false);
        expect(isNumeric(' ')).toBe(false);
        expect(isNumeric('1.1.')).toBe(false);
        expect(isNumeric('1x8')).toBe(false);
        expect(isNumeric(false)).toBe(false);
        expect(isNumeric(true)).toBe(false);
        expect(isNumeric(null)).toBe(false);
        expect(isNumeric(NaN)).toBe(false);
        expect(isNumeric(Infinity)).toBe(false);
        expect(isNumeric([])).toBe(false);
        expect(isNumeric([1, 2, 3])).toBe(false);
        expect(isNumeric(Symbol())).toBe(false);
        expect(isNumeric(new Array())).toBe(false);
        expect(isNumeric(new Date())).toBe(false);
        expect(isNumeric(BigInt('7238532'))).toBe(false);
        expect(isNumeric(() => { })).toBe(false);
        expect(isNumeric({})).toBe(false);
        expect(isNumeric({ x: 1 })).toBe(false);
    });

    it('works with number values', () => {
        expect(isNumeric('-1')).toBe(true);
        expect(isNumeric('0')).toBe(true);
        expect(isNumeric('4.676')).toBe(true);
        expect(isNumeric('1e6')).toBe(true);
        expect(isNumeric(-1)).toBe(true);
        expect(isNumeric(0)).toBe(true);
        expect(isNumeric(1)).toBe(true);
        expect(isNumeric(1.345)).toBe(true);
        expect(isNumeric(1.345)).toBe(true);
        expect(isNumeric(1.2e6)).toBe(true);
        expect(isNumeric(Number(123))).toBe(true);
    });
});
