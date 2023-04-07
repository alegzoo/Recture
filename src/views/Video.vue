<template>
    <v-container fluid class="container-video-player" no-gutters>
        <v-row no-gutters class="pt-1">
            <v-spacer/>
            <v-col cols="auto">
                <v-btn id="video-edit-icon" :ripple="false" variant="text" icon="mdi-lead-pencil"/>
            </v-col>
        </v-row>
        <v-row no-gutters>

            <v-col cols="9">

                <v-row no-gutters>
                    <v-col cols="auto" class="pl-11" align-self="center" align="center">
                        <v-sheet
                        class="subject-v-sheet pt-1"
                        :height="35"
                        :width="60"
                        >
                        <h4>MAT</h4>
                        </v-sheet>
                    </v-col>

                    <v-col cols="auto" class="v-col-thematic-unit" align-self="center" align="center">
                        <v-sheet
                        class="thematic-unit-v-sheet pt-1"
                        :height="35"
                        :width="90"
                        >
                        <h4>FUNKCIE</h4>
                        </v-sheet>  
                    </v-col>

                </v-row>
                    
                <v-row no-gutters class="pl-11" md="12" xl="12" lg="12">
                    <v-col>
                        <VideoPlayer class="v-col-video" :recording="(recordingComposable?.recording.value as IRecording | null)"/>
                    </v-col>
                </v-row>


                <v-row no-gutters class="pl-11">

                    <v-col align-self="center" cols="1">
                        <p class="mt-3">{{ recordingComposable?.recordingDate.value }}</p>
                    </v-col>

                    <v-col align-self="center" align="center" cols="1" class="pl-4 pt-2">
                        <v-chip variant="text" class="chip-class px-4">IV.A</v-chip>
                    </v-col>

                    <v-spacer/>

                    <v-col class="pt-3 pl-13" cols="auto">
                        <v-btn variant="text" :ripple="false" class="test-yourself-btn" prepend-icon="mdi-check-bold">Test yourself</v-btn>
                    </v-col>

                </v-row>

                <v-row no-gutters>
                    <v-col class="pl-11">
                        <h1 class="video-title" >{{ recordingComposable?.recording.value?.title }}</h1>
                    </v-col>
                </v-row>
                    

                <v-row no-gutters class="pt-3">
                    <v-col class="pl-11" cols="1">
                        <v-avatar class="teacher-student-avatar" size="large" image="/jano.png"></v-avatar>
                    </v-col>

                    <v-col align-self="center" class="pl-5" cols="auto" align="center">
                        <h3>Jano Učiteľ</h3>
                    </v-col>
                </v-row>
                        
                <v-row no-gutters class="pt-5">
                    <v-col class="pl-11" cols="12">
                        <p v-if="recordingComposable?.recording.value?.description != null">{{ recordingComposable?.recording.value?.description }}</p>
                    </v-col>
                </v-row>
                    
                <v-row no-gutters class="pt-5">
                    <v-col>
                        <v-alert v-if="recordingComposable !== undefined && (recordingComposable === null || recordingComposable.recording.value === null)" density="compact" type="error" align="left" text="Failed to load recording." class="mt-5"/>
                    </v-col>
                </v-row>
                                
                <v-row no-gutters class="pt-2">
                    <v-col class="pl-11" cols="12">
                        <v-sheet class="v-sheet-line"/>
                    </v-col>
                </v-row>

                <v-row no-gutters class="pt-5">
                    <v-col class="pl-11" cols="2">
                        <h3>2 comments</h3>
                    </v-col>
                </v-row>

                <v-row no-gutters class="pt-5">
                    <v-col class="pl-11" cols="1">
                        <v-avatar class="teacher-student-avatar" size="large" image="/jano.png"></v-avatar>
                    </v-col>
                    <v-col cols="10" class="pl-5">
                        <v-textarea class="field-add-comment" label="Add a comment..." variant="outlined" auto-grow row-height="10" rows="2"></v-textarea>
                    </v-col>
                    <v-col cols="auto" class="pl-5 pb-5" align-self="end" align="center">
                        <v-btn variant="text" :ripple="false" class="post-btn" theme="light" icon="mdi-send"></v-btn>
                    </v-col>
                </v-row>

                <v-row no-gutters class="pt-5 v-row-comment">
                    <v-col class="pl-11" cols="1">
                        <v-avatar class="teacher-student-avatar" size="large" image="/student1.png"></v-avatar>
                    </v-col>
                    <v-col align-self="center" class="pl-5" cols="auto">
                        <h3>Gabriela Fotová</h3>
                    </v-col>
                    <v-col align-self="center" class="pl-5" cols="auto">
                        <v-chip class="student-chip">IV.A</v-chip>
                    </v-col>
                    
                </v-row>
                
                <v-row no-gutters class="pt-2 pl-16">
                    <v-col cols="12" class="pl-12">
                        <p>Dobrý deň, chýbala som na dnešnej hodine a rada by som sa opýtala čo by sa stalo ak by namiesto mocniny bola odmocnina v druhom
                        príklade (21:12)</p>
                    </v-col>
                </v-row>

                <v-row no-gutters class="pt-2 pl-16">
                    <v-col cols="auto" class="pl-8">
                        <v-btn :ripple="false" class="reply-btn" variant="plain">Reply</v-btn>
                    </v-col>
                </v-row>

                <v-row no-gutters class="pt-10">
                    <v-col class="pl-11" cols="auto">
                        <v-avatar class="teacher-student-avatar" size="large" image="/student2.png"></v-avatar>
                    </v-col>
                    <v-col align-self="center" class="pl-5" cols="auto">
                        <h3>Daniel Jachab</h3>
                    </v-col>
                    <v-col align-self="center" class="pl-5" cols="auto">
                        <v-chip class="student-chip">IV.A</v-chip>
                    </v-col>
                </v-row>
                
                <v-row no-gutters class="pt-2 pl-16">
                    <v-col cols="12" class="pl-12">
                        <p>Rád by som sa opýtal čo ste mysleli tou poznámkou v čase 37:44 lebo som tomu neporozumel a taktiež prečo bolo na tabuli napísané
                        odmocnina z 3-troch v čase 38:55</p>
                    </v-col>
                </v-row>

                <v-row no-gutters class="pt-2 pl-16">
                    <v-col cols="auto" class="pl-8">
                        <v-btn :ripple="false" class="reply-btn" variant="plain">Reply</v-btn>
                    </v-col>
                </v-row>

            </v-col>

            <v-col cols="3" class="pt-4">
                <v-row no-gutters class="pl-5">
                    <v-list class="v-list" active-class="active" :ripple="false" mandatory>
                        <v-list-item :ripple="false" value="1">Definičný obor</v-list-item>
                        <v-list-item :ripple="false" value="2">Obor hodnôt</v-list-item>
                        <v-list-item :ripple="false" value="3">Vlastnosti funkcií</v-list-item>
                        <v-list-item :ripple="false" value="4">Lineárna funkcia</v-list-item>
                        <v-list-item :ripple="false" value="5">Kvadratické funkcie</v-list-item>
                        <v-list-item :ripple="false" value="6">Goniometrické funkcie</v-list-item>
                        <v-list-item :ripple="false" value="7">Inverzné funkcie</v-list-item>
                        <v-list-item :ripple="false" value="8">Priesečník grafov lineárnych funkcií</v-list-item>

                    </v-list>
                </v-row>
                
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
    @include elevated-button(4px, 4px, 1px);
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

.teacher-student-avatar{
    border-width: 2px;
    border-color: black;
    border-style: solid;
}

.reply-btn{
    color: black;
    opacity: 100%;
}

.v-sheet-line{
    border-bottom: dashed 3px black;
    background-color: transparent;
    opacity: 20%;
}


.student-chip{
    background-color: $recture-red;
    border-style: solid;
    border-width: 2px;
    border-color: black;
    box-shadow: 3px 3px 0px 0px black;
}


#video-edit-icon {
    @include elevated-button(3px, 3px, 1px);
    background-color: $recture-yellow;
    color: black;
    border-radius: 0px;
    border-color: black;
    border-style: solid;
    border-width: 2px;
}

.v-list{
    background-color: transparent;
}

.v-list-item.active{
  font-size: 25px !important;
  font-weight: bold !important;
}

.v-list-item:hover{
    font-weight: bold !important;
}

.v-list-item:hover :deep(.v-list-item__overlay) {
    opacity: 0;
}

.v-list-item.active :deep(.v-list-item__overlay) {
    opacity: 0;
}


.post-btn{
    background-color: black;
    color: white;
}

</style>

<script lang="ts" setup>
    import { useRoute } from 'vue-router';
    import { useDisplay } from 'vuetify/lib/framework.mjs';
    import { useHomeStore } from '@/stores/useHomeStore';
    import VideoPlayer from '@/components/VideoPlayer.vue';
    import { useRecording, IUsableRecording } from '@/composables/useRecording';
    import { IRecording } from '@/api/RectureApi';

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