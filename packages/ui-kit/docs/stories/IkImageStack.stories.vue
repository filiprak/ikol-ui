<script setup lang="ts">
import { IkImageStack } from "@ui/components/IkImageStack";

</script>
<template>
    <Stories title="Components/Images & Icons/IkImageStack"
        :component="IkImageStack">
        <Story title="Default">
            <IkImageStack :value="[
                'https://picsum.photos/300/200',
                'https://picsum.photos/300/200',
                'https://picsum.photos/300/200',
                'https://picsum.photos/300/200',
                'https://picsum.photos/300/200',
                'https://picsum.photos/300/200'
            ]"/>
        </Story>
        <Story title="Max number">
            <IkImageStack
                :max="3"
                :value="[
                    'https://picsum.photos/300/200',
                    'https://picsum.photos/300/200',
                    'https://picsum.photos/300/200',
                    'https://picsum.photos/300/200',
                    'https://picsum.photos/300/200'
                ]"/>
        </Story>
        <Story title="Size">
            <IkImageStack
                :size="48"
                :value="[
                    'https://picsum.photos/300/200',
                    'https://picsum.photos/300/200',
                    'https://picsum.photos/300/200'
                ]"/>
        </Story>
        <Story title="View mode">
            <IkImageStack
                :view_mode="true"
                :value="[
                    'https://picsum.photos/300/200',
                    'https://picsum.photos/300/200',
                    'https://picsum.photos/300/200'
                ]"/>
        </Story>
        <Story title="Disabled">
            <IkImageStack
                :disabled="['https://picsum.photos/300/200']"
                :value="[
                    'https://picsum.photos/300/200',
                    'https://picsum.photos/300/200',
                    'https://picsum.photos/300/200',
                    'https://picsum.photos/300/200',
                    'https://picsum.photos/300/200',
                    'https://picsum.photos/300/200'
                ]"/>
        </Story>
    </Stories>
</template>
