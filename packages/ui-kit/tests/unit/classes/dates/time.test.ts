import MockDate from 'mockdate';
import { createLocalePreset, duration, time } from '@ui/classes/dates';

describe('time', () => {
    describe('time.localeSettings', () => {
        it('returns locale settings object', () => {
            expect(time.localeSettings()).toStrictEqual({
                date_format: 'International',
                target_tz: 'Europe/Warsaw',
                week_first_day: 'Monday',
                time_format: '24H',
            });
        });
    });

    describe('time.localizeFormat', () => {
        it('returns correct localized date format', () => {
            expect(
                createLocalePreset({
                    date_format: 'International',
                    target_tz: 'Europe/Warsaw',
                    time_format: '24H',
                }).localizeFormat('[Ymd]')
            ).toStrictEqual('YYYY-MM-DD');

            expect(
                createLocalePreset({
                    date_format: 'International',
                    target_tz: 'Europe/Warsaw',
                    time_format: '24H',
                }).localizeFormat('![D YYYY]')
            ).toStrictEqual('D YYYY');

            expect(
                createLocalePreset({
                    date_format: 'American',
                    target_tz: 'Europe/Warsaw',
                    time_format: '12H',
                }).localizeFormat('[Ymd]')
            ).toStrictEqual('MM/DD/YYYY');

            expect(
                createLocalePreset({
                    date_format: 'American',
                    target_tz: 'Europe/Warsaw',
                    time_format: '12H',
                }).localizeFormat('[YmdHis]')
            ).toStrictEqual('MM/DD/YYYY hh:mm:ss a');

            expect(
                createLocalePreset({
                    date_format: 'American',
                    target_tz: 'Europe/Warsaw',
                    time_format: '12H',
                }).localizeFormat('YYMMDD')
            ).toStrictEqual('YYMMDD');

            expect(
                createLocalePreset({
                    date_format: 'American',
                    target_tz: 'Europe/Warsaw',
                    time_format: '12H',
                }).localizeFormat('lll')
            ).toStrictEqual('lll');
        });
    });

    describe('createTimePreset', () => {
        beforeEach(() => {
            MockDate.set('2020-01-09 14:14:07');
        });

        afterEach(() => {
            MockDate.reset();
        });

        it('creates reusable locale preset', () => {
            const time_pres = createLocalePreset({
                date_format: 'American',
                target_tz: 'America/New_York',
                time_format: '12H',
                week_first_day: 'Sunday',
            });

            expect(time_pres().format()).toBe('01/09/2020 08:14 am');
            expect(time().format()).toBe('2020-01-09 14:14');
            expect(time_pres('2020-01-01 02:37').format()).toBe('01/01/2020 02:37 am');
            expect(time_pres('01/01/2020 02:57 am', '[YmdHi]').format()).toBe('01/01/2020 02:57 am');
            expect(time_pres('2020-01-01 14:13').format()).toBe('01/01/2020 02:13 pm');
        });
    });

    describe('time', () => {
        it('parses date in local timezone', () => {
            expect(time('2020 01 01 00 00', 'YYYY MM DD HH mm').formatUtc('YYYY|MM|DD HH|mm'))
                .toEqual('2019|12|31 23|00');
            expect(time('2020-01-01 22:00', '[YmdHi]').formatUtc('YYYY|MM|DD HH|mm'))
                .toEqual('2020|01|01 21|00');
            expect(time('202001012200', '[F]').formatUtc('lll'))
                .toEqual('Invalid date');
        });

        it('returns current time', () => {
            MockDate.set('2020-01-09 14:14:07');
            expect(time().format('YYYY|MM|DD HH|mm|ss'))
                .toEqual('2020|01|09 14|14|07');
            MockDate.reset();
        });
    });

    describe('time.local', () => {
        it('converts time date to local time', () => {
            expect(time.utc('2020-01-01 00:00').local().format('YYYY|MM|DD HH|mm'))
                .toEqual('2020|01|01 01|00');
            expect(time.utc('2020-01-01 22:00').local().format('YYYY|MM|DD HH|mm'))
                .toEqual('2020|01|01 23|00');
            expect(time('2020-01-01 22:00', '[YmdHi]').local().format('YYYY|MM|DD HH|mm'))
                .toEqual('2020|01|01 22|00');
        });
    });

    describe('time.isFullDaySpan', () => {
        it('works for valid time spans', () => {
            expect(time.isFullDaySpan(time('2023-01-01 00:00:00'), time('2023-01-01 00:00:00'))).toBe(true);
            expect(time.isFullDaySpan(time('2023-01-01 00:00:00'), time('2023-01-02 00:00:00'))).toBe(true);
            expect(time.isFullDaySpan(time('2023-01-01 00:00:00'), time('2023-01-03 00:00:00'))).toBe(true);
            expect(time.isFullDaySpan(time('2023-01-07 00:00:00'), time('2023-01-03 00:00:00'))).toBe(true);

            expect(time.isFullDaySpan(time('2023-01-01 00:00:00'), time('2023-01-01 23:59:59'))).toBe(false);
            expect(time.isFullDaySpan(time('2023-01-01 00:00:00'), time('2023-01-03 00:00:59'))).toBe(false);
            expect(time.isFullDaySpan(time('2023-01-01 00:00:01'), time('2023-01-02 00:00:00'))).toBe(false);
            expect(time.isFullDaySpan(time('2023-01-01 00:01:00'), time('2023-01-01 00:00:00'))).toBe(false);
            expect(time.isFullDaySpan(time('2023-01-01 00:01:00'), time('2023-01-01 00:01:00'))).toBe(false);
            expect(time.isFullDaySpan(time('2023-01-01 00:01:00'), time('2023-01-03 00:01:00'))).toBe(false);
        });
    });

    describe('time.format', () => {
        beforeEach(() => {
            MockDate.set('2020-01-09 14:14:07');
        });

        afterEach(() => {
            MockDate.reset();
        });

        it('works with falsy timestamp values', function () {
            expect(time(0).format('[YmdHis]')).toEqual('1970-01-01 01:00:00');
            expect(time('0').format('[YmdHis]')).toEqual('0000-01-01 00:00:00');
            expect(time().format('[YmdHis]')).toEqual('2020-01-09 14:14:07');
            expect(time(undefined).format('[YmdHis]')).toEqual('2020-01-09 14:14:07');
            expect(time({}).format('[YmdHis]')).toEqual('2020-01-09 14:14:07');
            expect(time(NaN).format('[YmdHis]')).toEqual('Invalid date');
            expect(time(-1).format('[YmdHis]')).toEqual('1970-01-01 00:59:59');
        });

        it('works with forced format', function () {
            expect(time().format('![DD MMMM, YYYY / HH:mm(ss)]')).toEqual('09 January, 2020 / 14:14(07)');
            expect(time().format('![  DD MMMM, YYYY   ]')).toEqual('  09 January, 2020   ');
            expect(time().format('![MMM]')).toEqual('Jan');
        });

        it('works with standard options', function () {
            const time_1 = createLocalePreset({ date_format: 'International', time_format: '24H' });
            const time_2 = createLocalePreset({ date_format: 'European', time_format: '24H' });
            const time_3 = createLocalePreset({ date_format: 'American', time_format: '24H' });
            const time_4 = createLocalePreset({ date_format: 'American', time_format: '12H' });

            expect(time_1().format('[YmdHis]'))
                .toEqual('2020-01-09 14:14:07');
            expect(time_2().format('[YmdHis]'))
                .toEqual('09.01.2020 14:14:07');
            expect(time_3().format('[YmdHis]'))
                .toEqual('01/09/2020 14:14:07');
            expect(time_4().format('[YmdHis]'))
                .toEqual('01/09/2020 02:14:07 pm');
        });

        it('works with standard formats (International, default)', function () {
            expect(time().format('[Ymd]')).toEqual('2020-01-09');
            expect(time().format('[YmdHi]')).toEqual('2020-01-09 14:14');
            expect(time().format('[YmdHis]')).toEqual('2020-01-09 14:14:07');
            expect(time().format('[His]')).toEqual('14:14:07');
            expect(time().format('[Hi]')).toEqual('14:14');
            expect(time().format('[M]')).toEqual('Jan');
            expect(time().format('[F]')).toEqual('January');
            expect(time().format('[Ym]')).toEqual('2020-01');
            expect(time().format('[YMd]')).toEqual('9 Jan, 2020');
            expect(time().format('[YFd]')).toEqual('9 January, 2020');
        });

        it('works with standard formats (European)', function () {
            const time_1 = createLocalePreset({ date_format: 'European' });

            expect(time_1().format('[Ymd]')).toEqual('09.01.2020');
            expect(time_1().format('[YmdHi]')).toEqual('09.01.2020 14:14');
            expect(time_1().format('[YmdHis]')).toEqual('09.01.2020 14:14:07');
            expect(time_1().format('[His]')).toEqual('14:14:07');
            expect(time_1().format('[Hi]')).toEqual('14:14');
            expect(time_1().format('[M]')).toEqual('Jan');
            expect(time_1().format('[F]')).toEqual('January');
            expect(time_1().format('[Ym]')).toEqual('01.2020');
            expect(time_1().format('[YMd]')).toEqual('9 Jan, 2020');
            expect(time_1().format('[YFd]')).toEqual('9 January, 2020');
        });

        it('works with standard formats (American)', function () {
            const time_1 = createLocalePreset({ date_format: 'American', time_format: '12H' });

            expect(time_1().format('[Ymd]'))
                .toEqual('01/09/2020');
            expect(time_1().format('[YmdHi]'))
                .toEqual('01/09/2020 02:14 pm');
            expect(time_1().format('[YmdHis]'))
                .toEqual('01/09/2020 02:14:07 pm');
            expect(time_1().format('[His]'))
                .toEqual('02:14:07 pm');
            expect(time_1().format('[Hi]'))
                .toEqual('02:14 pm');
            expect(time_1().format('[M]'))
                .toEqual('Jan');
            expect(time_1().format('[F]'))
                .toEqual('January');
            expect(time_1().format('[Ym]'))
                .toEqual('01/2020');
            expect(time_1().format('[YMd]'))
                .toEqual('9 Jan, 2020');
            expect(time_1().format('[YFd]'))
                .toEqual('9 January, 2020');
        });

        it('returns properly converted timestamp', function () {
            const time_1 = createLocalePreset({ target_tz: 'America/New_York' });

            expect(time_1().format('[YmdHis]'))
                .toEqual('2020-01-09 08:14:07');
        });

        it('accepts diffrent input types', function () {
            const time_1 = createLocalePreset({ target_tz: 'UTC' });
            const time_2 = createLocalePreset({ target_tz: 'America/New_York' });

            expect(time.utc().format('[YmdHis]'))
                .toEqual('2020-01-09 14:14:07');
            expect(time.utc('2020-01-05 12:24:00').format('[YmdHis]'))
                .toEqual('2020-01-05 13:24:00'); // converts to user local timezone if not specified
            expect(time_1.utc('2020-01-05 12:24:00').format('[YmdHis]'))
                .toEqual('2020-01-05 12:24:00');
            expect(time_1.utc(1578227040000).format('[YmdHis]'))
                .toEqual('2020-01-05 12:24:00');
            expect(time_1.utc().format('[YmdHis]'))
                .toEqual('2020-01-09 13:14:07');
            expect(time.utc().format('[YmdHis]'))
                .toEqual('2020-01-09 14:14:07');
            expect(time.utc().format('[YmdHis]'))
                .toEqual('2020-01-09 14:14:07');
            expect(time_1.utc().format('[YmdHis]'))
                .toEqual('2020-01-09 13:14:07');
            expect(time_2.utc().format('[YmdHis]'))
                .toEqual('2020-01-09 08:14:07');
            expect(time_2.utc('2023-07-26').format('[YmdHis]'))
                .toEqual('2023-07-25 20:00:00');
        });

        it('works properly with daylight saving (winter in Warsaw, daylignt in NYC', function () {
            const time_1 = createLocalePreset({ target_tz: 'America/New_York' });

            expect(time_1(1585436400000).format('[YmdHis]'))
                .toEqual('2020-03-28 19:00:00'); // daylight in NYC
        });

        it('fallbacks to time format when date format not defined', function () {
            const time_1 = createLocalePreset({ target_tz: 'Africa/Juba' });

            expect(time_1.utc().format('YYYY/MM/DD HH:mm:ss'))
                .toEqual('2020/01/09 16:14:07');
        });
    });

    describe('duration', () => {
        it('formats falsy values properly', () => {
            expect(duration().format()).toStrictEqual('');
            expect(duration(-1).format()).toStrictEqual('');
            expect(duration(-1.56).format()).toStrictEqual('');
            expect(duration(NaN).format()).toStrictEqual('');
            expect(duration(undefined).format()).toStrictEqual('');
            expect(duration('').format()).toStrictEqual('');
            expect(duration(' ').format()).toStrictEqual('');
            expect(duration('xyz').format()).toStrictEqual('');
        });

        it('formats duration with default settings', () => {
            expect(duration(0).format()).toStrictEqual('');
            expect(duration(1).format()).toStrictEqual('1min');
            expect(duration(1.3).format()).toStrictEqual('1min');
            expect(duration(1.5).format()).toStrictEqual('1min');
            expect(duration(1.7).format()).toStrictEqual('1min');
            expect(duration(30).format()).toStrictEqual('30min');
            expect(duration('56').format()).toStrictEqual('56min');
            expect(duration('97').format()).toStrictEqual('1h 37min');
            expect(duration(120).format()).toStrictEqual('2h');
            expect(duration(125).format()).toStrictEqual('2h 5min');
            expect(duration(24 * 60).format()).toStrictEqual('1d');
            expect(duration(24 * 60 + 15).format()).toStrictEqual('1d 15min');
            expect(duration(36 * 60).format()).toStrictEqual('1d 12h');
            expect(duration(7 * 24 * 60).format()).toStrictEqual('7d');
            expect(duration(30 * 24 * 60).format()).toStrictEqual('30d');
            expect(duration(31 * 24 * 60).format()).toStrictEqual('1m');
            expect(duration(6 * 31 * 24 * 60).format()).toStrictEqual('6m 3d');
        });

        it('formats duration for seconds input', () => {
            expect(duration(0, 'seconds').format()).toStrictEqual('');
            expect(duration(1, 'seconds').format()).toStrictEqual('');
            expect(duration(1.3, 'seconds').format()).toStrictEqual('');
            expect(duration(1.5, 'seconds').format()).toStrictEqual('');
            expect(duration(1.7, 'seconds').format()).toStrictEqual('');
            expect(duration(30, 'seconds').format()).toStrictEqual('');
            expect(duration(59, 'seconds').format()).toStrictEqual('');
            expect(duration(60, 'seconds').format()).toStrictEqual('1min');
            expect(duration(65, 'seconds').format()).toStrictEqual('1min');
            expect(duration(120, 'seconds').format()).toStrictEqual('2min');
            expect(duration(60 * 60, 'seconds').format()).toStrictEqual('1h');
            expect(duration(60 * 60 + 120, 'seconds').format()).toStrictEqual('1h 2min');
            expect(duration(24 * 60 * 60, 'seconds').format()).toStrictEqual('1d');
        });

        it('formats duration for minutes input', () => {
            expect(duration(0, 'minutes').format()).toStrictEqual('');
            expect(duration(1, 'minutes').format()).toStrictEqual('1min');
            expect(duration(1.3, 'minutes').format()).toStrictEqual('1min');
            expect(duration(1.5, 'minutes').format()).toStrictEqual('1min');
            expect(duration(1.7, 'minutes').format()).toStrictEqual('1min');
            expect(duration(30, 'minutes').format()).toStrictEqual('30min');
            expect(duration(59, 'minutes').format()).toStrictEqual('59min');
            expect(duration(60, 'minutes').format()).toStrictEqual('1h');
            expect(duration(65, 'minutes').format()).toStrictEqual('1h 5min');
            expect(duration(120, 'minutes').format()).toStrictEqual('2h');
            expect(duration(24 * 60, 'minutes').format()).toStrictEqual('1d');
            expect(duration(24 * 60 + 125, 'minutes').format()).toStrictEqual('1d 2h 5min');
        });

        it('formats duration for hours input', () => {
            expect(duration(0, 'hours').format()).toStrictEqual('');
            expect(duration(1, 'hours').format()).toStrictEqual('1h');
            expect(duration(1.3, 'hours').format()).toStrictEqual('1h 18min');
            expect(duration(1.5, 'hours').format()).toStrictEqual('1h 30min');
            expect(duration(1.7, 'hours').format()).toStrictEqual('1h 42min');
            expect(duration(24, 'hours').format()).toStrictEqual('1d');
            expect(duration(24 + 3, 'hours').format()).toStrictEqual('1d 3h');
            expect(duration(24 + 3.5, 'hours').format()).toStrictEqual('1d 3h 30min');
        });

        it('formats duration for days input', () => {
            expect(duration(0, 'days').format()).toStrictEqual('');
            expect(duration(1, 'days').format()).toStrictEqual('1d');
            expect(duration(1.5, 'days').format()).toStrictEqual('1d 12h');
            expect(duration(7, 'days').format()).toStrictEqual('7d');
            expect(duration(30, 'days').format()).toStrictEqual('30d');
            expect(duration(60, 'days').format()).toStrictEqual('1m 29d');
            expect(duration(365, 'days').format()).toStrictEqual('11m 30d');
        });

        it('formats duration for months input', () => {
            expect(duration(0, 'months').format()).toStrictEqual('');
            expect(duration(1, 'months').format()).toStrictEqual('1m');
            expect(duration(1.5, 'months').format()).toStrictEqual('1m 15d');
            expect(duration(7, 'months').format()).toStrictEqual('7m');
            expect(duration(12, 'months').format()).toStrictEqual('1y');
            expect(duration(25, 'months').format()).toStrictEqual('2y 1m');
        });

        it('formats duration for years input', () => {
            expect(duration(0, 'years').format()).toStrictEqual('');
            expect(duration(1, 'years').format()).toStrictEqual('1y');
            expect(duration(1.5, 'years').format()).toStrictEqual('1y 6m');
            expect(duration(7, 'years').format()).toStrictEqual('7y');
        });

        it('formats duration for unit aliases', () => {
            expect(duration(120, 's').format()).toStrictEqual('2min');
            expect(duration(120, 'second').format()).toStrictEqual('2min');
            expect(duration(120, 'm').format()).toStrictEqual('2h');
            expect(duration(120, 'minute').format()).toStrictEqual('2h');
            expect(duration(5, 'd').format()).toStrictEqual('5d');
            expect(duration(5, 'day').format()).toStrictEqual('5d');
            expect(duration(5, 'M').format()).toStrictEqual('5m');
            expect(duration(5, 'month').format()).toStrictEqual('5m');
            expect(duration(5, 'y').format()).toStrictEqual('5y');
            expect(duration(5, 'year').format()).toStrictEqual('5y');
        });

        it('works with basic ceil rounding', () => {
            expect(duration(0, 's').format({ round_unit: 's', round_method: 'ceil' })).toStrictEqual('');
            expect(duration(0.1, 's').format({ round_unit: 's', round_method: 'ceil' })).toStrictEqual('1s');
            expect(duration(1, 's').format({ round_unit: 's', round_method: 'ceil' })).toStrictEqual('1s');
            expect(duration(1.1, 's').format({ round_unit: 's', round_method: 'ceil' })).toStrictEqual('2s');
            expect(duration(1.5, 's').format({ round_unit: 's', round_method: 'ceil' })).toStrictEqual('2s');
            expect(duration(1.8, 's').format({ round_unit: 's', round_method: 'ceil' })).toStrictEqual('2s');

            expect(duration(0, 'm').format({ round_unit: 'm', round_method: 'ceil' })).toStrictEqual('');
            expect(duration(0.1, 'm').format({ round_unit: 'm', round_method: 'ceil' })).toStrictEqual('1min');
            expect(duration(1, 'm').format({ round_unit: 'm', round_method: 'ceil' })).toStrictEqual('1min');
            expect(duration(1.1, 'm').format({ round_unit: 'm', round_method: 'ceil' })).toStrictEqual('2min');
            expect(duration(1.5, 'm').format({ round_unit: 'm', round_method: 'ceil' })).toStrictEqual('2min');
            expect(duration(1.8, 'm').format({ round_unit: 'm', round_method: 'ceil' })).toStrictEqual('2min');

            expect(duration(0, 'h').format({ round_unit: 'h', round_method: 'ceil' })).toStrictEqual('');
            expect(duration(0.1, 'h').format({ round_unit: 'h', round_method: 'ceil' })).toStrictEqual('1h');
            expect(duration(1, 'h').format({ round_unit: 'h', round_method: 'ceil' })).toStrictEqual('1h');
            expect(duration(1.1, 'h').format({ round_unit: 'h', round_method: 'ceil' })).toStrictEqual('2h');
            expect(duration(1.5, 'h').format({ round_unit: 'h', round_method: 'ceil' })).toStrictEqual('2h');
            expect(duration(1.8, 'h').format({ round_unit: 'h', round_method: 'ceil' })).toStrictEqual('2h');

            expect(duration(0, 'd').format({ round_unit: 'd', round_method: 'ceil' })).toStrictEqual('');
            expect(duration(0.1, 'd').format({ round_unit: 'd', round_method: 'ceil' })).toStrictEqual('1d');
            expect(duration(1, 'd').format({ round_unit: 'd', round_method: 'ceil' })).toStrictEqual('1d');
            expect(duration(1.1, 'd').format({ round_unit: 'd', round_method: 'ceil' })).toStrictEqual('2d');
            expect(duration(1.5, 'd').format({ round_unit: 'd', round_method: 'ceil' })).toStrictEqual('2d');
            expect(duration(1.8, 'd').format({ round_unit: 'd', round_method: 'ceil' })).toStrictEqual('2d');

            expect(duration(0, 'M').format({ round_unit: 'M', round_method: 'ceil' })).toStrictEqual('');
            expect(duration(0.1, 'M').format({ round_unit: 'M', round_method: 'ceil' })).toStrictEqual('1m');
            expect(duration(1, 'M').format({ round_unit: 'M', round_method: 'ceil' })).toStrictEqual('1m');
            expect(duration(1.1, 'M').format({ round_unit: 'M', round_method: 'ceil' })).toStrictEqual('2m');
            expect(duration(1.5, 'M').format({ round_unit: 'M', round_method: 'ceil' })).toStrictEqual('2m');
            expect(duration(1.8, 'M').format({ round_unit: 'M', round_method: 'ceil' })).toStrictEqual('2m');

            expect(duration(0, 'y').format({ round_unit: 'y', round_method: 'ceil' })).toStrictEqual('');
            expect(duration(0.1, 'y').format({ round_unit: 'y', round_method: 'ceil' })).toStrictEqual('1y');
            expect(duration(1, 'y').format({ round_unit: 'y', round_method: 'ceil' })).toStrictEqual('1y');
            expect(duration(1.1, 'y').format({ round_unit: 'y', round_method: 'ceil' })).toStrictEqual('2y');
            expect(duration(1.5, 'y').format({ round_unit: 'y', round_method: 'ceil' })).toStrictEqual('2y');
            expect(duration(1.8, 'y').format({ round_unit: 'y', round_method: 'ceil' })).toStrictEqual('2y');
        });

        it('works with ceil rounding with mixed units', () => {
            expect(duration(1, 's').format({ round_unit: 'm', round_method: 'ceil' })).toStrictEqual('1min');
            expect(duration(1, 's').format({ round_unit: 'h', round_method: 'ceil' })).toStrictEqual('1h');
            expect(duration(1, 's').format({ round_unit: 'd', round_method: 'ceil' })).toStrictEqual('1d');

            expect(duration(1, 'm').format({ round_unit: 'm', round_method: 'ceil' })).toStrictEqual('1min');
            expect(duration(1, 'm').format({ round_unit: 'h', round_method: 'ceil' })).toStrictEqual('1h');
            expect(duration(1, 'm').format({ round_unit: 'd', round_method: 'ceil' })).toStrictEqual('1d');
        });

        it('works with basic standard rounding', () => {
            expect(duration(0, 's').format({ round_unit: 's', round_method: 'round' })).toStrictEqual('');
            expect(duration(0.1, 's').format({ round_unit: 's', round_method: 'round' })).toStrictEqual('');
            expect(duration(1, 's').format({ round_unit: 's', round_method: 'round' })).toStrictEqual('1s');
            expect(duration(1.1, 's').format({ round_unit: 's', round_method: 'round' })).toStrictEqual('1s');
            expect(duration(1.5, 's').format({ round_unit: 's', round_method: 'round' })).toStrictEqual('2s');
            expect(duration(1.8, 's').format({ round_unit: 's', round_method: 'round' })).toStrictEqual('2s');

            expect(duration(0, 'm').format({ round_unit: 'm', round_method: 'round' })).toStrictEqual('');
            expect(duration(0.1, 'm').format({ round_unit: 'm', round_method: 'round' })).toStrictEqual('');
            expect(duration(1, 'm').format({ round_unit: 'm', round_method: 'round' })).toStrictEqual('1min');
            expect(duration(1.1, 'm').format({ round_unit: 'm', round_method: 'round' })).toStrictEqual('1min');
            expect(duration(1.5, 'm').format({ round_unit: 'm', round_method: 'round' })).toStrictEqual('2min');
            expect(duration(1.8, 'm').format({ round_unit: 'm', round_method: 'round' })).toStrictEqual('2min');

            expect(duration(0, 'h').format({ round_unit: 'h', round_method: 'round' })).toStrictEqual('');
            expect(duration(0.1, 'h').format({ round_unit: 'h', round_method: 'round' })).toStrictEqual('');
            expect(duration(1, 'h').format({ round_unit: 'h', round_method: 'round' })).toStrictEqual('1h');
            expect(duration(1.1, 'h').format({ round_unit: 'h', round_method: 'round' })).toStrictEqual('1h');
            expect(duration(1.5, 'h').format({ round_unit: 'h', round_method: 'round' })).toStrictEqual('2h');
            expect(duration(1.8, 'h').format({ round_unit: 'h', round_method: 'round' })).toStrictEqual('2h');

            expect(duration(0, 'd').format({ round_unit: 'd', round_method: 'round' })).toStrictEqual('');
            expect(duration(0.1, 'd').format({ round_unit: 'd', round_method: 'round' })).toStrictEqual('');
            expect(duration(1, 'd').format({ round_unit: 'd', round_method: 'round' })).toStrictEqual('1d');
            expect(duration(1.1, 'd').format({ round_unit: 'd', round_method: 'round' })).toStrictEqual('1d');
            expect(duration(1.5, 'd').format({ round_unit: 'd', round_method: 'round' })).toStrictEqual('2d');
            expect(duration(1.8, 'd').format({ round_unit: 'd', round_method: 'round' })).toStrictEqual('2d');

            expect(duration(0, 'M').format({ round_unit: 'M', round_method: 'round' })).toStrictEqual('');
            expect(duration(0.1, 'M').format({ round_unit: 'M', round_method: 'round' })).toStrictEqual('');
            expect(duration(1, 'M').format({ round_unit: 'M', round_method: 'round' })).toStrictEqual('1m');
            expect(duration(1.1, 'M').format({ round_unit: 'M', round_method: 'round' })).toStrictEqual('1m');
            expect(duration(1.5, 'M').format({ round_unit: 'M', round_method: 'round' })).toStrictEqual('2m');
            expect(duration(1.8, 'M').format({ round_unit: 'M', round_method: 'round' })).toStrictEqual('2m');

            expect(duration(0, 'y').format({ round_unit: 'y', round_method: 'round' })).toStrictEqual('');
            expect(duration(0.1, 'y').format({ round_unit: 'y', round_method: 'round' })).toStrictEqual('');
            expect(duration(1, 'y').format({ round_unit: 'y', round_method: 'round' })).toStrictEqual('1y');
            expect(duration(1.1, 'y').format({ round_unit: 'y', round_method: 'round' })).toStrictEqual('1y');
            expect(duration(1.5, 'y').format({ round_unit: 'y', round_method: 'round' })).toStrictEqual('2y');
            expect(duration(1.8, 'y').format({ round_unit: 'y', round_method: 'round' })).toStrictEqual('2y');
        });

        it('works with standard rounding with mixed units', () => {
            expect(duration(3, 's').format({ round_unit: 'm', round_method: 'round' })).toStrictEqual('');
            expect(duration(30, 's').format({ round_unit: 'm', round_method: 'round' })).toStrictEqual('1min');
            expect(duration(60, 's').format({ round_unit: 'm', round_method: 'round' })).toStrictEqual('1min');
            expect(duration(65, 's').format({ round_unit: 'm', round_method: 'round' })).toStrictEqual('1min');
            expect(duration(90, 's').format({ round_unit: 'm', round_method: 'round' })).toStrictEqual('2min');

            expect(duration(3, 'm').format({ round_unit: 'h', round_method: 'round' })).toStrictEqual('');
            expect(duration(30, 'm').format({ round_unit: 'h', round_method: 'round' })).toStrictEqual('1h');
            expect(duration(60, 'm').format({ round_unit: 'h', round_method: 'round' })).toStrictEqual('1h');
            expect(duration(65, 'm').format({ round_unit: 'h', round_method: 'round' })).toStrictEqual('1h');
            expect(duration(90, 'm').format({ round_unit: 'h', round_method: 'round' })).toStrictEqual('2h');
        });
    });

    describe('time.quickDatespan', () => {
        beforeAll(() => {
            MockDate.set('2020-07-10 12:37:00');
        });

        afterAll(() => {
            MockDate.reset();
        });

        it('returns date spans properly', () => {
            expect(time.quickDatespan('today')?.start.toString()).toBe('Fri Jul 10 2020 00:00:00 GMT+0200');
            expect(time.quickDatespan('today')?.end.toString()).toBe('Fri Jul 10 2020 23:59:59 GMT+0200');
            expect(time.quickDatespan('last_week')?.start.toString()).toBe('Sun Jun 28 2020 00:00:00 GMT+0200');
            expect(time.quickDatespan('last_week')?.end.toString()).toBe('Sat Jul 04 2020 23:59:59 GMT+0200');
            expect(time.quickDatespan()).toBe(undefined);
            expect(time.quickDatespan()).toBe(undefined);
        });
    });
});
