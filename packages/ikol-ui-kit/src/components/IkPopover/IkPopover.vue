<script lang="ts">
import '@/styles';
import './IkPopover.css';
import { defineComponent, h } from 'vue';

export default defineComponent({
    name: 'IkPopover',
    props: {

    },
    setup(props, { slots }) {
        const classes = ['ik-popover'];

        return () => h('div', { class: classes }, slots.default?.());
    },
});
</script>
