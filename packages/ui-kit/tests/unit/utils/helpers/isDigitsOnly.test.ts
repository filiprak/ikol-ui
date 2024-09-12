import { isDigitsOnly } from '@ui/utils/helpers';

describe('isDigitsOnly', () => {
    it('works correctly', () => {
        expect(isDigitsOnly('')).toBe(false);
        expect(isDigitsOnly(null)).toBe(false);
        expect(isDigitsOnly(undefined)).toBe(false);
        expect(isDigitsOnly(false)).toBe(false);
        expect(isDigitsOnly({})).toBe(false);
        expect(isDigitsOnly([])).toBe(false);
        expect(isDigitsOnly(NaN)).toBe(false);
        expect(isDigitsOnly('abcdex')).toBe(false);

        expect(isDigitsOnly('000000')).toBe(true);
        expect(isDigitsOnly(-1)).toBe(true);
        expect(isDigitsOnly(0)).toBe(true);
        expect(isDigitsOnly(994455)).toBe(true);
        expect(isDigitsOnly(1e4)).toBe(true);
        expect(isDigitsOnly('0')).toBe(true);
        expect(isDigitsOnly('0123456789')).toBe(true);
    });
});
