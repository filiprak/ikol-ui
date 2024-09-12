import { clamp } from '@ui/utils/helpers';

describe('clamp', () => {
    it('works for numbers', () => {
        expect(clamp(1, 0, 1)).toBe(1);
        expect(clamp(0, 0, 1)).toBe(0);
        expect(clamp(-1, 0, 1)).toBe(0);
        expect(clamp(-99, 0, 1)).toBe(0);
        expect(clamp(2, 0, 1)).toBe(1);
        expect(clamp(99, 0, 5)).toBe(5);
        expect(clamp(6, 0, 7)).toBe(6);
        expect(clamp(0.55, -0.5, 0.5)).toBe(0.5);
        expect(clamp(0, -0.5, 0.5)).toBe(0);
        expect(clamp(-100.99, -0.5, 0.5)).toBe(-0.5);
        expect(clamp(-0.5, -0.5, 0.5)).toBe(-0.5);
    });
});
