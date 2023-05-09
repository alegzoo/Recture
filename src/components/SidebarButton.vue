<template>
    <v-list-item height="58" variant="plain">
        <v-icon class="h-100" style="color: black;">{{ icon }}</v-icon>
        <v-tooltip
            activator="parent"
            location="end"
            class="spiked-tl"
            >{{ text }}
        </v-tooltip>
    </v-list-item>
</template>
  
<script lang="ts" setup>
    const props = defineProps<{
        text: string
        icon: string
    }>();
</script>
  
<style>
  
</style>