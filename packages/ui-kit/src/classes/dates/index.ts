import type { unitOfTime } from 'moment-timezone';
import type { IkTimeInput } from './IkTime';
import { IkTime, isTime } from './IkTime';
import { DATE_FORMATS } from './formats';
import { isObject } from '@ui/utils/helpers';
import { IkDuration } from './IkDuration';
import type { IkLocaleSettings } from '../locale/settings';
import { getDefaultLocaleSettings } from '../locale/settings';

export type IkTimeQuickOptions = 'today' | 'yesterday' | 'last_week' | 'last_month' | 'last_7_days' | 'this_week' | 'this_month';

function createLocalePreset(settings: Partial<IkLocaleSettings> = {}) {
    let preset: IkLocaleSettings;

    function time(input?: IkTimeInput, format?: string) {
        return new IkTime(input, format, time);
    }

    time.isTime = isTime;

    time.utc = (input?: IkTimeInput, format?: string) => {
        return IkTime.utc(input, format, time);
    };

    time.localeSettings = (): IkLocaleSettings => {
        if (!preset) {
            preset = Object.assign({}, getDefaultLocaleSettings(), settings);
        }
        return preset;
    };

    time.localizeFormat = (format: string) => {
        let l_format;
        const settings = time.localeSettings();

        if (format[0] === '!') {
            l_format = format.slice(2, format.length - 1);
        } else {
            if (DATE_FORMATS[settings.date_format] && DATE_FORMATS[settings.date_format][format]) {
                l_format = DATE_FORMATS[settings.date_format][format];
            } else {
                l_format = format;
            }
            // check if 12H/24H time format specification
            if (isObject(l_format)) {
                l_format = l_format[settings.time_format];
            }
        }
        return l_format;
    };

    time.isFullDaySpan = (start: IkTime, end: IkTime) => {
        if (start.isValid() && end.isValid()) {
            return (
                start.clone().startOf('day').isSame(start) &&
                (end.clone().startOf('day').isSame(end) || end.clone().endOf('day').add(1, 'second').isSame(end))
            );
        } else {
            return false;
        }
    };

    time.quickDatespans = (): Partial<Record<IkTimeQuickOptions, { label: string, value: { start: IkTime, end: IkTime } }>> => {
        return {
            today: {
                label: '{{_*en*Today_}}',
                value: { start: time().startOf('day'), end: time().endOf('day') },
            },
            yesterday: {
                label: '{{_*en*Yesterday_}}',
                value: { start: time().subtract(1, 'days').startOf('day'), end: time().subtract(1, 'days').endOf('day') },
            },
            last_week: {
                label: '{{_*en*Last week_}}',
                value: { start: time().subtract(1, 'weeks').startOf('week'), end: time().subtract(1, 'weeks').endOf('week') },
            },
            last_month: {
                label: '{{_*en*Last month_}}',
                value: { start: time().subtract(1, 'months').startOf('month'), end: time().subtract(1, 'months').endOf('month') },
            },
            last_7_days: {
                label: '{{_*en*Last 7 days_}}',
                value: { start: time().subtract(7, 'days').startOf('day'), end: time().endOf('day') },
            },
            this_week: {
                label: '{{_*en*This week_}}',
                value: { start: time().startOf('week'), end: time().endOf('day') },
            },
            this_month: {
                label: '{{_*en*This month_}}',
                value: { start: time().startOf('month'), end: time().endOf('day') },
            },
        };
    };

    time.quickDatespan = (name?: IkTimeQuickOptions) => {
        if (name) {
            const spans = time.quickDatespans()[name];
            if (spans) {
                return (spans.value || undefined);
            }
        }
        return undefined;
    };

    return time;
}

const time = createLocalePreset();

const duration = (input?: number | string, unit?: unitOfTime.DurationConstructor) => {
    return new IkDuration(input, unit);
};

export type IkTimePreset = typeof time;
export { time, duration, createLocalePreset };
