<script setup lang="ts">
import { IkButtonGroup } from '@ui/components/IkButtonGroup';
import { IkButton } from '@ui/components/IkButton';
</script>
<template>
    <Stories title="Components/Buttons/IkButtonGroup"
             :component="IkButtonGroup">
        <Story title="Default">
            <IkButtonGroup>
                <IkButton>Button 1</IkButton>
                <IkButton>Button 2</IkButton>
                <IkButton>Button 3</IkButton>
            </IkButtonGroup>
        </Story>
        <Story title="Equal">
            <IkButtonGroup equal>
                <IkButton>Button 1</IkButton>
                <IkButton>Button 2</IkButton>
                <IkButton>Button 3</IkButton>
            </IkButtonGroup>
        </Story>
        <Story title="Stack">
            <IkButtonGroup stack>
                <IkButton>Button 1</IkButton>
                <IkButton>Button 2</IkButton>
                <IkButton>Button 3</IkButton>
            </IkButtonGroup>
        </Story>
        <Story title="Reverse">
            <IkButtonGroup reverse>
                <IkButton>Button 1</IkButton>
                <IkButton>Button 2</IkButton>
                <IkButton>Button 3</IkButton>
            </IkButtonGroup>
        </Story>
    </Stories>
</template>
