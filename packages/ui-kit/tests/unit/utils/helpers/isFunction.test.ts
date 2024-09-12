import { isFunction } from '@ui/utils/helpers';

describe('isFunction', () => {
    it('works with non-function values', () => {
        expect(isFunction(undefined)).toBe(false);
        expect(isFunction(0)).toBe(false);
        expect(isFunction(1)).toBe(false);
        expect(isFunction(false)).toBe(false);
        expect(isFunction(true)).toBe(false);
        expect(isFunction(null)).toBe(false);
        expect(isFunction(NaN)).toBe(false);
        expect(isFunction(Infinity)).toBe(false);
        expect(isFunction('')).toBe(false);
        expect(isFunction('abc')).toBe(false);
        expect(isFunction(' ')).toBe(false);
        expect(isFunction([])).toBe(false);
        expect(isFunction([1, 2, 3])).toBe(false);
        expect(isFunction(Symbol())).toBe(false);
        expect(isFunction(new Array())).toBe(false);
        expect(isFunction(BigInt('7238532'))).toBe(false);
        expect(isFunction({})).toBe(false);
        expect(isFunction({ x: 1 })).toBe(false);
        expect(isFunction(new Date())).toBe(false);
    });

    it('works with function values', () => {
        expect(isFunction(() => { })).toBe(true);
        expect(isFunction(new Function())).toBe(true);
        expect(isFunction(function () { })).toBe(true);
    });
});
