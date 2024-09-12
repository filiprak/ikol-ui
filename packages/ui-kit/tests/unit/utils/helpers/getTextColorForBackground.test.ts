import { getTextColorForBackground } from '@ui/utils/helpers';

describe('getTextColorForBackground', () => {
    it('matches the text color to the background color correctly', () => {
        expect(getTextColorForBackground('#f0f0f0')).toBe('000000');
        expect(getTextColorForBackground('#fcfcde')).toBe('000000');
        expect(getTextColorForBackground('#f5f540')).toBe('000000');
        expect(getTextColorForBackground('f5f540')).toBe('000000');
        expect(getTextColorForBackground('#000000')).toBe('ffffff');
        expect(getTextColorForBackground('#3d3d3d')).toBe('ffffff');
        expect(getTextColorForBackground('3d3d3d')).toBe('ffffff');
        expect(getTextColorForBackground('#160475')).toBe('ffffff');
        expect(getTextColorForBackground('160475')).toBe('ffffff');
    });

    it('works with custom dark/plain colors', () => {
        expect(getTextColorForBackground('#ffffff', { dark_text: '#646464' })).toBe('#646464');
        expect(getTextColorForBackground('#000000', { plain_text: '#f0f0f0' })).toBe('#f0f0f0');
    });
});
