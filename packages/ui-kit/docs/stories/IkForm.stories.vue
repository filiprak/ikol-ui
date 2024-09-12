<script setup lang="ts">
import { IkForm } from '@ui/components/IkForm';
import { IkButton } from '@ui/components/IkButton';
import { IkTextField } from '@ui/components/IkTextField';
import { ref } from 'vue';

const name = ref('');
const name_prefill = ref('John');
const surname = ref('');
const email = ref('');
</script>
<template>
    <Stories title="Components/Form/IkForm"
             :component="IkForm">
        <Story title="Default">
            <IkForm>
                <IkTextField label="Name"
                             required
                             placeholder="Enter text"
                             v-model="name">
                </IkTextField>
                <IkTextField label="Surname"
                             placeholder="Enter text"
                             v-model="surname">
                </IkTextField>
                <IkTextField label="Email"
                             placeholder="Enter text"
                             rules="email"
                             v-model="email">
                </IkTextField>
                <IkButton type="submit" design="primary">Submit</IkButton>
            </IkForm>
        </Story>
        <Story title="View Mode">
            <IkForm view_mode>
                <IkTextField label="Name"
                             required
                             placeholder="Enter text"
                             v-model="name_prefill">
                </IkTextField>
                <IkTextField label="Surname"
                             placeholder="Enter text"
                             v-model="surname">
                </IkTextField>
                <IkTextField label="Email"
                             placeholder="Enter text"
                             rules="email"
                             v-model="email">
                </IkTextField>
                <IkButton type="submit" design="primary">Submit</IkButton>
            </IkForm>
        </Story>
        <Story title="Skeleton">
            <IkForm skeleton>
                <IkTextField label="Name"
                             required
                             placeholder="Enter text"
                             v-model="name_prefill">
                </IkTextField>
                <IkTextField label="Surname"
                             placeholder="Enter text"
                             v-model="surname">
                </IkTextField>
                <IkTextField label="Email"
                             placeholder="Enter text"
                             rules="email"
                             v-model="email">
                </IkTextField>
                <IkButton type="submit" design="primary">Submit</IkButton>
            </IkForm>
        </Story>
        <Story title="Variant">
            <IkForm variant="filled">
                <IkTextField label="Name"
                             required
                             placeholder="Enter text"
                             v-model="name_prefill">
                </IkTextField>
                <IkTextField label="Surname"
                             placeholder="Enter text"
                             v-model="surname">
                </IkTextField>
                <IkTextField label="Email"
                             placeholder="Enter text"
                             rules="email"
                             v-model="email">
                </IkTextField>
                <IkButton type="submit" design="primary">Submit</IkButton>
            </IkForm>
        </Story>
    </Stories>
</template>
