<script lang="ts">
import '@/styles';
import './IkPopover.css';
import type { VNode } from 'vue';
import {
    defineComponent,
    h,
    onMounted,
    onBeforeUnmount,
    ref,
    nextTick,
    watch,
} from 'vue';
import { DATA_KEY, usePopover } from '@/composables/popover';
import { clamp, formatCssValue, getZIndex } from '@/utils/helpers';
import { useInstance } from '@/composables/instance';
import { useRender } from '@/composables/render';
import type { IkPopoverT } from '.';

const CONTENT_DATA_KEY = 'ik-popover-content';

interface HTMLPopoverElement extends HTMLElement {
    [CONTENT_DATA_KEY]: any;
    [DATA_KEY]: any;
}

export default defineComponent({
    name: 'IkPopover',
    inheritAttrs: false,
    model: {
        prop: 'activator_id',
        event: 'ik-change-activator',
    },
    props: {
        id: {
            type: String,
            default: null,
        },
        position: {
            type: String,
            default: 'auto',
        },
        align: {
            type: String,
            default: 'auto',
        },
        can_close: {
            type: [Function, Boolean],
            default: true,
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
            default: null,
        },
        min_height: {
            type: [String, Number],
            default: null,
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
            default: null,
        },
        activator_id: {
            type: String,
            default: null,
        },
        modal: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['ik-change-activator', 'ik-open', 'ik-close'],
    setup(props, { slots, emit }) {
        const self = useInstance<IkPopoverT>();
        const manager = usePopover();
        const root_el = ref<HTMLElement | null>(null);
        const content_el = ref<HTMLElement | null>(null);
        const activator_slot_el = ref<HTMLElement | null>(null);
        const last_dynamic_activator_el = ref<HTMLElement | null>(null);
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

            z_index: 800,
        });

        function _renderContent() {
            let listeners: object = {
                onMouseenter: _onContentMouseEnter,
                onMouseleave: _onContentMouseLeave,
            };

            // const activator_el = this.last_dynamic_activator_el;

            // if (activator_el && activator_el[DATA_KEY]) {
            //     if (activator_el[DATA_KEY].event !== 'hover') {
            //         listeners = {};
            //     }
            // }
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
                        // 'ik-popover--mobile': this.$ikol.mobile,
                    },
                    props.content_class,
                ],
                ...listeners,
                style: {
                    zIndex: state.value.z_index,
                    width: props.use_activator_width && state.value.dimensions.width
                        ? formatCssValue(state.value.dimensions.width)
                        : null,
                    minWidth: formatCssValue(props.min_width),
                    maxHeight: 'calc(100% - 60px)',
                    minHeight: props.min_height ? formatCssValue(props.min_height) : null,
                    maxWidth: props.max_width ? formatCssValue(props.max_width) : null,
                    display: state.value.visible ? null : 'none',
                    transform: [
                        'translate(' + state.value.dimensions.x + 'px, ' + state.value.dimensions.y + 'px)',
                        state.value.pulse ? 'scale(1.03)' : '',
                    ].join(' '),
                },
            }, slots.default?.());
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
                let slot = slots.activator({ on: a_on });

                slot = Array.isArray(slot) ? slot : [slot];

                if (slot && slot.length > 0) {
                    const vnode = slot.filter(function (node) {
                        return !!node.type;
                    });
                    a_vnode = vnode.length > 0 ? vnode[0] : null;
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
        function _getActivatorEl() {
            if (activator_slot_vnode.value) {
                return activator_slot_el.value;
            } else {
                return last_dynamic_activator_el.value;
            }
        }

        function open() {
            state.value.will_open = true;
            _updateDimensions(_getActivatorEl(), undefined, () => {
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
            emit('ik-change-activator', activator_id);
            nextTick(open);
        }
        function bind(el: HTMLElement, event?: 'hover' | 'click') {
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
            _updateDimensions(_getActivatorEl());
        }
        function scrollActivatorIntoView() {
            const el = _getActivatorEl();

            if (el) {
                // @todo
            }
        }

        function _pulse() {
            state.value.pulse = true;
            setTimeout(() => {
                state.value.pulse = false;
            }, 80);
        }

        let _open_timeout: any;
        let _close_timeout: any;
        function _scheduleOpen() {
            _unscheduleOpen();
            _open_timeout = setTimeout(() => {
                open();
                _unscheduleOpen();
            }, props.delay_miliseconds);
        }
        function _unscheduleOpen() {
            clearTimeout(_open_timeout);
            _open_timeout = null;
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
            _close_timeout = null;
        }

        function _getContentZIndex(el: HTMLElement | null) {
            const z_index = (el ? getZIndex(el) : 0) || 0;
            return Math.max(800, z_index);
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
            return {
                width: window.innerWidth || document.documentElement.clientWidth,
                height: window.innerHeight || document.documentElement.clientHeight,
            };
        }

        function _contains(container?: HTMLElement | null, el?: HTMLElement | null) {
            return container && el ? container.contains(el) : false;
        }

        function _preview(callback: Function) {
            const el = content_el.value;
            requestAnimationFrame(function () {
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
                        const viewport = _getWindowSizes();
                        const a_rect = el.getBoundingClientRect();
                        const c_rect = content_el.value.getBoundingClientRect();
                        const t_space = a_rect.top;
                        const b_space = viewport.height - a_rect.bottom;
                        const l_space = a_rect.left;
                        const r_space = viewport.width - a_rect.right;
                        const min_x = 0;
                        let min_y = 0;
                        const max_x = viewport.width - c_rect.width;
                        let max_y = viewport.height - c_rect.height;
                        let v_pos = true;
                        let x: number, y: number;

                        switch (props.position) {
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
                            case 'horizontal':
                                if (t_space > b_space) {
                                    x = (a_rect.left);
                                    y = (a_rect.top - c_rect.height - offset);
                                } else {
                                    x = (a_rect.left);
                                    y = (a_rect.bottom + offset);
                                }
                                v_pos = false;
                                break;
                            case 'vertical':
                            default:
                                if (l_space >= r_space) {
                                    x = (a_rect.left - c_rect.width - offset);
                                    y = (a_rect.top);
                                } else {
                                    x = (a_rect.left + a_rect.width + offset);
                                    y = (a_rect.top);
                                }
                        }
                        switch (props.align) {
                            case 'start':
                                v_pos && (y = a_rect.top);
                                !v_pos && (x = a_rect.left);
                                break;
                            case 'end':
                                v_pos && (y = a_rect.bottom - c_rect.height);
                                !v_pos && (x = a_rect.right - c_rect.width);
                                break;
                            default:
                                v_pos && (y = a_rect.top + a_rect.height / 2 - c_rect.height / 2);
                                !v_pos && (x = a_rect.left + a_rect.width / 2 - c_rect.width / 2);
                        }
                        if (container_el && _contains(container_el, el)) {
                            const ct_rect = container_el.getBoundingClientRect();
                            min_y = Math.max(ct_rect.top - c_rect.height, min_y);
                            max_y = Math.min(ct_rect.bottom, max_y);
                            const out_container = (a_rect.top > ct_rect.bottom || a_rect.bottom < ct_rect.top);
                            const out_viewport = (
                                a_rect.bottom < 0 || a_rect.top > viewport.height ||
                                a_rect.right < 0 || a_rect.left > viewport.width
                            );
                            if (out_container || out_viewport) {
                                state.value.visible && close();
                            }
                        }

                        x = clamp(Math.round(x), min_x + mr, max_x - mr);
                        y = clamp(Math.round(y), min_y + mr, max_y - mr);

                        if (callback) {
                            requestAnimationFrame(function () {
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
                    }
                });
            }
        }

        function _isInsideActivator(el: HTMLElement) {
            let node = el as HTMLPopoverElement;
            while (node.parentNode) {
                if (node[DATA_KEY]) {
                    if (node[DATA_KEY].popover === self) {
                        return true;
                    }
                }
                node = node.parentNode as HTMLPopoverElement;
            }
            return false;
        }
        function _isInsideNestedPopover(el: HTMLElement) {
            let node = el as HTMLPopoverElement;

            while (node.parentNode) {
                if (node[CONTENT_DATA_KEY] && node[CONTENT_DATA_KEY] !== self) {
                    if (node[CONTENT_DATA_KEY]._getActivatorEl()) {
                        return _contains(content_el.value, node[CONTENT_DATA_KEY]._getActivatorEl());
                    } else {
                        return false;
                    }
                }
                node = node.parentNode as HTMLPopoverElement;
            }
            return false;
        }

        /* handlers */
        function _onWindowMouseDown(event: MouseEvent) {
            if (content_el.value) {
                if (!(event.target === _getActivatorEl() ||
                    content_el.value === event.target ||
                    _contains(content_el.value, event.target as HTMLElement) ||
                    _contains(_getActivatorEl(), event.target as HTMLElement) ||
                    _isInsideActivator(event.target as HTMLElement) ||
                    // isUnderModal(event.target as HTMLElement) ||
                    _isInsideNestedPopover(event.target as HTMLElement))) {
                    close();
                }
            }
        }
        function _onWindowResize() {
            _updateDimensions(_getActivatorEl());
        }
        function _onWindowScroll(event: Event) {
            const el = event.target === document ? document.documentElement : event.target as HTMLElement;
            _updateDimensions(_getActivatorEl(), el);
        }
        function _onContentMouseEnter() {
            _unscheduleClose();
        }
        function _onContentMouseLeave() {
            _scheduleClose();
        }
        function _onActivatorClick(event: MouseEvent) {
            const el = event.currentTarget as HTMLPopoverElement;
            if (el) {
                const d_state = el[DATA_KEY];
                if (d_state && (!state.value.visible || (state.value.visible && _canClose()))) {
                    if (d_state.activator_id !== props.activator_id) {
                        emit('ik-change-activator', d_state.activator_id, props.activator_id);
                    }
                    nextTick(open);
                } else {
                    open();
                }
            }
        }
        function _onActivatorMouseEnter(event: MouseEvent) {
            _unscheduleClose();
            const el = event.currentTarget as HTMLPopoverElement;
            if (el) {
                const d_state = el[DATA_KEY];
                if (d_state && (!state.value.visible || (state.value.visible && _canClose()))) {
                    if (d_state.activator_id !== props.activator_id) {
                        emit('ik-change-activator', d_state.activator_id, props.activator_id);
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

        function _attachContent() {
            const el = content_el.value;
            if (el && !_contains(document.body, el)) {
                el.childNodes.length > 0 && document.body.appendChild(el);
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

                // updateActivatorClass(this.last_dynamic_activator_el);

                // for (let i = 0; i < this.dynamic_activator_els.length; i++) {
                //     updateActivatorClass(this.dynamic_activator_els[i]);
                // }
            }
        }, { deep: true });

        watch(activator_slot_el, (new_el, old_el) => {
            if (new_el !== old_el) {
                _detachSlotActivator();
            }
        });

        watch(activator_slot_vnode, (new_vnode, old_vnode) => {
            nextTick(() => {
                if (new_vnode?.el !== old_vnode?.el) {
                    activator_slot_el.value = (new_vnode?.el || null) as HTMLElement | null;
                    state.value.z_index = _getContentZIndex(activator_slot_el.value);
                }
            });
        });

        onMounted(() => {
            _detachSlotActivator();
            _detachContent();
            (content_el.value as HTMLPopoverElement)[CONTENT_DATA_KEY] = self;
        });

        onBeforeUnmount(() => {
            manager.unregisterInstance(self);
            _unbindWindowListeners();
            _cleanupElements();
        });

        manager.registerInstance(self);

        useRender(() => h('div', { ref: root_el, class: 'ik-popover__root' }, [
            _renderActivator(),
            _renderContent(),
        ]));

        return {
            open,
            close,
            toggle,
            activate,
            bind,
            unbind,
            recalculate,
            scrollActivatorIntoView,
        };
    },
});
</script>
