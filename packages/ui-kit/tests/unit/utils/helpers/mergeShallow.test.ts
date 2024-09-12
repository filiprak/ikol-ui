import { mergeShallow } from '@ui/utils/helpers';

describe('mergeShallow', () => {
    it('works with objects', () => {
        expect(mergeShallow({}, {})).toStrictEqual({});
        expect(mergeShallow({ x: 1 }, { y: 2 })).toStrictEqual({ x: 1, y: 2 });
        expect(mergeShallow({ x: [1, 2] }, { y: 2 })).toStrictEqual({ x: [1, 2], y: 2 });
        expect(mergeShallow({ x: [1, 2] }, { x: 5 })).toStrictEqual({ x: 5 });
        expect(mergeShallow({ x: [1, 2] }, { x: [3] })).toStrictEqual({ x: [3] });
        expect(mergeShallow({ x: { a: 'foo' } }, { x: { b: 'bar' } })).toStrictEqual({ x: { b: 'bar' } });
        expect(mergeShallow({ x: 6 }, { x: 0 })).toStrictEqual({ x: 0 });
    });

    it('does not merge undefined values', () => {
        expect(mergeShallow({ x: 6 }, { x: undefined, g: undefined })).toStrictEqual({ x: 6 });
    });

    it('does merge null values', () => {
        expect(mergeShallow({ x: 6 }, { x: null, y: null })).toStrictEqual({ x: null, y: null });
    });
});
