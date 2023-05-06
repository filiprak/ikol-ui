<template>
    <div class="ik-list">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import '@/styles';
import './IkList.css';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'IkList',

});
</script>
