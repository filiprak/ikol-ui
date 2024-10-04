import type { EnumT, ObjValueT, NotArray, OmitUndefined } from '@ui/types/utils';

export function isArray(obj: any): obj is any[] { // eslint-disable-line @typescript-eslint/no-explicit-any
    return Array.isArray(obj);
};

export function isObject(obj: any): obj is object { // eslint-disable-line @typescript-eslint/no-explicit-any
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
};

export function isPlainObject(obj: unknown): obj is object {
    return obj?.constructor === Object;
};

export function isEmpty(obj: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (isNumber(obj)) {
        return isNaN(obj);
    }
    if (isNullish(obj)) {
        return true;
    }
    if (isArray(obj) || isString(obj)) {
        return !obj.length;
    }
    if (isPlainObject(obj)) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
    return !obj;
}

export function isString(obj: any): obj is string { // eslint-disable-line @typescript-eslint/no-explicit-any
    return typeof obj === 'string';
};

export function isBoolean(obj: any): obj is boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
    return typeof obj === 'boolean';
};

export function isNumber(obj: any): obj is number { // eslint-disable-line @typescript-eslint/no-explicit-any
    return typeof obj === 'number';
};

export function isInteger(obj: any): obj is number { // eslint-disable-line @typescript-eslint/no-explicit-any
    return Number.isInteger(obj);
};

export function isNullish(obj: any): obj is null | undefined { // eslint-disable-line @typescript-eslint/no-explicit-any
    return obj === null || typeof obj === 'undefined';
};

export function isNumeric(obj: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
    return typeof obj !== 'symbol' &&
        typeof obj !== 'bigint' &&
        !isArray(obj) &&
        (obj - parseFloat(obj) + 1) >= 0;
};

export function isEnumValue<T extends EnumT>(enumType: T, value: any): value is ObjValueT<T> { // eslint-disable-line @typescript-eslint/no-explicit-any
    return Object.values(enumType).includes(value);
}

export function mergeShallow<T extends object, S extends object>(target: NotArray<T>, source: NotArray<S>): T & OmitUndefined<S> {
    const without_undef = Object.assign({}, source);
    for (const key in without_undef) {
        if (without_undef[key] === undefined) {
            delete without_undef[key];
        }
    }
    return Object.assign(target, without_undef) as T & OmitUndefined<S>;
}

export function isFunction(obj: any): obj is Function { // eslint-disable-line @typescript-eslint/no-explicit-any
    return !!obj && typeof obj === 'function';
};

export function fillArray<T>(length: number, obj: T): T[] {
    return Array(length).fill(obj);
}

export function range(first: number, last: number): number[] {
    const range = [];
    for (let i = first; i <= last; i++) {
        range.push(i);
    }
    return range;
}

export function ownKeys(obj: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (isObject(obj) || isArray(obj)) {
        const own: string[] = [];
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                own.push(key);
            }
        }
        return own;
    } else {
        return [];
    }
};

export function keys(obj: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    return Object.keys(obj);
};

export function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter(k => !Number.isNaN(k)) as K[];
}

export function entries<T = any>(obj: { [s: string]: T } | ArrayLike<T>) { // eslint-disable-line @typescript-eslint/no-explicit-any
    return Object.entries(obj);
};

function flattenKeysAddToResult(prefix: string, value: unknown, f_object: Record<string, unknown>) {
    if (isPlainObject(value) || isArray(value)) {
        const f_obj = {};
        for (const [key, ivalue] of entries(value)) {
            flattenKeysAddToResult(`[${key}]`, ivalue, f_obj);
        }

        for (const [f_key, f_value] of entries(f_obj)) {
            f_object[`${prefix}${f_key}`] = f_value;
        }
    } else {
        f_object[prefix] = value;
    }
}

export function flattenKeys(obj: any): Record<string, unknown> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const f_object: Record<string, unknown> = {};
    const is_array = isArray(obj);

    if (isObject(obj) || is_array) {
        for (const [key, value] of entries(obj)) {
            flattenKeysAddToResult(is_array ? `[${key}]` : `${key}`, value, f_object);
        }
    }

    return f_object;
}

export function formatNumber(value: string | number, decimals = 2, separator?: boolean | string) {
    if (decimals >= 0 && isNumeric(value)) {
        const formatted = Number(value).toFixed(decimals);
        if (separator) {
            const sep = isString(separator) ? separator : ' ';
            const parts = formatted.split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sep);
            return parts.join('.');
        } else {
            return formatted;
        }
    } else {
        return String(value);
    }
}

export function clamp(number: number, min: number, max: number): number {
    return Math.max(Math.min(number, max), min);
};

export function toCssUnits(value: number | string, units = 'px'): string {
    value = (value || '').toString().trim();
    return (value && value !== '0') ? (value + units) : '0';
};

export function getIconClasses(icon: string): string[] {
    const parts = (icon || '').split(':');
    let prefix = 'fa-solid';

    if (parts.length > 1) {
        switch (parts[1]) {
            case 'thin':
                prefix = 'fa-thin';
                break;
            case 'light':
                prefix = 'fa-light';
                break;
            case 'regular':
                prefix = 'fa-regular';
                break;
            case 'solid':
                prefix = 'fa-solid';
                break;
            case 'duotone':
                prefix = 'fa-duotone';
                break;
            case 'brands':
                prefix = 'fa-brands';
                break;
        }
    }

    if (parts[0]) {
        return [prefix, 'fa-' + parts[0]];
    } else {
        return [];
    }
}

interface IkURIOptions {
    protocol?: string,
    script?: string,
    query?: { [param: string]: string | number | null },
    hash?: string,
}

export function buildUri(base: string, options: IkURIOptions = {}) {
    let uri = base;

    if (options.protocol) {
        if (['ftp', 'http', 'https', 'file'].indexOf(options.protocol) > -1) {
            uri = options.protocol + '://' + uri;
        } else {
            uri = options.protocol + ':' + uri;
        }
    }

    if (options.script) {
        if (uri.slice(-1) !== '/') {
            uri += '/';
        }
        uri += options.script;
    }

    if (options.query) {
        const params = new URLSearchParams();
        const join_char = (uri.indexOf('?') < 0) ? '?' : '&';

        for (const [name, value] of entries(options.query)) {
            params.set(name, value !== null ? String(value) : '');
        }

        uri += params.toString() ? join_char + params : '';
    }

    if (options.hash) {
        uri += (uri.indexOf('#') < 0 ? '#' : '') + options.hash;
    }

    return uri;
}

export function getZIndex(el: Element) {
    let current = el;

    if (el) {
        let max = null;

        while (current.parentElement) {
            const z_index = parseInt(getComputedStyle(current).getPropertyValue('z-index'));

            if (z_index) {
                if (max) {
                    max = Math.max(max, Number(z_index));
                } else {
                    max = Number(z_index);
                }
            }

            current = current.parentElement;
        }

        return max;
    } else {
        return null;
    }
}

export function getRandomString(length: number) {
    const RAND_STR_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let output = '';
    for (let i = 0; i < length; i++) {
        output += RAND_STR_CHARS.charAt(Math.floor(Math.random() * RAND_STR_CHARS.length));
    }
    return output;
}

export function debounce<F extends (...args: any[]) => any>(func: F, wait = 400, immediate = false) { // eslint-disable-line @typescript-eslint/no-explicit-any
    let timeout: ReturnType<typeof setTimeout> | null;

    let queue: Promise<unknown> | undefined;
    let pending_args: Parameters<F> | undefined;

    return (...args: Parameters<F>): void => {
        const run = () => {
            if (!queue) {
                const r = func(...args);

                if (r instanceof Promise) {
                    queue = r;
                }
            } else {
                const flush = pending_args === undefined;

                pending_args = args;

                if (flush) {
                    queue.finally(() => {
                        queue = undefined;

                        const r = func(...(pending_args || []));

                        pending_args = undefined;

                        if (r instanceof Promise) {
                            queue = r;
                        }
                    });
                }
            }
        };
        const later = () => {
            timeout = null;

            if (!immediate) {
                run();
            }
        };
        const call_now = immediate && !timeout;

        timeout && clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (call_now) {
            run();
        }
    };
}

export function hex2rgb(h: string): [number, number, number] {
    let result: [number, number, number] = [0, 0, 0];

    if (h !== undefined && h !== null && String(h).length > 0) {
        const o = String(h).substr(h[0] === '#' ? 1 : 0, 6);
        if (o.length === 6) {
            result = [parseInt(o.substr(0, 2), 16), parseInt(o.substr(2, 2), 16), parseInt(o.substr(4, 2), 16)];
        }
    }
    return result;
}

export function getTextColorForBackground(background_hex: string, options: { dark_text?: string, plain_text?: string } = {}) {
    options = options || {};

    const dark_text = options.dark_text ? options.dark_text : '000000';
    const plain_text = options.plain_text ? options.plain_text : 'ffffff';

    const rgb = hex2rgb(background_hex);
    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;

    return brightness < 150 ? plain_text : dark_text;
}

export function isUrl(value: unknown): value is string {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(String(value || ''));
}

export function isEmail(value: unknown): value is string {
    return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(String(value || ''));
}

export function isValidPassword(value: unknown): value is string {
    return /^(?=.*[!@#$%^&*()\-=+{};:,<.>]|.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(String(value || ''));
}

export function isHex6(value: unknown): value is string {
    return /^[0-9A-Fa-f]{6}$/.test(String(value || ''));
}

export function isDigitsOnly(value: unknown): value is string | number {
    if (isNumber(value)) {
        return !isNaN(value);
    } else if (isString(value)) {
        return /^[0-9]+$/.test(value);
    } else {
        return false;
    }
}

export function copyToClipboard(string: string): void {
    if (typeof navigator !== 'undefined' && navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(string).catch(err => {
            // eslint-disable-next-line no-console
            console.error('Failed to copy: ', err);
        });
    } else {
        let currentSelection: Range | null = null;
        const el = document.createElement('textarea');

        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        el.value = string;
        document.body.appendChild(el);

        const selection = document.getSelection();
        if (selection && selection.rangeCount > 0) {
            currentSelection = selection.getRangeAt(0);
        }

        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        if (currentSelection && selection) {
            selection.removeAllRanges();
            selection.addRange(currentSelection);
        }
    }
}
