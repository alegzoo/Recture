<template>
    <v-btn theme="light">
        Dropdown
        <v-list
            v-model="dialog"
            activator="parent"
            width="auto"
            v-for="(item, index) in items"
            :key="index"
            >
            <v-list-item-title>
                {{ item.title }}
            </v-list-item-title>
        </v-list>
    </v-btn>
</template>

<style lang="scss">

</style>

<script lang="ts" setup>
import { ref } from 'vue'

    const items = [
        { title: 'Newest' },
        { title: 'Oldest' },
        { title: 'Private' },
    ];

const dialog = ref(false);
</script>