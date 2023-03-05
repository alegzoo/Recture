<template>
        <v-row class="py-10">
            <v-col cols="12" md="6">
                <h1 style="text-align: center;">{{ videoBrowserStore.welcomeText.primary }}</h1>
            </v-col>
            <v-col cols="12" md="6">
                <h2 style="text-align: center;">{{ videoBrowserStore.welcomeText.secondary }}</h2>
            </v-col>
        </v-row>

        <v-row id="video-row-button">
            <v-btn-toggle id="subject-button-toggle" selected-class="selected" v-model="videoBrowserStore.selectedSubject" mandatory>
                <SubjectButton v-for="subject in videoBrowserStore.subjects" :key="subject.subjectId" :subject="subject"/>
            </v-btn-toggle>
        </v-row>
        
        <v-row id="video-area" no-gutters class="h-100">
            <v-col id="video-area-content" cols="12">
                <VideoAreaButtons/>
                <v-row>
                    <v-col cols="12">
                        <TitledChipSelection title="CLASSES" empty-message="You have not created any classes yet." :data="videoBrowserStore.classes" @selectionChanged="selection => { onClassSelectionChanged(selection as IClass[]); }"/>
                    </v-col>
                </v-row>
                <v-row >
                    <v-col cols="12">
                        <TitledChipSelection title="THEMATIC UNITS" empty-message="Select exactly one class to filter by thematic units." :data="videoBrowserStore.topics" @selectionChanged="selection => { onTopicSelectionChanged(selection as ITopic[]); }"/>
                    </v-col>
                </v-row>
                <v-row>
                    <template v-for="recording in videoBrowserStore.recordings" :key="recording.recordingId">
                        <v-col cols="12" sm="6" md="4" lg="3" xxl="2" class="pa-2">
                            <VideoBox :recording="recording"/>
                        </v-col>
                    </template>
                </v-row>
            </v-col>
        </v-row>
</template>

<style lang="scss">

</style>

<script lang="ts" setup>
    import { watch } from 'vue';
    import { useAccountStore } from '@/stores/useAccountStore';
    import { useVideoBrowserStore } from '@/stores/useVideoBrowserStore';
    import SubjectButton from '@/components/SubjectButton.vue';
    import VideoBox from '@/components/VideoBox.vue';
    import VideoAreaButtons from '@/components/VideoAreaButtons.vue';
    import TitledChipSelection from '@/components/TitledChipSelection.vue';
    import { IClass, ITopic } from '@/api/RectureApi';

    const accountStore = useAccountStore();
    const videoBrowserStore = useVideoBrowserStore();

    videoBrowserStore.fetchClassesAndSubjects();
    videoBrowserStore.fetchRecordings(0);

    videoBrowserStore.clearWelcomeText();
    accountStore.$subscribe((mutation, state) => {
        videoBrowserStore.formatWelcomeText();
    });
    videoBrowserStore.generateWelcomeText();

    watch(() => [videoBrowserStore.selectedSubject, videoBrowserStore.selectedClasses], () => {
        videoBrowserStore.fetchTopics();
    });

    watch(() => [videoBrowserStore.selectedSubject, videoBrowserStore.selectedClasses, videoBrowserStore.selectedTopics], () => {
        videoBrowserStore.fetchRecordings(0);
    });

    function onClassSelectionChanged(selection: IClass[]) {
        videoBrowserStore.selectedClasses = selection;
    }

    function onTopicSelectionChanged(selection: ITopic[]) {
        videoBrowserStore.selectedTopics = selection;
    }
</script>