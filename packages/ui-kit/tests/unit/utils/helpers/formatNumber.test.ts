import { formatNumber } from '@ui/utils/helpers';

describe('formatNumber', () => {
    it('does not format not numeric values', () => {
        expect(formatNumber('', 2)).toBe('');
        // expect(formatNumber(undefined, 2)).toBe(undefined);
        expect(formatNumber('x', 2)).toBe('x');
        expect(formatNumber('1x', 3)).toBe('1x');
        // expect(formatNumber(null, 3)).toBe(null);
        // expect(formatNumber(false, 3)).toBe(false);
        expect(formatNumber(NaN, 3)).toBe('NaN');
        // expect(formatNumber({}, 3)).toEqual({});
        // expect(formatNumber([], 3)).toEqual([]);
        // expect(formatNumber(true, 3)).toBe(true);
        expect(formatNumber('')).toBe('');
        expect(formatNumber('', 0)).toBe('');
    });

    it('formats numeric values', () => {
        expect(formatNumber(0)).toBe('0.00');
        expect(formatNumber(-1)).toBe('-1.00');
        expect(formatNumber(4.888)).toBe('4.89');
        expect(formatNumber(4.9999)).toBe('5.00');
        expect(formatNumber(-99.99)).toBe('-99.99');
        expect(formatNumber(-99.995)).toBe('-100.00');
        expect(formatNumber(-99.995, 3)).toBe('-99.995');
        expect(formatNumber(-99.995, 5)).toBe('-99.99500');
    });

    it('formats string-numeric values', () => {
        expect(formatNumber('0')).toBe('0.00');
        expect(formatNumber('-1')).toBe('-1.00');
        expect(formatNumber('4.888')).toBe('4.89');
        expect(formatNumber('4.9999')).toBe('5.00');
        expect(formatNumber('-99.99')).toBe('-99.99');
        expect(formatNumber('-99.995')).toBe('-100.00');
        expect(formatNumber('-99.995', 3)).toBe('-99.995');
        expect(formatNumber('-99.995', 5)).toBe('-99.99500');
    });

    it('formats with 0 decimal places', () => {
        expect(formatNumber(0, 0)).toBe('0');
        expect(formatNumber('-1', 0)).toBe('-1');
        expect(formatNumber('4.888', 0)).toBe('5');
        expect(formatNumber(-4.9999, 0)).toBe('-5');
    });

    it('formats with separator', () => {
        expect(formatNumber('', 0, true)).toBe('');
        // expect(formatNumber(null, 2, true)).toBe(null);
        // expect(formatNumber(undefined, 2, true)).toBe(undefined);
        // expect(formatNumber(false, 2, true)).toBe(false);
        expect(formatNumber(0, 2, true)).toBe('0.00');
        expect(formatNumber(5004, 0, true)).toBe('5 004');
        expect(formatNumber(-13453, 2, true)).toBe('-13 453.00');
        expect(formatNumber(1001.123456789, 8, true)).toBe('1 001.12345679');
        expect(formatNumber(1000000000, 0, ',')).toBe('1,000,000,000');
    });
});
