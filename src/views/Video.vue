<template>
    <v-container>
        <v-row>
            <v-col v-if="mdAndUp"/>
            <v-col cols="12" md="10" xl="6">
                <VideoPlayer :recording="recording"/>
                <h1>{{ recording?.title }}</h1>
                <p>{{ recording?.description }}</p>
            </v-col>
            <v-col v-if="mdAndUp"/>
        </v-row>
    </v-container>
</template>

<style lang="scss">

</style>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { IRecording, RectureApi } from '@/api/RectureApi';
    import { useDisplay } from 'vuetify/lib/framework.mjs';
    import { useHomeStore } from '@/stores/useHomeStore';
    import VideoPlayer from '@/components/VideoPlayer.vue';

    const recording = ref(null as IRecording | null)

    const { mdAndUp, lgAndDown } = useDisplay();

    if (lgAndDown.value) {
        const homeStore = useHomeStore();
        homeStore.sidebarVisible = false;
    }

    const router = useRoute();
    loadRecording();

    function loadRecording() {
        let recordingId = router.params.id as string | string[] | number;
        
        if (!(typeof recordingId === 'string' || recordingId instanceof String)) {
            console.error("Invalid recordingId!");
            return false;
        }

        try {
            recordingId = parseInt(recordingId as string);
            RectureApi.getRecording(recordingId).then(result => {
                if (result.success && result.data != null) {
                    recording.value = result.data;
                } else {
                    console.error("Failed to load recording.");
                }
            }).catch((reason) => {
                console.error(reason);
            });
        } catch (e) {
            console.error(e);
        }
    }
</script>