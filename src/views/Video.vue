<template>
    <v-container>
        <v-row>
            <v-col v-if="mdAndUp"/>
            <v-col cols="12" md="10" xl="6">
                <VideoPlayer :recording="(recordingComposable?.recording.value as IRecording | null)"/>
                <p class="mt-3">{{ recordingComposable?.recordingDate.value }}</p>
                <h1 class="video-title">{{ recordingComposable?.recording.value?.title }}</h1>
                <p v-if="recordingComposable?.recording.value?.description != null">{{ recordingComposable?.recording.value?.description }}</p>
                <v-alert v-if="recordingComposable !== undefined && (recordingComposable === null || recordingComposable.recording.value === null)" density="compact" type="error" align="left" text="Failed to load recording." class="mt-5"/>
            </v-col>
            <v-col v-if="mdAndUp"/>
        </v-row>
    </v-container>
</template>

<style lang="scss">

</style>

<script lang="ts" setup>
    import { useRoute } from 'vue-router';
    import { useDisplay } from 'vuetify/lib/framework.mjs';
    import { useHomeStore } from '@/stores/useHomeStore';
    import VideoPlayer from '@/components/VideoPlayer.vue';
    import { useRecording, IUsableRecording } from '@/composables/useRecording';
    import { IRecording } from '@/api/RectureApi';

    import "@/styles/video.scss";

    const { mdAndUp, lgAndDown } = useDisplay();

    if (lgAndDown.value) {
        const homeStore = useHomeStore();
        homeStore.sidebarVisible = false;
    }

    const router = useRoute();

    let recordingComposable = undefined as IUsableRecording | null | undefined;
    const recordingIdParam = router.params.id as string | string[] | number;

    if (typeof recordingIdParam === "string" || recordingIdParam instanceof String) {
        recordingComposable = useRecording(parseInt(recordingIdParam as string));
        recordingComposable.fetchAll();
    }  else {
        recordingComposable = null;
    }
</script>