
<script setup lang="ts">
import { IkImage } from '@ui/components/IkImage';

</script>
<template>
    <Stories title="Components/Images & Icons/IkImage"
             :component="IkImage">
        <Story title="Default">
            <IkImage src="https://picsum.photos/300/200"></IkImage>
        </Story>
        <Story title="Loader">
            <IkImage src="https://picsum.photos/300/200"
                     loader
                     :size="200"></IkImage>
        </Story>
        <Story title="Size">
            <IkImage src="https://picsum.photos/300/200"
                     :size="150"></IkImage>
        </Story>
        <Story title="Width And Height">
            <IkImage src="https://picsum.photos/300/200"
                     :width="250"
                     :height="150"></IkImage>
        </Story>
        <Story title="Round">
            <IkImage src="https://picsum.photos/200/200"
                     round></IkImage>
        </Story>
        <Story title="Contain">
            <IkImage src="https://picsum.photos/300/200"
                     contain
                     style="border: 1px solid red"
                     :size="300"></IkImage>
        </Story>
        <Story title="Cover">
            <IkImage src="https://picsum.photos/300/200"
                     cover
                     style="border: 1px solid red"
                     :size="300"></IkImage>
        </Story>
    </Stories>
</template>
