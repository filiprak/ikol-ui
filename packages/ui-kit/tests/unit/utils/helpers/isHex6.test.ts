import { isHex6 } from '@ui/utils/helpers';

describe('isHex6', () => {
    it('works correctly', () => {
        expect(isHex6('')).toBe(false);
        expect(isHex6(null)).toBe(false);
        expect(isHex6(undefined)).toBe(false);
        expect(isHex6(false)).toBe(false);
        expect(isHex6({})).toBe(false);
        expect(isHex6([])).toBe(false);
        expect(isHex6(0)).toBe(false);
        expect(isHex6(NaN)).toBe(false);
        expect(isHex6('abcdex')).toBe(false);
        expect(isHex6('0000000')).toBe(false);

        expect(isHex6('000000')).toBe(true);
        expect(isHex6('aabbcc')).toBe(true);
        expect(isHex6('aabbcc')).toBe(true);
        expect(isHex6('ffffff')).toBe(true);
        expect(isHex6('0FE432')).toBe(true);
    });
});
