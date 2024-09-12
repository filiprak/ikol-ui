import { isValidPassword } from '@ui/utils/helpers';

describe('isValidPassword', () => {
    it('works correctly', () => {
        expect(isValidPassword('')).toBe(false);
        expect(isValidPassword(null)).toBe(false);
        expect(isValidPassword(undefined)).toBe(false);
        expect(isValidPassword(false)).toBe(false);
        expect(isValidPassword({})).toBe(false);
        expect(isValidPassword([])).toBe(false);
        expect(isValidPassword(0)).toBe(false);
        expect(isValidPassword(NaN)).toBe(false);
        expect(isValidPassword('abcdex')).toBe(false);
        expect(isValidPassword('000000')).toBe(false);
        expect(isValidPassword('testtest')).toBe(false);
        expect(isValidPassword('testtest1')).toBe(false);
        expect(isValidPassword('test1A')).toBe(false);
        expect(isValidPassword('testtest10')).toBe(false);

        expect(isValidPassword('testtestA1')).toBe(true);
        expect(isValidPassword('testtestA!')).toBe(true);
        expect(isValidPassword('test123A!')).toBe(true);
    });
});
