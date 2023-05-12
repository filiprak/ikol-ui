<script lang="ts">
import '@/styles';
import './[[NAME]].css';
import { defineComponent, h } from 'vue';

export default defineComponent({
    name: '[[NAME]]',
    props: {

    },
    setup(props, { slots }) {
        const classes = ['[[NAME_KEBAB]]'];

        return () => h('div', { class: classes }, slots.default?.());
    },
});
</script>
