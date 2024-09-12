import { shallowReactive } from 'vue';

type IkCacheKey = any // eslint-disable-line @typescript-eslint/no-explicit-any

export interface IkUseMemoizeCache<Key, Value> {
    get(key: Key): Value | undefined
    set(key: Key, value: Value): void
    has(key: Key): boolean
    delete(key: Key): void
    clear(): void
}

export interface IkUseMemoizeReturn<Result, Args extends unknown[]> {
    (...args: Args): Result
    cache: IkUseMemoizeCache<IkCacheKey, Result>
    load(...args: Args): Result
    delete(...args: Args): void
    clear(): void
    generateKey(...args: Args): IkCacheKey
}

export interface IkUseMemoizeOptions<Result, Args extends unknown[]> {
    getKey?: (...args: Args) => string | number
    cache?: IkUseMemoizeCache<IkCacheKey, Result>
}

export function useMemoize<Result, Args extends unknown[]>(
    resolver: (...args: Args) => Result,
    options?: IkUseMemoizeOptions<Result, Args>,
): IkUseMemoizeReturn<Result, Args> {
    const initCache = (): IkUseMemoizeCache<IkCacheKey, Result> => {
        if (options?.cache) {
            return shallowReactive(options.cache);
        } else {
            return shallowReactive(new Map<IkCacheKey, Result>());
        }
    };
    const cache = initCache();

    const generateKey = (...args: Args) => options?.getKey
        ? options.getKey(...args)
        : JSON.stringify(args);

    const _loadData = (key: string | number, ...args: Args): Result => {
        cache.set(key, resolver(...args));
        return cache.get(key) as Result;
    };
    const loadData = (...args: Args): Result => _loadData(generateKey(...args), ...args);
    const deleteData = (...args: Args): void => {
        cache.delete(generateKey(...args));
    };
    const clearData = () => {
        cache.clear();
    };

    const memoized: Partial<IkUseMemoizeReturn<Result, Args>> = (...args: Args): Result => {
        const key = generateKey(...args);

        if (cache.has(key)) {
            return cache.get(key) as Result;
        } else {
            return _loadData(key, ...args);
        }
    };
    memoized.load = loadData;
    memoized.delete = deleteData;
    memoized.clear = clearData;
    memoized.generateKey = generateKey;
    memoized.cache = cache;

    return memoized as IkUseMemoizeReturn<Result, Args>;
}
