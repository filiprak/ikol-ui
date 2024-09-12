import type { unitOfTime } from 'moment';

export const DEFAULT_FORMAT = '[YmdHi]';
export const DATE_FORMATS: Record<string, Partial<{ [k: string]: (string | Partial<{ [j: string]: string }>) }>> = {
    International: {
        '[YmdHis]': { '12H': 'YYYY-MM-DD hh:mm:ss a', '24H': 'YYYY-MM-DD HH:mm:ss' },
        '[YmdHi]': { '12H': 'YYYY-MM-DD hh:mm a', '24H': 'YYYY-MM-DD HH:mm' },
        '[Ymd]': 'YYYY-MM-DD',
        '[His]': { '12H': 'hh:mm:ss a', '24H': 'HH:mm:ss' },
        '[Hi]': { '12H': 'hh:mm a', '24H': 'HH:mm' },
        '[M]': 'MMM',
        '[F]': 'MMMM',
        '[Ym]': 'YYYY-MM',
        '[YMd]': 'D MMM, YYYY',
        '[YFd]': 'D MMMM, YYYY',
    },
    European: {
        '[YmdHis]': { '12H': 'DD.MM.YYYY hh:mm:ss a', '24H': 'DD.MM.YYYY HH:mm:ss' },
        '[YmdHi]': { '12H': 'DD.MM.YYYY hh:mm a', '24H': 'DD.MM.YYYY HH:mm' },
        '[Ymd]': 'DD.MM.YYYY',
        '[His]': { '12H': 'hh:mm:ss a', '24H': 'HH:mm:ss' },
        '[Hi]': { '12H': 'hh:mm a', '24H': 'HH:mm' },
        '[M]': 'MMM',
        '[F]': 'MMMM',
        '[Ym]': 'MM.YYYY',
        '[YMd]': 'D MMM, YYYY',
        '[YFd]': 'D MMMM, YYYY',
    },
    American: {
        '[YmdHis]': { '12H': 'MM/DD/YYYY hh:mm:ss a', '24H': 'MM/DD/YYYY HH:mm:ss' },
        '[YmdHi]': { '12H': 'MM/DD/YYYY hh:mm a', '24H': 'MM/DD/YYYY HH:mm' },
        '[Ymd]': 'MM/DD/YYYY',
        '[His]': { '12H': 'hh:mm:ss a', '24H': 'HH:mm:ss' },
        '[Hi]': { '12H': 'hh:mm a', '24H': 'HH:mm' },
        '[M]': 'MMM',
        '[F]': 'MMMM',
        '[Ym]': 'MM/YYYY',
        '[YMd]': 'D MMM, YYYY',
        '[YFd]': 'D MMMM, YYYY',
    },
};

export const UNIT_ALIASES: Partial<Record<string, unitOfTime.DurationConstructor>> = {
    s: 'seconds',
    second: 'seconds',
    seconds: 'seconds',

    m: 'minutes',
    minute: 'minutes',
    minutes: 'minutes',

    h: 'hours',
    hour: 'hours',
    hours: 'hours',

    d: 'days',
    day: 'days',
    days: 'days',

    M: 'months',
    month: 'months',
    months: 'months',

    y: 'years',
    year: 'years',
    years: 'years',
};

export const DUR_UNIT_GETTERS: Partial<Record<string, string>> = {
    seconds: 'asSeconds',
    minutes: 'asMinutes',
    hours: 'asHours',
    days: 'asDays',
    months: 'asMonths',
    years: 'asYears',
};
