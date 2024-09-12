import { isEnumValue } from '@ui/utils/helpers';

describe('isEnum', () => {
    enum TestEnum {
        A = 'A',
        B = 10,
        C = 11,
        D = 'D'
    }

    const TestConstObject = {
        A: 'A',
        B: 10,
        C: 11,
        D: 'D',
    } as const;

    const testObject = {
        a: 'A',
        b: 1,
    };

    it('works with object values', () => {
        expect(isEnumValue(testObject, 'A')).toBe(true);
        expect(isEnumValue(testObject, 1)).toBe(true);
        expect(isEnumValue(testObject, 'A')).toBe(true);
    });

    it('works with o values', () => {
        expect(isEnumValue(TestEnum, 'A')).toBe(true);
        expect(isEnumValue(TestEnum, 10)).toBe(true);
        expect(isEnumValue(TestEnum, 'non-key')).toBe(false);
    });

    it('works with object as const values', () => {
        expect(isEnumValue(TestConstObject, 'A')).toBe(true);
        expect(isEnumValue(TestConstObject, 10)).toBe(true);
        expect(isEnumValue(TestConstObject, 'non-key')).toBe(false);
    });
});
