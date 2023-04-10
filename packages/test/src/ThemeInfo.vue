<template>
    <div>
        {{ theme }}
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { useTheme } from 'ikol-ui-kit/composables';

export default defineComponent({
    setup(props) {
        const theme = useTheme()

        return {
            theme
        };
    },
});
</script>
