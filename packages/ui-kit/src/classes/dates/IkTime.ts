import type {
    Moment,
    unitOfTime,
    MomentInputObject,
} from 'moment-timezone';
import moment, {
    isMoment,
    tz,
} from 'moment-timezone';
import type { IkTimePreset } from '.';
import { time } from '.';
import { DEFAULT_FORMAT } from './formats';
import { isNullish, isString } from '@ui/utils/helpers';

export const DEFAULT_PARSE_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ';

export type IkTimeInput = string | number | MomentInputObject | Date | Moment;

export class IkTime {
    private _preset: IkTimePreset = time;
    private _d: Moment;

    constructor(input?: IkTimeInput, format?: string, preset?: IkTimePreset) {
        if (preset) {
            this._preset = preset;
        }
        if (isNullish(input)) {
            input = new Date();
        }
        if (isMoment(input)) {
            this._d = input;
        } else {
            const source_tz = this.getTargetTimezone();

            if (input instanceof Date) {
                this._d = tz(new Date(), source_tz);
            } else if (isString(input)) {
                format = this.getLocalizedFormat(format || DEFAULT_PARSE_FORMAT)?.trim();
                this._d = tz(String(input || ''), format || DEFAULT_PARSE_FORMAT, source_tz);
            } else {
                this._d = tz(input, source_tz);
            }
        }
    }

    static utc(input?: IkTimeInput, format?: string, preset?: IkTimePreset) {
        if (isNullish(input)) {
            input = new Date();
        }
        if (isMoment(input)) {
            return new IkTime(input, undefined, preset);
        } else {
            if (input instanceof Date) {
                return new IkTime(moment.utc(), undefined, preset);
            } else if (isString(input)) {
                return new IkTime(moment.utc(String(input || ''), format || DEFAULT_PARSE_FORMAT), undefined, preset);
            } else {
                return new IkTime(moment.utc(input), undefined, preset);
            }
        }
    }

    format(format?: string) {
        format = String(format || DEFAULT_FORMAT).trim();

        if (this.isValid()) {
            return this
                .getDto()
                .clone()
                .tz(this.getTargetTimezone())
                .format(this.getLocalizedFormat(format));
        } else {
            return moment.invalid().format();
        }
    }

    formatUtc(format?: string) {
        format = String(format || DEFAULT_FORMAT).trim();

        if (this.isValid()) {
            return this
                .getDto()
                .tz('UTC')
                .format(this.getLocalizedFormat(format));
        } else {
            return moment.invalid().format();
        }
    }

    clone() {
        return new IkTime(this._d.clone(), undefined, this._preset);
    }

    isValid() {
        return this._d.isValid();
    }

    add(amount: number, unit: unitOfTime.DurationConstructor) {
        this._d = this._d.add(amount, unit);
        return this;
    }

    subtract(amount: number, unit: unitOfTime.DurationConstructor) {
        this._d = this._d.subtract(amount, unit);
        return this;
    }

    startOf(unit: unitOfTime.StartOf) {
        this._d = this._d.startOf(unit);
        return this;
    }

    endOf(unit: unitOfTime.StartOf) {
        this._d = this._d.endOf(unit);
        return this;
    }

    isBefore(input: IkTime, granularity?: unitOfTime.StartOf) {
        return this._d.isBefore(input.getDto(), granularity);
    }

    isAfter(input: IkTime, granularity?: unitOfTime.StartOf) {
        return this._d.isAfter(input.getDto(), granularity);
    }

    isSameOrAfter(input: IkTime, granularity?: unitOfTime.StartOf) {
        return this._d.isSameOrAfter(input.getDto(), granularity);
    }

    isSame(input: IkTime, granularity?: unitOfTime.StartOf) {
        return this._d.isSame(input.getDto(), granularity);
    }

    isSameOrBefore(input: IkTime, granularity?: unitOfTime.StartOf) {
        return this._d.isSameOrBefore(input.getDto(), granularity);
    }

    isBetween(from: IkTime, to: IkTime, granularity?: unitOfTime.StartOf, inclusivity?: '()' | '[)' | '(]' | '[]' | undefined) {
        return this._d.isBetween(from.getDto(), to.getDto(), granularity, inclusivity);
    }

    from(input: IkTime) {
        return this._d.from(input.getDto());
    }

    fromNow() {
        return this._d.fromNow();
    }

    local() {
        return new IkTime(this._d.tz(this.getTargetTimezone()), undefined, this._preset);
    }

    toString() {
        return this.getDto().toString();
    }

    getDto() {
        return this._d;
    }

    private getLocalizedFormat(format: string) {
        return this._preset.localizeFormat(format);
    }

    private getTargetTimezone() {
        return this.getLocaleSettings().target_tz;
    }

    private getLocaleSettings() {
        return this._preset.localeSettings();
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTime(obj: any): obj is IkTime {
    return obj instanceof IkTime;
}
