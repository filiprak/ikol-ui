import { useMemoize } from '@ui/composables/memoize';

export const fetchSvgText = useMemoize((src: string) => {
    return fetch(src)
        .then(r => {
            return r.ok ? r.text() : '';
        });
});
