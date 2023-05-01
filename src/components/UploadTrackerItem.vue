<template>
    <v-row no-gutters class="py-3" @mouseover="mouseOver = true" @mouseleave="mouseOver = false">
        <v-col cols="auto" class="py-0 pr-0 pl-4" align-self="center" align="start">
            <p>{{ upload.title }}</p>
            <p class="state">{{ stateText }}</p>
        </v-col>
        <v-spacer/>
        <v-col cols="auto" class="py-0 pr-0 pl-9" align="start" align-self="center">
            <v-chip size="medium" variant="flat" :color="upload.lesson.color" class="px-5">{{ upload.lesson.className }}</v-chip>
        </v-col>
        <v-col cols="auto" :class="{'px-1': state === 'uploading', 'px-5': state !== 'uploading'}" align="start" align-self="center">
            <v-btn v-if="state === 'uploading'" variant="plain" icon @click="emit('cancelButtonClick')">
                <template v-slot:default>
                    <v-icon v-show="mouseOver" icon="mdi-close"/>
                    <v-progress-circular v-show="!mouseOver" size="24" width="2" indeterminate/>
                </template>
            </v-btn>
            <v-icon v-else-if="state === 'success'" icon="mdi-check"/>
            <v-icon v-else-if="state === 'error' || state === 'aborted'" icon="mdi-alert-circle"/>
        </v-col>
    </v-row>
</template>

<style lang="scss" scoped>
    .v-chip {
        color: white;
    }

    .state {
        color: rgba(0, 0, 0, 0.5);
        font-size: 0.9em;
        line-height: 0.9em;
    }

    .v-row {
        border-bottom: dashed 2px rgba(0, 0, 0, 0.5);
    }

    .v-row:last-child {
        border-bottom: none;
    }
</style>

<script lang="ts" setup>
    import { ref, computed, watch, onMounted } from 'vue';
    import { ITrackedUpload } from '@/stores/useUploadStore';

    import '@/styles/lesson-colors.scss';

    const props = defineProps<{
        upload: ITrackedUpload
    }>();

    const emit = defineEmits<{
        (e: "cancelButtonClick"): void
    }>();

    const state = ref<"uploading" | "success" | "error" | "aborted">("uploading");
    const mouseOver = ref<boolean>(false);

    const stateText = computed<string>(() => {
        switch(state.value) {
            case "uploading": return "Uploading...";
            case "success": return "Upload complete!";
            case "error": return "Upload failed.";
            case "aborted": return "Upload aborted."
        }
    })

    watch(() => props.upload, () => subscribeToPromise())
    onMounted(() => subscribeToPromise());

    function subscribeToPromise() {
        state.value = "uploading";
        props.upload.promise.then(result => {
            if (result.success) state.value = "success";
            else state.value = "error";
        }).catch(reason => {
            if (reason.name === "AbortError") state.value = "aborted";
            else state.value = "error";
        });
    }
</script>