<template>
    <v-container :class="{'pa-2': true, 'dragging': dragging}" @dragover="onDragOver" @dragleave="onDragLeave" @drop="onDrop">
        <input type="file" ref="fileInput" @change="onFileInputChange" :accept="allowedExtensionsCommaSeparated" hidden/>
        <video v-show="fileUrl" ref="video" :controls="false" muted loop>
            <source v-if="fileUrl" :src="fileUrl"/>
        </video>
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
    @use "sass:color";
    @import "@/styles/constants.scss";

    .v-row {
        background-color: transparent;
        border: dashed 2px black;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        transition: background-color 0.1s linear;
    }

    .v-container.dragging .v-row {
        background-color: color.change($recture-bright-blue, $alpha: 0.1);
        transition: background-color 0.1s linear;
    }

    .v-container {
        position: relative;
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

    video {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        object-fit: cover;
        z-index: -1;
        opacity: 30%;
    }
</style>

<script lang="ts" setup>
    import { ref, computed, reactive, onBeforeUnmount } from 'vue';

    const emit = defineEmits<{
        (e: "fileSelect", file: File | null): void
    }>();

    const fileInput = ref<HTMLInputElement>();
    const video = ref<HTMLVideoElement>();

    const selectedFile = ref<File | null>();

    const dragging = ref<boolean>(false);
    const dropText = computed<string>(() => dragging.value ? "Drop file" : (selectedFile.value != null ? selectedFile.value.name : "Drop a file here or select a file"));
    const dropTitle = computed<string | undefined>(() => selectedFile.value != null ? selectedFile.value.name : undefined);
    const fileUrl = ref<string | null>(null);

    const allowedFileTypes = reactive<string[]>(["video/mp4", "video/webm"]);
    const allowedExtensionsCommaSeparated = ref<string>(".mp4,.webm");

    function onFileInputChange(e: Event) : void {
        if (fileUrl.value != null) URL.revokeObjectURL(fileUrl.value);
        
        if (fileInput.value?.files?.length === 1) {
            selectedFile.value = fileInput.value.files[0];
            fileUrl.value = URL.createObjectURL(selectedFile.value);
            if (video.value) {
                video.value.load();
                video.value.currentTime = 10;
            }
            emit("fileSelect", selectedFile.value);
        } else {
            emit("fileSelect", null);
            fileUrl.value = null;
        }
    }

    function onDragOver(e: DragEvent): void {
        e.preventDefault();

        if (e.dataTransfer?.items.length === 1) {
            const item = e.dataTransfer?.items[0];
            dragging.value = item != null && item.kind === "file" && verifyMimeType(item.type);
        } else {
            dragging.value = false;
        }
    }

    function onDragLeave(e: DragEvent): void {
        e.preventDefault();
        dragging.value = false;
    }

    function onDrop(e: DragEvent): void {
        e.preventDefault();
        dragging.value = false;

        const files = e.dataTransfer?.files;
        if (files != null && files.length === 1 && verifyFileType(files[0]) && fileInput.value != null) {
            fileInput.value.files = files;
            onFileInputChange(e);
        }
    }

    function verifyFileType(file: File | null | undefined) {
        if (file == null) return false;
        else return verifyMimeType(file.type);
    }

    function verifyMimeType(type: string) {
        return allowedFileTypes.includes(type);
    }

    onBeforeUnmount(() => {
        if (fileUrl.value) URL.revokeObjectURL(fileUrl.value);
    });
</script>