<script setup lang="ts">
import { IkButton } from '@ui/components/IkButton';
import { IkPopover } from '@ui/components/IkPopover';
import { vPopoverActivator } from '@ui/directives/popover';
import { nextTick, ref } from 'vue';
import { IkAlignment, IkPosition } from '@ui/types/utils';

const LoremIpsum = {
    template: `
        <div class="ik-pa-4">
            Lorem ipsum dolor sit amet,<br/>
            consectetur adipiscing elit,<br/>
            sed do eiusmod tempor incididunt<br/>
            ut labore et dolore magna aliqua.
            <div v-if="$slots.default" class="ik-mt-3"><slot></slot></div>
        </div>
  `,
};

const context1 = ref();
const context2 = ref();
const modal_ref = ref();
const is_modal = ref(false);
const wrapper = ref();
</script>
<template>
    <Stories title="Components/Other/IkPopover"
             :component="IkPopover">
        <Story title="Default">
            <IkPopover>
                <template #activator="{ on }">
                    <IkButton v-on="on">Open Popover</IkButton>
                </template>
                <LoremIpsum />
            </IkPopover>
        </Story>
        <Story title="Open On Click">
            <IkPopover open_on_click>
                <template #activator="{ on }">
                    <IkButton v-on="on">Open Popover</IkButton>
                </template>
                <LoremIpsum />
            </IkPopover>
        </Story>
        <Story title="Position And Alignment">
            <div v-for="position in  IkPosition">
                <template v-for="align in IkAlignment">
                    <IkPopover :position="position"
                               :align="align">
                        <template #activator="{ on }">
                            <IkButton v-on="on"
                                      class="ik-mr-3 ik-mb-3">{{ position }} - {{ align }}</IkButton>
                        </template>
                        <LoremIpsum />
                    </IkPopover>
                </template>
            </div>
        </Story>
        <Story title="Arrow">
            <div v-for="position in  IkPosition">
                <template v-for="align in IkAlignment">
                    <IkPopover arrow
                               :position="position"
                               :align="align">
                        <template #activator="{ on }">
                            <IkButton v-on="on"
                                      class="ik-mr-3 ik-mb-3">{{ position }} - {{ align }}</IkButton>
                        </template>
                        <LoremIpsum />
                    </IkPopover>
                </template>
            </div>
        </Story>
        <Story title="Dynamic positioning">
            <div :style="{ position: 'relative', width: '600px', height: '600px', backgroundColor: 'lightgray' }"
                 ref="wrapper">
                <IkPopover v-for=" pos  in  [0, '40%', '80%'].map(i => [0, '50%', '95%'].map(j => [i, j])).flat() "
                           dynamic_positioning arrow
                           position="top"
                           :bounding_el="wrapper">
                    <template #activator="{ on }">
                        <IkButton :style="{ position: 'absolute', left: pos[0], top: pos[1], }"
                                  v-on="on">
                            Open Popover
                        </IkButton>
                    </template>
                    <LoremIpsum />
                </IkPopover>
            </div>
        </Story>
        <Story title="Offset">
            <IkPopover :offset="30">
                <template #activator="{ on }">
                    <IkButton v-on="on">Open Popover</IkButton>
                </template>
                <LoremIpsum />
            </IkPopover>
        </Story>
        <Story title="Min Max Sizes">
            <IkPopover :min_width="400">
                <template #activator="{ on }">
                    <IkButton v-on="on"
                              class="ik-mr-3">Min width 400px</IkButton>
                </template>
                <LoremIpsum />
            </IkPopover>
            <IkPopover :max_width="150">
                <template #activator="{ on }">
                    <IkButton v-on="on"
                              class="ik-mr-3">Min width 400px</IkButton>
                </template>
                <LoremIpsum />
            </IkPopover>
            <IkPopover :min_height="200">
                <template #activator="{ on }">
                    <IkButton v-on="on"
                              class="ik-mr-3">Min width 400px</IkButton>
                </template>
                <LoremIpsum />
            </IkPopover>
        </Story>
        <Story title="Delay">
            <IkPopover v-for=" delay  in  [0, 200, 1000] "
                       :delay_miliseconds="delay">
                <template #activator="{ on }">
                    <IkButton v-on="on"
                              class="ik-mr-3">Delay {{ delay }}ms</IkButton>
                </template>
                <LoremIpsum />
            </IkPopover>
        </Story>
        <Story title="Use Activator Width">
            <IkPopover use_activator_width
                       position="horizontal">
                <template #activator="{ on }">
                    <IkButton v-on="on">Use activator width</IkButton>
                </template>
                <LoremIpsum />
            </IkPopover>
        </Story>
        <Story title="Floating Context">
            <div>
                <IkButton v-popover-activator="{ id: 'my-popover-1', activator_id: 'activ-1' }"
                          class="ik-mb-3">Context 1</IkButton>
            </div>
            <div>
                <IkButton v-popover-activator="{ id: 'my-popover-1', activator_id: 'activ-2' }"
                          class="ik-mb-3">Context 2</IkButton>
            </div>
            <div>
                <IkButton v-popover-activator="{ id: 'my-popover-1', activator_id: 'activ-3' }"
                          class="ik-mb-3">Context 3</IkButton>
            </div>
            <IkPopover id="my-popover-1"
                       v-model:activator_id="context1">
                <LoremIpsum />
            </IkPopover>
        </Story>
        <Story title="Transition">
            <div>
                <IkButton v-popover-activator="{ id: 'my-popover-2', activator_id: 'activ-1' }"
                          class="ik-mb-3">Context 1</IkButton>
            </div>
            <div>
                <IkButton v-popover-activator="{ id: 'my-popover-2', activator_id: 'activ-2' }"
                          class="ik-mb-3">Context 2</IkButton>
            </div>
            <div>
                <IkButton v-popover-activator="{ id: 'my-popover-2', activator_id: 'activ-3' }"
                          class="ik-mb-3">Context 3</IkButton>
            </div>
            <IkPopover transition
                       id="my-popover-2"
                       v-model:activator_id="context2">
                <LoremIpsum />
            </IkPopover>
        </Story>
        <Story title="Nested">
            <IkPopover open_on_click>
                <template #activator="{ on }">
                    <IkButton v-on="on">Open Popover</IkButton>
                </template>
                <LoremIpsum>
                    <IkPopover open_on_click>
                        <template #activator="{ on }">
                            <IkButton v-on="on">Open Nested</IkButton>
                        </template>
                        <LoremIpsum>
                            <IkPopover open_on_click>
                                <template #activator="{ on }">
                                    <IkButton v-on="on">Open More Nested</IkButton>
                                </template>
                                <LoremIpsum />
                            </IkPopover>
                        </LoremIpsum>
                    </IkPopover>
                </LoremIpsum>
            </IkPopover>
        </Story>
        <Story title="Modal">
            <IkPopover ref="modal_ref"
                       open_on_click
                       :modal="is_modal">
                <template #activator="{ on }">
                    <IkButton v-on="on"
                              @click="is_modal = true">Open Popover</IkButton>
                </template>
                <LoremIpsum>
                    <IkButton @click="() => {
                is_modal = false;
                nextTick(() => modal_ref?.close());
            }">Close</IkButton>
                </LoremIpsum>
            </IkPopover>
        </Story>
    </Stories>
</template>
