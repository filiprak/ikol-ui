<script lang="ts">
import '@ui/styles';
import './IkNavigation.css';
import type { PropType, VNodeArrayChildren } from 'vue';
import { defineComponent, h, toHandlers, unref, inject } from 'vue';

import type { IkNavigation } from '@ui/components/IkNavigation';
import { IkNavigationItem } from '@ui/components/IkNavigation';

import { usePopover } from '@ui/composables/popover';
import { IkPopover } from '@ui/components/IkPopover';
import { IkButton } from '@ui/components/IkButton';
import { IkIcon } from '@ui/components/IkIcon';
import { IkFlex } from '@ui/components/IkFlex';
import { IkDivider } from '@ui/components/IkDivider';

import type { RouteLocationPathRaw, RouteLocationNamedRaw, RouteLocationRaw } from 'vue-router';
import { useDevice } from '@ui/composables/device';
import { useRoute, useRouter } from '@ui/composables/router';

export default defineComponent({
    props: {
        icon: {
            type: String,
        },
        link: {
            type: String,
        },
        route: {
            type: [String, Object] as PropType<RouteLocationRaw | null>,
        },
        replace: {
            type: Boolean,
            default: false,
        },
        target: {
            type: String,
        },
        active: {
            type: Boolean,
        },
        active_route_match: { // regex
            type: String,
        },
        close_nav: {
            type: Boolean,
            default: false,
        },
        hide_label: {
            type: Boolean,
            default: false,
        },
        children: {
            type: Boolean,
            default: false,
        },
        circle_icon: {
            type: Boolean,
            default: false,
        },
        append_icon: {
            type: String,
        },
    },
    setup() {
        return {
            navigation: inject<IkNavigation>('navigation'),
            popover: usePopover(),
            device: useDevice(),
            router: useRouter(),
            current_route: useRoute(),
        };
    },
    data() {
        return {
            open: false,
        };
    },
    computed: {
        tag() {
            return this.link ? 'a' : 'div';
        },
        clickable() {
            return this.route || this.link || this.$attrs.onClick;
        },
        root_class() {
            return {
                'ik-navigation-item': true,
                'ik-navigation-item--active': this.active || this.is_route_active,
                'ik-navigation-item--clickable': !!this.clickable,
                'ik-navigation-item--circle-icon': this.circle_icon,
            };
        },
        route_object(): RouteLocationRaw | null {
            if (this.route) {
                const route = typeof this.route === 'string' ? { name: this.route } : this.route;
                return { params: this.current_route.params, ...route };
            } else {
                return null;
            }
        },
        mini() {
            return !!this.navigation?.mini;
        },
        is_route_active() {
            if (this.current_route && this.current_route.name && this.active_route_match) {
                return !!this.current_route.name?.match(new RegExp(this.active_route_match));
            } else if (this.route_object) {
                return (this.route_object as RouteLocationNamedRaw).name === this.router.getCurrentRoute().name ||
                    (this.route_object as RouteLocationPathRaw).path === this.router.getCurrentRoute().name;
            } else {
                return false;
            }
        },
    },
    mounted() {
        if (this.navigation?.secondary && unref(this.device.mobile)) {
            if (this.is_route_active || this.active) {
                // @todo
                //
                // window.scrollIntoView(this.$el, {
                //     scrollMode: 'if-needed',
                //     block: 'center',
                //     inline: 'center',
                // });
            }
        }
    },
    methods: {
        _getContent() {
            if (this.append_icon) {
                return h(IkFlex, { justify_space: true }, () => [
                    this.$slots.default?.(),
                    h(IkIcon, { class: 'ik-ml-3', icon: this.append_icon }),
                ]);
            } else {
                return this.$slots.default?.();
            }
        },
        _renderWrapper(children: () => VNodeArrayChildren) {
            return h('div', {
                class: this.root_class,
            }, { default: children });
        },
        _renderLink(v_on: Record<string, any> = {}) { // eslint-disable-line @typescript-eslint/no-explicit-any
            const children = [];
            if (this.icon || this.$slots.icon?.()) {
                children.push(
                    h('div', {
                        class: 'ik-navigation-item__icon',
                        ...toHandlers(v_on),
                    }, [
                        this.icon ? h(IkIcon, { icon: this.icon }) : this.$slots.icon?.(),
                    ])
                );
            }

            if (this.$slots.default?.() && (!this.mini || !this.hide_label)) {
                children.push(
                    h('div', { class: 'ik-navigation-item__content' }, [this._getContent()])
                );
            }

            if (!this.mini && this.$slots.children?.()) {
                children.push(
                    h(IkButton, {
                        class: 'ik-navigation-item__arrow',
                        design: 'accent',
                        icon: this.open ? 'chevron-up:light' : 'chevron-down:light',
                        circle: true,
                        flat: true,
                        onClick: this._onCollapseClick,
                    })
                );
            }

            return h(this.tag, {
                class: 'ik-navigation-item__link',
                ...(this.link ? { href: this.link, target: this.target } : {}),
                onClick: (this.close_nav || this.route) ? this._onClick : null,
            }, children);
        },
        _renderChildren() {
            let items: VNodeArrayChildren = [];

            if (this.$slots.children?.() || this.children) {
                if (this.mini) {
                    const children_top = h(IkNavigationItem, {
                        class: 'ik-navigation-item__top',
                        link: this.link,
                        route: this.route,
                        replace: this.replace,
                        target: this.target,
                        close_nav: this.close_nav,
                    }, { default: () => this.$slots.default?.() });

                    const divider = h(IkDivider, { no_margin: true, on_surface: true });

                    items = [children_top, this.$slots.children?.() ? divider : null, this.$slots.children?.()];
                } else {
                    items = [this.$slots.children?.()];
                }
                return h('div', {
                    class: 'ik-navigation-item__children',
                    style: { display: (this.mini || this.open) ? null : 'none' },
                }, items);
            } else {
                return null;
            }
        },
        _navigate() {
            if (this.route_object && !this.is_route_active) {
                this.router[this.replace ? 'replace' : 'push'](this.route_object);
            }
        },
        _onClick() {
            this.route && this._navigate();
            this.close_nav && this.navigation?.toggle(false);
            this.close_nav && this._closeChildren();
        },
        _closeChildren() {
            this.popover.closeAll();
        },
        _onCollapseClick(event: MouseEvent) {
            this.open = !this.open;
            event.stopPropagation();
            event.preventDefault();
        },
    },
    render() {
        if (this.mini && !this.navigation?.secondary) {
            return this._renderWrapper(() => [
                h(IkPopover, {
                    delay_miliseconds: 200,
                    content_class: 'ik-navigation-item__popover',
                    position: 'vertical',
                    align: 'start',
                    offset: 5,
                    min_width: 175,
                }, {
                    default: () => this._renderChildren(),
                    activator: (data: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                        return this._renderLink(data.on);
                    },
                }),
            ]);
        } else {
            return this._renderWrapper(() => [this._renderLink(), this._renderChildren()]);
        }
    },
});
</script>
