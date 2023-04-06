<template>
    <v-container fluid class="container-video-player" no-gutters>
        <v-row no-gutters class="pl-11 pt-6" align="center">
            <v-col cols="auto" align-self="center" align="center">
                <v-sheet
                class="subject-v-sheet pt-1"
                :height="35"
                :width="60"
                >
                <h4>MAT</h4>
                </v-sheet>
            </v-col>
                
            <v-col cols="auto" align-self="center" align="center">
                <v-sheet
                class="thematic-unit-v-sheet pt-1"
                :height="35"
                :width="100"
                >
                <h4>FUNKCIE</h4>
                </v-sheet>  
            </v-col>
                
        </v-row>

        <v-row no-gutters>
            <v-col cols="12" md="10" xl="6" lg="9" class="pl-11">
                <VideoPlayer class="v-col-video" :recording="(recordingComposable?.recording.value as IRecording | null)"/>
            </v-col>
        </v-row>


        <v-row no-gutters>

            <v-col align-self="center" cols="auto" class="pl-11">
                <p class="mt-3">{{ recordingComposable?.recordingDate.value }}</p>
            </v-col>

            <v-col align-self="center" align="center" cols="auto" class="pl-4 pt-2">
                <v-chip variant="text" class="chip-class px-4">IV.A</v-chip>
            </v-col>

            <v-spacer/>

            <v-col class="pt-3 pl-14" cols="5">
                <v-btn variant="text" class="test-yourself-btn" prepend-icon="mdi-check">Test yourself</v-btn>
            </v-col>

        </v-row>

        <v-row no-gutters>
            <v-col class="pl-11">
                <h1 class="video-title" >{{ recordingComposable?.recording.value?.title }}</h1>
            </v-col>
        </v-row>
            
                
        <v-row no-gutters>
            <v-col class="pl-11" cols="5">
                <p v-if="recordingComposable?.recording.value?.description != null">{{ recordingComposable?.recording.value?.description }}</p>
            </v-col>
        </v-row>
            
        <v-row no-gutters>
            <v-col>
                <v-alert v-if="recordingComposable !== undefined && (recordingComposable === null || recordingComposable.recording.value === null)" density="compact" type="error" align="left" text="Failed to load recording." class="mt-5"/>
            </v-col>
        </v-row>
                                
        
    </v-container>
</template>

<style lang="scss" scoped>
@import "@/styles/constants.scss";
@import "@/styles/mixins.scss";
    
 .container-video-player{
    background-image: url("@/assets/bg_pattern.png");
    background-size: cover;
 }

.test-yourself-btn{
    background-color: $recture-yellow;
    border-width: 2px;
    border-color: black;
    border-radius: 0px !important;
    font-weight: bold;
    border-style: solid;
    @include elevated-button(3px, 3px, 1px);
}

.video-title {
    font-family: 'Clash Display', sans-serif;
    font-size: 36px;
    font-weight: 600;
    -webkit-text-fill-color: white;
    -webkit-text-stroke-color: black;
    -webkit-text-stroke: 1px;
    text-shadow: 2px 2px 0px black;
}


.chip-class{
    background-color: black;
    color: white;
    font-weight: bold;
    border-width: 0px;
}

.v-col-video{
    border-left-width: 1px;
    border-right-width: 1px;
    border-right-color: black;
    border-radius: 0px !important;
    border-left-style: solid;
    border-right-style: solid;
    box-shadow: 3px 3px 0px 0px black !important;

}

.subject-v-sheet{
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    background-color: $recture-yellow;
    border-width: 1px;
    border-style: solid;
    border-color: black;
}

.thematic-unit-v-sheet{
    border-top-right-radius: 6px;
    background-color: white;
    border-width: 1px;
    border-style: solid;
    border-color: black;
}
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