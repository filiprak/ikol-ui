<script setup lang="ts">
import { computed } from 'vue';
import { IkVirtualScroller } from '@ui/components/IkVirtualScroller';

const Item = {
    template: `
        <div class="item" style="padding: 10px; border: 1px dashed red; background: #ff000030"><slot/></div>
    `,
};
const getVirtualItems = (n = 1000) => new Array(n).fill(0).map((_, index) => {
    return {
        name: `Virtual Item ${index + 1}`,
        code: index + 1,
    };
});
const getHeight = (item = { code: 0, name: '' }) => (item.code % 3) ? 58 : 40;
const items = computed(() => getVirtualItems(10000));
</script>
<template>
    <Stories title="Components/Scroll/IkVirtualScroller"
             :component="IkVirtualScroller">
        <Story title="Default">
            <IkVirtualScroller :items="items"
                               style="height: 250px; width: 250px">
                <template #item="{ item }">
                    <Item>Scroll Item {{ item.code }}</Item>
                </template>
            </IkVirtualScroller>
        </Story>
        <Story title="Item Height">
            <IkVirtualScroller :items="items"
                               :item_height="getHeight"
                               style="height: 250px; width: 250px">
                <template #item="{ item }">
                    <Item>
                        Scroll Item {{ item.code }}
                        <template v-if="item.code % 3">
                            <br>
                            This is second line
                        </template>
                    </Item>
                </template>
            </IkVirtualScroller>
        </Story>
    </Stories>
</template>
