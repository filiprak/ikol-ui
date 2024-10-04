<script lang="ts">
import '@ui/styles';
import './IkApp.css';
import { defineComponent, h, unref, inject } from 'vue';

import type { IkApp, IkAppBar } from '@ui/components/IkApp';
import { IkIcon } from '@ui/components/IkIcon';
import { toCssUnits } from '@ui/utils/helpers';
import { useRouter } from '@ui/composables/router';
import { useDevice } from '@ui/composables/device';

export default defineComponent({
    props: {
        tag: {
            type: String,
            default: 'header',
        },
        height: {
            type: Number,
            default: 56,
        },
        title_size: {
            type: Number,
        },
        back: {
            type: Boolean,
            default: false,
        },
    },
    setup() {
        return {
            app: inject<IkApp>('app'),
            device: useDevice(),
            router: useRouter(),
        };
    },
    computed: {
        offset_left() {
            if (!unref(this.device.mobile)) {
                return this.app?.nav_width || 0;
            } else {
                return 0;
            }
        },
    },
    watch: {
        back: {
            immediate: true,
            handler(back) {
                if (back) {
                    document.addEventListener('keydown', this._onDocumentKeyDown, true);
                } else {
                    document.removeEventListener('keydown', this._onDocumentKeyDown, true);
                }
            },
        },
    },
    created() {
        this.app && this.app.registerBar(this as IkAppBar);
    },
    beforeUnmount() {
        this.app && this.app.unregisterBar();
        document.removeEventListener('keydown', this._onDocumentKeyDown, true);
    },
    methods: {
        _onBurgerClick() {
            if (this.app && this.app.nav) {
                this.app.nav.toggle();
            }
        },
        _onBackClick() {
            if (this.router) {
                this.router.backWithFallback();
            }
        },
        _onDocumentKeyDown(event: KeyboardEvent) {
            const el = event.target;

            if (event.keyCode === 27) {
                if (el === document.body ||
                    el === document ||
                    ['BUTTON', 'A'].indexOf((el as HTMLElement).tagName) >= 0
                ) {
                    this.router.backWithFallback();
                }
            }
        },
    },
    render() {
        const children = [];

        const burger = h('div', {
            class: 'ik-app-bar__burger',
            style: unref(this.device.mobile) ? {} : { display: 'none' },
        }, [h(IkIcon, {
            icon: 'bars:light',
            onClick: this._onBurgerClick,
        })]);
        children.push(burger);

        const back = h('div', {
            class: 'ik-app-bar__back',
            style: this.back ? {} : { display: 'none' },
        }, [h(IkIcon, {
            icon: 'long-arrow-left:regular',
            onClick: this._onBackClick,
        })]);
        children.push(back);

        const title = h('div', {
            class: 'ik-app-bar__title',
            style: {
                width: !unref(this.device.mobile) && this.title_size
                    ? [this.title_size, '%'].join('')
                    : null,
                display: this.$slots.title?.() ? null : 'none',
            },
        }, [this.$slots.title?.()]);
        children.push(title);

        const content = h('div', {
            class: 'ik-app-bar__content',
        }, [this.$slots.default?.()]);
        children.push(content);

        return h(this.tag, {
            class: 'ik-app-bar',
            style: {
                left: toCssUnits(this.offset_left),
                height: toCssUnits(this.height),
                width: this.offset_left > 0
                    ? 'calc(100% - ' + toCssUnits(this.offset_left) + ')'
                    : null,
            },
        }, children);
    },
});
</script>
