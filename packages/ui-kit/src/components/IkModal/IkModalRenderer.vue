<script setup lang="ts">
import type { IkModalConstructor } from '@ui/composables/modal';
import { useModalManager } from '@ui/composables/modal';
import { useRender } from '@ui/composables/render';
import { Teleport, h } from 'vue';
import type { Component, VNode, PropType } from 'vue';

const props = defineProps({
    teleport_to: {
        type: String as PropType<string | null>,
        default: 'body',
    },
});
const manager = useModalManager();

useRender(() => {
    const children: VNode[] = [];
    const length = manager.instances.size;

    let i = 0;

    manager.instances.forEach((controller, id) => {
        const wrapper: Component = {
            render() {
                return h(controller.component, { ref: 'vm', ...controller.options.props });
            },
            provide() {
                return { controller };
            },
            mounted() {
                controller.registerVm(this.$refs.vm as IkModalConstructor);
            },
        };
        if (i == length - 1) {
            children.push(h('div', { class: 'ik-modal__backdrop' }));
        }
        children.push(h(wrapper, {
            key: id,
        }));
        i++;
    });

    const content: VNode[] = [];

    if (children.length > 0) {
        content.push(h('div', { class: 'ik-modal-renderer' }, children));
    }

    return h(Teleport, { to: props.teleport_to, disabled: props.teleport_to === null }, content);
});
</script>
