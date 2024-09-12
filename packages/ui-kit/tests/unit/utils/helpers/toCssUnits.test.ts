import { toCssUnits } from '@ui/utils/helpers';

describe('toCssUnits', () => {
    it('formats string type values', () => {
        expect(toCssUnits('')).toBe('0');
        expect(toCssUnits(' ')).toBe('0');
        expect(toCssUnits('0')).toBe('0');
        expect(toCssUnits('1')).toBe('1px');
        expect(toCssUnits('-1')).toBe('-1px');
        expect(toCssUnits('54')).toBe('54px');
        expect(toCssUnits('54.7')).toBe('54.7px');
        expect(toCssUnits('54', 'em')).toBe('54em');
        expect(toCssUnits('0.4', 'em')).toBe('0.4em');
        expect(toCssUnits('', 'em')).toBe('0');
    });

    it('formats number type values', () => {
        expect(toCssUnits(0)).toBe('0');
        expect(toCssUnits(NaN)).toBe('0');
        expect(toCssUnits(1)).toBe('1px');
        expect(toCssUnits(-1)).toBe('-1px');
        expect(toCssUnits(4.56)).toBe('4.56px');
        expect(toCssUnits(0.4, 'em')).toBe('0.4em');
    });
});
