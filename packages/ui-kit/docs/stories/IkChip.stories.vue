<script setup lang = "ts" >
import { IkChip } from '@ui/components/IkChip';
import { IkChipList } from '@ui/components/IkChipList';
import { IkUIDesignColor } from '@ui/types/utils';
</script>

<template>
    <Stories title="Components/Other/IkChip"
             description="Chip component"
             :component="IkChip">
        <Story title="Default">
            <IkChip>
                Chip text
            </IkChip>
        </Story>
        <Story title="Design">
            <IkChipList>
                <IkChip v-for="design in IkUIDesignColor"
                        :design="design">
                    Chip text
                </IkChip>
            </IkChipList>
        </Story>
        <Story title="Removable">
            <IkChipList>
                <IkChip v-for="design in IkUIDesignColor"
                        removable
                        :design="design">
                    Chip text
                </IkChip>
            </IkChipList>
        </Story>
        <Story title="Disabled">
            <IkChipList>
                <IkChip v-for="design in IkUIDesignColor"
                        disabled
                        :design="design">
                    Chip text
                </IkChip>
            </IkChipList>
        </Story>
        <Story title="Custom action">
            <IkChipList>
                <IkChip v-for="design in IkUIDesignColor"
                        custom_action="pen"
                        :design="design">
                    Chip text
                </IkChip>
            </IkChipList>
        </Story>
        <Story title="Size">
            <IkChipList>
                <IkChip v-for="design in IkUIDesignColor"
                        size="sm"
                        :design="design">
                    Chip text
                </IkChip>
            </IkChipList>
            <IkChipList>
                <IkChip v-for="design in IkUIDesignColor"
                        removable
                        size="sm"
                        :design="design">
                    Chip text
                </IkChip>
            </IkChipList>
            <IkChipList>
                <IkChip v-for="design in IkUIDesignColor"
                        removable
                        custom_action="pen:light"
                        size="sm"
                        :design="design">
                    Chip text
                </IkChip>
            </IkChipList>
        </Story>
        <Story title="Color">
            <IkChipList>
                <IkChip color="507733">
                    Chip text
                </IkChip>
                <IkChip color="507733"
                        removable>
                    Chip text
                </IkChip>
                <IkChip color="507733"
                        removable
                        custom_action="pen">
                    Chip text
                </IkChip>
            </IkChipList>
            <IkChipList>
                <IkChip color="EEEEEE">
                    Chip text
                </IkChip>
                <IkChip color="EEEEEE"
                        removable>
                    Chip text
                </IkChip>
                <IkChip color="EEEEEE"
                        removable
                        custom_action="pen">
                    Chip text
                </IkChip>
            </IkChipList>
            <IkChipList>
                <IkChip color="0044ff"
                        size="sm">
                    Chip text
                </IkChip>
                <IkChip color="0044ff"
                        size="sm"
                        removable>
                    Chip text
                </IkChip>
                <IkChip color="0044ff"
                        removable
                        size="sm"
                        custom_action="pen">
                    Chip text
                </IkChip>
            </IkChipList>
        </Story>
    </Stories>
</template>
