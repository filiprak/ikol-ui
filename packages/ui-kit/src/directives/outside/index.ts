import type { Directive, DirectiveBinding } from 'vue';
import { isFunction } from '@ui/utils/helpers';

const DATA_KEY = 'ik-outside';

export interface IkVOutsideData {
    event: 'click' | 'mousedown' | 'mouseup';
    handler: (event: MouseEvent) => void;
    exclude: HTMLElement[];
    include: HTMLElement[];
    cleanup?: Function,
}

export interface HTMLVOutsideElement extends HTMLElement {
    [DATA_KEY]?: IkVOutsideData;
}

type IkVOutsideBindingValue = Partial<IkVOutsideData> | ((event: MouseEvent) => void);

function isInside(el: HTMLElement, target: HTMLElement) {
    let _target: HTMLElement | ShadowRoot = target;

    if (target && customElements.get(target.tagName.toLowerCase())) {
        _target = target.shadowRoot ? target.shadowRoot : target;
    }

    return el && (el === _target || el.contains(_target));
}

function prepareOptions(binding: DirectiveBinding<IkVOutsideBindingValue>) {
    const options: IkVOutsideData = {
        event: 'click',
        handler: () => { },
        exclude: [],
        include: [],
    };

    if (isFunction(binding.value)) {
        options.handler = binding.value;
    } else {
        options.event = binding.value.event || options.event;
        options.handler = binding.value.handler || options.handler;
        options.exclude = binding.value.exclude || options.exclude;
        options.include = binding.value.include || options.include;
    }

    if (binding.modifiers.click) {
        options.event = 'click';
    } else if (binding.modifiers.mousedown) {
        options.event = 'mousedown';
    } else if (binding.modifiers.mouseup) {
        options.event = 'mouseup';
    }
    return options;
}

function update(el: HTMLVOutsideElement, binding: DirectiveBinding<IkVOutsideBindingValue>) {
    const options = prepareOptions(binding);

    function onWindowEvent(event: MouseEvent) {
        const opts = el[DATA_KEY];
        const target = event.composedPath()[0];

        if (opts && isFunction(opts.handler)) {
            const include = opts.include || [];
            const exclude = opts.exclude || [];

            const is_inside = isInside(el, target as HTMLElement);

            let trigger = !is_inside;

            if (!is_inside) {
                for (let i = 0; i < include.length; i++) {
                    if (isInside(include[i], target as HTMLElement)) {
                        trigger = false;
                        break;
                    }
                }
            }
            if (is_inside) {
                for (let i = 0; i < exclude.length; i++) {
                    if (isInside(exclude[i], target as HTMLElement)) {
                        trigger = true;
                        break;
                    }
                }
            }
            if (trigger) {
                opts.handler(event);
            }
        }
    }

    if (el[DATA_KEY]) {
        const old_options = el[DATA_KEY];
        const rebind = options.event !== old_options.event;

        if (rebind) {
            window.removeEventListener(old_options.event, onWindowEvent);
            window.addEventListener(options.event, onWindowEvent);
        }
    } else {
        window.addEventListener(options.event, onWindowEvent);
    }

    options.cleanup = () => {
        window.removeEventListener(options.event, onWindowEvent);
    };

    // update options
    el[DATA_KEY] = options;
}

function destroy(el: HTMLVOutsideElement) {
    const options = el[DATA_KEY];
    if (options) {
        options.cleanup?.();
    }
    delete el[DATA_KEY];
}

export const vOutside: Directive<HTMLVOutsideElement, IkVOutsideBindingValue> = {
    mounted(el, binding) {
        update(el, binding);
    },
    updated(el, binding) {
        update(el, binding);
    },
    beforeUnmount(el) {
        destroy(el);
    },
};
