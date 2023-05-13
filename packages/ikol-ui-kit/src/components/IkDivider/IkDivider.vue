<script lang="ts">
import '@/styles';
import './IkDivider.css';
import { defineComponent, h } from 'vue';

export default defineComponent({
    name: 'IkDivider',
    props: {

    },
    setup(props, { slots }) {
        const classes = ['ik-divider'];

        return () => h('div', { class: classes }, slots.default?.());
    },
});
</script>
