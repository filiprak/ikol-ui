import MockDate from 'mockdate';
import type { RenderOptions } from '@ui/tests/tools/utils';
import { divStub, getBody, renderShallow, wait } from '@ui/tests/tools/utils';
import { IkDate } from '@ui/components/IkDate';
import { time } from '@ui/classes/dates';
import { IkTime } from '@ui/classes/dates/IkTime';
import { IkPopover } from '@ui/components/IkPopover';
import { IkInput } from '@ui/components/IkInput';

describe('IkDate', () => {
    const getInstance = (options: RenderOptions<typeof IkDate> = {}) => renderShallow(IkDate, {
        global: {
            renderStubDefaultSlot: true,
            stubs: { IkPopover, IkInput, IkScrollArea: divStub() },
        },
    }, options);

    beforeAll(() => {
        MockDate.set('2020-07-10 12:37:00');
    });

    afterAll(() => {
        MockDate.reset();
    });

    it('renders with default state', () => {
        const wrapper = getInstance({
            stubs: { IkPopover: true, IkInput: true, IkScrollArea: true },
        });
        expect(wrapper.classes()).toStrictEqual([
            'ik-date',
        ]);
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders with value', () => {
        const wrapper = getInstance({
            props: {
                modelValue: time('2020-01-01'),
            },
        });

        expect(wrapper.findAllComponents(IkInput).at(0)?.props('modelValue')).toBe('Wed, 1 Jan 2020');
    });

    it('renders with value and time', () => {
        const wrapper = getInstance({
            props: {
                time: true,
                modelValue: time('2020-07-23 15:46'),
            },
        });

        expect(wrapper.findAllComponents(IkInput).at(0)?.props('modelValue')).toBe('Thu, 23 Jul 2020');
        expect(wrapper.findAllComponents(IkInput).at(1)?.props('modelValue')).toBe('15:46');
    });

    it('updates date on value change', async () => {
        const wrapper = getInstance({
            props: {
                time: true,
                modelValue: time('2020-07-23 15:46'),
            },
        });

        expect(wrapper.findAllComponents(IkInput).at(0)?.props('modelValue')).toBe('Thu, 23 Jul 2020');
        expect(wrapper.findAllComponents(IkInput).at(1)?.props('modelValue')).toBe('15:46');

        await wrapper.setProps({ modelValue: time('2019-03-12 13:52:00') });

        expect(wrapper.findAllComponents(IkInput).at(0)?.props('modelValue')).toBe('Tue, 12 Mar 2019');
        expect(wrapper.findAllComponents(IkInput).at(1)?.props('modelValue')).toBe('13:52');
    });

    it('updates date on value change 2', async () => {
        const wrapper = getInstance({
            props: {
                time: true,
                modelValue: time('2020-07-23 15:46'),
            },
        });

        expect(wrapper.findAllComponents(IkInput).at(0)?.props('modelValue')).toBe('Thu, 23 Jul 2020');
        expect(wrapper.findAllComponents(IkInput).at(1)?.props('modelValue')).toBe('15:46');

        await wrapper.setProps({ modelValue: time('2019-03-12 13:52:00') });

        expect(wrapper.findAllComponents(IkInput).at(0)?.props('modelValue')).toBe('Tue, 12 Mar 2019');
        expect(wrapper.findAllComponents(IkInput).at(1)?.props('modelValue')).toBe('13:52');

        expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });

    it('clears date on day input clear', () => {
        const wrapper = getInstance({
            props: {
                time: true,
                modelValue: time('2020-07-23 15:46'),
            },
        });

        wrapper.findAllComponents(IkInput).at(0)?.vm.$emit('update:modelValue', ' ');
        wrapper.findAllComponents(IkInput).at(0)?.vm.$emit('focusout');

        expect(wrapper.emitted('update:modelValue')).toStrictEqual([
            [null],
        ]);
    });

    it('updates date when typed by hand 1', () => {
        const wrapper = getInstance({
            props: {
                time: true,
                modelValue: time('2020-07-23 15:46'),
            },
        });

        wrapper.findAllComponents(IkInput).at(0)?.vm.$emit('update:modelValue', 'Tue, 12 Mar 2019');
        wrapper.findAllComponents(IkInput).at(0)?.vm.$emit('focusout');

        wrapper.findAllComponents(IkInput).at(0)?.vm.$emit('update:modelValue', 'Tue, 13 Mar 2019');
        wrapper.findAllComponents(IkInput).at(0)?.vm.$emit('focusout');

        wrapper.findAllComponents(IkInput).at(0)?.vm.$emit('update:modelValue', 'Tue, 13 Jan 2019');
        wrapper.findAllComponents(IkInput).at(0)?.vm.$emit('focusout');

        wrapper.findAllComponents(IkInput).at(0)?.vm.$emit('update:modelValue', 'Tue, 13 Jan 2020');
        wrapper.findAllComponents(IkInput).at(0)?.vm.$emit('focusout');

        expect(wrapper.emitted('update:modelValue')).toStrictEqual([
            [expect.any(IkTime)],
            [expect.any(IkTime)],
            [expect.any(IkTime)],
            [expect.any(IkTime)],
        ]);

        expect(wrapper.emitted('update:modelValue')?.[0][0]?.toString())
            .toStrictEqual('Tue Mar 12 2019 15:46:00 GMT+0100');

        expect(wrapper.emitted('update:modelValue')?.[1][0]?.toString())
            .toStrictEqual('Wed Mar 13 2019 15:46:00 GMT+0100');

        expect(wrapper.emitted('update:modelValue')?.[2][0]?.toString())
            .toStrictEqual('Sun Jan 13 2019 15:46:00 GMT+0100');

        expect(wrapper.emitted('update:modelValue')?.[3][0]?.toString())
            .toStrictEqual('Mon Jan 13 2020 15:46:00 GMT+0100');
    });

    it('updates date when typed by hand 2', () => {
        const wrapper = getInstance({
            props: {
                time: true,
                modelValue: time('2020-07-23 15:46'),
            },
        });

        wrapper.findAllComponents(IkInput).at(0)?.vm.$emit('update:modelValue', '310122');
        wrapper.findAllComponents(IkInput).at(0)?.vm.$emit('focusout');

        wrapper.findAllComponents(IkInput).at(0)?.vm.$emit('update:modelValue', '30012022');
        wrapper.findAllComponents(IkInput).at(0)?.vm.$emit('focusout');

        expect(wrapper.emitted('update:modelValue')).toStrictEqual([
            [expect.any(IkTime)],
            [expect.any(IkTime)],
        ]);

        expect(wrapper.emitted('update:modelValue')?.[0][0]?.toString())
            .toStrictEqual('Mon Jan 31 2022 15:46:00 GMT+0100');

        expect(wrapper.emitted('update:modelValue')?.[1][0]?.toString())
            .toStrictEqual('Sun Jan 30 2022 15:46:00 GMT+0100');
    });

    it('updates time when typed by hand', () => {
        const wrapper = getInstance({
            props: {
                time: true,
                modelValue: time('2020-07-23 15:46'),
            },
        });

        wrapper.findAllComponents(IkInput).at(1)?.vm.$emit('update:modelValue', '01:17');
        wrapper.findAllComponents(IkInput).at(1)?.vm.$emit('focusout');

        expect(wrapper.emitted('update:modelValue')).toStrictEqual([
            [expect.any(IkTime)],
        ]);
        expect(wrapper.emitted('update:modelValue')?.[0][0]?.toString())
            .toStrictEqual('Thu Jul 23 2020 01:17:00 GMT+0200');
    });

    it('does not update time when typed invalid', () => {
        const wrapper = getInstance({
            props: {
                time: true,
                modelValue: time('2020-07-23 15:46'),
            },
        });

        wrapper.findAllComponents(IkInput).at(1)?.vm.$emit('update:modelValue', '25:19');
        wrapper.findAllComponents(IkInput).at(1)?.vm.$emit('focusout');

        expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });

    it('does not update date when typed by hand invalid', () => {
        const wrapper = getInstance({
            props: {
                time: true,
                modelValue: time('2020-07-23 15:46'),
            },
        });

        wrapper.findAllComponents(IkInput).at(0)?.vm.$emit('update:modelValue', 'xxx');
        wrapper.findAllComponents(IkInput).at(0)?.vm.$emit('focusout');

        expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });

    it('updates date on day click', async () => {
        const wrapper = getInstance({
            props: {
                time: true,
                modelValue: time('2020-07-23 15:46'),
            },
        });

        await wrapper.vm.focusDay();
        await getBody().findAll('.ik-date__cell').at(17)?.trigger('click');

        expect(wrapper.emitted('update:modelValue')).toStrictEqual([
            [expect.any(IkTime)],
        ]);
        expect(wrapper.emitted('update:modelValue')?.[0][0]?.toString())
            .toStrictEqual('Mon Jul 06 2020 15:46:00 GMT+0200');
    });

    it('updates date on time pick', async () => {
        const wrapper = getInstance({
            props: {
                time: true,
                modelValue: time('2020-07-23 15:46'),
            },
        });

        await wrapper.vm.focusHour();
        await getBody().findAll('.ik-date__select-item').at(23)?.trigger('click');

        expect(wrapper.emitted('update:modelValue')).toStrictEqual([
            [expect.any(IkTime)],
        ]);
        expect(wrapper.emitted('update:modelValue')?.[0][0]?.toString())
            .toStrictEqual('Thu Jul 23 2020 11:30:00 GMT+0200');
    });

    it('allows navigate months', async () => {
        const wrapper = getInstance({
            props: {
                time: true,
                modelValue: time('2020-07-23 15:46'),
            },
        });

        await wrapper.vm.focusDay();
        await wrapper.vm.$nextTick();

        await getBody().findAll('.ik-date__cell > div').at(0)?.trigger('click');
        expect(getBody().find('.ik-date__nav').text()).toContain('June 2020');

        await getBody().findAll('.ik-date__cell > div').at(0)?.trigger('click');
        expect(getBody().find('.ik-date__nav').text()).toContain('May 2020');

        await getBody().findAll('.ik-date__cell > div').at(1)?.trigger('click');
        await getBody().findAll('.ik-date__cell > div').at(1)?.trigger('click');
        await getBody().findAll('.ik-date__cell > div').at(1)?.trigger('click');
        expect(getBody().find('.ik-date__nav').text()).toContain('August 2020');
    });

    it('highlights selected day on calendar', () => {
        const wrapper = getInstance({
            props: {
                time: true,
                modelValue: time('2020-07-23 15:46'),
            },
        });

        wrapper.vm.focusDay();

        expect(getBody().find('.ik-date__cell--active').text()).toContain('23');
    });

    it('highlights today on calendar', () => {
        const wrapper = getInstance({
            props: {
                time: true,
                modelValue: time('2020-07-23 15:46'),
            },
        });

        wrapper.vm.focusDay();

        expect(getBody().find('.ik-date__cell--today').text()).toContain('10');
    });

    it('valid timezone offset bound active date test', () => {
        const wrapper = getInstance({
            props: {
                time: true,
                modelValue: time.utc('2020-07-04 23:30'),
            },
        });

        wrapper.vm.focusDay();

        expect(getBody().find('.ik-date__cell--active').text()).toContain('5');
    });

    it('renders valid month days 1', () => {
        const wrapper = getInstance({
            props: {
                time: true,
                modelValue: time.utc('2020-09-30 22:00'),
            },
        });

        wrapper.vm.focusDay();

        expect(getBody().findAll('.ik-date__cell--weekday').at(0)?.text()).toContain('Sun');

        expect(getBody().find('.ik-date__cell--active').text()).toContain('1');
        expect(getBody().findAll('.ik-date__cell--offset')).toHaveLength(4);
        expect(getBody().findAll('.ik-date__cell--offset').at(0)?.text()).toContain('27');
        expect(getBody().findAll('.ik-date__cell--offset').at(3)?.text()).toContain('30');
    });

    it('renders valid month days 2', () => {
        const wrapper = getInstance({
            props: {
                time: true,
                modelValue: time('2020-12-31 23:59'),
            },
        });

        wrapper.vm.focusDay();

        expect(getBody().findAll('.ik-date__cell--weekday').at(0)?.text()).toContain('Sun');

        expect(getBody().find('.ik-date__cell--active').text()).toContain('31');
        expect(getBody().findAll('.ik-date__cell--offset')).toHaveLength(4);
        expect(getBody().findAll('.ik-date__cell--offset').at(0)?.text()).toContain('29');
        expect(getBody().findAll('.ik-date__cell--offset').at(3)?.text()).toContain('2');
    });

    it('works with autofocus', async () => {
        const wrapper = getInstance({
            props: {
                autofocus: true,
            },
            attachTo: document.body,
        });

        await wait(50);

        expect(wrapper.findComponent(IkInput).find('input').element).toBe(document.activeElement);
    });

    it('renders with hide date', () => {
        const wrapper = getInstance({
            props: {
                time_only: true,
            },
        });

        expect(wrapper.findAll('.ik-date__day-input').length).toBe(0);
    });

    it('renders with custom hour prompt interval', () => {
        const wrapper = getInstance({
            props: {
                prompt_hour_interval: 15,
                time: true,
            },
        });

        wrapper.vm.focusHour();

        expect(getBody().findAll('.ik-date__select-item').length).toBe(96);
        expect(getBody().findAll('.ik-date__select-item').at(0)?.text()).toBe('00:00');
        expect(getBody().findAll('.ik-date__select-item').at(1)?.text()).toBe('00:15');
        expect(getBody().findAll('.ik-date__select-item').at(6)?.text()).toBe('01:30');
    });

    it('renders with custom hour prompt interval 2', () => {
        const wrapper = getInstance({
            props: {
                prompt_hour_interval: 60,
                time: true,
            },
        });

        wrapper.vm.focusHour();

        expect(getBody().findAll('.ik-date__select-item').length).toBe(24);
        expect(getBody().findAll('.ik-date__select-item').at(0)?.text()).toBe('00:00');
        expect(getBody().findAll('.ik-date__select-item').at(1)?.text()).toBe('01:00');
        expect(getBody().findAll('.ik-date__select-item').at(6)?.text()).toBe('06:00');
    });

    it('renders full width', () => {
        const wrapper = getInstance({
            props: {
                full_width: true,
            },
        });

        expect(wrapper.classes()).toContain('ik-date--full-width');
    });

    it('prop disabled_datespand is formatted', async () => {
        const wrapper = getInstance({
            props: {
                disabled_datespans: [{ from: null, to: time('2020-12-31 23:59') }],
                time: true,
            },
            stubs: {
                IkPopover,
            },
        });
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.normalized_disabled_datespans).toBeInstanceOf(Array);
        expect(wrapper.vm.normalized_disabled_datespans[0].from.toString()).toBe('Thu Jan 01 1970 01:00:00 GMT+0100');
        expect(wrapper.vm.normalized_disabled_datespans[0].to.toString()).toBe('Thu Dec 31 2020 23:59:00 GMT+0100');
    });

    it('props "disabled_datespans" assigns the css class in the appropriate cells', async () => {
        const wrapper = getInstance({
            props: {
                modelValue: time('2024-01-08'),
                disabled_datespans: [{ from: time('2024-01-01'), to: time('2024-01-03') }],
            },
        });
        await wrapper.vm.$nextTick();
        wrapper.vm.focusDay();

        expect(getBody().findAll('.ik-date__cell--disabled').length).toBe(3);

        expect(getBody().findAll('.ik-date__cell--disabled').at(0)?.text()).toBe('1');
        expect(getBody().findAll('.ik-date__cell--disabled').at(1)?.text()).toBe('2');
        expect(getBody().findAll('.ik-date__cell--disabled').at(2)?.text()).toBe('3');
    });

    it('props "disabled_datespans" allows you to disable several time spans', async () => {
        const wrapper = getInstance({
            props: {
                modelValue: time('2024-01-08'),
                disabled_datespans: [{ from: time('2024-01-01'), to: time('2024-01-03') }, { from: time('2024-01-05'), to: time('2024-01-07') }],
            },
        });
        await wrapper.vm.$nextTick();
        wrapper.vm.focusDay();

        expect(getBody().findAll('.ik-date__cell--disabled').length).toBe(6);

        expect(getBody().findAll('.ik-date__cell--disabled').at(0)?.text()).toBe('1');
        expect(getBody().findAll('.ik-date__cell--disabled').at(1)?.text()).toBe('2');
        expect(getBody().findAll('.ik-date__cell--disabled').at(2)?.text()).toBe('3');

        expect(getBody().findAll('.ik-date__cell--disabled').at(3)?.text()).toBe('5');
        expect(getBody().findAll('.ik-date__cell--disabled').at(4)?.text()).toBe('6');
        expect(getBody().findAll('.ik-date__cell--disabled').at(5)?.text()).toBe('7');
    });
});
