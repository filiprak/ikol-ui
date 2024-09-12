import { reactive, ref } from 'vue';

import type { Ref } from 'vue';
import { showQuickModal } from '../modal';

const BREAKPOINTS = {
    xs: [null, 576],
    sm: [576, 992],
    md: [992, 1200],
    lg: [1200, 1400],
    xl: [1400, null],
};

declare type IkDeviceBreakpoint = keyof typeof BREAKPOINTS;

export class IkDeviceManager {
    public mobile: Ref<boolean> = ref(false);
    public width: Ref<number> = ref(window.innerWidth);
    public height: Ref<number> = ref(window.innerHeight);
    public bp: Ref<{ [k in IkDeviceBreakpoint]: boolean }> = ref({
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false,
    });

    public audio = reactive({
        checking: false,
        allowed: null as boolean | null,
        muted: false,
    });

    constructor() {
        window.addEventListener('resize', this.onWindowResize);

        this.refresh();
    }

    get audio_enabled() {
        return this.audio.allowed && !this.audio.muted;
    }

    set audio_enabled(enabled) {
        if (!this.audio.checking) {
            if (enabled) {
                this.checkAudioAllowed()
                    .then(() => { this.audio.muted = false; });
            } else {
                this.audio.muted = true;
            }
        }
    }

    checkAudioAllowed(skip_asking = false) {
        this.audio.checking = true;

        return new Promise((resolve, reject) => {
            const audio = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjM2LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV6urq6urq6urq6urq6urq6urq6urq6urq6v////////////////////////////////8AAAAATGF2YzU2LjQxAAAAAAAAAAAAAAAAJAAAAAAAAAAAASDs90hvAAAAAAAAAAAAAAAAAAAA//MUZAAAAAGkAAAAAAAAA0gAAAAATEFN//MUZAMAAAGkAAAAAAAAA0gAAAAARTMu//MUZAYAAAGkAAAAAAAAA0gAAAAAOTku//MUZAkAAAGkAAAAAAAAA0gAAAAANVVV');
            audio.onerror = (event) => {
                reject(event);
            };
            audio.onabort = (event) => {
                reject(event);
            };
            audio.play()
                .then(resolve)
                .catch(reject);
        }).then(() => {
            this.audio.allowed = true;

            return true;
        }).catch(() => {
            this.audio.allowed = false;

            if (!skip_asking) {
                showQuickModal({
                    props: {
                        design: 'info',
                        header: '{{_*en*Muted sounds_}}',
                        body: '{{_*en*Browser does not allow play notification sounds until first user interaction with the page, please enable sounds by clicking button below. If this does not help you may have to allow sounds manually for this page in browser settings._}}',
                        buttons: [{ label: '{{_*en*Enable_}}', design: 'primary', close_on_click: true }],
                        no_footer_close: true,
                    },
                }).then(() => {
                    this.checkAudioAllowed(true);
                });
            }
            return false;
        }).finally(() => {
            this.audio.checking = false;
        });
    }

    private checkBreakpoint(bp: IkDeviceBreakpoint, width: number) {
        const [low, high] = BREAKPOINTS[bp];

        if (low !== null && high !== null) {
            return width >= low && width < high;
        } else if (low !== null) {
            return width >= low;
        } else if (high !== null) {
            return width < high;
        } else {
            return true;
        }
    }

    private refresh() {
        const w = window.innerWidth;
        const h = window.innerHeight;

        this.bp.value.xs = this.checkBreakpoint('xs', w);
        this.bp.value.sm = this.checkBreakpoint('sm', w);
        this.bp.value.md = this.checkBreakpoint('md', w);
        this.bp.value.lg = this.checkBreakpoint('lg', w);
        this.bp.value.xl = this.checkBreakpoint('xl', w);

        this.width.value = w;
        this.height.value = h;

        this.mobile.value = this.bp.value.xs || this.bp.value.sm;
    }

    private onWindowResize = () => {
        this.refresh();
    };
};
