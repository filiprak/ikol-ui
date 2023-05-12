<script lang="ts">
import '@/styles';
import './IkImage.css';
import { defineComponent, h } from 'vue';

export default defineComponent({
    name: 'IkImage',
    props: {

    },
    setup(props, { slots }) {
        const classes = ['ik-image'];

        return () => h('div', { class: classes }, slots.default?.());
    },
});
</script>
