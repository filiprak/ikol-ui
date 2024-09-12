import { ref, computed, watch } from 'vue';
import type { IkForm } from '@ui/components/IkForm';
import { showConfirmModal } from '../modal';
import { getIkolUIApp } from '@ui/index';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export class IkFormManager {
    static readonly PROMPT_UNSAVED_MSG = '{{_*en*Changes you made may not be saved. Discard it?_}}';

    public forms = ref<IkForm[]>([]);
    public is_popstate = ref(false);

    private _popstate_listener = false;
    private _unregisterRouter: Function | null = null;

    constructor() {
        watch(this.should_bind, (has_new, has_old) => {
            if ((!!has_new) !== (!!has_old)) {
                if (has_new) {
                    this.bind();
                } else {
                    this.unbind();
                }
            }
        });
    }

    get routable_mode() {
        if (this.routable_is_new) {
            return 'new';
        } else if (this.routable_edit) {
            return 'edit';
        } else {
            return null;
        }
    }

    get routable_edit() {
        return computed(() =>
            this.forms.value.some((vm) => vm.routable_edit !== undefined && !vm.view_mode)
        );
    }

    get routable_is_new() {
        return computed(() =>
            this.forms.value.some((vm) => !!vm.routable_is_new)
        );
    }

    get has_prompt_unsaved_forms() {
        return computed(() =>
            this.forms.value.some((vm) => vm.prompt_unsaved)
        );
    }

    get has_routable_edit_forms() {
        return computed(() =>
            this.forms.value.some((vm) => vm.routable_edit !== undefined ? !!vm.routable_edit : false)
        );
    }

    get should_bind() {
        return computed(() => this.has_prompt_unsaved_forms.value || this.has_routable_edit_forms.value);
    }

    get has_forms() {
        return computed(() => this.forms.value.length > 0);
    }

    registerForm(form: IkForm) {
        if (this.forms.value.indexOf(form) < 0) {
            this.forms.value.push(form);
        }
    }

    unregisterForm(form: IkForm) {
        this.forms.value = this.forms.value.filter((vm) => vm !== form);
    }

    isAnyFormDirty() {
        return this.forms.value.some(vm => vm.prompt_unsaved && vm.isDirty());
    }

    isAnyFormRoutableEditing() {
        return this.forms.value.some(
            (vm) => vm.routable_edit !== undefined && !vm.routable_is_new && !!vm.routable_edit
        );
    }

    showUnsavedModal() {
        return showConfirmModal({
            props: {
                header: '{{_*en*Discard changes?_}}',
                body: IkFormManager.PROMPT_UNSAVED_MSG,
                buttons: [
                    {
                        cancel_on_click: true,
                        label: '{{_*en*Discard_}}',
                    },
                    {
                        confirm_on_click: true,
                        design: 'primary',
                        label: '{{_*en*Keep editing_}}',
                    },
                ],
            },
        });
    }

    private emitRoutableEditForms() {
        this.forms.value.forEach((vm) => {
            if (vm.routable_edit !== undefined && vm.routable_edit) {
                vm.$emit('update:routable_edit', false);
            }
        });
    }

    private bind() {
        if (this.has_prompt_unsaved_forms.value) {
            window.addEventListener('beforeunload', this.onWindowBeforeUnload);
        }
        if (!this._popstate_listener) {
            window.addEventListener('popstate', this.onWindowPopState);
            this._popstate_listener = true;
        }

        const router = getIkolUIApp().getRouter();

        if (router) {
            this._unregisterRouter = router.beforeEach(this.onBeforeRoute);
        }
    }

    private unbind() {
        window.removeEventListener('beforeunload', this.onWindowBeforeUnload);

        if (this._popstate_listener) {
            window.removeEventListener('popstate', this.onWindowPopState);
            this._popstate_listener = false;
        }
        if (this._unregisterRouter) {
            this._unregisterRouter();
        }
    }

    private onWindowBeforeUnload = (evt: BeforeUnloadEvent) => {
        if (this.isAnyFormDirty()) {
            (evt || window.event).returnValue = IkFormManager.PROMPT_UNSAVED_MSG;
            return IkFormManager.PROMPT_UNSAVED_MSG;
        } else {
            return undefined;
        }
    };

    private onWindowPopState = () => {
        this.is_popstate.value = true;
    };

    private onBeforeRoute = (from: RouteLocationNormalized, to: RouteLocationNormalized, next: NavigationGuardNext) => {
        if (!from?.meta?.skip_prompt_unsaved) {
            setTimeout(() => {
                this.onBeforeRouteDeffered(from, to, next);
            }, 0);
        } else {
            next();
        }
    };

    private onBeforeRouteDeffered = (from: RouteLocationNormalized, to: RouteLocationNormalized, next: NavigationGuardNext) => {
        let promise = Promise.resolve(true);
        const is_popstate = this.is_popstate.value;

        this.is_popstate.value = false;

        if (this.isAnyFormDirty()) {
            promise = this.showUnsavedModal().then(({ confirmed }) => !!confirmed);
        }

        if (is_popstate) {
            if (this.isAnyFormRoutableEditing()) {
                promise = promise.then((result: boolean) => {
                    if (result) {
                        this.emitRoutableEditForms();
                        return false;
                    }
                    return result;
                });
            }
        }

        promise.then((result: boolean) => {
            if (result) {
                next();
            } else {
                next(false);
            }
        });
    };
};
