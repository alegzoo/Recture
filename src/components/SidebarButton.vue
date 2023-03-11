<template>
    <v-list-item height="58" variant="plain">
        <v-icon v-if="icon" class="h-100" style="color: black;">{{ icon }}</v-icon>
        <v-avatar v-else-if="avatar" size="38px">
            <v-img :src="avatar"/>
        </v-avatar>
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
        icon?: string | null
        avatar?: string | null
    }>();
</script>
  
<style>
  
</style>