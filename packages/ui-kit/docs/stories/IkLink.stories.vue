
<script setup lang="ts">
import { IkLink } from '@ui/components/IkLink';
import { IkUIDesignColor } from '@ui/types/utils';
</script>
<template>
    <Stories title="Components/Other/IkLink"
             :component="IkLink">
        <Story title="Default">
            <IkLink to="https://google.com">This is a link</IkLink>
        </Story>
        <Story title="Underline">
            <IkLink to="https://google.com"
                    underline>This is a link</IkLink>
        </Story>
        <Story title="NewTab">
            <IkLink to="https://google.com"
                    target="_blank">This is a link</IkLink>
        </Story>
        <Story title="Email">
            <IkLink to="test@example.com"
                    type="email">This is a link</IkLink>
        </Story>
        <Story title="Plain">
            <IkLink to="https://google.com"
                    plain>This is a link</IkLink>
        </Story>
        <Story title="Design">
            <div v-for="design in IkUIDesignColor">
                <IkLink to="https://google.com"
                        :design="design">This is a link</IkLink>
            </div>
        </Story>
    </Stories>
</template>
