<template>
    <v-btn>{{ text }}</v-btn>
</template>

<script lang="ts" setup>
    const props = defineProps<{
        text: string
    }>();
</script>