<template>
    <div class="ik-icon"></div>
</template>
<script lang="ts">
import '@/styles';
import { defineComponent } from 'vue';
import { formatCssValue } from '@/utils/helpers';

export default defineComponent({
    props: {
        name: {
            type: [Number, String],
            default: null,
        },
    },
    setup(props) {
        const x = formatCssValue(4, 'px');
        return {
            x,
        };
    },
});
</script>
