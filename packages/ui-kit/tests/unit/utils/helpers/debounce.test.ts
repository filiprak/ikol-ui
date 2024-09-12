import { wait } from '@ui/tests/tools/utils';
import { debounce } from '@ui/utils/helpers';

const SCALE = 10;

describe('debounce', () => {
    it('works with timeout = 0', async () => {
        const func = jest.fn();
        const debounc_func = debounce(func, 0 * SCALE);

        debounc_func();

        await wait(5 * SCALE);

        expect(func).toHaveBeenCalledWith();
    });

    it('returns valid debounce function', async () => {
        const func = jest.fn();
        const debounc_func = debounce(func, 5 * SCALE);

        debounc_func();
        debounc_func();
        debounc_func();

        await wait(10 * SCALE);

        debounc_func();

        await wait(10 * SCALE);

        expect(func).toHaveBeenCalledTimes(2);
        expect(func).toHaveBeenCalledWith();
    });

    it('works with immediate option', async () => {
        const func1 = jest.fn();
        const func2 = jest.fn();
        const debounc_func1 = debounce(func1, 5 * SCALE, true);
        const debounc_func2 = debounce(func2, 10 * SCALE, true);

        debounc_func1();

        expect(func1).toHaveBeenCalledTimes(1);
        expect(func1).toHaveBeenCalledWith();

        debounc_func2();
        debounc_func2();
        debounc_func2();

        expect(func2).toHaveBeenCalledTimes(1);
        expect(func2).toHaveBeenCalledWith();
    });

    it('passes function args', async () => {
        const func = jest.fn();
        const debounc_func = debounce(func, 5);

        debounc_func('call', 1);
        debounc_func('call', 2);
        debounc_func('call', 3);

        await wait(10 * SCALE);

        expect(func).toHaveBeenCalledTimes(1);
        expect(func).toHaveBeenCalledWith('call', 3);
    });

    it('binds valid this context', async () => {
        const this_mock = { signal: jest.fn() };

        let func = function (this: typeof this_mock) {
            this.signal();
        };

        func = func.bind(this_mock);

        const debounc_func = debounce(func, 5 * SCALE);

        debounc_func();
        debounc_func();
        debounc_func();

        await wait(10 * SCALE);

        expect(this_mock.signal).toHaveBeenCalledTimes(1);
    });
});
