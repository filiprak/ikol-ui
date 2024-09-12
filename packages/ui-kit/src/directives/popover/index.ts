import type { Directive, DirectiveBinding } from 'vue';
import type { HTMLVPopoverElement } from '@ui/composables/popover';
import { DATA_KEY, IkVPopoverData, usePopover } from '@ui/composables/popover';
import { isObject } from '@ui/utils/helpers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IkVPopoverBindingValue = { id?: string, activator_id?: string | null, data?: any } | string | null;

function getState(binding: DirectiveBinding<IkVPopoverBindingValue>) {
    const state = new IkVPopoverData();

    if (isObject(binding.value)) {
        state.id = String(binding.value.id);
        state.activator_id = String(binding.value.activator_id);
        state.data = binding.value?.data || {};
    } else {
        state.id = binding.value;
    }
    if (binding.arg == 'click' || binding.arg == 'hover') {
        state.event = binding.arg;
    }

    return state;
}

function update(el: HTMLVPopoverElement, binding: DirectiveBinding<IkVPopoverBindingValue>) {
    const manager = usePopover();
    const state = getState(binding);
    const old = el[DATA_KEY];
    const popover = manager.getInstance(state.id || '');
    const old_popover = manager.getInstance(old?.id || '');

    if (old) {
        if (popover !== old_popover || state.event !== old.event) {
            old_popover && old_popover.unbind(el);
            popover && popover.bind(el, state.event);
        }
    } else {
        popover && popover.bind(el, state.event);
    }

    if (state.id && state.activator_id) {
        manager.updateActivator(state.id, state.activator_id, el);
    }

    state.popover = popover;

    el[DATA_KEY] = state;
}

function destroy(el: HTMLVPopoverElement) {
    const manager = usePopover();
    const state = el[DATA_KEY];

    if (state) {
        const popover = manager.getInstance(state.id || '');

        if (state.id && state.activator_id) {
            manager.cleanupActivator(state.id, state.activator_id, el);
        }

        if (popover) {
            popover.unbind(el);
        }
    }
    delete el[DATA_KEY];
}

export const vPopoverActivator: Directive<HTMLVPopoverElement, IkVPopoverBindingValue> = {
    mounted(el, binding) {
        binding.value && update(el, binding);
    },
    updated(el, binding) {
        binding.value && update(el, binding);
    },
    beforeUnmount(el, binding) {
        binding.value && destroy(el);
    },
};
