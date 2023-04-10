export function clamp(number: number, min: number, max: number): number {
    return Math.max(Math.min(number, max), min);
};

export function formatCssValue(value: number | string, units: string): string {
    value = (value || '').toString();
    return value !== '0' ? value + units : '0';
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
