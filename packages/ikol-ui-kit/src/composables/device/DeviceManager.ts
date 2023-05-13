import { ref } from 'vue';
import type { Ref } from 'vue';

const BREAKPOINTS = {
    xs: [null, 576],
    sm: [576, 992],
    md: [992, 1200],
    lg: [1200, 1400],
    xl: [1400, null],
};

declare type DeviceBreakpoint = keyof typeof BREAKPOINTS;

export class DeviceManager {
    public mobile: Ref<boolean> = ref(false);
    public width: Ref<number> = ref(window.innerWidth);
    public height: Ref<number> = ref(window.innerHeight);
    public bp: Ref<{ [k in DeviceBreakpoint]: boolean }> = ref({
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false,
    });

    constructor() {
        window.addEventListener('resize', this.onWindowResize);
    }

    private checkBreakpoint(bp: DeviceBreakpoint, width: number) {
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

    private onWindowResize = () => {
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
    };
};
