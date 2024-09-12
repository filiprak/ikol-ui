<script setup lang="ts">
import { IkIcon } from '@ui/components/IkIcon';
import { IkList, IkListItem } from '@ui/components/IkList';
</script>
<template>
    <Stories title="Components/Lists/IkList"
             :component="IkList">
        <Story title="Default">
            <IkList>
                <IkListItem>
                    Item One
                    <template #prepend>
                        <IkIcon icon="user"
                                circle
                                design="default"
                                size_px="32" />
                    </template>
                    <template #secondary>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </template>
                </IkListItem>
                <IkListItem>
                    Item Two
                    <template #prepend>
                        <IkIcon icon="user"
                                circle
                                design="default"
                                size_px="32" />
                    </template>
                    <template #secondary>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </template>
                </IkListItem>
                <IkListItem>
                    Item Three
                    <template #prepend>
                        <IkIcon icon="user"
                                circle
                                design="default"
                                size_px="32" />
                    </template>
                    <template #secondary>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </template>
                </IkListItem>
            </IkList>
        </Story>
    </Stories>
</template>
