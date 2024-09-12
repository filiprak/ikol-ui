<script setup lang="ts">
import { IkButton } from '@ui/components/IkButton';
import { IkButtonGroup } from '@ui/components/IkButtonGroup';
import { IkUIDesignColor, IkUIElemSize } from '@ui/types/utils';
</script>
<template>
    <Stories title="Components/Buttons/IkButton"
             :component="IkButton">
        <Story title="Default">
            <IkButton>Button</IkButton>
        </Story>
        <Story title="Design">
            <IkButtonGroup>
                <IkButton :design="design"
                          v-for="design in IkUIDesignColor">Button</IkButton>
            </IkButtonGroup>
        </Story>
        <Story title="Outline Variant">
            <IkButtonGroup>
                <IkButton variant="outline"
                          :design="design"
                          v-for="design in IkUIDesignColor">Button</IkButton>
            </IkButtonGroup>
        </Story>
        <Story title="Outline Active">
            <IkButtonGroup>
                <IkButton variant="outline"
                          active
                          :design="design"
                          v-for="design in IkUIDesignColor">Button</IkButton>
            </IkButtonGroup>
        </Story>
        <Story title="Flat Variant">
            <IkButtonGroup>
                <IkButton variant="flat"
                          :design="design"
                          v-for="design in IkUIDesignColor">Button</IkButton>
            </IkButtonGroup>
        </Story>
        <Story title="Flat Active">
            <IkButtonGroup>
                <IkButton variant="flat"
                          active
                          :design="design"
                          v-for="design in IkUIDesignColor">Button</IkButton>
            </IkButtonGroup>
        </Story>
        <Story title="Round">
            <IkButtonGroup>
                <IkButton round
                          :design="design"
                          v-for="design in IkUIDesignColor">Button</IkButton>
            </IkButtonGroup>
        </Story>
        <Story title="Circle">
            <IkButtonGroup>
                <IkButton circle
                          icon="cog"
                          :design="design"
                          v-for="design in IkUIDesignColor"></IkButton>
            </IkButtonGroup>
        </Story>
        <Story title="Size">
            <div v-for="size in IkUIElemSize">
                <IkButtonGroup>
                    <IkButton :size="size"
                              design="primary">Button</IkButton>
                    <IkButton :size="size"
                              design="primary"
                              loading>Button</IkButton>
                    <IkButton :size="size"
                              design="success"
                              circle
                              icon="cog"></IkButton>
                    <IkButton :size="size"
                              design="error"
                              round>Button</IkButton>
                    <IkButton :size="size"
                              design="default"
                              separate
                              icon="cog">Button</IkButton>
                </IkButtonGroup>
            </div>
        </Story>
        <Story title="Block">
            <IkButton block
                      class="ik-mb-3"
                      :design="design"
                      v-for="design in IkUIDesignColor">Button</IkButton>
        </Story>
        <Story title="Prepend Icon">
            <IkButtonGroup>
                <IkButton icon="house"
                          :design="design"
                          v-for="design in IkUIDesignColor">Button</IkButton>
            </IkButtonGroup>
        </Story>
        <Story title="Append Icon">
            <IkButtonGroup>
                <IkButton append_icon="house"
                          :design="design"
                          v-for="design in IkUIDesignColor">Button</IkButton>
            </IkButtonGroup>
        </Story>
        <Story title="Separate Icon">
            <IkButtonGroup>
                <IkButton icon="house"
                          separate
                          :design="design"
                          v-for="design in IkUIDesignColor">Button</IkButton>
            </IkButtonGroup>
        </Story>
        <Story title="Disabled">
            <IkButtonGroup>
                <IkButton disabled
                          :design="design"
                          v-for="design in IkUIDesignColor">Button</IkButton>
            </IkButtonGroup>
        </Story>
        <Story title="Loading">
            <IkButtonGroup>
                <IkButton loading
                          :design="design"
                          v-for="design in IkUIDesignColor">Button</IkButton>
            </IkButtonGroup>
        </Story>
        <Story title="Skeleton">
            <IkButtonGroup>
                <IkButton skeleton
                          :design="design"
                          v-for="design in IkUIDesignColor">Button</IkButton>
            </IkButtonGroup>
        </Story>
    </Stories>
</template>
