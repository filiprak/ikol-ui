<script setup lang="ts">
import { IkLoaderCircle } from '@ui/components/IkLoaderCircle';
import { IkUIDesignColor } from '@ui/types/utils';
</script>
<template>
    <Stories title="Components/Other/IkLoaderCircle"
             :component="IkLoaderCircle">
        <Story title="Default">
            <IkLoaderCircle></IkLoaderCircle>
        </Story>
        <Story title="Progress">
            <IkLoaderCircle v-for="design in IkUIDesignColor"
                            class="ik-mr-3"
                            :value="66"
                            :design="design"></IkLoaderCircle>
        </Story>
        <Story title="Indeterminate">
            <IkLoaderCircle v-for="design in IkUIDesignColor"
                            class="ik-mr-3"
                            indeterminate
                            :design="design"></IkLoaderCircle>
        </Story>
        <Story title="Rotate">
            <IkLoaderCircle v-for="design in IkUIDesignColor"
                            class="ik-mr-3"
                            :rotate="90"
                            :value="30"
                            :design="design"></IkLoaderCircle>
        </Story>
        <Story title="Thicnkess">
            <IkLoaderCircle v-for="design in IkUIDesignColor"
                            class="ik-mr-3"
                            :thickness="6"
                            :value="30"
                            :design="design"></IkLoaderCircle>
        </Story>
        <Story title="Size">
            <IkLoaderCircle v-for="design in IkUIDesignColor"
                            class="ik-mr-3"
                            :size="40"
                            :value="30"
                            :design="design"></IkLoaderCircle>
        </Story>
    </Stories>
</template>
