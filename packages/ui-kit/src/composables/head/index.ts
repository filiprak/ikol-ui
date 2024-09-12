import type { Ref } from 'vue';
import { watch } from 'vue';

interface IkHeadOptions {
    htmlAttrs?: {
        class?: Ref<{ [key: string]: boolean }>,
    },
    styles?: { [key: string]: Ref<{ css: string }> },
}

export function useHead(options: IkHeadOptions) {
    if (options.htmlAttrs?.class) {
        watch(options.htmlAttrs?.class, (new_classes, old_classes = {}) => {
            const el = document.documentElement;

            [...el.classList].forEach(class_name => {
                if (old_classes[class_name]) {
                    el.classList.remove(class_name);
                }
            });

            if (new_classes) {
                for (const class_name in new_classes) {
                    if (new_classes[class_name]) {
                        el.classList.add(class_name);
                    }
                }
            }
        }, { immediate: true, deep: true });
    }
    for (const style_id in options.styles) {
        const style_opts = options.styles[style_id];

        watch(style_opts, (new_opts) => {
            let el = document.querySelector(`style[data-${style_id}]`);

            if (!el) {
                const first = document.querySelector('style');
                el = document.createElement('style');
                el.setAttribute(`data-${style_id}`, '');
                el.setAttribute('type', 'text/css');
                first ? document.head.insertBefore(el, first) : document.head.prepend(el);
            }

            el.innerHTML = new_opts.css;
        }, { immediate: true, deep: true });
    }
}
