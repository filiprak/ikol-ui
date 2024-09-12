import { getRandomString } from '@ui/utils/helpers';

describe('getRandomString', () => {
    it('returns empty string', () => {
        expect(getRandomString(-1)).toBe('');
    });

    it('returns proper length string', () => {
        expect(getRandomString(0)).toHaveLength(0);
        expect(getRandomString(7)).toHaveLength(7);
        expect(getRandomString(99)).toHaveLength(99);
    });

    it('returns different string each call', () => {
        expect(getRandomString(8)).not.toEqual(getRandomString(8));
    });

    it('returns valid characters', () => {
        expect(getRandomString(8)).toMatch(/[A-Za-z0-9]+/);
    });
});
