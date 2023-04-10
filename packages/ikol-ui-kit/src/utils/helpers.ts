export function clamp(number: number, min: number, max: number): number {
    return Math.max(Math.min(number, max), min);
};

export function formatCssValue(value: number | string, units: string): string {
    value = (value || '').toString();
    return value !== '0' ? value + units : '0';
};
