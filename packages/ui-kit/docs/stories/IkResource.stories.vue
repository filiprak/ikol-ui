<script setup
        lang="ts">
        import { IkResource } from '@ui/components/IkResource';
</script>
<template>
    <Stories title="Components/Other/IkResource"
             :component="IkResource">
        <Story title="Default">
            <IkResource value="This is a default resource">This is a default resource</IkResource>
        </Story>
        <Story title="Copyable">
            <IkResource value="Copy this text"
                        :copyable="true">Copy this text</IkResource>
        </Story>
        <Story title="With URL">
            <IkResource uri="https://google.com">This is a link</IkResource>
        </Story>
        <Story title="New Tab">
            <IkResource uri="https://google.com"
                        target="_self">Open link _self</IkResource><br>
            <IkResource uri="https://google.com"
                        target="_blank">Open link _blank</IkResource><br>
            <IkResource uri="https://google.com"
                        target="_parent">Open link _parent</IkResource><br>
            <IkResource uri="https://google.com"
                        target="_top">Open link _top</IkResource>
        </Story>
        <Story title="Email">
            <IkResource uri="test@example.com"
                        email>Send email</IkResource>
        </Story>
        <Story title="Phone">
            <IkResource uri="+1234567890"
                        phone>Call this number</IkResource>
        </Story>
        <Story title="No Wrap">
            <IkResource value="This is a very long text that should not wrap"
                        no_wrap
                        copyable>This is a very long text that should not wrap. This is a very long text that
                should not wrap. This is a very long text that should not wrap. This is a very long text that should not
                wrap. This is a very long text that should not wrap.</IkResource>
        </Story>
    </Stories>
</template>
