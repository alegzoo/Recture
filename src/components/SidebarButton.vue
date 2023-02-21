<template>
    <v-list-item>
        <v-responsive :aspect-ratio="1">
            <v-icon class="h-100" style="color: black;">{{ icon }}</v-icon>
        </v-responsive>
        <v-tooltip
            activator="parent"
            location="end"
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