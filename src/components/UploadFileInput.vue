<template>
    <v-container class="pa-2" @dragover="onDragOver" @dragleave="onDragLeave" @drop="onDrop">
        <input type="file" ref="fileInput" @change="onFileInputChange" accept=".mp4,.webm" hidden/>
        <v-row align-self="center" class="py-3" no-gutters>
            <v-col cols="12" align="center">
                <v-icon icon="mdi-upload"></v-icon>
            </v-col>

            <v-col cols="12" align="center">
                <p class="file-label" :title="dropTitle">{{ dropText }}</p>
            </v-col>

            <v-col cols="12" align="center" class="pt-2">
                <v-btn variant="text" @click="() => fileInput?.showPicker()">SELECT FILE</v-btn>
            </v-col>
        </v-row> 
    </v-container>
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";

    .v-row {
        border: dashed 2px black;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .v-container {
        border-bottom-color: black !important;
        border-bottom-width: 2px !important;
        border-bottom-style: solid !important;
    }

   .v-icon {
        font-size: 70px;
    }

    .file-label {
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .v-btn {
        background-color: $recture-bright-blue !important;
        border: solid 2px black;
        font-weight: bold;
    }
</style>

<script lang="ts" setup>
    import { ref, computed } from 'vue';

    const props = defineProps<{
        modelValue?: File | null
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: File | null): void
    }>();

    const fileInput = ref<HTMLInputElement>();

    const selectedFile = ref<File | null>();

    const dragging = ref<boolean>(false);
    const dropText = computed<string>(() => dragging.value ? "Drop file" : (selectedFile.value != null ? selectedFile.value.name : "Drop a file here or select a file"));
    const dropTitle = computed<string | undefined>(() => selectedFile.value != null ? selectedFile.value.name : undefined);
    const fileUrl = ref<string | null>(null);

    function onFileInputChange(e: Event) : void {
        if (fileInput.value?.files?.length === 1) {
            selectedFile.value = fileInput.value.files[0];
            fileUrl.value = URL.createObjectURL(selectedFile.value);
            emit("update:modelValue", selectedFile.value);
        } else emit("update:modelValue", null);
    }

    function onDragOver(e: DragEvent): void {
        e.preventDefault();
        dragging.value = true;
    }

    function onDragLeave(e: DragEvent): void {
        e.preventDefault();
        dragging.value = false;
    }

    function onDrop(e: DragEvent): void {
        e.preventDefault();

        const files = e.dataTransfer?.files;
        if (files != null && files.length === 1 && fileInput.value != null) {
            fileInput.value.files = files;
            onFileInputChange(e);
        }

        dragging.value = false;
    }
</script>