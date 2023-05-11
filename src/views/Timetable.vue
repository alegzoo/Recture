<template>
    <v-container class="timetable-container px-6 h-100 d-flex flex-column" fluid>
        <v-row class="mt-1 pr-3 flex-grow-0">
            <v-col cols="auto" align="start" class="d-flex">
                <p id="your-timetable-text" class="text-h4 font-weight-medium d-flex align-self-center">Your timetable</p>
            </v-col>
            <v-col cols="auto" class="d-flex px-0">
                <v-btn class="d-flex align-self-center" variant="plain" icon="mdi-cog" size="28" :ripple="false" @click="timetableSetupDialogVisible = true"/>
                <v-tooltip
                    activator="parent"
                    location="end"
                    class="spiked-tl"
                    >Set up timetable
                </v-tooltip>
            </v-col>

            <v-spacer/>
            
            <v-col cols="auto" align-self="center">
                <v-btn id="timetable-edit-button" :ripple="false" variant="text" :icon="timetable.editing.value?'mdi-close':'mdi-lead-pencil'" :disabled="timetable.creating.value" @click="timetable.toggleEditing()"/>
                <v-tooltip
                    activator="parent"
                    location="end"
                    class="spiked-tr"
                    >Edit lessons
                </v-tooltip>
            </v-col>
        </v-row>

        <v-row class="mt-0 flex-grow-0"> 
            <v-col cols="12" align-self="start">
                <v-icon icon="mdi-information" class="mr-2"/>
                <span class="font-weight-medium">Click on an empty space in the timetable to add a new lesson</span>
            </v-col>
        </v-row>

        <v-row class="flex-grow-1">
            <v-col cols="12" :class="'h-100 d-flex flex-column py-7'+(mdAndUp?' px-10':'')">
                <TimetableGrid :timetable="timetable" align="stretch" class="flex-grow-1" rounded @timetable-cell-click="onGridCellClick" @timetable-lesson-share-button-click="showShareDialog"/>
                <v-row align="end" align-content="end" justify="end" class="flex-grow-0 pt-7">
                    <template v-if="timetable.creating.value">
                        <v-col cols="auto">
                            <v-btn variant="text" class="footer-button secondary creating-button" :ripple="false" @click="cancelLessonCreation()">
                                CANCEL
                            </v-btn>
                        </v-col>

                        <v-col cols="auto">
                            <v-btn variant="text" class="footer-button plus-button creating-button" :ripple="false" append-icon="mdi-plus-circle" @click="createLessons()">
                                {{ createLessonsButtonText }}
                            </v-btn>
                        </v-col>
                    </template>
                    <template v-else>
                        <v-col cols="auto">
                            <v-btn variant="text" class="footer-button" :ripple="false" :disabled="!timetable.idle.value" prepend-icon="mdi-table-edit" @click="manageGroupsDialogVisible = true">
                                MANAGE CLASSES AND SUBJECTS
                            </v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn variant="text" class="footer-button" :ripple="false" :disabled="!timetable.idle.value" prepend-icon="mdi-folder-edit" @click="manageThematicUnitsDialogVisible = true">
                                MANAGE THEMATIC UNITS
                            </v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn variant="text" class="footer-button" :ripple="false" :disabled="timetable.editing.value" prepend-icon="mdi-folder-question" @click="manageQuizzesDialogVisible = true">
                                MANAGE QUIZZES
                            </v-btn>
                        </v-col>
                    </template>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
    <v-overlay v-model="timetable.creating.value" persistent z-index="190"/>
    <TimetableSetupDialog v-model="timetableSetupDialogVisible" @dataModified="timetable.fetchTimetable()"/>
    <ManageGroupsDialog v-model="manageGroupsDialogVisible" @dataModified="timetable.fetchLessons()"/>
    <ManageThematicUnitsDialog v-model="manageThematicUnitsDialogVisible"/>
    <CreateLessonDialog v-model="createLessonDialogVisible" @dialog-exit="onCreateLessonDialogExit"/>

    <NewThematicUnitDialog v-model="newThematicUnitDialogVisible"/>
    
    <CreateInvitationDialog v-model="shareDialogVisible" :lesson="shareDialogLesson"/>
    <MessageDialog v-model="errorDialogVisible" title="ERROR" :message="errorDialogMessage"/>

    <ManageQuizzes v-model="manageQuizzesDialogVisible"/>

    <v-overlay v-model="loadingOverlayVisible" class="align-center justify-center" contained persistent>
        <v-progress-circular class="ma-auto" color="primary" indeterminate size="64"/>
    </v-overlay>
</template>

<script lang="ts" setup>
    import { ref, computed } from 'vue';
    import { RectureApi, IClass, ISubject, LessonColor, ILesson } from '@/api/RectureApi';
    import { ITimetableGridPosition, useTimetable } from '@/composables/useTimetable';
    import TimetableGrid from '@/components/TimetableGrid.vue';
    import TimetableSetupDialog from '@/components/TimetableSetupDialog.vue';
    import ManageGroupsDialog from '@/components/ManageGroupsDialog.vue';
    import ManageThematicUnitsDialog from '@/components/ManageThematicUnitsDialog.vue';
    import CreateLessonDialog, { ICreateLessonDialogResult } from '@/components/CreateLessonDialog.vue';
    import NewThematicUnitDialog from '@/components/NewThematicUnitDialog.vue';
    import CreateInvitationDialog from '@/components/CreateInvitationDialog.vue';
    import MessageDialog from '@/components/MessageDialog.vue';
    import { useDisplay } from 'vuetify/lib/framework.mjs';

    import ManageQuizzes from '@/components/ManageQuizzes.vue';

    import "@/styles/timetable.scss";

    const { mdAndUp } = useDisplay();

    const timetableSetupDialogVisible = ref<boolean>(false);
    const manageGroupsDialogVisible = ref<boolean>(false);
    const manageThematicUnitsDialogVisible = ref<boolean>(false);
    const createLessonDialogVisible = ref<boolean>(false);
    const newThematicUnitDialogVisible = ref<boolean>(false);

    const manageQuizzesDialogVisible = ref<boolean>(false);

    const shareDialogVisible = ref<boolean>(false);

    const shareDialogLesson = ref<ILesson | null>(null);

    const createLessonsButtonText = computed<string>(() => timetable.selection.value.length > 1?`CREATE ${timetable.selection.value.length} LESSONS`:'CREATE LESSON');
    const createLessonDialogResult = ref<ICreateLessonDialogResult | null>(null);

    const errorDialogVisible = ref<boolean>(false);
    const errorDialogMessage = ref<string>("");

    const loadingOverlayVisible = ref<boolean>(false);

    const timetable = useTimetable();
    
    timetable.setWeek();
    timetable.fetchTimetable();
    timetable.fetchLessons();

    function onGridCellClick(cellPosition: ITimetableGridPosition) {
        if (timetable.creating.value) {
            timetable.toggleCellSelectionStatus(cellPosition);
        } else if (timetable.idle.value) {
            timetable.startCreating(cellPosition);
            createLessonDialogVisible.value = true;
        }
    }

    function createLessons() {
        if (createLessonDialogResult.value == null || createLessonDialogResult.value.class == null || createLessonDialogResult.value.subject == null || createLessonDialogResult.value.lessonColor == null) {
            timetable.stopCreating();
            return;
        }

        const classValue = createLessonDialogResult.value.class as IClass | string;
        const subjectValue = createLessonDialogResult.value.subject as ISubject | string;
        const lessonColor = createLessonDialogResult.value.lessonColor as LessonColor;

        let lessonClass = null as IClass | null;
        let lessonSubject = null as ISubject | null;

        const promises = [];

        if (classValue instanceof String || typeof classValue === "string") {
            const classPromise = RectureApi.createClass(classValue as string);
            classPromise.then(result => {
                if (result.success && result.data != null) lessonClass = result.data;
                else return Promise.reject();
            });
            promises.push(classPromise);
        } else {
            lessonClass = classValue as IClass;
        }

        if (subjectValue instanceof String || typeof subjectValue === "string") {
            const subjectPromise = RectureApi.createSubject(subjectValue as string);
            subjectPromise.then(result => {
                if (result.success && result.data != null) lessonSubject = result.data;
                else return Promise.reject();
            });
            promises.push(subjectPromise);
        } else {
            lessonSubject = subjectValue as ISubject;
        }

        loadingOverlayVisible.value = true;

        if (promises.length > 0) {
            Promise.all(promises).then(() => {
                timetable.createSelectedLessons(lessonColor, lessonClass?.classId, lessonSubject?.subjectId).catch(() => {
                    errorDialogMessage.value = "Failed to create lessons.";
                    errorDialogVisible.value = true;
                }).finally(() => {
                    loadingOverlayVisible.value = false;

                    timetable.stopCreating();
                    createLessonDialogResult.value = null;
                });
            }).catch(reason => {
                errorDialogMessage.value = "Failed to create lessons.";
                errorDialogVisible.value = true;
                loadingOverlayVisible.value = false;

                timetable.stopCreating();
                createLessonDialogResult.value = null;
            });
        } else {
            timetable.createSelectedLessons(lessonColor, lessonClass?.classId, lessonSubject?.subjectId).catch(() => {
                errorDialogMessage.value = "Failed to create lessons.";
                errorDialogVisible.value = true;
            }).finally(() => {
                loadingOverlayVisible.value = false;
                timetable.stopCreating();
                createLessonDialogResult.value = null;
            });
        }
    }

    function cancelLessonCreation() {
        timetable.stopCreating();
        createLessonDialogResult.value = null;
    }

    function onCreateLessonDialogExit(result: ICreateLessonDialogResult) {
        if (result.success) createLessonDialogResult.value = result;
        else timetable.stopCreating();
    }

    function showShareDialog(lesson: ILesson) {
        shareDialogLesson.value = lesson;
        shareDialogVisible.value = true;
    }
</script>