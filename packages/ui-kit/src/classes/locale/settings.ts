import { tz, locale, updateLocale } from 'moment-timezone';
import { mergeShallow } from '@ui/utils/helpers';

// setup locale
locale(process.env.LOCALE || 'en');

const DEFAULT_SETTINGS: IkLocaleSettings = {
    date_format: 'International',
    time_format: '24H',
    week_first_day: 'Monday',
    target_tz: tz.guess(),
};

const weekdays: Record<string, number> = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
};

export interface IkLocaleSettings {
    date_format: string,
    time_format: string,
    week_first_day: string,
    target_tz: string,
}

export function getDefaultLocaleSettings() {
    return DEFAULT_SETTINGS;
}

export function updateLocaleSettings(settings: Partial<IkLocaleSettings>) {
    mergeShallow(DEFAULT_SETTINGS, settings);

    if (settings.week_first_day) {
        updateLocale(locale(), {
            week: { dow: weekdays[settings.week_first_day] },
        });
    }
}
