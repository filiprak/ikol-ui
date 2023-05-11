export function clamp(number: number, min: number, max: number): number {
    return Math.max(Math.min(number, max), min);
};

export function formatCssValue(value: number | string, units = 'px'): string {
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

interface URIOptions {
    protocol?: string,
    script?: string,
    query?: { [param: string]: string | number | null },
    hash?: string,
}

export function buildUri(base: string, options: URIOptions = {}) {
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

        for (const [name, value] of Object.entries(options.query)) {
            params.set(name, value !== null ? String(value) : '');
        }

        uri += params.toString() ? join_char + params : '';
    }

    if (options.hash) {
        uri += (uri.indexOf('#') < 0 ? '#' : '') + options.hash;
    }

    return uri;
}
