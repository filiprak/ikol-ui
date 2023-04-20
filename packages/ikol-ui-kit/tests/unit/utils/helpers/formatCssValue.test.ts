import { formatCssValue } from "@/utils/helpers";

describe('formatCssValue', () => {

    it('formats string type values', () => {
        expect(formatCssValue('')).toBe('0');
        expect(formatCssValue(' ')).toBe('0');
        expect(formatCssValue('0')).toBe('0');
        expect(formatCssValue('1')).toBe('1px');
        expect(formatCssValue('-1')).toBe('-1px');
        expect(formatCssValue('54')).toBe('54px');
        expect(formatCssValue('54.7')).toBe('54.7px');
        expect(formatCssValue('54', 'em')).toBe('54em');
        expect(formatCssValue('0.4', 'em')).toBe('0.4em');
        expect(formatCssValue('', 'em')).toBe('0');
    });

    it('formats number type values', () => {
        expect(formatCssValue(0)).toBe('0');
        expect(formatCssValue(NaN)).toBe('0');
        expect(formatCssValue(1)).toBe('1px');
        expect(formatCssValue(-1)).toBe('-1px');
        expect(formatCssValue(4.56)).toBe('4.56px');
        expect(formatCssValue(0.4, 'em')).toBe('0.4em');
    });

});
