<script lang="ts">
import '@ui/styles';
import './IkApp.css';
import { defineComponent, h, unref } from 'vue';
import { toCssUnits } from '@ui/utils/helpers';

import type { IkAppBar } from '@ui/components/IkApp';
import type { IkNavigation } from '@ui/components/IkNavigation';
import { IkModalRenderer } from '@ui/components/IkModal';
import { useDevice } from '@ui/composables/device';

export default defineComponent({
    provide() {
        return {
            app: this,
        };
    },
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        fill: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            nav: null as IkNavigation | null,
            bar: null as IkAppBar | null,
        };
    },
    computed: {
        styles() {
            if (!unref(this.device.mobile)) {
                return {
                    paddingLeft: toCssUnits(this.nav_width),
                    paddingTop: toCssUnits(this.bar_height),
                };
            } else {
                return {
                    paddingTop: toCssUnits(this.bar_height),
                };
            }
        },
        nav_width() {
            if (this.nav) {
                return this.nav.mini_width;
            } else {
                return 0;
            }
        },
        bar_height() {
            if (this.bar) {
                return this.bar.height;
            } else {
                return 0;
            }
        },
    },
    methods: {
        registerBar(bar: IkAppBar) {
            this.bar = bar || null;
        },
        registerNav(nav: IkNavigation) {
            this.nav = nav || null;
        },
        unregisterBar() {
            this.bar = null;
        },
        unregisterNav() {
            this.nav = null;
        },
    },
    render() {
        let children = this.$slots.default?.() || [];

        if (this.loading) {
            children = [];
        }

        children.push(h(IkModalRenderer));

        return h('div', {
            class: {
                'ik-app': true,
                'ik-app--fill': this.fill,
                'ik-app--mobile': unref(this.device.mobile),
            },
            style: this.styles,
        }, children);
    },
    setup() { return { device: useDevice() }; },
});
</script>
