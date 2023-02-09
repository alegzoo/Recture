<template>
    <v-list-item>
            <v-icon color="grey darken-4">{{ icon }}</v-icon>
            <v-tooltip
            activator="parent"
            location="end"
            >{{ text }}</v-tooltip>
    </v-list-item>
</template>
  
<script lang="ts" setup>
    const props = defineProps<{
        text: string
        icon: string
    }>()
</script>
  
<style>
  
</style>