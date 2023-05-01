<template>
    <v-btn
        :ripple="false"
        icon
    >
        <template v-slot:default>
            <v-badge :model-value="badgeVisible" :content="uploadStore.uploadsInProgress" color="recture-light-red" floating>
                <v-icon icon="mdi-upload"/>
            </v-badge>
        </template>
    </v-btn>
</template>

<style lang="scss" scoped>
    .v-btn {
        border-radius: 9999px;
        border: dashed 1px black;
        color: black;
    }
</style>

<script lang="ts" setup>
    import { computed } from 'vue';
    import { useUploadStore } from '@/stores/useUploadStore';

    const uploadStore = useUploadStore();

    const badgeVisible = computed<boolean>(() => uploadStore.uploadsInProgress > 0);
</script>