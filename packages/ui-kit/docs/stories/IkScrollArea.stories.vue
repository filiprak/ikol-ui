<script setup lang="ts">
import { reactive, computed } from 'vue';
import { IkScrollArea } from '@ui/components/IkScrollArea';

const Item = {
    template: `
        <div class="item" style="padding: 10px; border: 1px dashed red; background: #ff000030"><slot/></div>
    `,
};
const Items = {
    template: `
        <div style="display: grid; grid-auto-flow: column"><slot/></div>
    `,
};
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));
let total = 73;
let async_items = () => new Array(total).fill(0).map((_, index) => {
    return {
        name: `Async Item ${index + 1}`,
        code: index + 1,
    };
});
const infinite = reactive({
    loading: false,
    items: async_items().slice(0, 15),
    pagination: {
        offset: 0,
        limit: 15,
        has_more: true,
    },
});
const loadMore = async () => {
    infinite.loading = true;

    await delay(500);

    infinite.items = async_items().slice(0, infinite.items.length + infinite.pagination.limit);
    infinite.pagination.offset = infinite.items.length;
    infinite.pagination.has_more = infinite.items.length < total;

    infinite.loading = false;
};
const reversed_items = computed(() => infinite.items.slice().reverse());
</script>
<template>
    <Stories title="Components/Scroll/IkScrollArea"
             :component="IkScrollArea">
        <Story title="Default">
            <IkScrollArea style="width: 250px; height: 150px">
                <Item v-for="i in 25">Scroll Item {{ i }}</Item>
            </IkScrollArea>
        </Story>
        <Story title="Horizontal Arrows">
            <IkScrollArea horizontal_arrows
                          style="width: 400px; height: 150px">
                <Items>
                    <Item v-for="i in 25">Scroll Item {{ i }}</Item>
                </Items>
            </IkScrollArea>
        </Story>
        <Story title="Infinite">
            <IkScrollArea @ik-load-more="loadMore"
                          :loading="infinite.loading"
                          :pagination="infinite.pagination"
                          style="width: 250px; height: 150px">
                <Item v-for="i in infinite.items">Scroll Item {{ i.code }}</Item>
            </IkScrollArea>
        </Story>
        <Story title="Infinite Reversed">
            <IkScrollArea @ik-load-more="loadMore"
                          reverse
                          :loading="infinite.loading"
                          :pagination="infinite.pagination"
                          style="width: 250px; height: 150px">
                <Item v-for="i in reversed_items">Scroll Item {{ i.code }}</Item>
            </IkScrollArea>
        </Story>
    </Stories>
</template>
