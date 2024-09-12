<script setup lang="ts">
import { IkSVGIcon } from "@ui/components/IkSVGIcon";
import { IkUIDesignColor } from "@ui/types/utils";

</script>
<template>
    <Stories title="Components/Images & Icons/IkSVGIcon"
             :component="IkSVGIcon">
        <Story title="Default">
            <IkSVGIcon src="assets/airplane.svg" />
        </Story>
        <Story title="Design">
            <div>
                <IkSVGIcon v-for="design in IkUIDesignColor"
                           src="assets/airplane.svg"
                           class="ik-mr-3"
                           :design="design" />
            </div>
            <div>
                <IkSVGIcon v-for="design in IkUIDesignColor"
                           src="assets/airplane.svg"
                           class="ik-mr-3"
                           variant="filled"
                           :design="design" />
            </div>
        </Story>
        <Story title="Sizes">
            <div>
                <IkSVGIcon class="ik-mr-3"
                           src="assets/airplane.svg"
                           :size_px="20" />
                <IkSVGIcon class="ik-mr-3"
                           :size_px="25"
                           src="assets/airplane.svg" />
                <IkSVGIcon class="ik-mr-3"
                           src="assets/airplane.svg"
                           :size_px="30" />
                <IkSVGIcon class="ik-mr-3"
                           src="assets/airplane.svg"
                           :size_px="40" />
                <IkSVGIcon class="ik-mr-3"
                           src="assets/airplane.svg"
                           :size_px="60" />
            </div>
            <div>
                <IkSVGIcon class="ik-mr-3"
                           circle
                           variant="filled"
                           src="assets/airplane.svg"
                           :size_px="20" />
                <IkSVGIcon class="ik-mr-3"
                           circle
                           variant="filled"
                           :size_px="25"
                           src="assets/airplane.svg" />
                <IkSVGIcon class="ik-mr-3"
                           circle
                           variant="filled"
                           src="assets/airplane.svg"
                           :size_px="30" />
                <IkSVGIcon class="ik-mr-3"
                           circle
                           variant="filled"
                           src="assets/airplane.svg"
                           :size_px="40" />
                <IkSVGIcon class="ik-mr-3"
                           circle
                           variant="filled"
                           src="assets/airplane.svg"
                           :size_px="60" />
            </div>
        </Story>
        <Story title="Inner Scale">
            <div>
                <IkSVGIcon class="ik-mr-3"
                           circle
                           src="assets/airplane.svg"
                           :inner_scale="0.4"
                           :size_px="45" />
                <IkSVGIcon class="ik-mr-3"
                           circle
                           src="assets/airplane.svg"
                           :inner_scale="0.5"
                           :size_px="45" />
                <IkSVGIcon class="ik-mr-3"
                           circle
                           src="assets/airplane.svg"
                           :inner_scale="0.7"
                           :size_px="45" />
            </div>
        </Story>
        <Story title="Disabled">
            <IkSVGIcon class="ik-mr-3"
                       :design="design"
                       src="assets/airplane.svg"
                       disabled
                       v-for="design in IkUIDesignColor" />
        </Story>
        <Story title="Circle">
            <IkSVGIcon class="ik-mr-3"
                       :design="design"
                       src="assets/airplane.svg"
                       circle
                       v-for="design in IkUIDesignColor" />
        </Story>
        <Story title="Filled Circle Variant">
            <IkSVGIcon class="ik-mr-3"
                       :design="design"
                       src="assets/airplane.svg"
                       circle
                       variant="filled"
                       v-for="design in IkUIDesignColor" />
        </Story>
        <Story title="Custom Color">
            <IkSVGIcon class="ik-mr-3"
                       src="assets/airplane.svg"
                       circle
                       color="f07000" />
            <IkSVGIcon class="ik-mr-3"
                       src="assets/airplane.svg"
                       variant="filled"
                       circle
                       color="000000" />
            <IkSVGIcon class="ik-mr-3"
                       src="assets/airplane.svg"
                       variant="filled"
                       color="ffff00" />
        </Story>
    </Stories>
</template>
