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
        :model-value="modelValue"
        @update:model-value="selection => {emit('update:modelValue', selection)}"
    >
    </v-text-field>
</template>

<script lang="ts" setup>
    const props = defineProps<{
        modelValue?: string | null
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: string | null): void
    }>();
</script>