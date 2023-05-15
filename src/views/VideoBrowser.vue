<template>
        <v-row class="pa-10">
            <v-col cols="12" md="auto" xl="6" align-self="center">
                <h1 :class="'welcome-text primary'+((smAndDown||xlAndUp)?' centered':'')+((videoBrowserStore.welcomeText.primary?.length > 0)?' loaded':'')">{{ videoBrowserStore.welcomeTextPrimaryDisplay }}</h1>
            </v-col>
            <v-col cols="12" md="" xl="6" align-self="center">
                <h2 :class="'welcome-text secondary'+((smAndDown||xlAndUp)?' centered':'')+((videoBrowserStore.welcomeText.secondary?.length > 0)?' loaded':'')">{{ videoBrowserStore.welcomeTextSecondaryDisplay }}</h2>
            </v-col>
        </v-row>

        <v-row id="subject-button-row" class="mx-9">
            <v-btn-toggle v-if="videoBrowserStore.subjectsLoading" id="subject-button-toggle" class="w-100">
                <SubjectButton v-for="size in skeletonSubjects.sizes.value" class="skeleton" :style="'width: '+size+'px;'" :subject="null"/>
            </v-btn-toggle>
            <v-btn-toggle v-else id="subject-button-toggle" class="w-100" selected-class="selected" v-model="videoBrowserStore.selectedSubject" mandatory>
                <SubjectButton v-for="subject in videoBrowserStore.subjects" :key="subject.subjectId" :subject="subject"/>
            </v-btn-toggle>
        </v-row>
        
        <v-row id="video-area" no-gutters class="h-100 mx-5">
            <v-col id="video-area-content" cols="12">
                <v-row>
                    <v-col cols="12" :md="accountStore.teacher ? 'auto' : ''">
                        <v-row class="mb-3" no gutters>
                            <v-col>
                                <SearchBar class="mx-0" v-model="videoBrowserStore.searchQuery"/>
                            </v-col>
                        </v-row>
                        <v-row id="buttons-video-area" align="center" align-self="center" :class="mdAndUp?'':'mx-0'" no-gutters>
                            <template v-if="accountStore.teacher">
                                <v-col cols="12" md="auto" align="center">
                                    <v-btn id="upload-btn" variant="text" :ripple="false" append-icon="mdi-upload" :class="'px-12'+(mdAndUp?'':' mb-2')" @click="uploadDialogVisible = true">
                                        UPLOAD
                                    </v-btn>
                                </v-col>

                                <v-col cols="12" md="auto" align="center" :class="mdAndUp?'ml-5':'mb-2'">
                                    <v-btn 
                                        variant="text" 
                                        class="btn-new-theme-unit"  
                                        append-icon="mdi-plus-circle"
                                        rounded
                                        @click="newThematicUnitDialogVisible = true">
                                        NEW THEMATIC UNIT
                                    </v-btn>
                                </v-col>

                                <v-col cols="12" md="auto" align="center" :class="mdAndUp?'ml-5':'mb-2'">
                                    <v-btn 
                                        variant="text" 
                                        id="btn-new-quiz" 
                                        append-icon="mdi-plus-circle"
                                        @click="createQuizDialogVisible = true">
                                        NEW QUIZ
                                    </v-btn>
                                </v-col>
                            </template>
                        </v-row>
                    </v-col>

                    <v-spacer v-if="accountStore.teacher || !mdAndUp"/>
                    <v-col v-else cols="2" lg="5" xl="7" xxl="8"/>

                    <v-col cols="12" md="auto" :align="mdAndUp?'right':'center'" :align-self="(accountStore.student && mdAndUp) ? 'start' : 'end'">
                        <v-row align="center" align-content="center" justify="center">
                            <v-col cols="auto" :class="mdAndUp?'':'pt-0'">
                                <FilterButtonVideoArea @filter-or-sort-changed="onFilterOrSortChanged"/>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <TitledChipSelection title="CLASSES" :empty-message="accountStore.teacher ? 'You have not created any classes yet' : 'You are not a member of any classes yet'" :loading="videoBrowserStore.classesLoading" :data="videoBrowserStore.classes" v-model="videoBrowserStore.selectedClasses"/>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <TitledChipSelection title="THEMATIC UNITS" empty-message="Select exactly one class to filter by thematic units" :loading="videoBrowserStore.topicsLoading" :data="videoBrowserStore.topics" v-model="videoBrowserStore.selectedTopics"/>
                    </v-col>
                </v-row>
                <v-row>
                    <template v-if="videoBrowserStore.recordings.length > 0">
                        <v-col v-for="recording in videoBrowserStore.recordings" :key="recording.recordingId" cols="12" sm="6" md="4" lg="3" xxl="2" class="pa-2">
                            <VideoBox :recording="recording"/>
                        </v-col>
                        <v-col cols="12" align="center">
                            <v-btn v-if="videoBrowserStore.isNextPageAvailable || (videoBrowserStore.isLastPageDisplayed && videoBrowserStore.recordingsLoading)" :disabled="videoBrowserStore.recordingsLoading" :loading="videoBrowserStore.recordingsLoading" variant="flat" color="recture-bright-blue" class="load-more-button rounded-pill" @click="onLoadMoreButtonClicked">Load more</v-btn>
                        </v-col>
                    </template>
                    <template v-else-if="videoBrowserStore.recordingsLoading">
                        <v-progress-circular
                            class="ma-auto"
                            indeterminate
                            size="48"
                        ></v-progress-circular>
                    </template>
                    <template v-else>
                        <v-col :cols="mdAndUp?4:12">
                            <h2 class="mt-3">No results found</h2>
                        </v-col>
                        <v-spacer/>
                    </template>
                </v-row>
            </v-col>
        </v-row>
        <UploadDialog v-model="uploadDialogVisible"/>
        <NewThematicUnitDialog v-model="newThematicUnitDialogVisible"/>
        <CreateQuizDialog v-model="createQuizDialogVisible" @data-modified="manageQuizzesDialogVisible = true"/>
        <ManageQuizzesDialog v-model="manageQuizzesDialogVisible"/>
</template>

<style lang="scss">

</style>

<script lang="ts" setup>
    import { ref, watch } from 'vue';
    import { useAccountStore } from '@/stores/useAccountStore';
    import { useVideoBrowserStore } from '@/stores/useVideoBrowserStore';
    import { IRecordingSort, RecordingVisibilityFilter } from '@/api/RectureApi';
    import { useDisplay } from 'vuetify/lib/framework.mjs';
    import { useHomeStore } from '@/stores/useHomeStore';
    import SubjectButton from '@/components/SubjectButton.vue';
    import FilterButtonVideoArea from '@/components/FilterButtonVideoArea.vue';
    import TitledChipSelection from '@/components/TitledChipSelection.vue';
    import VideoBox from '@/components/VideoBox.vue';
    import SearchBar from '@/components/SearchBar.vue';
    import UploadDialog from '@/components/UploadDialog.vue';
    import NewThematicUnitDialog from '@/components/NewThematicUnitDialog.vue';
    import CreateQuizDialog from '@/components/CreateQuizDialog.vue';
    import ManageQuizzesDialog from '@/components/ManageQuizzesDialog.vue';
    
    import "@/styles/videobrowser.scss";
    import { useSkeletons } from '@/composables/useSkeletons';

    const { smAndDown, mdAndUp, xlAndUp } = useDisplay();

    const uploadDialogVisible = ref<boolean>(false);
    const newThematicUnitDialogVisible = ref<boolean>(false);
    const createQuizDialogVisible = ref<boolean>(false);
    const manageQuizzesDialogVisible = ref<boolean>(false);

    const homeStore = useHomeStore();
    const accountStore = useAccountStore();
    const videoBrowserStore = useVideoBrowserStore();

    homeStore.sidebarVisible = true;

    videoBrowserStore.fetchClassesAndSubjects();
    videoBrowserStore.fetchRecordings(false);

    videoBrowserStore.clearWelcomeText();
    accountStore.$subscribe((mutation, state) => {
        videoBrowserStore.generateWelcomeText();
    });

    videoBrowserStore.generateWelcomeText();

    //TODO: May need to prevent race conditions here and in similar calls!
    watch(() => [videoBrowserStore.selectedSubject, videoBrowserStore.selectedClasses], () => {
        videoBrowserStore.fetchTopics();
        videoBrowserStore.fetchRecordings(false);
    });

    //TODO: May need to prevent race conditions here and in similar calls!
    watch(() => [videoBrowserStore.selectedTopics], () => {
        videoBrowserStore.fetchRecordings(false);
    });

    watch(() => videoBrowserStore.searchQuery, () => {
        videoBrowserStore.fetchRecordings(false);
    });

    const skeletonSubjects = useSkeletons(2, 5, 40, 90);
    watch(() => videoBrowserStore.subjectsLoading, () => {
        if (videoBrowserStore.subjectsLoading === true) skeletonSubjects.generate();
    });

    function onFilterOrSortChanged(filter: RecordingVisibilityFilter, sort: IRecordingSort) {
        videoBrowserStore.recordingVisibilityFilter = filter;
        videoBrowserStore.recordingSort = sort;
        videoBrowserStore.fetchRecordings(false);
    }

    function onLoadMoreButtonClicked() {
        videoBrowserStore.fetchRecordingsNextPage();
    }
</script>