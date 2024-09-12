import MockDate from 'mockdate';
import { type RenderOptions, renderDeep } from '@ui/tests/tools/utils';
import { IkDateSpanQuickField } from '@ui/components/IkDateSpanQuickField';
import { type IkTimeQuickOptions, time } from '@ui/classes/dates';
import { IkButton } from '@ui/components/IkButton';
import { nextTick } from 'vue';
import { IkTime } from '@ui/classes/dates/IkTime';
import { IkDate } from '@ui/components/IkDate';

describe('IkDateSpanQuickField', () => {
    let form = {
        registerField: jest.fn(),
        unregisterField: jest.fn(),
        validate: jest.fn(),
        emitVModel: jest.fn(),
    };

    const defaultModelValue = {
        start: null,
        end: null,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        form = {
            registerField: jest.fn(),
            unregisterField: jest.fn(),
            validate: jest.fn(),
            emitVModel: jest.fn(),
        };
    });

    beforeAll(() => {
        MockDate.set('2020-07-10 12:37:00');
    });

    afterAll(() => {
        MockDate.reset();
    });

    const getInstance = (options: RenderOptions<typeof IkDateSpanQuickField> = {}) => renderDeep(IkDateSpanQuickField, options, {
        global: {
            provide: {
                form,
            },
        },
    });

    it('renders with correct default state', () => {
        const wrapper = getInstance();

        expect(wrapper.element.tagName).toBe('DIV');
        expect(wrapper.text()).toContain('Today');
        expect(wrapper.text()).toContain('Yesterday');
        expect(wrapper.text()).toContain('Last week');
    });

    it('renders with correct witt all quick options', () => {
        const quick_options: IkTimeQuickOptions[] = ['today', 'yesterday', 'last_week', 'last_month', 'last_7_days', 'this_week', 'this_month'];
        const wrapper = getInstance({
            props: {
                modelValue: defaultModelValue,
                quick_options,
            },
        });

        expect(wrapper.element.tagName).toBe('DIV');
        expect(wrapper.text()).toContain('Today');
        expect(wrapper.text()).toContain('Yesterday');
        expect(wrapper.text()).toContain('Last week');
        expect(wrapper.text()).toContain('Last month');
        expect(wrapper.text()).toContain('Last 7 days');
        expect(wrapper.text()).toContain('This week');
        expect(wrapper.text()).toContain('This month');
    });

    it('renders proper buttons', () => {
        const wrapper = getInstance({
            props: {
                modelValue: defaultModelValue,
                quick_options: ['today', 'last_week'],
            },
        });
        const buttons = wrapper.findAllComponents(IkButton);

        expect(buttons).toHaveLength(3);
        expect(buttons.at(0)?.html()).toContain('Today');
        expect(buttons.at(1)?.html()).toContain('Last week');
        expect(buttons.at(2)?.html()).toContain('Custom');
    });

    it('no button is active when empty initial value', async () => {
        const wrapper = getInstance({
            props: {
                quick_options: ['today', 'last_week'],
                modelValue: undefined,
            },
        });
        await wrapper.vm.$nextTick();
        await nextTick();

        const buttons = wrapper.findAllComponents(IkButton);

        expect(buttons.at(0)?.props().active).toBe(false);
        expect(buttons.at(0)?.props().design).toBe('default');

        expect(buttons.at(1)?.props().active).toBe(false);
        expect(buttons.at(1)?.props().design).toBe('default');

        expect(buttons.at(2)?.props().active).toBe(false);
        expect(buttons.at(2)?.props().design).toBe('default');
    });

    it('custom button is active when non-empty end value', async () => {
        const wrapper = getInstance({
            propsData: {
                quick_options: ['today', 'last_week'],
                modelValue: { start: null, end: new IkTime() },
            },
        });
        await wrapper.vm.$nextTick();

        const buttons = wrapper.findAllComponents(IkButton);
        const dates = wrapper.findAllComponents(IkDate);

        expect(buttons.at(0)?.props().active).toBe(false);
        expect(buttons.at(0)?.props().design).toBe('default');

        expect(buttons.at(1)?.props().active).toBe(false);
        expect(buttons.at(1)?.props().design).toBe('default');

        expect(buttons.at(2)?.props().active).toBe(true);
        expect(buttons.at(2)?.props().design).toBe('primary');
        expect(dates.at(0)?.props().modelValue).toBe(null);
        expect(dates.at(1)?.props().modelValue?.toString()).toContain('Fri Jul 10 2020 12:37:00 GMT+0200');
    });

    it('custom button is active when no quick option detected', async () => {
        const wrapper = getInstance({
            propsData: {
                quick_options: ['today', 'last_week'],
                modelValue: { start: new IkTime('2023-01-01'), end: new IkTime('2023-01-03') },
            },
        });
        await wrapper.vm.$nextTick();

        const buttons = wrapper.findAllComponents(IkButton);
        const dates = wrapper.findAllComponents(IkDate);

        expect(buttons.at(0)?.props().active).toBe(false);
        expect(buttons.at(0)?.props().design).toBe('default');

        expect(buttons.at(1)?.props().active).toBe(false);
        expect(buttons.at(1)?.props().design).toBe('default');

        expect(buttons.at(2)?.props().active).toBe(true);
        expect(buttons.at(2)?.props().design).toBe('primary');

        expect(dates.at(0)?.props().modelValue?.toString()).toBe('Sun Jan 01 2023 00:00:00 GMT+0100');
        expect(dates.at(1)?.props().modelValue?.toString()).toContain('Tue Jan 03 2023 00:00:00 GMT+0100');
    });

    it('only quick button is active when loaded', async () => {
        const wrapper = getInstance({
            propsData: {
                quick_options: ['today', 'last_week'],
                modelValue: time.quickDatespan('today'),
            },
        });
        await wrapper.vm.$nextTick();

        const buttons = wrapper.findAllComponents(IkButton);

        expect(buttons.at(0)?.props().active).toBe(true);
        expect(buttons.at(0)?.props().design).toBe('primary');

        expect(buttons.at(1)?.props().active).toBe(false);
        expect(buttons.at(1)?.props().design).toBe('default');

        expect(buttons.at(2)?.props().active).toBe(false);
        expect(buttons.at(2)?.props().design).toBe('default');
    });

    it('clicking on quick button emits input', async () => {
        const wrapper = getInstance();

        await wrapper.findAllComponents(IkButton).at(0)?.trigger('click');
        expect(form.emitVModel).toHaveBeenCalledTimes(1);
        expect(form.emitVModel.mock.calls[0][0].start.toString()).toBe('Fri Jul 10 2020 00:00:00 GMT+0200');
        expect(form.emitVModel.mock.calls[0][0].end.toString()).toBe('Fri Jul 10 2020 23:59:59 GMT+0200');

        await wrapper.findAllComponents(IkButton).at(1)?.trigger('click');
        expect(form.emitVModel).toHaveBeenCalledTimes(2);
        expect(form.emitVModel.mock.calls[1][0].start.toString()).toBe('Thu Jul 09 2020 00:00:00 GMT+0200');
        expect(form.emitVModel.mock.calls[1][0].end.toString()).toBe('Thu Jul 09 2020 23:59:59 GMT+0200');
    });

    it('custom button shows manual inputs', async () => {
        const wrapper = getInstance({
            propsData: {
                modelValue: defaultModelValue,
                quick_options: ['today', 'last_week'],
                // default_option: 'today'
            },
        });

        wrapper.findAllComponents(IkButton).at(2)?.trigger('click');

        await wrapper.vm.$nextTick();

        expect(wrapper.findAllComponents(IkDate)).toHaveLength(2);
    });

    it('renders empty timespan in view mode', () => {
        const wrapper = getInstance({
            propsData: {
                modelValue: defaultModelValue,
                view_mode: true,
            },
        });

        expect(wrapper.html()).toContain('Not set');
        expect(wrapper.findAllComponents(IkButton)).toHaveLength(0);
        expect(wrapper.findAllComponents(IkDate)).toHaveLength(0);
    });

    it('renders formatted timespan in view mode', () => {
        const wrapper = getInstance({
            propsData: {
                view_mode: true,
                modelValue: { start: new IkTime('2023-01-01'), end: new IkTime('2023-01-03') },
            },
        });

        expect(wrapper.html()).toContain('Sun, 1 Jan 2023 - Tue, 3 Jan 2023');
        expect(wrapper.findAllComponents(IkButton)).toHaveLength(0);
        expect(wrapper.findAllComponents(IkDate)).toHaveLength(0);
    });

    it('custom date changes emits input event', async () => {
        const wrapper = getInstance({
            propsData: {
                modelValue: defaultModelValue,
                quick_options: ['today', 'last_week'],
            },
        });
        expect(wrapper.findAllComponents(IkButton).at(2)?.html()).toContain('Custom');
        wrapper.findAllComponents(IkButton).at(2)?.trigger('click');

        await wrapper.vm.$nextTick();

        expect(wrapper.findAllComponents(IkDate).at(0)?.exists()).toBe(true);
        expect(wrapper.findAllComponents(IkDate).at(1)?.exists()).toBe(true);

        await wrapper.findAllComponents(IkDate).at(0)?.vm.$emit('update:modelValue', new IkTime('2021-01-19'));
        await wrapper.findAllComponents(IkDate).at(1)?.vm.$emit('update:modelValue', new IkTime('2021-01-20'));

        expect(form.emitVModel).toHaveBeenCalledTimes(2); expect(form.emitVModel.mock.calls[0][0].start.toString()).toBe('Tue Jan 19 2021 00:00:00 GMT+0100');
        expect(form.emitVModel.mock.calls[1][0].end.toString()).toBe('Wed Jan 20 2021 23:59:59 GMT+0100');
    });

    it('detects active quick option button', async () => {
        const wrapper = getInstance({
            propsData: {
                quick_options: ['today', 'last_week'],
                modelValue: { start: new IkTime('2020-07-10 00:00:00'), end: new IkTime('2020-07-10 23:59:59') },
            },
        });
        await wrapper.vm.$nextTick();

        const buttons = wrapper.findAllComponents(IkButton);

        expect(buttons.at(0)?.props().active).toBe(true);
        expect(buttons.at(0)?.props().design).toBe('primary');

        expect(buttons.at(1)?.props().active).toBe(false);
        expect(buttons.at(1)?.props().design).toBe('default');

        expect(buttons.at(2)?.props().active).toBe(false);
        expect(buttons.at(2)?.props().design).toBe('default');
    });

    it('when start date is later than end date, end date recalculates', async () => {
        const wrapper = getInstance({
            propsData: {
                quick_options: ['today', 'last_week'],
                modelValue: { start: new IkTime('2020-01-10 00:00:00'), end: new IkTime('2020-01-10 23:59:59') },
            },
        });
        await wrapper.vm.$nextTick();

        await wrapper.findAllComponents(IkDate).at(0)?.vm.$emit('update:modelValue', new IkTime('2021-01-19'));

        expect(form.emitVModel.mock.calls[0][0].start.toString()).toBe('Tue Jan 19 2021 00:00:00 GMT+0100');
        expect(form.emitVModel.mock.calls[0][0].end.toString()).toBe('Wed Jan 20 2021 23:59:59 GMT+0100');
    });

    it('when end date is before start date, start date recalculates', async () => {
        const wrapper = getInstance({
            propsData: {
                quick_options: ['today', 'last_week'],
                modelValue: { start: new IkTime('2020-01-10 00:00:00'), end: new IkTime('2020-01-10 23:59:59') },
            },
        });
        await wrapper.vm.$nextTick();

        await wrapper.findAllComponents(IkDate).at(1)?.vm.$emit('update:modelValue', new IkTime('2019-01-19'));
        expect(form.emitVModel.mock.calls[0][0].start.toString()).toBe('Fri Jan 18 2019 00:00:00 GMT+0100');
        expect(form.emitVModel.mock.calls[0][0].end.toString()).toBe('Sat Jan 19 2019 23:59:59 GMT+0100');
    });
});
