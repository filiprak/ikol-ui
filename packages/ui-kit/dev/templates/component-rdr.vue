<script lang="ts">
import '@ui/styles';
import './[[NAME]].css';
import { defineComponent, h } from 'vue';

export default defineComponent({
    props: {

    },
    render () {
        const classes = ['[[NAME_KEBAB]]'];

        return () => h('div', { class: classes }, this.$slots.default?.());
    },
});
</script>
