import { getIconClasses } from '@ui/utils/helpers';

describe('getIconClasses', () => {
    it('returns correct fa classes', () => {
        expect(getIconClasses('')).toStrictEqual([]);
        expect(getIconClasses('home:')).toStrictEqual(['fa-solid', 'fa-home']);
        expect(getIconClasses('home:unknown')).toStrictEqual(['fa-solid', 'fa-home']);
        expect(getIconClasses('home')).toStrictEqual(['fa-solid', 'fa-home']);
        expect(getIconClasses('home:thin')).toStrictEqual(['fa-thin', 'fa-home']);
        expect(getIconClasses('home:light')).toStrictEqual(['fa-light', 'fa-home']);
        expect(getIconClasses('home:regular')).toStrictEqual(['fa-regular', 'fa-home']);
        expect(getIconClasses('home:solid')).toStrictEqual(['fa-solid', 'fa-home']);
        expect(getIconClasses('home:duotone')).toStrictEqual(['fa-duotone', 'fa-home']);
        expect(getIconClasses('facebook:brands')).toStrictEqual(['fa-brands', 'fa-facebook']);
    });
});
