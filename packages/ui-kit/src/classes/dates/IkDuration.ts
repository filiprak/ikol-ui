import type { unitOfTime } from 'moment-timezone';
import { duration } from 'moment-timezone';
import { DUR_UNIT_GETTERS, UNIT_ALIASES } from './formats';
import { isInteger } from '@ui/utils/helpers';

export interface IkDurationFormatOpts {
    round_unit?: unitOfTime.DurationConstructor,
    round_method?: 'floor' | 'round' | 'ceil',
}

export const normalizeUnit = (name?: unitOfTime.DurationConstructor) => {
    return name ? (UNIT_ALIASES[name] || name) : name;
};

export class IkDuration {
    private _value?: number | string;
    private _unit: unitOfTime.DurationConstructor;

    constructor(value?: number | string, unit?: unitOfTime.DurationConstructor) {
        this._value = value;
        this._unit = normalizeUnit(unit) || 'minutes';
    }

    format(options: IkDurationFormatOpts = {}) {
        options.round_method = options.round_method || 'floor'; // floor, round, ceil
        options.round_unit = normalizeUnit(options.round_unit);

        const m_dur = duration(this._value, this._unit);

        if (!options.round_unit) {
            if (!isInteger(this._value) || this._unit == 'seconds') {
                options.round_unit = 'minutes';
            } else {
                options.round_unit = this._unit;
            }
        }

        if (['floor', 'ceil', 'round'].indexOf(options.round_method) < 0) {
            throw new Error('Unsupported round method: ' + options.round_method);
        }

        const getter = DUR_UNIT_GETTERS[options.round_unit];

        if (!getter) {
            throw new Error('Unsupported round unit: ' + options.round_unit);
        }

        let duration_str = '';

        if (m_dur.isValid()) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const rounded = Math[options.round_method]((m_dur as any)[getter]());
            const r_dur = duration(rounded, options.round_unit);

            duration_str += r_dur.years() > 0 ? r_dur.years() + 'y ' : '';
            duration_str += r_dur.months() > 0 ? r_dur.months() + 'm ' : '';
            duration_str += r_dur.days() > 0 ? r_dur.days() + 'd ' : '';
            duration_str += r_dur.hours() > 0 ? r_dur.hours() + 'h ' : '';
            duration_str += r_dur.minutes() > 0 ? r_dur.minutes() + 'min ' : '';
            duration_str += r_dur.seconds() > 0 ? r_dur.seconds() + 's ' : '';
        }
        return duration_str.trim();
    }
}
