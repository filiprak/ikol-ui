<script setup lang="ts">
import { IkButton } from '@ui/components/IkButton';
import { IkAlert } from '@ui/components/IkAlert';
import { IkUIDesignColor } from '@ui/types/utils';
</script>
<template>
    <Stories title="Components/Other/IkAlert"
             :component="IkAlert">
        <Story title="Default">
            <IkAlert>Lorem ipsum dolor sit amet consectetur adipisicing elit</IkAlert>
        </Story>
        <Story title="Design">
            <IkAlert v-for="design in IkUIDesignColor"
                     :design="design">
                Design: {{ design }}, Lorem ipsum dolor sit amet consectetur adipisicing elit
            </IkAlert>
        </Story>
        <Story title="Variant Filled">
            <IkAlert v-for="design in IkUIDesignColor"
                     :design="design"
                     variant="filled">
                Design: {{ design }}, Lorem ipsum dolor sit amet consectetur adipisicing elit
            </IkAlert>
        </Story>
        <Story title="Icon">
            <IkAlert icon="home">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
            </IkAlert>
        </Story>
        <Story title="Append">
            <IkAlert>
                Lorem ipsum dolor sit amet consectetur adipisicing elit
                <template #append>
                    <IkButton design="primary">Button</IkButton>
                </template>
            </IkAlert>
            <IkAlert>
                Lorem ipsum dolor sit amet consectetur adipisicing elit
                <template #append>
                    <IkButton design="primary"
                              variant="flat"
                              icon="pen"
                              circle></IkButton>
                    <IkButton design="primary"
                              variant="flat"
                              icon="share"
                              circle></IkButton>
                    <IkButton design="primary"
                              variant="flat"
                              icon="cog"
                              circle></IkButton>
                    <IkButton design="primary"
                              variant="flat"
                              icon="times"
                              circle></IkButton>
                </template>
            </IkAlert>
        </Story>
    </Stories>
</template>
