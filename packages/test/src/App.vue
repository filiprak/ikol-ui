<template>
    <div>
        <h1>{{ greeting }}</h1>
        <p>{{ message }}</p>
        <IkLoaderCircle indeterminate/>
        <IkLoaderCircle indeterminate design="primary"/>
        <IkLoaderCircle indeterminate design="success"/>
        <IkLoaderCircle indeterminate design="error"/>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { IkLoaderCircle } from 'ikol-ui-kit/components/IkLoaderCircle';
import { clamp } from 'ikol-ui-kit/utils/helpers';

export default defineComponent({
    components: {
        IkLoaderCircle,
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
            return `Hello, ${this.name}! ${clamp(23, 0, 10)}`;
        },
    },
});
</script>
