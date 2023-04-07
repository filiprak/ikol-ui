<template>
    <div>
        <h1>{{ greeting }}</h1>
        <p>{{ message }}</p>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
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
