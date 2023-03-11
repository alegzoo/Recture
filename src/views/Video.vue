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

    /*function loadRecording() {
        let recordingId = router.params.id as string | string[] | number;
        
        if (!(typeof recordingId === 'string' || recordingId instanceof String)) {
            console.error("Invalid recordingId!");
            return false;
        }

        try {
            recordingId = parseInt(recordingId as string);
            RectureApi.getRecording(recordingId).then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        recording.value = data as IRecording;
                    }). catch((reason) => {
                        console.error(reason);
                    });
                } else {
                    console.error("Failed to load recording.");
                }
            }).catch((reason) => {
                console.error(reason);
            });
        } catch (e) {
            console.error(e);
        }
    }*/

    //TODO: Use the real method instead of the one created for testing
    function loadRecording() {
        let recordingId = router.params.id as string | string[];
        recording.value = {
                    recordingId: parseInt(recordingId as string),
                    title: "Definičný obor",
                    description: "test",
                    published: true,
                    notifications: 0,
                    classId: 0,
                    className: "IV.A",
                    subjectId: 0,
                    subjectName: "INF",
                    uploadTimestamp: Math.floor(Date.now()/1000),
                    recordingTimestamp: Math.floor(Date.now()/1000),
                    sources: [
                        {
                            sourceUrl: "https://freetestdata.com/wp-content/uploads/2022/02/Free_Test_Data_15MB_MP4.mp4",
                            mimeType: "video/mp4"
                        }
                    ],
                    thumbnail: "https://source.unsplash.com/random/384x216?sig="+recordingId
                };
    }
</script>