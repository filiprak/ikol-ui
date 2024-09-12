import { isUrl } from '@ui/utils/helpers';

describe('isUrl', () => {
    it('works correctly', () => {
        expect(isUrl('')).toBe(false);
        expect(isUrl(null)).toBe(false);
        expect(isUrl(undefined)).toBe(false);
        expect(isUrl(false)).toBe(false);
        expect(isUrl({})).toBe(false);
        expect(isUrl([])).toBe(false);
        expect(isUrl(0)).toBe(false);
        expect(isUrl(NaN)).toBe(false);
        expect(isUrl('abcdex')).toBe(false);
        expect(isUrl('000000')).toBe(false);
        expect(isUrl('@test.pl')).toBe(false);
        expect(isUrl('www.google.com')).toBe(false); // no schema

        expect(isUrl('http://www.google.com')).toBe(true);
        expect(isUrl('http://google.com')).toBe(true);
        expect(isUrl('https://google.com')).toBe(true);
        expect(isUrl('ftp://google.com')).toBe(true);
    });
});
