import { getCurrentInstance, Ref, computed } from "vue";
import { Router, RouteLocationNormalizedLoaded } from 'vue-router';

export function useRouter(): Router | undefined {
    return getCurrentInstance()?.proxy?.$router
}

export function useRoute(): Ref<RouteLocationNormalizedLoaded | undefined> {
    const vm = getCurrentInstance();
    return computed(() => vm?.proxy?.$route)
}
