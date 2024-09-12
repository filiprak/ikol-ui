import { hex2rgb } from '@ui/utils/helpers';

describe('hex2rgb', () => {
    it('works for falsy values', () => {
        expect(hex2rgb('')).toStrictEqual([0, 0, 0]);
    });

    it('works for numeric values', () => {
        expect(hex2rgb('0')).toStrictEqual([0, 0, 0]);
        expect(hex2rgb('-1')).toStrictEqual([0, 0, 0]);
        expect(hex2rgb('13')).toStrictEqual([0, 0, 0]);
    });

    it('works for string values', () => {
        expect(hex2rgb('123456')).toStrictEqual([18, 52, 86]);
        expect(hex2rgb('FFABB4')).toStrictEqual([255, 171, 180]);
        expect(hex2rgb('FFABB4')).toStrictEqual([255, 171, 180]);
        expect(hex2rgb('#FFABB4')).toStrictEqual([255, 171, 180]);
        expect(hex2rgb('#FFA')).toStrictEqual([0, 0, 0]);
        expect(hex2rgb('#FFADD')).toStrictEqual([0, 0, 0]);
    });
});
