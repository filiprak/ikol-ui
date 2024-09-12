<script setup lang = "ts" >
import { IkChipList } from '@ui/components/IkChipList';
import { IkChip } from '@ui/components/IkChip';

</script>

<template>
    <Stories title="Components/Other/IkChipList"
             description="Chip component"
             :component="IkChipList">
        <Story title="Default">
            <IkChipList>
                <IkChip>Chip 1</IkChip>
                <IkChip>Chip 2</IkChip>
                <IkChip>Chip 3</IkChip>
            </IkChipList>
        </Story>      
      
    </Stories>
</template>
