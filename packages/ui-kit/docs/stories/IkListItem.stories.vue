<script setup lang="ts">
import { IkIcon } from '@ui/components/IkIcon';
import { IkButton } from '@ui/components/IkButton';
import { IkList, IkListItem } from '@ui/components/IkList';
</script>
<template>
    <Stories title="Components/Lists/IkListItem"
             :component="IkListItem">
        <Story title="Default">
            <IkList>
                <IkListItem>
                    Item
                </IkListItem>
            </IkList>
        </Story>
        <Story title="Icon">
            <IkList>
                <IkListItem icon="home">
                    Item
                </IkListItem>
            </IkList>
        </Story>
        <Story title="Secondary Text">
            <IkList>
                <IkListItem>
                    Item One
                    <template #secondary>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </template>
                </IkListItem>
                <IkListItem>
                    Item Two
                    <template #secondary>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </template>
                </IkListItem>
                <IkListItem>
                    Item Three
                    <template #secondary>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </template>
                </IkListItem>
            </IkList>
        </Story>
        <Story title="Prepend">
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
        <Story title="Append">
            <IkList>
                <IkListItem>
                    Item One
                    <template #secondary>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </template>
                    <template #append>
                        <IkButton icon="cog"
                                  circle
                                  design="default" />
                    </template>
                </IkListItem>
                <IkListItem>
                    Item Two
                    <template #secondary>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </template>
                    <template #append>
                        <IkButton icon="cog"
                                  circle
                                  design="default" />
                    </template>
                </IkListItem>
                <IkListItem>
                    Item Three
                    <template #secondary>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </template>
                    <template #append>
                        <IkButton icon="cog"
                                  circle
                                  design="default" />
                    </template>
                </IkListItem>
            </IkList>
        </Story>
        <Story title="Two Lines">
            <IkList>
                <IkListItem lines="2">
                    Item One
                    <template #secondary>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit
                    </template>
                </IkListItem>
                <IkListItem lines="2">
                    Item Two
                    <template #secondary>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit
                    </template>
                </IkListItem>
                <IkListItem lines="2">
                    Item Three
                    <template #secondary>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit
                    </template>
                </IkListItem>
            </IkList>
        </Story>
        <Story title="Inline">
            <IkList>
                <IkListItem inline>
                    Item One
                    <template #secondary>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </template>
                    <template #append>
                        <IkButton icon="cog"
                                  circle
                                  design="default" />
                    </template>
                </IkListItem>
            </IkList>
        </Story>
        <Story title="Wrap Text">
            <IkList>
                <IkListItem wrap_text>
                    Item One
                    <template #secondary>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit
                    </template>
                    <template #append>
                        <IkButton icon="cog"
                                  circle
                                  design="default" />
                    </template>
                </IkListItem>
            </IkList>
        </Story>
        <Story title="Disabled">
            <IkList>
                <IkListItem disabled>
                    Item One
                    <template #secondary>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </template>
                    <template #append>
                        <IkButton icon="cog"
                                  circle
                                  design="default" />
                    </template>
                </IkListItem>
            </IkList>
        </Story>
        <Story title="Clickable">
            <IkList>
                <IkListItem @click="() => { }">
                    Item One
                    <template #secondary>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </template>
                    <template #append>
                        <IkButton icon="cog"
                                  circle
                                  design="default" />
                    </template>
                </IkListItem>
            </IkList>
        </Story>
        <Story title="Active">
            <IkList>
                <IkListItem active>
                    Item One
                    <template #secondary>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </template>
                    <template #append>
                        <IkButton icon="cog"
                                  circle
                                  design="default" />
                    </template>
                </IkListItem>
            </IkList>
        </Story>
        <Story title="Border Bottom">
            <IkList>
                <IkListItem border_bottom>
                    Item One
                    <template #secondary>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit
                    </template>
                </IkListItem>
                <IkListItem border_bottom>
                    Item Two
                    <template #secondary>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit
                    </template>
                </IkListItem>
                <IkListItem border_bottom>
                    Item Three
                    <template #secondary>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit
                    </template>
                </IkListItem>
            </IkList>
        </Story>
        <Story title="Align Start">
            <IkList>
                <IkListItem align_start
                            wrap_text>
                    Item One
                    <template #prepend>
                        <IkIcon icon="user"
                                circle
                                design="default"
                                size_px="32" />
                    </template>
                    <template #secondary>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit
                    </template>
                </IkListItem>
                <IkListItem align_start
                            wrap_text>
                    Item Two
                    <template #prepend>
                        <IkIcon icon="user"
                                circle
                                design="default"
                                size_px="32" />
                    </template>
                    <template #secondary>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit
                    </template>
                </IkListItem>
                <IkListItem align_start
                            wrap_text>
                    Item Three
                    <template #prepend>
                        <IkIcon icon="user"
                                circle
                                design="default"
                                size_px="32" />
                    </template>
                    <template #secondary>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
                        elit
                    </template>
                </IkListItem>
            </IkList>
        </Story>
    </Stories>
</template>
