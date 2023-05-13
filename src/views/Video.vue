<template>
    <v-container :class="{'side-offset': xlAndUp}" fluid>
        <v-row no-gutters class="pt-1">
            <v-spacer/>
            <v-col class="edit-button-col" cols="auto">
                <v-btn v-if="accountStore.teacher" :ripple="false" variant="text" size="48" icon="mdi-lead-pencil" class="edit-button" @click="editDialogVisible = true"/>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col :class="{'pl-11': smAndUp, 'pr-11': sm}">
                <v-row no-gutters align="center" align-self="center">
                    <v-col cols="auto">
                        <div class="video-header" no-gutters>
                            <h4 class="px-4 py-1">
                                {{ recording?.subjectName }}
                            </h4>
                            <h4  class="px-4 py-1">
                                {{ recording?.topicName }}
                            </h4>
                        </div>
                    </v-col>
                </v-row>
                    
                <v-row no-gutters md="12" xl="12" lg="12">
                    <v-col class="v-col-video">
                        <div class="w-100 d-flex flex-shrink-1">
                            <video ref="video" autoplay controls style="width: 100%; height: auto;">
                                <source v-if="recording != null" v-for="source in recording.sources" :src="source.sourceUrl" :type="source.mimeType"/>
                            </video>
                        </div>
                    </v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col align-self="center" cols="auto">
                        <p class="mt-3">{{ recordingDate }}</p>
                    </v-col>

                    <v-col align-self="center" align="center" cols="auto" class="pl-4 pt-2">
                        <v-chip variant="text" class="chip-class px-4">{{ recording?.className }}</v-chip>
                    </v-col>

                    <v-spacer/>

                    <v-col class="pt-3 pl-13" cols="auto">
                        <v-btn variant="text" :ripple="false" prepend-icon="mdi-check-bold" :disabled="recording?.quizId == null" class="test-yourself-button" @click="testYourselfDialogVisible = true">Test yourself</v-btn>
                    </v-col>

                </v-row>

                <v-row no-gutters>
                    <v-col>
                        <h1 class="video-title" >{{ recording?.title }}</h1>
                    </v-col>
                </v-row> 

                <v-row no-gutters>
                    <v-col cols="auto" class="author-link" @click="visitAuthorProfile">
                        <v-row no-gutters>
                            <v-col cols="auto">
                                <v-avatar size="large" :image="author?.avatar"/>
                            </v-col>

                            <v-col align-self="center" class="pl-5" cols="auto" align="center">
                                <h3>{{ authorFullName }}</h3>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                        
                <v-row no-gutters class="pt-5">
                    <v-col cols="12">
                        <p v-if="recording?.description != null">{{ recording.description }}</p>
                    </v-col>
                </v-row>
                    
                <v-row v-if="recording === null" no-gutters class="pt-5">
                    <v-col>
                        <v-alert density="compact" type="error" align="left" text="Failed to load recording." class="mt-5"/>
                    </v-col>
                </v-row>
                                
                <v-row no-gutters class="pt-2">
                    <v-col cols="12">
                        <v-divider/>
                    </v-col>
                </v-row>

                <VideoCommentSection :recording="recording"/>
            </v-col>

            <v-col v-show="mdAndUp" cols="3" class="pt-4">
                <v-row no-gutters class="pl-5">
                    <RelatedVideoList :recording="recording"/>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
    <VideoEditDialog v-model="editDialogVisible" :recording="recording" @data-modified="recordingComposable.fetchAll()"/>
    <TestYourselfDialog v-if="recording != null" v-model="testYourselfDialogVisible" :quiz-id="recording.quizId"/>
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";
    @import "@/styles/mixins.scss";

    .v-container {
        background-image: url("@/assets/bg_pattern.png");
        background-size: cover;
    }

    .v-container.side-offset > .v-row {
        margin-left: 5%;
        margin-right: 5%;
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

    .edit-button {
        @include elevated-button(3px, 3px, 1px);
        background-color: $recture-yellow;
        color: black;
        border-radius: 0px;
        border-color: black;
        border-style: solid;
        border-width: 2px;
    }

    .edit-button-col {
        height: 48px;
    }

    .test-yourself-button {
        background-color: $recture-yellow;
        border-width: 2px;
        border-color: black;
        border-radius: 0px !important;
        font-weight: bold;
        border-style: solid;
        @include elevated-button(4px, 4px, 1px);
    }

    .chip-class {
        background-color: black;
        color: white;
        font-weight: bold;
        border-width: 0px;
    }

    .v-col-video {
        border: solid 2px black;
        box-shadow: 3px 3px 0px 0px black;
        margin-left: -2px;
    }

    .video-header {
        background-color: white;
        border-style: solid;
        border-width: 2px 2px 0px 2px;
        border-color: black;
        border-radius: 8px 8px 0px 0px;
        overflow: hidden;
        margin-left: -2px;
    }

    .video-header > * {
        display: inline-block;
        height: 100%;
    }

    .video-header > *:first-child {
        background-color: $recture-yellow;
        border: none;
        border-radius: 0px 8px 0px 0px;
        box-shadow: 0px 0px 0px 2px black;
    }

    .video-header > *:last-child {
        border: none;
    }

    .v-avatar {
        border-width: 2px;
        border-color: black;
        border-style: solid;
    }

    .author-link {
        cursor: pointer;
    }

    .v-divider {
        border-top: dashed 3px black;
        opacity: 20%;
    }
</style>

<script lang="ts" setup>
    import { ref, watch, onMounted } from "vue";

    import router from '@/router';
    import { useRoute } from 'vue-router';
    import { useAccountStore } from "@/stores/useAccountStore";
    import { useDisplay } from 'vuetify/lib/framework.mjs';
    import { useHomeStore } from '@/stores/useHomeStore';
    import { useRecording } from '@/composables/useRecording';
    import VideoEditDialog from '@/components/VideoEditDialog.vue';
    import VideoCommentSection from '@/components/VideoCommentSection.vue';
    import RelatedVideoList from '@/components/RelatedVideoList.vue';
    import TestYourselfDialog from '@/components/TestYourselfDialog.vue';
    
    const accountStore = useAccountStore();

    const { sm, smAndUp, mdAndUp, lgAndDown, xlAndUp } = useDisplay();

    const editDialogVisible = ref<boolean>(false);
    const testYourselfDialogVisible = ref<boolean>(false);

    const video = ref<HTMLVideoElement>();

    if (lgAndDown.value) {
        const homeStore = useHomeStore();
        homeStore.sidebarVisible = false;
    }

    const route = useRoute();

    const recordingComposable = useRecording();
    const { recording, author, recordingDate, authorFullName } = recordingComposable;

    onMounted(() => updateRecording());
    watch(() => route.params.id, () => updateRecording());

    function updateRecording() : void {
        if (route.params.id instanceof String || typeof route.params.id === "string") {
            recordingComposable.use(parseInt(route.params.id as string));
        } else {
            recordingComposable.use(undefined);
        }

        recordingComposable.fetchAll().then(() => {
            if (video.value != null) {
                video.value.load();
                video.value.play();
            }
        }).catch(reason => {
            //TODO: Maybe show error
        });
    }

    function visitAuthorProfile() : void {
        if (author.value != null) {
            router.push({ name: "profile", params: { userId: author.value.userId } }).catch(reason => {
                console.error(reason);
            });
        }
    }
</script>