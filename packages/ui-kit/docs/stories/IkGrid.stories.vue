<script setup lang="ts">
import { IkGrid, IkGridItem } from '@ui/components/IkGrid';

const Example = {
    template: `
        <div class="item" style="padding: 10px; border: 1px dashed red; background: #ff000030"><slot/></div>
    `,
};
</script>
<template>
    <Stories title="Components/Layout/IkGrid"
             :component="IkGrid">
        <Story title="Default">
            <IkGrid>
                <IkGridItem xs-4>
                    <Example>Grid Item 1</Example>
                </IkGridItem>
                <IkGridItem xs-4>
                    <Example>Grid Item 2</Example>
                </IkGridItem>
                <IkGridItem xs-4>
                    <Example>Grid Item 3</Example>
                </IkGridItem>
                <IkGridItem xs-4>
                    <Example>Grid Item 4</Example>
                </IkGridItem>
                <IkGridItem xs-4>
                    <Example>Grid Item 5</Example>
                </IkGridItem>
                <IkGridItem xs-4>
                    <Example>Grid Item 6</Example>
                </IkGridItem>
            </IkGrid>
        </Story>
        <Story title="Stacked">
            <IkGrid>
                <IkGridItem xs-12>
                    <Example>Grid Item 1</Example>
                </IkGridItem>
                <IkGridItem xs-12>
                    <Example>Grid Item 2</Example>
                </IkGridItem>
                <IkGridItem xs-12>
                    <Example>Grid Item 3</Example>
                </IkGridItem>
            </IkGrid>
        </Story>
        <Story title="Spacing X">
            <IkGrid :spacing_x="6">
                <IkGridItem xs-4>
                    <Example>Grid Item 1</Example>
                </IkGridItem>
                <IkGridItem xs-4>
                    <Example>Grid Item 2</Example>
                </IkGridItem>
                <IkGridItem xs-4>
                    <Example>Grid Item 3</Example>
                </IkGridItem>
                <IkGridItem xs-4>
                    <Example>Grid Item 4</Example>
                </IkGridItem>
                <IkGridItem xs-4>
                    <Example>Grid Item 5</Example>
                </IkGridItem>
                <IkGridItem xs-4>
                    <Example>Grid Item 6</Example>
                </IkGridItem>
            </IkGrid>
        </Story>
        <Story title="Spacing Y">
            <IkGrid :spacing_y="6">
                <IkGridItem xs-4>
                    <Example>Grid Item 1</Example>
                </IkGridItem>
                <IkGridItem xs-4>
                    <Example>Grid Item 2</Example>
                </IkGridItem>
                <IkGridItem xs-4>
                    <Example>Grid Item 3</Example>
                </IkGridItem>
                <IkGridItem xs-4>
                    <Example>Grid Item 4</Example>
                </IkGridItem>
                <IkGridItem xs-4>
                    <Example>Grid Item 5</Example>
                </IkGridItem>
                <IkGridItem xs-4>
                    <Example>Grid Item 6</Example>
                </IkGridItem>
            </IkGrid>
        </Story>
        <Story title="Relative">
            <div class="ik-mb-5" style="width: 199px; border: 1px dashed blue; padding: 5px">
                <IkGrid relative sm="200" md="400" lg="600">
                    <IkGridItem xs-12 sm-6 md-3>
                        <Example>Grid Item 1</Example>
                    </IkGridItem>
                    <IkGridItem xs-12 sm-6 md-3>
                        <Example>Grid Item 2</Example>
                    </IkGridItem>
                    <IkGridItem xs-12 sm-6 md-3>
                        <Example>Grid Item 3</Example>
                    </IkGridItem>
                    <IkGridItem xs-12 sm-6 md-3>
                        <Example>Grid Item 4</Example>
                    </IkGridItem>
                </IkGrid>
            </div>
            <div class="ik-mb-5" style="width: 399px; border: 1px dashed blue; padding: 5px">
                <IkGrid relative sm="200" md="400" lg="600">
                    <IkGridItem xs-12 sm-6 md-3>
                        <Example>Grid Item 1</Example>
                    </IkGridItem>
                    <IkGridItem xs-12 sm-6 md-3>
                        <Example>Grid Item 2</Example>
                    </IkGridItem>
                    <IkGridItem xs-12 sm-6 md-3>
                        <Example>Grid Item 3</Example>
                    </IkGridItem>
                    <IkGridItem xs-12 sm-6 md-3>
                        <Example>Grid Item 4</Example>
                    </IkGridItem>
                </IkGrid>
            </div>
            <div class="ik-mb-5" style="width: 599px; border: 1px dashed blue; padding: 5px">
                <IkGrid relative sm="200" md="400" lg="600">
                    <IkGridItem xs-12 sm-6 md-3>
                        <Example>Grid Item 1</Example>
                    </IkGridItem>
                    <IkGridItem xs-12 sm-6 md-3>
                        <Example>Grid Item 2</Example>
                    </IkGridItem>
                    <IkGridItem xs-12 sm-6 md-3>
                        <Example>Grid Item 3</Example>
                    </IkGridItem>
                    <IkGridItem xs-12 sm-6 md-3>
                        <Example>Grid Item 4</Example>
                    </IkGridItem>
                </IkGrid>
            </div>
        </Story>
    </Stories>
</template>
