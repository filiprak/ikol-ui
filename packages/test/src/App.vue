<template>
    <div>
        <h1>{{ greeting }}</h1>
        <p>{{ message }}</p>
        <IkThemeProvider theme="light" variant="5">
            this is provided light theme
            <ThemeInfo></ThemeInfo>
            <IkLoaderCircle indeterminate />
            <IkLoaderCircle indeterminate
                            design="primary" />
            <IkLoaderCircle indeterminate
                            design="success" />
            <IkLoaderCircle indeterminate
                            design="error" />
        </IkThemeProvider>
        <IkThemeProvider theme="dark">
            this is provided dark theme
            <ThemeInfo></ThemeInfo>
            <IkIcon></IkIcon>
            <IkLoaderCircle indeterminate />
            <IkLoaderCircle indeterminate
                            design="primary" />
            <IkLoaderCircle indeterminate
                            design="success" />
            <IkLoaderCircle indeterminate
                            design="error" />
        </IkThemeProvider>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { IkLoaderCircle } from 'ikol-ui-kit/components/IkLoaderCircle';
import { IkIcon } from 'ikol-ui-kit/components/IkIcon';
import { IkThemeProvider } from 'ikol-ui-kit/components/IkThemeProvider';
import { clamp } from 'ikol-ui-kit/utils/helpers';
import ThemeInfo from './ThemeInfo.vue';

export default defineComponent({
    components: {
        IkLoaderCircle,
        IkIcon,
        IkThemeProvider,
        ThemeInfo
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
