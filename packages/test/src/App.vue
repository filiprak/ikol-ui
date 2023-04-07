<template>
    <div>
        <h1>{{ greeting }}</h1>
        <p>{{ message }}</p>
        <IkLoaderCircle indeterminate />
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { IkIcon, IkLoaderCircle } from 'ikol-ui-kit';

export default defineComponent({
    components: {
        IkIcon,
        IkLoaderCircle
    },
    props: {
        name: {
            type: String,
            default: 'World',
        },
        message: {
            type: String,
            default: 'Hello!',
        },
    },
    computed: {
        greeting(): string {
            return `Hello, ${this.name}!`;
        },
    },
});
</script>
