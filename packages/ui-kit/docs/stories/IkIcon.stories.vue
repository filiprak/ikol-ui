<script setup lang="ts">
import { IkIcon } from '@ui/components/IkIcon';
import { IkUIDesignColor } from '@ui/types/utils';

</script>
<template>
    <Stories title="Components/Images & Icons/IkIcon"
             :component="IkIcon">
        <Story title="Default">
            <IkIcon icon="house"></IkIcon>
        </Story>
        <Story title="Design">
            <IkIcon icon="house"
                    :design="design"
                    class="ik-mr-3"
                    v-for="design in IkUIDesignColor"></IkIcon>
        </Story>
        <Story title="Circle">
            <IkIcon icon="house"
                    circle
                    :design="design"
                    class="ik-mr-3"
                    v-for="design in IkUIDesignColor"></IkIcon>
        </Story>
        <Story title="Size 2x">
            <IkIcon icon="house"
                    :size="2"
                    :design="design"
                    class="ik-mr-3"
                    v-for="design in IkUIDesignColor"></IkIcon>
        </Story>
        <Story title="Size In Pixels">
            <div>
                <IkIcon icon="house"
                        :size_px="20"
                        class="ik-mr-3"></IkIcon>
                <IkIcon icon="house"
                        :size_px="25"
                        class="ik-mr-3"></IkIcon>
                <IkIcon icon="house"
                        :size_px="30"
                        class="ik-mr-3"></IkIcon>
                <IkIcon icon="house"
                        :size_px="40"
                        class="ik-mr-3"></IkIcon>
                <IkIcon icon="house"
                        :size_px="60"
                        class="ik-mr-3"></IkIcon>
            </div>
            <div class="ik-mt-3">
                <IkIcon icon="house"
                        circle
                        :size_px="20"
                        class="ik-mr-3"></IkIcon>
                <IkIcon icon="house"
                        circle
                        :size_px="25"
                        class="ik-mr-3"></IkIcon>
                <IkIcon icon="house"
                        circle
                        :size_px="30"
                        class="ik-mr-3"></IkIcon>
                <IkIcon icon="house"
                        circle
                        :size_px="40"
                        class="ik-mr-3"></IkIcon>
                <IkIcon icon="house"
                        circle
                        :size_px="60"
                        class="ik-mr-3"></IkIcon>
            </div>
        </Story>
        <Story title="Disabled">
            <IkIcon icon="house"
                    disabled
                    :design="design"
                    class="ik-mr-3"
                    v-for="design in IkUIDesignColor"></IkIcon>
        </Story>
        <Story title="Filled Circle Variant">
            <IkIcon icon="house"
                    circle
                    variant="filled"
                    :design="design"
                    class="ik-mr-3"
                    v-for="design in IkUIDesignColor"></IkIcon>
        </Story>
        <Story title="Regular Thickness">
            <IkIcon icon="user:regular"
                    :design="design"
                    class="ik-mr-3"
                    v-for="design in IkUIDesignColor"></IkIcon>
        </Story>
        <Story title="Solid Thickness">
            <IkIcon icon="user"
                    :design="design"
                    class="ik-mr-3"
                    v-for="design in IkUIDesignColor"></IkIcon>
        </Story>
    </Stories>
</template>
