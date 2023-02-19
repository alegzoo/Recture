<template>
    <v-text-field
        class="search-bar"
        density="compact"
        variant="solo"
        label="Search by the lesson's title..."
        clearable
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        theme="light"
    >
        <template v-slot:clear>
            <v-icon icon="mdi-close"/>
        </template>
    </v-text-field>
</template>

<script lang="ts" setup>

</script>