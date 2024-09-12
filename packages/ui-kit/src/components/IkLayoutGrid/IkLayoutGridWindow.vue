<script lang="ts">
import '@ui/styles';
import './IkLayoutGrid.css';
import { defineComponent, h } from 'vue';
import { getRandomString } from '@ui/utils/helpers';
import { IkButton } from '@ui/components/IkButton';
import { useDevice } from '@ui/composables/device';
import { extractElementVNodes } from '@ui/utils/core';

export default defineComponent({
    render() {
        return h('div', { class: this.root_class }, {
            default: () => {
                const children = [];

                if (this._getHeader() || this._getActions().length > 0) {
                    const actions = h('div', { class: 'ik-layout-grid-window__actions' }, this._getActions());
                    const title = h('div', { class: 'ik-layout-grid-window__title' }, this._getHeader());

                    const header = h('div', { class: 'ik-layout-grid-window__header' }, [
                        title,
                        actions,
                    ]);
                    children.push(header);
                }

                if (this.$slots.top?.()) {
                    children.push(h('div', { class: 'ik-layout-grid-window__top' }, this.$slots.top?.()));
                }

                children.push(h('div', { class: 'ik-layout-grid-window__content' }, this.$slots.default?.()));

                if (this.$slots.bottom?.()) {
                    children.push(h('div', { class: 'ik-layout-grid-window__bottom' }, this.$slots.bottom?.()));
                }

                return children;
            },
        });
    },
    props: {
        header: {
            type: String,
        },
        static: {
            type: Boolean,
            default: false,
        },
        border_right: {
            type: Boolean,
            default: false,
        },
        hide_edit: {
            type: Boolean,
            default: false,
        },
        hide_new: {
            type: Boolean,
            default: false,
        },
        hide_remove: {
            type: Boolean,
            default: false,
        },
        hide_clone: {
            type: Boolean,
            default: false,
        },
        no_header_padding: {
            type: Boolean,
            default: false,
        },
        dense: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        root_class() {
            return {
                'ik-layout-grid-window': true,
                'ik-layout-grid-window--dense': this.dense,
                'ik-layout-grid-window--static': this.static,
                'ik-layout-grid-window--border': this.border_right && !this.device.mobile.value,
                'ik-layout-grid-window--no-header-pad': this.no_header_padding,
            };
        },
    },
    methods: {
        _getHeader() {
            return this.$slots.header?.() || this.header;
        },
        _getActions() {
            const actions = [];

            if (this.$slots.actions?.()) {
                extractElementVNodes(this.$slots.actions?.())
                    .forEach(vnode => {
                        actions.push(h('div', {
                            class: 'ik-layout-grid-window__action',
                            key: vnode.key || getRandomString(10),
                        }, [vnode]));
                    });
            }

            if (this.$attrs.onIkClone && !this.hide_clone) {
                actions.push(h('div', {
                    class: 'ik-layout-grid-window__action',
                    onClick: this.$attrs.onIkClone,
                    key: 'clone',
                }, [
                    h(IkButton, {
                        icon: 'clone:light',
                        flat: true,
                    }, { default: () => '{{_*en*Clone_}}' }),
                ]));
            }

            /**
             * Event does not contain value, it is fired when user click edit button.
             * @event IkLayoutGridWindow#ik-edit
             * @type MouseEvent
             */
            if (this.$attrs.onIkEdit && !this.hide_edit) {
                actions.push(h('div', {
                    class: 'ik-layout-grid-window__action',
                    onClick: this.$attrs.onIkEdit,
                    key: 'edit',
                }, [
                    h(IkButton, {
                        icon: 'pen:light',
                        flat: true,
                    }, { default: () => '{{_*en*Edit_}}' }),
                ]));
            }

            if (this.$attrs.onIkRemove && !this.hide_remove) {
                actions.push(h('div', {
                    class: 'ik-layout-grid-window__action',
                    onClick: this.$attrs.onIkRemove,
                    key: 'remove',
                }, [
                    h(IkButton, {
                        icon: 'trash-alt:light',
                        flat: true,
                    }, { default: () => '{{_*en*Delete_}}' }),
                ]));
            }

            if (this.$attrs.onIkNew && !this.hide_new) {
                actions.push(h('div', {
                    class: 'ik-layout-grid-window__action',
                    onClick: this.$attrs.onIkNew,
                    key: 'new',
                }, [
                    h(IkButton, {
                        icon: 'plus',
                        design: 'accent',
                        filled: true,
                        class: 'ik-mr-2',
                    }, { default: () => '{{_*en*Add_}}' }),
                ]));
            }

            return actions;
        },
    },
    setup() { return { device: useDevice() }; },
});
</script>
