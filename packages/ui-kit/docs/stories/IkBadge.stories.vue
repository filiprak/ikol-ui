<script setup lang="ts">
import { IkBadge } from '@ui/components/IkBadge';
import { IkButton } from '@ui/components/IkButton';
import { IkList, IkListItem } from '@ui/components/IkList';
import { IkUIDesignColor } from '@ui/types/utils';
import { h } from 'vue';

const Example = {
    render() { return h(IkButton, { icon: 'comment', circle: true }) }
};
</script>
<template>
    <Stories title="Components/Other/IkBadge"
             :component="IkBadge">
        <Story title="Default">
            <IkBadge>
                <Example />
            </IkBadge>
        </Story>
        <Story title="Design">
            <IkBadge :design="design"
                     v-for="design in IkUIDesignColor"
                     class="ik-mr-3">
                <Example />
            </IkBadge>
        </Story>
        <Story title="Position">
            <IkList>
                <IkListItem>
                    <template #prepend>
                        <IkBadge top>
                            <Example />
                        </IkBadge>
                    </template>
                    Position Top Right
                </IkListItem>
                <IkListItem>
                    <template #prepend>
                        <IkBadge top
                                 left>
                            <Example />
                        </IkBadge>
                    </template>
                    Position Top Left
                </IkListItem>
                <IkListItem>
                    <template #prepend>
                        <IkBadge>
                            <Example />
                        </IkBadge>
                    </template>
                    Position Bottom Right
                </IkListItem>
                <IkListItem>
                    <template #prepend>
                        <IkBadge left>
                            <Example />
                        </IkBadge>
                    </template>
                    Position Bottom Left
                </IkListItem>
            </IkList>
        </Story>
        <Story title="Size">
            <IkList>
                <IkListItem>
                    <template #prepend>
                        <IkBadge>
                            <Example />
                        </IkBadge>
                    </template>
                    Default size
                </IkListItem>
                <IkListItem>
                    <template #prepend>
                        <IkBadge :size="5">
                            <Example />
                        </IkBadge>
                    </template>
                    Size 5px
                </IkListItem>
                <IkListItem>
                    <template #prepend>
                        <IkBadge :size="15">
                            <Example />
                        </IkBadge>
                    </template>
                    Size 15px
                </IkListItem>
                <IkListItem>
                    <template #prepend>
                        <IkBadge :size="25">
                            <Example />
                        </IkBadge>
                    </template>
                    Size 25px
                </IkListItem>
            </IkList>
        </Story>
        <Story title="Number">
            <IkBadge number="0"
                     design="primary"
                     show_zero
                     class="ik-mr-3">
                <Example />
            </IkBadge>
            <IkBadge number="1"
                     design="primary"
                     class="ik-mr-3">
                <Example />
            </IkBadge>
            <IkBadge number="20"
                     design="primary"
                     class="ik-mr-3">
                <Example />
            </IkBadge>
        </Story>
        <Story title="Custom Content">
            <IkBadge :size="20">
                <Example />
                <template #content>
                    R
                </template>
            </IkBadge>
        </Story>
    </Stories>
</template>
