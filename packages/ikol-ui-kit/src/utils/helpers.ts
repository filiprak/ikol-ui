export function clamp(number: number, min: number, max: number): number {
    return Math.max(Math.min(number, max), min);
};

export function formatCssValue(value: number, units: String): string {
    return value !== 0 ? (value || '').toString() + units : '0';
};
