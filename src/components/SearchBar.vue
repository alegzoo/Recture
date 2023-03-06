<template>
    <v-text-field
        class="search-bar"
        density="compact"
        variant="underlined"
        label="Search by the lesson's title..."
        clearable
        clear-icon="mdi-close"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @update:model-value="val => emit('searchQueryChanged', val)"
    >
    </v-text-field>
</template>

<script lang="ts" setup>
    const emit = defineEmits<{
        (e: "searchQueryChanged", searchQuery: string): void
    }>();
</script>