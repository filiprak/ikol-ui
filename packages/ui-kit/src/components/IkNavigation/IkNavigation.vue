<script lang="ts">
import '@ui/styles';
import './IkNavigation.css';
import type { PropType } from 'vue';
import { defineComponent, h, unref, inject } from 'vue';

import type { IkApp } from '@ui/components/IkApp';
import { toCssUnits } from '@ui/utils/helpers';
import { IkScrollArea } from '@ui/components/IkScrollArea';
import { useDevice } from '@ui/composables/device';

export default defineComponent({
    provide() {
        return { navigation: this };
    },
    props: {
        open: {
            type: Boolean,
            default: false,
        },
        mini: {
            type: Boolean,
            default: false,
        },
        tag: {
            type: String,
            default: 'nav',
        },
        width: {
            type: Number,
            default: 256,
        },
        mini_width: {
            type: Number,
            default: 72,
        },
        exclude_close: {
            type: Array as PropType<HTMLElement[]>,
            default() {
                return [];
            },
        },
        secondary: {
            type: Boolean,
            default: false,
        },
    },
    setup() {
        return { app: inject<IkApp>('app'), device: useDevice() };
    },
    data() {
        return {
            backdrop_el: null as HTMLElement | null,
        };
    },
    computed: {
        root_class() {
            return {
                'ik-navigation': true,
                'ik-navigation--mini': this.mini,
                'ik-navigation--secondary': this.secondary,
                'ik-navigation--mobile': unref(this.device.mobile),
            };
        },
        styles() {
            if (!this.secondary) {
                return {
                    height: '100vh',
                    top: 0,
                    maxHeight: '100%',
                    transform: 'translateX(' + (this.open ? '0%' : '-100%') + ')',
                    width: toCssUnits(this.computed_width),
                };
            } else {
                return {
                    width: unref(this.device.mobile) ? '100%' : null,
                };
            }
        },
        computed_width() {
            if (this.mini) {
                return this.mini_width;
            } else {
                return this.width;
            }
        },
    },
    watch: {
        open: {
            immediate: true,
            handler(value) {
                if (unref(this.device.mobile) && !this.secondary) {
                    if (value) {
                        window.addEventListener('mousedown', this._onWindowMouseDown, true);
                    } else {
                        window.removeEventListener('mousedown', this._onWindowMouseDown, true);
                    }
                    this._toggleBackdrop(value);
                }
            },
        },
        mini: {
            immediate: true,
            handler(mini) {
                if (!unref(this.device.mobile) && !this.secondary) {
                    if (!mini) {
                        window.addEventListener('mousedown', this._onWindowMouseDown, true);
                    } else {
                        window.removeEventListener('mousedown', this._onWindowMouseDown, true);
                    }
                }
            },
        },
        'device.mobile.value'(mobile) {
            this.$emit('update:open', !mobile);
            this.$emit('update:mini', !mobile);

            if (!mobile) {
                this._toggleBackdrop(false);
            }
        },
    },
    created() {
        if (!this.secondary) {
            this.app && this.app.registerNav(this);
        }
    },
    mounted() {
        if (!this.secondary) {
            this._initBackdrop();
        }
    },
    beforeUnmount() {
        if (!this.secondary) {
            this.app && this.app.unregisterNav();
            window.removeEventListener('mousedown', this._onWindowMouseDown, true);
        }
        this._destroyBackdrop();
    },
    methods: {
        toggleMini(mini?: boolean) {
            this.$emit('update:mini', mini !== undefined ? !!mini : !this.mini);
        },
        toggle(value?: boolean) {
            if (!this.secondary) {
                if (unref(this.device.mobile)) {
                    this.$emit('update:open', value !== undefined ? !!value : !this.open);
                } else {
                    this.$emit('update:mini', value !== undefined ? !value : !this.mini);
                }
            }
        },
        _onWindowMouseDown(event: MouseEvent) {
            let should_close = this.$el !== event.target && !this.$el.contains(event.target as HTMLElement);

            // check if element not excluded
            if (should_close) {
                for (let i = 0; i < this.exclude_close.length; i++) {
                    if (this.exclude_close[i].contains(event.target as HTMLElement)) {
                        should_close = false;
                        break;
                    }
                }
            }

            if (should_close) {
                this.toggle(false);
                event.preventDefault();
                event.stopPropagation();
            }
        },
        _initBackdrop() {
            const backdrop_el = document.createElement('div');

            backdrop_el.classList.add('ik-navigation__backdrop');
            backdrop_el.style.display = 'none';

            this.backdrop_el = backdrop_el;

            document.body.appendChild(backdrop_el);
        },
        _toggleBackdrop(visible?: boolean) {
            if (this.backdrop_el) {
                this.backdrop_el.style.display = visible ? '' : 'none';
            }
        },
        _destroyBackdrop() {
            if (this.backdrop_el) {
                this.backdrop_el.remove();
                this.backdrop_el = null;
            }
        },
    },
    render() {
        return h(this.tag, {
            class: this.root_class,
            style: this.styles,
        }, {
            default: () => {
                const content = h('div', { class: 'ik-navigation__content' }, [
                    this.secondary && this.device.mobile.value ? this.$slots.default?.() : h(IkScrollArea, {}, { default: () => this.$slots.default?.() }),
                ]);

                const top = h('div', { class: 'ik-navigation__top' }, [
                    this.$slots.top?.(),
                ]);
                const bottom = h('div', { class: 'ik-navigation__bottom' }, [
                    this.$slots.bottom?.(),
                ]);

                return [top, content, bottom];
            },
        });
    },
});
</script>
