<template>
    <div :class="root_class">
        <div v-if="!time_only"
             class="ik-date__day-input">
            <IkPopover ref="p_day"
                       open_on_click
                       :position="position"
                       :align="align">
                <template #activator="data">
                    <slot :on="data.on"
                          name="activator">
                        <IkInput ref="i_day"
                                 v-model="day"
                                 :variant="variant"
                                 :disabled="disabled"
                                 :placeholder="placeholder"
                                 @click="data.on.click"
                                 @update:modelValue="emit_on_focusout = true"
                                 @focusout="_onDayFocusOut"
                                 @keydown.enter="_onDayEnterKey" />
                    </slot>
                </template>
                <div class="ik-date__calendar">
                    <div class="ik-date__nav">
                        <div class="ik-date__cell">
                            <div @click="_modifyMonth(-1)">
                                <IkIcon icon="chevron-left" />
                            </div>
                        </div>
                        <div class="ik-date__nav-month">
                            {{ month.format("![MMMM YYYY]") }}
                        </div>
                        <div class="ik-date__cell">
                            <div @click="_modifyMonth(1)">
                                <IkIcon icon="chevron-right" />
                            </div>
                        </div>
                    </div>
                    <div class="ik-date__row">
                        <div v-for="(weekday, i) in calendar[0]"
                             :key="i"
                             class="ik-date__cell ik-date__cell--weekday">
                            {{ weekday.date.format("![ddd]") }}
                        </div>
                    </div>
                    <div v-for="(week, j) in calendar"
                         :key="j"
                         class="ik-date__row">
                        <div v-for="(c_day, i) in week"
                             :key="i"
                             :class="_getDayClass(c_day)"
                             @click="_onDayClick(c_day)">
                            <div>{{ c_day.date.format("![D]") }}</div>
                        </div>
                    </div>
                </div>
            </IkPopover>
        </div>
        <div v-if="show_hour"
             class="ik-date__hour-input">
            <IkPopover ref="p_hour"
                       open_on_click
                       :position="position"
                       :align="align"
                       @ik-open="_onHourPopoverOpen">
                <template #activator="data">
                    <IkInput ref="i_hour"
                             v-model="hour"
                             :variant="variant"
                             :placeholder="placeholder_hour"
                             :disabled="disabled"
                             @click="data.on.click"
                             @update:modelValue="_onHourInput"
                             @focusout="_onHourFocusOut"
                             @keydown.enter="_onHourEnterKey" />
                </template>
                <div class="ik-date__select">
                    <IkScrollArea ref="s_hour">
                        <div v-for="(stamp, i) in timestamps"
                             :key="i"
                             ref="stamps"
                             class="ik-date__select-item"
                             @click="_onHourClick(stamp)">
                            {{ stamp.format(format_hour) }}
                        </div>
                    </IkScrollArea>
                </div>
            </IkPopover>
        </div>
    </div>
</template>
<script lang="ts">
import '@ui/styles';
import './IkDate.css';
import type { PropType } from 'vue';
import { defineComponent, shallowRef, ref } from 'vue';

import type { IkTime } from '@ui/classes/dates/IkTime';
import { range } from '@ui/utils/helpers';

import { IkPopover } from '../IkPopover';
import { IkIcon } from '../IkIcon';
import { IkInput } from '../IkInput';
import { IkScrollArea } from '../IkScrollArea';
import { time } from '@ui/classes/dates';

interface IkDisabledDatespan {
    from: IkTime | null,
    to: IkTime | null,
}

interface IkDateCalendarItem {
    date: IkTime,
    is_active: boolean,
    is_today: boolean,
    is_offset: boolean,
    is_disabled: boolean,
}

export default defineComponent({
    components: { IkPopover, IkIcon, IkInput, IkScrollArea },
    props: {
        modelValue: {
            type: Object as PropType<IkTime | null | undefined>,
        },
        /**
         * Day input placeholder text.
         */
        placeholder: {
            type: String,
            default: '{{_*en*Choose date_}}',
        },
        /**
         * Hour input placeholder text.
         */
        placeholder_hour: {
            type: String,
            default: '{{_*en*Hour_}}',
        },
        /**
         * Dropdown position for both day and hour inputs. This is passed to {@link IkPopover} component.
         */
        position: {
            type: String as PropType<IkPopover['position']>,
            default: 'horizontal',
        },
        /**
         * Dropdown align for both day and hour inputs. This is passed to {@link IkPopover} component.
         */
        align: {
            type: String as PropType<IkPopover['align']>,
            default: 'start',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Whether to show hour input or not. If `false` then only day input will be rendered.
         */
        time: {
            type: Boolean,
            default: false,
        },
        /**
         * Whether to show only hour input. If `true` then day input will be hidden.
         * This is has higher priority than {@link IkDate#time} prop.
         */
        time_only: {
            type: Boolean,
            default: false,
        },
        /**
         * Input style variant. Read more about input styles in {@link IkInput}.
         */
        variant: {
            type: String,
        },
        /**
         * Date format for day input. This can be any valid moment.js format string or extended ikol format.
         */
        format: {
            type: String,
            default: '![ddd, D MMM YYYY]',
        },
        /**
         * Hour format for hour input. This can be any valid moment.js format string or extended ikol format.
         */
        format_hour: {
            type: String,
            default: '[Hi]',
        },
        /**
         * This is time interval between two entries in suggestion dropdown list for hour input.
         * Time unit is `minutes`.
         */
        prompt_hour_interval: {
            type: Number,
            default: 30,
        },
        autofocus: {
            type: Boolean,
            default: false,
        },
        full_width: {
            type: Boolean,
            default: false,
        },
        /**
         * Excludes time slots from selection. eg. [{ from: , to: }, { from: , to: }]
         * Number of objects in the array is arbitrary
         * Missing a "from" key in the first object has a fallback to the past and a missing "to" key in the last object has a fallback to the future
         * eg. [{ to: moment() }] will disable all past dates and [{ from: moment() }] will disable all future dates
         * @instance
         * @type Array
         * @default null
         */
        disabled_datespans: {
            type: Array as PropType<IkDisabledDatespan[]>,
            default: () => [],
        },
    },
    computed: {
        root_class(): { [key: string]: boolean } {
            return {
                'ik-date': true,
                'ik-date--full-width': this.full_width,
            };
        },
        show_hour(): boolean {
            return this.time || this.time_only;
        },
        normalized_disabled_datespans(): Array<IkDisabledDatespan> {
            return (this.disabled_datespans || []).map((interval, index) => {
                const from = index === 0 && (!interval.from || interval.from === null) ? time(0) : interval.from;
                const to = index === this.disabled_datespans.length - 1 && (!interval.to || interval.to === null) ? time('2137-12-31') : interval.to;

                return { from, to };
            });
        },
        calendar(): IkDateCalendarItem[][] {
            const stamps = [];
            const active = this.date ? this.date.clone().local() : null;
            const today = time();
            const month = this.month.clone();
            const month_start = month.clone().startOf('month');
            const month_end = month.clone().endOf('month');
            const min = month_start.clone().startOf('week').local();
            const max = month_end.clone().endOf('week').local();
            const date = min.clone().subtract(1, 'day');

            while (date.isBefore(max, 'day')) {
                stamps.push([0, 0, 0, 0, 0, 0, 0].map(() => {
                    const date_m = date.add(1, 'day').clone();
                    const is_disabled = this.normalized_disabled_datespans && this.normalized_disabled_datespans.length > 0 && this.normalized_disabled_datespans?.some((interval) => date_m.isBetween(interval.from || time(0), interval.to || time('2137-12-31'), null, '[]'));
                    return {
                        date: date_m,
                        is_active: !!active && date_m.isSame(active, 'day'),
                        is_today: date_m.isSame(today, 'day'),
                        is_offset: date_m.isBefore(month_start, 'day') || date_m.isAfter(month_end, 'day'),
                        is_disabled,
                    };
                }));
            }
            return stamps;
        },
        timestamps() {
            const stamps: IkTime[] = [];
            const interval = this.prompt_hour_interval || 30;
            range(0, 23)
                .forEach((index) => {
                    for (let minutes = 0; minutes < 60; minutes += interval) {
                        stamps.push(time({ hour: index, minute: minutes }));
                    }
                });
            return stamps;
        },
    },
    data() {
        return {
            month: time(),
            day: '',
            hour: '',
            emit_on_focusout: false,
        };
    },
    methods: {
        focus() {
            this.focusDay();
        },
        focusDay() {
            this.i_day && this.i_day.focus();
            this.p_day && this.p_day.open();
        },
        focusHour() {
            this.i_hour && this.i_hour.focus();
            this.p_hour && this.p_hour.open();
        },
        _onDayFocusOut() {
            let day = String(this.day || '').trim();
            let format = this.format;
            if (this.day.indexOf(',') >= 0) {
                const format_comma_idx = this.format.indexOf(',');
                const day_comma_idx = day.indexOf(',');
                day = day
                    .slice(day_comma_idx + 1, day.length)
                    .trim();
                format = this.format
                    .slice(format_comma_idx + 1, this.format.length)
                    .trim();
            } else {
                if (day.length === 6) {
                    format = 'DDMMYY';
                } else if (day.length === 8) {
                    format = 'DDMMYYYY';
                }
            }
            if (day) {
                this._setDay(time(day, format), !this.emit_on_focusout);
            } else {
                this._set(null, !this.emit_on_focusout);
            }
            this.emit_on_focusout = false;
        },
        _onHourFocusOut() {
            const hour = String(this.hour || '').trim();
            if (hour) {
                this._setHour(time(hour, this.format_hour), !this.emit_on_focusout);
            } else {
                this._set(this.date, !this.emit_on_focusout);
            }
            this.emit_on_focusout = false;
        },
        _onHourEnterKey() {
            this._onHourFocusOut();
        },
        _onDayEnterKey() {
            this._onDayFocusOut();
        },
        _onDayClick(day: IkDateCalendarItem) {
            if (!day.is_disabled) {
                const date = day.date
                    .clone()
                    .startOf('day');
                this._setDay(date);
                this.month = date
                    .clone()
                    .local()
                    .startOf('month');
                this.p_day && this.p_day.close();
            }
        },
        _onHourClick(hour: IkTime) {
            this._setHour(hour);
            this.p_hour && this.p_hour.close();
        },
        _setHour(time_o: IkTime, no_emit = false) {
            if (time_o.isValid()) {
                const today = time();
                const date = (this.date && this.date.clone()) || today;
                const day_str = date.format('YYYYMMDD');
                const hour_str = time_o.format('HHmmss');
                const new_date = time([day_str, hour_str].join(''), 'YYYYMMDDHHmmss');
                if (new_date.isValid()) {
                    this._set(new_date, no_emit);
                } else {
                    this._set(this.date, no_emit);
                }
            } else {
                this._set(this.date, no_emit);
            }
        },
        _setDay(time_o: IkTime, no_emit = false) {
            if (time_o.isValid()) {
                const date = this.date && this.date.clone();
                const day_str = time_o.format('YYYYMMDD');
                const hour_str = this.show_hour ? (date ? date.format('HHmmss') : '120000') : '000000';
                const new_date = time([day_str, hour_str].join(''), 'YYYYMMDDHHmmss');
                if (new_date.isValid()) {
                    this._set(new_date, no_emit);
                } else {
                    this._set(this.date, no_emit);
                }
            } else {
                this._set(this.date, no_emit);
            }
        },
        _set(time_o: IkTime | null, no_emit = false) {
            if (time_o && time_o.isValid()) {
                if (!no_emit && (this.date === null || !time_o.isSame(this.date))) {
                    this.$emit('update:modelValue', time_o.clone());
                }
                this.date = time_o.clone();
                this.hour = this.date.format(this.format_hour);
                this.day = this.date.format(this.format);
            } else {
                if (!no_emit && this.date !== null) {
                    this.$emit('update:modelValue', null);
                }
                this.date = null;
                this.hour = '';
                this.day = '';
            }
        },
        _modifyMonth(diff: number) {
            this.month = this.month
                .clone()
                .add(diff, 'months');
        },
        _getDayClass(day: IkDateCalendarItem) {
            return {
                'ik-date__cell': true,
                'ik-date__cell--offset': day.is_offset,
                'ik-date__cell--active': day.is_active,
                'ik-date__cell--today': day.is_today,
                'ik-date__cell--disabled': day.is_disabled,
            };
        },
        _onHourPopoverOpen() {
            this.date && this._scrollToHour(this.date);
        },
        _scrollToHour(date: IkTime) {
            if (date.isValid()) {
                const date_index = this.timestamps.findIndex(t => {
                    return t.format('HHmm') == date.format('HHmm');
                });
                const stamp_el = this.stamps[date_index];
                if (stamp_el && this.s_hour) {
                    this.s_hour.scrollTo(stamp_el, 'center');
                }
            }
        },
        _onHourInput(input: string | number) {
            input = String(input || '').trim();
            input && this._scrollToHour(time(input, this.format_hour));
            this.emit_on_focusout = true;
        },
    },
    mounted() {
        if (this.autofocus) {
            setTimeout(this.focus, 0);
        }
    },
    watch: {
        modelValue: {
            immediate: true,
            handler(val: IkTime | null) {
                this._set(val, true);
                if (val) {
                    this.month = val
                        .clone()
                        .local()
                        .startOf('month');
                }
            },
        },
    },
    setup() {
        return {
            i_day: ref<HTMLElement>(),
            p_day: ref<IkPopover>(),
            i_hour: ref<HTMLElement>(),
            p_hour: ref<IkPopover>(),
            s_hour: ref<IkScrollArea>(),
            stamps: ref<HTMLElement[]>([]),
            date: shallowRef<IkTime | null>(null),
        };
    },
});
</script>
