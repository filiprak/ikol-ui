import { isEmpty } from '@ui/utils/helpers';

describe('isEmpty', () => {
    it('works with empty values', () => {
        expect(isEmpty(undefined)).toBe(true);
        expect(isEmpty(false)).toBe(true);
        expect(isEmpty(null)).toBe(true);
        expect(isEmpty(NaN)).toBe(true);
        expect(isEmpty('')).toBe(true);
        expect(isEmpty([])).toBe(true);
        expect(isEmpty(new Array())).toBe(true);
        expect(isEmpty({})).toBe(true);
    });

    it('works with non-empty values', () => {
        expect(isEmpty(0)).toBe(false);
        expect(isEmpty(1)).toBe(false);
        expect(isEmpty(BigInt('7238532'))).toBe(false);
        expect(isEmpty(() => { })).toBe(false);
        expect(isEmpty([1, 2, 3])).toBe(false);
        expect(isEmpty(Symbol())).toBe(false);
        expect(isEmpty({ x: 1 })).toBe(false);
        expect(isEmpty(new Date())).toBe(false);
        expect(isEmpty(true)).toBe(false);
        expect(isEmpty(Infinity)).toBe(false);
        expect(isEmpty('abc')).toBe(false);
        expect(isEmpty(' ')).toBe(false);
    });
});
