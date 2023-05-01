<template>
    <v-menu
        :close-on-content-click="false"
        :location="mdAndUp?'bottom left':'left'"
        :activator="activator"
    >
        <v-card min-width="400">
            <v-list theme="dark" no-gutters>
                <v-row no-gutters>
                    <v-col class="pl-4">
                        <h4>{{ titleText }}</h4>
                    </v-col>
                </v-row>
            </v-list>

            <v-list v-if="uploadStore.uploadsInProgress.length > 0" class="py-0">
                <UploadTrackerItem v-for="upload in uploadStore.uploadsInProgress" :upload="upload" @cancel-button-click="() => onItemCancelButtonClicked(upload)"/>
            </v-list>
            <v-list v-else>
                <v-list-item>No recordings are currently being uploaded.</v-list-item>
            </v-list>
        </v-card>
    </v-menu>
    <ConfirmationDialog v-model="cancelUploadDialogVisible" title="ARE YOU SURE?" :message="'Are you sure you want to stop uploading &quot;'+selectedUpload?.title+'&quot;?'" @option-selected="onConfirmationDialogOptionSelected"/>
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";

    .v-card {
        border: solid 2px black;
        box-shadow: none !important;
    }

    .v-list:first-child {
        border: 2px solid black;
    }

    h4 {
        color: white;
    }

    .v-divider {
        border-top: dashed black 2px;
    }
</style>

<script lang="ts" setup>
    import { ref, computed } from 'vue';
    import { useDisplay } from 'vuetify/lib/framework.mjs';
    import { ITrackedUpload, useUploadStore } from '@/stores/useUploadStore';
    import UploadTrackerItem from './UploadTrackerItem.vue';
    import ConfirmationDialog from './ConfirmationDialog.vue';

    const props = defineProps<{
        activator: string
    }>();

    const uploadStore = useUploadStore();

    const selectedUpload = ref<ITrackedUpload | null>(null);
    const cancelUploadDialogVisible = ref<boolean>(false);

    const titleText = computed<string>(() => uploadStore.uploadsInProgress.length > 0 ? "Uploading..." : "No uploads in progress");

    const { mdAndUp } = useDisplay();

    function onItemCancelButtonClicked(upload: ITrackedUpload) {
        selectedUpload.value = upload;
        cancelUploadDialogVisible.value = true;
    }

    function onConfirmationDialogOptionSelected(positive: boolean) {
        if (positive && selectedUpload.value != null) uploadStore.cancelUpload(selectedUpload.value);
        selectedUpload.value = null;
    }
</script>