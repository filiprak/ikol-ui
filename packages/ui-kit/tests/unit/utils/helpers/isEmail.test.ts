import { isEmail } from '@ui/utils/helpers';

describe('isEmail', () => {
    it('works correctly', () => {
        expect(isEmail('')).toBe(false);
        expect(isEmail(null)).toBe(false);
        expect(isEmail(undefined)).toBe(false);
        expect(isEmail(false)).toBe(false);
        expect(isEmail({})).toBe(false);
        expect(isEmail([])).toBe(false);
        expect(isEmail(0)).toBe(false);
        expect(isEmail(NaN)).toBe(false);
        expect(isEmail('abcdex')).toBe(false);
        expect(isEmail('000000')).toBe(false);
        expect(isEmail('@test.pl')).toBe(false);
        expect(isEmail('@')).toBe(false);
        expect(isEmail('@test')).toBe(false);
        expect(isEmail('t@t.')).toBe(false);
        expect(isEmail('t@t')).toBe(false);
        expect(isEmail('t@t..')).toBe(false);
        expect(isEmail('t@t.$%^')).toBe(false);

        expect(isEmail('test@gmail.pl')).toBe(true);
        expect(isEmail('t@t.t')).toBe(true);
    });
});
