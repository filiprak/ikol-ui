import type { Ref } from 'vue';
import { onBeforeUnmount, ref, watch, readonly } from 'vue';

export function useResizeObserver(target: Ref<HTMLElement | undefined>, box: 'content' | 'border' = 'content') {
    let observer: ResizeObserver | undefined;

    const rect = ref<DOMRectReadOnly>();

    const cleanup = () => {
        if (observer) {
            observer.disconnect();
            observer = undefined;
        }
        rect.value = undefined;
    };

    const onResized: ResizeObserverCallback = entries => {
        if (box === 'content') {
            rect.value = entries[0].contentRect;
        } else {
            rect.value = entries[0].target.getBoundingClientRect();
        }
    };

    const stopWatch = watch(
        target,
        (el) => {
            cleanup();

            observer = new ResizeObserver(onResized);
            el && observer!.observe(el);
        },
        { immediate: true, flush: 'post' },
    );

    const stop = () => {
        cleanup();
        stopWatch();
    };

    onBeforeUnmount(() => {
        stop();
    });

    return {
        rect: readonly(rect),
        stop,
    };
}

export function useResize(target: Ref<HTMLElement | undefined>) {
    const { rect, stop: _stop } = useResizeObserver(target);

    const size = ref({
        width: 0,
        height: 0,

        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false,

        sm_or_less: false,
        md_or_less: false,
        lg_or_less: false,

        sm_or_more: false,
        md_or_more: false,
        lg_or_more: false,
    });

    const stopWatch = watch(
        rect,
        (rect) => {
            if (rect) {
                size.value.width = rect.width;
                size.value.height = rect.height;

                size.value.xs = size.value.width <= 576;
                size.value.sm = size.value.width > 576 && size.value.width <= 768;
                size.value.md = size.value.width > 768 && size.value.width <= 992;
                size.value.lg = size.value.width > 992 && size.value.width <= 1200;
                size.value.xl = size.value.width > 1200;

                size.value.sm_or_less = size.value.width <= 768;
                size.value.md_or_less = size.value.width <= 992;
                size.value.lg_or_less = size.value.width <= 1200;

                size.value.sm_or_more = size.value.width > 576;
                size.value.md_or_more = size.value.width > 768;
                size.value.lg_or_more = size.value.width > 992;
            }
        },
        { immediate: true, flush: 'post' },
    );

    const stop = () => {
        _stop();
        stopWatch();
    };

    onBeforeUnmount(() => {
        stop();
    });

    return {
        size,
        stop,
    };
}
