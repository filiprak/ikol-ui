<script setup lang="ts">
import { IkSelect } from '@ui/components/IkSelect';
import { IkUIElemSize, IkUIVariant } from '@ui/types/utils';
import { IkGrid, IkGridItem } from '@ui/components/IkGrid';
import { ref, shallowRef } from 'vue';

const items = shallowRef([
    { code: 1, name: 'John Doe', descr: 'Designs and implements software solutions to meet client needs.', avatar: 'https://picsum.photos/48?random=1' },
    { code: 2, name: 'Matt Benett', descr: 'Develops and executes marketing strategies to promote products or services.', avatar: 'https://picsum.photos/48?random=2' },
    { code: 3, name: 'Adam Setter', descr: 'Provides compassionate care to patients, administering medications, and treatments.', avatar: 'https://picsum.photos/48?random=3' },
]);
const vmodel = ref();
const vmodel_clearable = ref(2);
const vmodel_chip = ref(2);
const vmodel_img = ref(2);
const vmodel_obj = ref();

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));
const asyncItemsSimple = async () => {
    await delay(1200);

    return { items: items.value };
};

let async_items = () => new Array(73).fill(0).map((_, index) => {
    return {
        name: `Async Item ${index + 1}`,
        code: index + 1,
    };
});
const asyncItemsPaginated = async (request = { offset: 0, limit: 15, search_string: '' }) => {
    await delay(500);
    let filtered_items = async_items().filter(item => {
        return item.name.toLowerCase().indexOf(request.search_string.toLowerCase()) > -1;
    });
    let has_more = request.offset + request.limit < filtered_items.length;

    let result = {
        items: filtered_items.slice(request.offset, request.offset + request.limit),
        offset: request.offset,
        has_more,
    };

    return result;
};
const getVirtualItems = (n = 400) => new Array(n).fill(0).map((_, index) => {
    return {
        name: `Virtual Item ${index + 1}`,
        code: index + 1,
    };
});
</script>
<template>
    <Stories title="Components/Inputs/IkSelect"
             :component="IkSelect">
        <Story title="Default">
            <IkSelect v-model="vmodel"
                      value_key="code"
                      text_key="name"
                      placeholder="Select item"
                      :items="items">
            </IkSelect>
        </Story>
        <Story title="Variant">
            <div v-for="variant in IkUIVariant"
                 class="ik-mb-4">
                <IkSelect :variant="variant"
                          v-model="vmodel"
                          value_key="code"
                          text_key="name"
                          placeholder="Select item"
                          :items="items">
                </IkSelect>
            </div>
        </Story>
        <Story title="Size">
            <IkGrid>
                <IkGridItem xs-3 v-for="variant in IkUIVariant">
                    <IkSelect v-for="size in IkUIElemSize"
                              class="ik-mb-4"
                              :size="size"
                              :variant="variant"
                              v-model="vmodel"
                              value_key="code"
                              text_key="name"
                              placeholder="Select item"
                              :items="items">
                    </IkSelect>
                </IkGridItem>
            </IkGrid>
        </Story>
        <Story title="Inline">
            <IkSelect v-model="vmodel"
                      inline
                      value_key="code"
                      text_key="name"
                      placeholder="Select item"
                      :items="items">
            </IkSelect>
        </Story>
        <Story title="Variant Chip">
            <IkSelect variant_chip
                      v-model="vmodel_chip"
                      value_key="code"
                      text_key="name"
                      placeholder="Select item"
                      :items="items">
            </IkSelect>
        </Story>
        <Story title="Disabled">
            <IkSelect v-model="vmodel"
                      disabled
                      value_key="code"
                      text_key="name"
                      placeholder="Select item"
                      :items="items">
            </IkSelect>
        </Story>
        <Story title="Clearable">
            <IkSelect v-model="vmodel_clearable"
                      clearable
                      value_key="code"
                      text_key="name"
                      placeholder="Select item"
                      :items="items">
            </IkSelect>
        </Story>
        <Story title="Filter">
            <IkSelect v-model="vmodel"
                      filter
                      value_key="code"
                      text_key="name"
                      placeholder="Select item"
                      :items="items">
            </IkSelect>
        </Story>
        <Story title="Placeholder">
            <IkSelect v-model="vmodel"
                      value_key="code"
                      text_key="name"
                      placeholder="My placeholder"
                      :items="items">
            </IkSelect>
        </Story>
        <Story title="Subtext">
            <IkSelect v-model="vmodel"
                      value_key="code"
                      text_key="name"
                      subtext_key="descr"
                      placeholder="Select item"
                      :items="items">
            </IkSelect>
        </Story>
        <Story title="Image">
            <IkGrid>
                <IkGridItem xs-3 v-for="variant in IkUIVariant">
                    <IkSelect v-model="vmodel_img"
                              :variant="variant"
                              value_key="code"
                              text_key="name"
                              img_key="avatar"
                              subtext_key="descr"
                              placeholder="Select item"
                              :items="items">
                    </IkSelect>
                </IkGridItem>
            </IkGrid>
            <IkGrid class="ik-mt-3">
                <IkGridItem xs-3 v-for="variant in IkUIVariant">
                    <IkSelect v-model="vmodel_img"
                              :variant="variant"
                              value_key="code"
                              text_key="name"
                              img_key="avatar"
                              round_img
                              subtext_key="descr"
                              placeholder="Select item"
                              :items="items">
                    </IkSelect>
                </IkGridItem>
            </IkGrid>
            <IkGrid class="ik-mt-3">
                <IkGridItem xs-3 v-for="variant in IkUIVariant">
                    <IkSelect v-model="vmodel_img"
                              :variant="variant"
                              variant_chip
                              value_key="code"
                              text_key="name"
                              img_key="avatar"
                              round_img
                              subtext_key="descr"
                              placeholder="Select item"
                              :items="items">
                    </IkSelect>
                </IkGridItem>
            </IkGrid>
        </Story>
        <Story title="Dropdown Image Size">
            <IkSelect v-model="vmodel_img"
                      :dropdown_img_size="42"
                      value_key="code"
                      text_key="name"
                      img_key="avatar"
                      subtext_key="descr"
                      placeholder="Select item"
                      :items="items">
            </IkSelect>
        </Story>
        <Story title="Dropdown Width">
            <IkSelect v-model="vmodel"
                      value_key="code"
                      text_key="name"
                      :min_dropdown_width="300"
                      :max_dropdown_width="400"
                      placeholder="Select item"
                      :items="items">
            </IkSelect>
        </Story>
        <Story title="Disabled Items">
            <IkSelect v-model="vmodel"
                      value_key="code"
                      text_key="name"
                      :disabled_items="i => i.code > 1"
                      placeholder="Select item"
                      :items="items">
            </IkSelect>
        </Story>
        <Story title="Async Items">
            <IkSelect v-model="vmodel_obj"
                      text_key="name"
                      unique_key="code"
                      placeholder="Select item"
                      :items="asyncItemsSimple">
            </IkSelect>
        </Story>
        <Story title="Async Paginated Items">
            <IkSelect v-model="vmodel_obj"
                      text_key="name"
                      unique_key="code"
                      placeholder="Select item"
                      :items="asyncItemsPaginated">
            </IkSelect>
        </Story>
        <Story title="Async Filtered Items">
            <IkSelect v-model="vmodel_obj"
                      filter
                      text_key="name"
                      unique_key="code"
                      placeholder="Select item"
                      :items="asyncItemsPaginated">
            </IkSelect>
        </Story>
        <Story title="Virtual Scroller Items">
            <IkSelect v-model="vmodel_obj"
                      filter
                      virtual_scroller
                      text_key="name"
                      unique_key="code"
                      placeholder="Select item"
                      :items="getVirtualItems(1000)">
            </IkSelect>
        </Story>
    </Stories>
</template>
