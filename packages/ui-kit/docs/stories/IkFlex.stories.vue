<script setup lang="ts">
import { IkFlex } from '@ui/components/IkFlex';

const Example = {
    template: `
        <div class="item" style="padding: 10px; border: 1px dashed red; background: #ff000030"><slot/></div>
    `,
};
</script>
<template>
    <Stories title="Components/Layout/IkFlex"
             :component="IkFlex">
        <Story title="Default">
            <IkFlex>
                <Example>Example 1</Example>
                <Example>Example 2</Example>
            </IkFlex>
        </Story>
        <Story title="Column">
            <IkFlex column>
                <Example>Example 1</Example>
                <Example>Example 2</Example>
            </IkFlex>
        </Story>
        <Story title="Full Width Items">
            <IkFlex full_width_items>
                <Example>Example 1</Example>
                <Example>Example 2</Example>
            </IkFlex>
        </Story>
        <Story title="Full Height Items">
            <IkFlex full_height_items
                    style="height: 150px;">
                <Example>Example 1</Example>
                <Example>Example 2</Example>
            </IkFlex>
        </Story>
        <Story title="Fixed And Grow">
            <IkFlex fixed_and_grow>
                <Example>Example 1</Example>
                <Example>Example 2</Example>
            </IkFlex>
        </Story>
        <Story title="Grow And Fixed">
            <IkFlex grow_and_fixed>
                <Example>Example 1</Example>
                <Example>Example 2</Example>
            </IkFlex>
        </Story>
        <Story title="Justify Start">
            <IkFlex justify_start>
                <Example>Example 1</Example>
                <Example>Example 2</Example>
            </IkFlex>
        </Story>
        <Story title="Justify End">
            <IkFlex justify_end>
                <Example>Example 1</Example>
                <Example>Example 2</Example>
            </IkFlex>
        </Story>
        <Story title="Justify Space">
            <IkFlex justify_space>
                <Example>Example 1</Example>
                <Example>Example 2</Example>
            </IkFlex>
        </Story>
        <Story title="Align Start">
            <IkFlex align_start
                    style="height: 150px">
                <Example>Example 1</Example>
                <Example>Example 2</Example>
            </IkFlex>
        </Story>
        <Story title="Align End">
            <IkFlex align_end
                    style="height: 150px">
                <Example>Example 1</Example>
                <Example>Example 2</Example>
            </IkFlex>
        </Story>
        <Story title="Wrap">
            <IkFlex wrap>
                <Example>This child will be wrapped to next line</Example>
                <Example>This child will be wrapped to next line</Example>
                <Example>This child will be wrapped to next line</Example>
                <Example>This child will be wrapped to next line</Example>
                <Example>This child will be wrapped to next line</Example>
            </IkFlex>
        </Story>
        <Story title="Wrap Text">
            <IkFlex wrap_text>
                <Example>
                    This child text will be wrapped to next line on overflow.
                    This child text will be wrapped to next line on overflow.
                    This child text will be wrapped to next line on overflow.
                    This child text will be wrapped to next line on overflow.
                    This child text will be wrapped to next line on overflow.
                    This child text will be wrapped to next line on overflow.
                </Example>
            </IkFlex>
        </Story>
        <Story title="Reverse">
            <IkFlex reverse>
                <Example>Example 1</Example>
                <Example>Example 2</Example>
            </IkFlex>
        </Story>
    </Stories>
</template>
