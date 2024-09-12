<script setup lang="ts">
import '@ui/styles';
import './IkPopover.css';
import type { CSSProperties, PropType, VNode } from 'vue';

import {
    h,
    onMounted,
    onBeforeUnmount,
    ref,
    nextTick,
    watch,
    useSlots, computed,
} from 'vue';

import { DATA_KEY, CONTENT_DATA_KEY, usePopover } from '@ui/composables/popover';
import type { HTMLVPopoverElement } from '@ui/composables/popover';
import { clamp, toCssUnits, getZIndex } from '@ui/utils/helpers';
import { useInstance } from '@ui/composables/instance';
import { useRender } from '@ui/composables/render';
import type { IkPopover } from '.';
import { useDevice } from '@ui/composables/device';
import { extractElementVNodes } from '@ui/utils/core';
import type { IkAlignment, IkPosition } from '@ui/types/utils';

const ARROW_BASE_STYLES = {
    top: { left: 'calc(50% - 4px)' },
    bottom: {
        top: '-8px',
        left: 'calc(50% - 4px)',
        rotate: '180deg',
    },
    left: { left: 'calc(100% - 20px)' },
    right: {
        top: 'calc(50% - 4px)',
        left: '-8px',
        rotate: '90deg',
    },
};

const props = defineProps({
    id: {
        type: String,
    },
    position: {
        type: String as PropType<`${IkPosition}`>,
        default: 'vertical',
    },
    align: {
        type: String as PropType<`${IkAlignment}`>,
        default: 'center',
    },
    dynamic_positioning: {
        type: Boolean,
        default: false,
    },
    can_close: {
        type: [Function, Boolean],
        default: true,
    },
    close_on_abroad_click: {
        type: Boolean,
        default: true,
    },
    allow_viewport_overflow: {
        type: Boolean,
        default: false,
    },
    open_on_click: {
        type: Boolean,
        default: false,
    },
    transition: {
        type: Boolean,
        default: false,
    },
    offset: {
        type: [String, Number],
        default: 5,
    },
    min_width: {
        type: [String, Number],
        default: 40,
    },
    max_width: {
        type: [String, Number],
    },
    min_height: {
        type: [String, Number],
    },
    delay_miliseconds: {
        type: Number,
        default: 200,
    },
    use_activator_width: {
        type: Boolean,
        default: false,
    },
    content_class: {
        type: [String, Object, Array],
    },
    activator_id: {
        type: String as PropType<string | null>,
    },
    modal: {
        type: Boolean,
        default: false,
    },
    bounding_el: {
        type: Object as PropType<HTMLElement>,
    },
    arrow: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits<{
    (e: 'update:activator_id', n: string | null, o?: string | null): void,
    (e: 'ik-open'): void,
    (e: 'ik-close'): void,
}>();
const slots = useSlots();
const { getInstance, onCreate, onDestroy } = useInstance<IkPopover>();
const manager = usePopover();
const device = useDevice();
const root_el = ref<HTMLElement | null>(null);
const content_el = ref<HTMLVPopoverElement | null>(null);
const activator_slot_el = ref<HTMLElement | null>(null);
const last_dynamic_activator_el = computed(() => {
    if (props.id && props.activator_id) {
        return manager.getLastActivator(props.id, props.activator_id);
    } else {
        return null;
    }
});
const dynamic_activator_els = computed(() => {
    if (props.id && props.activator_id) {
        return manager.getActivators(props.id, props.activator_id);
    } else {
        return null;
    }
});
const activator_slot_vnode = ref<VNode | null>(null);
const state = ref({
    pulse: false,
    will_open: false,
    visible: false,

    dimensions: {
        x: 0,
        y: 0,
        width: null as number | null,
    },
    arrow_style: {},

    z_index: 800,
});

function _renderContent() {
    let listeners: object = {
        onMouseenter: _onContentMouseEnter,
        onMouseleave: _onContentMouseLeave,
    };

    const activator_el = last_dynamic_activator_el.value;

    if (activator_el && activator_el[DATA_KEY]) {
        if (activator_el[DATA_KEY].event !== 'hover') {
            listeners = {};
        }
    }
    if (props.open_on_click) {
        listeners = {};
    }

    return h('div', {
        ref: content_el,
        class: [
            {
                'ik-popover': true,
                'ik-popover--pulse': state.value.pulse,
                'ik-popover--transition': props.transition,
                'ik-popover--mobile': device.mobile.value,
                'ik-popover--arrow': props.arrow,
            },
            props.content_class,
        ],
        ...listeners,
        style: {
            zIndex: state.value.z_index,
            width: props.use_activator_width
                ? toCssUnits(state.value.dimensions.width || 0)
                : null,
            minWidth: toCssUnits(props.min_width),
            maxHeight: 'calc(100% - 60px)',
            minHeight: props.min_height ? toCssUnits(props.min_height) : null,
            maxWidth: props.max_width ? toCssUnits(props.max_width) : null,
            display: state.value.visible ? null : 'none',
            transform: [
                'translate(' + state.value.dimensions.x + 'px, ' + state.value.dimensions.y + 'px)',
                state.value.pulse ? 'scale(1.03)' : '',
            ].join(' '),
        },
    }, [
        slots.default?.(),
        props.arrow ? _renderArrow() : undefined,
    ]);
}

function _renderActivator() {
    let a_vnode;

    if (slots.activator) {
        let a_on = {};

        if (props.open_on_click) {
            a_on = {
                click: _onActivatorClick,
            };
        } else {
            a_on = {
                mouseenter: _onActivatorMouseEnter,
                mouseleave: _onActivatorMouseLeave,
            };
        }
        const slot = slots.activator({ on: a_on, close, open });
        const vnodes = extractElementVNodes(slot);

        if (vnodes.length > 0) {
            a_vnode = vnodes[0];
        } else {
            a_vnode = null;
        }
    } else {
        a_vnode = null;
    }

    // cache activator virtual node
    activator_slot_vnode.value = a_vnode;

    return a_vnode;
}

function _renderArrow() {
    return h('div', {
        class: 'ik-popover__arrow',
        style: state.value.arrow_style,
    });
}

function getActivatorEl() {
    if (activator_slot_vnode.value) {
        return activator_slot_el.value;
    } else {
        return last_dynamic_activator_el.value;
    }
}

function open() {
    state.value.will_open = true;
    _updateDimensions(getActivatorEl(), null, () => {
        if (state.value.will_open) {
            state.value.visible = true;
        }
    });
    _attachContent();
}
function close() {
    if (state.value.visible) {
        if (!props.modal && _canClose()) {
            state.value.will_open = false;
            state.value.visible = false;
        } else {
            _pulse();
        }
    }
}
function toggle() {
    if (state.value.visible) {
        close();
    } else {
        open();
    }
}
function activate(activator_id: string) {
    emit('update:activator_id', activator_id);
    nextTick(open);
}
function bind(el: HTMLElement, event: string) {
    if (el) {
        if (event === 'hover') {
            el.addEventListener('mouseenter', _onActivatorMouseEnter);
            el.addEventListener('mouseleave', _onActivatorMouseLeave);
        } else {
            el.addEventListener('click', _onActivatorClick);
        }
    }
}
function unbind(el: HTMLElement) {
    if (el) {
        el.removeEventListener('click', _onActivatorClick);
        el.removeEventListener('mouseenter', _onActivatorMouseEnter);
        el.removeEventListener('mouseleave', _onActivatorMouseLeave);
    }
}
function recalculate() {
    _updateDimensions(getActivatorEl());
}
function scrollActivatorIntoView() {
    const el = getActivatorEl();

    if (el) {
        // @todo
    }
}

function _getZIndex() {
    return Math.max(800, (root_el.value ? getZIndex(root_el.value) : 0) || 0);
}

function _pulse() {
    state.value.pulse = true;
    setTimeout(() => {
        state.value.pulse = false;
    }, 80);
}

let _open_timeout: ReturnType<typeof setTimeout> | undefined;
let _close_timeout: ReturnType<typeof setTimeout> | undefined;
function _scheduleOpen() {
    _unscheduleOpen();
    _open_timeout = setTimeout(() => {
        open();
        _unscheduleOpen();
    }, props.delay_miliseconds);
}
function _unscheduleOpen() {
    clearTimeout(_open_timeout);
    _open_timeout = undefined;
}
function _scheduleClose() {
    _unscheduleClose();
    _close_timeout = setTimeout(() => {
        close();
        _unscheduleClose();
    }, props.delay_miliseconds);
}
function _unscheduleClose() {
    clearTimeout(_close_timeout);
    _close_timeout = undefined;
}

function _canClose() {
    if (typeof props.can_close === 'function') {
        return props.can_close();
    } else {
        return props.can_close;
    }
}
function _bindWindowListeners() {
    window.addEventListener('mousedown', _onWindowMouseDown, true);
    window.addEventListener('resize', _onWindowResize, true);
    window.addEventListener('scroll', _onWindowScroll, true);
}

function _unbindWindowListeners() {
    window.removeEventListener('mousedown', _onWindowMouseDown, true);
    window.removeEventListener('resize', _onWindowResize, true);
    window.removeEventListener('scroll', _onWindowScroll, true);
}

function _cleanupElements() {
    activator_slot_el.value?.remove();

    if (content_el.value && content_el.value.parentNode) {
        content_el.value.parentNode.removeChild(content_el.value);
    }
}
function _getWindowSizes() {
    return document.documentElement.getBoundingClientRect();
}

function _contains(container?: HTMLElement | null, el?: HTMLElement | null) {
    return container && el ? container.contains(el) : false;
}

function _preview(callback: Function) {
    const el = content_el.value;
    requestAnimationFrame(() => {
        const original = el?.style.display;
        el && (el.style.display = '');
        callback();
        original && el && (el.style.display = original);
    });
}

function _updateDimensions(el?: HTMLElement | null, container_el?: HTMLElement | null, callback?: Function) {
    if (el) {
        _preview(() => {
            if (content_el.value) {
                const mr = 10;
                const offset = Number(props.offset);
                const b_rect = props.bounding_el?.getBoundingClientRect() ?? _getWindowSizes();
                const a_rect = el.getBoundingClientRect();
                const c_rect = content_el.value.getBoundingClientRect();
                const scroll_y = window.scrollY;
                const scroll_x = window.scrollX;

                const t_space = a_rect.top - b_rect.top;
                const b_space = b_rect.bottom - a_rect.bottom;
                const l_space = a_rect.left - b_rect.left;
                const r_space = b_rect.right - a_rect.right;

                const min_x = b_rect.left;
                let min_y = b_rect.top;
                const max_x = b_rect.right - c_rect.width;
                let max_y = b_rect.bottom - c_rect.height;

                let v_pos = true;
                let x: number, y: number;

                let [inner_position, inner_align] = [props.position, props.align];
                if (props.dynamic_positioning) {
                    if (a_rect.top - offset - c_rect.height - mr <= b_rect.top) (inner_position = 'bottom');
                    if (a_rect.bottom + offset + c_rect.height + mr >= b_rect.bottom) (inner_position = 'top');
                    if (a_rect.left - offset - (c_rect.width / 2) - mr <= b_rect.left) (inner_align = 'start');
                    if (a_rect.right + offset + (c_rect.width / 2) + mr >= b_rect.right) (inner_align = 'end');
                }

                if (inner_position == 'horizontal') {
                    inner_position = t_space > b_space ? 'top' : 'bottom';
                } else if (inner_position == 'vertical') {
                    inner_position = l_space > r_space ? 'left' : 'right';
                }

                switch (inner_position) {
                    case 'top':
                        x = (a_rect.left);
                        y = (a_rect.top - c_rect.height - offset);
                        v_pos = false;
                        break;
                    case 'bottom':
                        x = (a_rect.left);
                        y = (a_rect.bottom + offset);
                        v_pos = false;
                        break;
                    case 'left':
                        x = (a_rect.left - c_rect.width - offset);
                        y = (a_rect.top);
                        break;
                    case 'right':
                        x = (a_rect.right + offset);
                        y = (a_rect.top);
                        break;
                }

                switch (inner_align) {
                    case 'start':
                        v_pos && (y = a_rect.top);
                        !v_pos && (x = a_rect.left);
                        break;
                    case 'end':
                        v_pos && (y = a_rect.bottom - c_rect.height);
                        !v_pos && (x = a_rect.right - c_rect.width);
                        break;
                    case 'center':
                        v_pos && (y = a_rect.top + a_rect.height / 2 - c_rect.height / 2);
                        !v_pos && (x = a_rect.left + a_rect.width / 2 - c_rect.width / 2);
                        break;
                }

                if (container_el && _contains(container_el, el)) {
                    const ct_rect = container_el.getBoundingClientRect();
                    min_y = Math.max(ct_rect.top - c_rect.height, min_y);
                    max_y = Math.min(ct_rect.bottom, max_y);
                    const out_container = (a_rect.top > ct_rect.bottom || a_rect.bottom < ct_rect.top);
                    const out_viewport = (
                        a_rect.bottom < b_rect.bottom || a_rect.top > b_rect.top ||
                        a_rect.right < b_rect.left || a_rect.left > b_rect.right
                    );
                    if (out_container || out_viewport) {
                        state.value.visible && close();
                    }
                }

                x = clamp(Math.round(x), min_x + mr, max_x - mr) + scroll_x;
                y = (props.allow_viewport_overflow ? Math.round(y) : clamp(Math.round(y), min_y + mr, max_y - mr)) + scroll_y;

                if (callback) {
                    requestAnimationFrame(() => {
                        state.value.dimensions.x = x;
                        state.value.dimensions.y = y;
                        state.value.dimensions.width = Math.round(a_rect.width);
                        callback();
                    });
                } else {
                    state.value.dimensions.x = x;
                    state.value.dimensions.y = y;
                    state.value.dimensions.width = Math.round(a_rect.width);
                }

                if (props.arrow) {
                    state.value.arrow_style = _getArrowStyle(inner_position, inner_align, v_pos, a_rect, { ...c_rect, x, y, width: c_rect.width, height: c_rect.height });
                }
            }
        });
    }
}

function _getArrowStyle(position: 'top' | 'left' | 'right' | 'bottom', align: `${IkAlignment}`, v_pos: boolean, a_rect: DOMRect, c_rect: DOMRect): CSSProperties {
    const align_styles = {};
    switch (align) {
        case 'start': {
            const offset = c_rect.x - a_rect.x;
            v_pos && Object.assign(align_styles, { top: `${a_rect.height / 2 - 4 - offset}px` });
            !v_pos && Object.assign(align_styles, { left: `${a_rect.width / 2 - 4 - offset}px` });
            break;
        }
        case 'end': {
            const offset = a_rect.x + a_rect.width - c_rect.x - c_rect.width;
            v_pos && Object.assign(align_styles, { top: `calc(100% - 4px - ${a_rect.height / 2 - offset}px)` });
            !v_pos && Object.assign(align_styles, { left: `calc(100% - 4px - ${a_rect.width / 2 - offset}px)` });
            break;
        }
    }

    return {
        ...ARROW_BASE_STYLES[position],
        ...align_styles,
    };
}
function _isInsideActivator(el: HTMLVPopoverElement) {
    let node = el;
    while (node.parentNode) {
        if (node[DATA_KEY]) {
            if (node[DATA_KEY].popover === getInstance()) {
                return true;
            }
        }
        node = node.parentNode as HTMLVPopoverElement;
    }
    return false;
}
function _isInsideNestedPopover(el: HTMLVPopoverElement) {
    let node = el;

    while (node.parentNode) {
        if (node[CONTENT_DATA_KEY] && node[CONTENT_DATA_KEY] !== getInstance()) {
            if (node[CONTENT_DATA_KEY].getActivatorEl()) {
                return _contains(content_el.value, node[CONTENT_DATA_KEY].getActivatorEl());
            } else {
                return false;
            }
        }
        node = node.parentNode as HTMLVPopoverElement;
    }
    return false;
}

/* handlers */
function _onWindowMouseDown(event: MouseEvent) {
    const target = event.composedPath()[0];

    if (content_el.value && props.close_on_abroad_click) {
        if (!(target === getActivatorEl() ||
            content_el.value === target ||
            _contains(content_el.value, target as HTMLElement) ||
            _contains(getActivatorEl(), target as HTMLElement) ||
            _isInsideActivator(target as HTMLElement) ||
            // @todo isUnderModal(event.target as HTMLElement) ||
            _isInsideNestedPopover(target as HTMLElement))) {
            close();
        }
    }
}
function _onWindowResize() {
    _updateDimensions(getActivatorEl());
}
function _onWindowScroll(event: Event) {
    const target = event.composedPath()[0];
    const el = target === document ? document.documentElement : target as HTMLElement;
    _updateDimensions(getActivatorEl(), el);
}
function _onContentMouseEnter() {
    _unscheduleClose();
}
function _onContentMouseLeave() {
    _scheduleClose();
}
function _onActivatorClick(event: MouseEvent) {
    const el = event.currentTarget as HTMLVPopoverElement;
    if (el) {
        const d_state = el[DATA_KEY];
        if (d_state && (!state.value.visible || (state.value.visible && _canClose()))) {
            if (d_state.activator_id !== props.activator_id) {
                emit('update:activator_id', d_state.activator_id, props.activator_id);
            }
            nextTick(open);
        } else {
            open();
        }
    }
}
function _onActivatorMouseEnter(event: MouseEvent) {
    _unscheduleClose();
    const el = event.currentTarget as HTMLVPopoverElement;
    if (el) {
        const d_state = el[DATA_KEY];
        if (d_state && (!state.value.visible || (state.value.visible && _canClose()))) {
            if (d_state.activator_id !== props.activator_id) {
                emit('update:activator_id', d_state.activator_id, props.activator_id);
            }
            nextTick(_scheduleOpen);
        } else {
            _scheduleOpen();
        }
    }
}
function _onActivatorMouseLeave() {
    _unscheduleOpen();
    _scheduleClose();
}

function _detachSlotActivator() {
    const el = root_el.value;
    if (activator_slot_vnode.value &&
        activator_slot_el.value &&
        el?.parentNode) {
        const target = el === el.parentNode.firstChild
            ? el
            : el.nextSibling;

        el.parentNode.insertBefore(activator_slot_el.value, target);
    }
}

function _detachContent() {
    const el = content_el.value;
    el && el.parentNode?.removeChild(el);
}

function _inShadowDom() {
    return root_el.value?.getRootNode() instanceof ShadowRoot;
}

function _getContentTargetParent() {
    if (_inShadowDom()) {
        return document.getElementsByTagName('vue3-body')[0].shadowRoot as unknown as HTMLElement;
    } else {
        return document.body;
    }
}

function _attachContent() {
    const el = content_el.value;
    const parent = _getContentTargetParent();

    if (el && !_contains(parent, el)) {
        el.childNodes.length > 0 && parent.appendChild(el);
    }
}

function _updateActivatorClass(el: HTMLVPopoverElement) {
    if (el) {
        const data = el[DATA_KEY];
        if (data && state.value.visible && data.activator_id === props.activator_id) {
            el.classList.add('ik-popover-activator--active');
        } else {
            el.classList.remove('ik-popover-activator--active');
        }
    }
}

watch(() => state.value.visible, (visible, old) => {
    if (visible !== old) {
        if (visible) {
            _bindWindowListeners();
            emit('ik-open');
        } else {
            _unbindWindowListeners();
            emit('ik-close');
        }
        if (last_dynamic_activator_el.value) {
            _updateActivatorClass(last_dynamic_activator_el.value);
        }

        if (dynamic_activator_els.value) {
            for (let i = 0; i < dynamic_activator_els.value.length; i++) {
                _updateActivatorClass(dynamic_activator_els.value[i]);
            }
        }
    }
}, { deep: true });

watch(last_dynamic_activator_el, (new_el, old_el) => {
    if (new_el !== old_el) {
        _updateDimensions(new_el);
        state.value.z_index = _getZIndex();
    }
    new_el && _updateActivatorClass(new_el);
    old_el && _updateActivatorClass(old_el);
});

watch(dynamic_activator_els, (new_els, old_els) => {
    new_els = new_els || [];
    old_els = old_els || [];

    for (let i = 0; i < new_els.length; i++) {
        _updateActivatorClass(new_els[i]);
    }
    for (let i = 0; i < old_els.length; i++) {
        _updateActivatorClass(old_els[i]);
    }
});

watch(activator_slot_el, (new_el, old_el) => {
    if (new_el !== old_el) {
        _detachSlotActivator();
    }
});

watch(activator_slot_vnode, (new_vnode, old_vnode) => {
    nextTick(() => {
        if (new_vnode?.el !== old_vnode?.el) {
            activator_slot_el.value = (new_vnode?.el || null) as HTMLElement | null;
            state.value.z_index = _getZIndex();
        }
    });
});

onMounted(() => {
    _detachSlotActivator();
    _detachContent();
    if (content_el.value) {
        content_el.value[CONTENT_DATA_KEY] = getInstance();
    }
});

onBeforeUnmount(() => {
    _unbindWindowListeners();
    _cleanupElements();
});

onCreate((instance) => {
    manager.registerInstance(instance);
});

onDestroy((instance) => {
    manager.unregisterInstance(instance);
});

defineExpose({
    open,
    close,
    toggle,
    activate,
    bind,
    unbind,
    recalculate,
    getActivatorEl,
    scrollActivatorIntoView,
});

useRender(() => {
    return h('div', {
        ref: root_el,
        class: 'ik-popover__root',
        style: { display: props.modal ? 'block' : null },
    }, {
        default: () => {
            const children = [
                _renderActivator(),
                _renderContent(),
            ];
            if (props.modal) {
                const backdrop = h('div', {
                    class: 'ik-popover__backdrop',
                    style: { zIndex: state.value.z_index - 10 },
                    onMousedown: _pulse,
                });
                children.push(backdrop);
            }
            return children;
        },
    });
});
</script>
