import { flattenKeys } from '@ui/utils/helpers';

describe('flattenKeys', () => {
    it('works with falsy and non-object values', () => {
        expect(flattenKeys(undefined)).toStrictEqual({});
        expect(flattenKeys(0)).toStrictEqual({});
        expect(flattenKeys(1)).toStrictEqual({});
        expect(flattenKeys(false)).toStrictEqual({});
        expect(flattenKeys(true)).toStrictEqual({});
        expect(flattenKeys(null)).toStrictEqual({});
        expect(flattenKeys(NaN)).toStrictEqual({});
        expect(flattenKeys('')).toStrictEqual({});
        expect(flattenKeys('abc')).toStrictEqual({});
        expect(flattenKeys(' ')).toStrictEqual({});
    });

    it('works with arrays', () => {
        expect(flattenKeys([])).toStrictEqual({});
        expect(flattenKeys([1, 2, 3])).toStrictEqual({ '[0]': 1, '[1]': 2, '[2]': 3 });
        expect(flattenKeys([1, { x: 5, y: 6 }, 3])).toStrictEqual({ '[0]': 1, '[1][x]': 5, '[1][y]': 6, '[2]': 3 });
        expect(flattenKeys([1, { x: 5, y: ['abc', 8] }, 3])).toStrictEqual({ '[0]': 1, '[1][x]': 5, '[1][y][0]': 'abc', '[1][y][1]': 8, '[2]': 3 });
    });

    it('works with plain objects', () => {
        expect(flattenKeys({})).toStrictEqual({});
        expect(flattenKeys({ prop1: 'foo' })).toStrictEqual({ prop1: 'foo' });
        expect(flattenKeys({ prop1: 'foo', prop2: [1, 2] })).toStrictEqual({ prop1: 'foo', 'prop2[0]': 1, 'prop2[1]': 2 });
        expect(flattenKeys({
            prop1: 'foo',
            prop2: [1, 2, { x: 4, y: false, z: null }],
        })).toStrictEqual({
            prop1: 'foo',
            'prop2[0]': 1,
            'prop2[1]': 2,
            'prop2[2][x]': 4,
            'prop2[2][y]': false,
            'prop2[2][z]': null,
        });
    });

    it('works with not-plain objects', () => {
        const date = new Date();
        const file = new File(['0100101010'], 'file');

        expect(flattenKeys(date)).toStrictEqual({});
        expect(flattenKeys(file)).toStrictEqual({});
        expect(flattenKeys({ prop1: 'foo', prop2: date })).toStrictEqual({ prop1: 'foo', prop2: date });
        expect(flattenKeys({ prop1: 'foo', prop2: file })).toStrictEqual({ prop1: 'foo', prop2: file });
    });
});
