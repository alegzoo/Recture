<template>
    <v-container class="timetable-container px-6 h-100 d-flex flex-column" fluid>
        <v-row class="mt-1 pr-3 flex-grow-0">
            <v-col align-self="start">
                <p id="your-timetable-text" class="text-h4 font-weight-medium">Your timetable</p>
            </v-col>

            <v-spacer/>
            
            <v-col cols="auto" align-self="center">
                <v-btn id="timetable-edit-button" :ripple="false" variant="text" :icon="timetable.editing.value?'mdi-close':'mdi-lead-pencil'" :disabled="timetable.creating.value" @click="timetable.toggleEditing()"/>
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
                <TimetableGrid :timetable="timetable" align="stretch" class="flex-grow-1" rounded @timetable-cell-click="onGridCellClick"/>
                <v-row align="end" align-content="end" justify="end" class="flex-grow-0 pt-7">
                    <v-col cols="auto">
                        <v-btn variant="text" class="footer-button" :ripple="false" :disabled="!timetable.idle.value" prepend-icon="mdi-table-edit" @click="showManageGroupsDialog = !showManageGroupsDialog">
                            MANAGE CLASSES AND SUBJECTS
                        </v-btn>
                    </v-col>

                    <v-spacer v-show="lgAndUp"/>

                    <template v-if="timetable.creating.value">
                        <v-col cols="auto">
                            <v-btn variant="text" class="footer-button secondary creating-button" :ripple="false" @click="timetable.stopCreating()">
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
                            <v-btn variant="text" class="footer-button plus-button" :ripple="false" :disabled="timetable.editing.value" append-icon="mdi-plus-circle">
                                NEW THEMATIC UNIT
                            </v-btn>
                        </v-col>

                        <v-col cols="auto">
                            <v-btn variant="text" class="footer-button plus-button" :ripple="false" :disabled="timetable.editing.value" append-icon="mdi-plus-circle">
                                NEW QUESTION SERIES
                            </v-btn>
                        </v-col>
                    </template>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
    <v-overlay v-model="timetable.creating.value" persistent z-index="190"></v-overlay>
    <ManageGroupsDialog v-model="showManageGroupsDialog" @dataModified="timetable.fetchLessons()"/>
    <CreateLessonDialog v-model="showCreateLessonDialog" @dialog-exit="onCreateLessonDialogExit"/>
</template>

<style>

</style>

<script lang="ts" setup>
    import { ref, computed } from 'vue';
    import { ITimetableGridPosition, useTimetable } from '@/composables/useTimetable';
    import TimetableGrid from '@/components/TimetableGrid.vue';
    import ManageGroupsDialog from '@/components/ManageGroupsDialog.vue';
    import CreateLessonDialog, { ICreateLessonDialogResult } from '@/components/CreateLessonDialog.vue';
    import { useDisplay } from 'vuetify/lib/framework.mjs';

    import "@/styles/timetable.scss";

    const { mdAndUp, lgAndUp } = useDisplay();

    const showManageGroupsDialog = ref(false);
    const showCreateLessonDialog = ref(false);

    const createLessonsButtonText = computed<string>(() => timetable.selection.value.length > 1?`CREATE ${timetable.selection.value.length} LESSONS`:'CREATE LESSON');

    const timetable = useTimetable();
    
    timetable.setWeek();
    timetable.fetchTimetable();
    timetable.fetchLessons();

    function onGridCellClick(cellPosition: ITimetableGridPosition) {
        if (timetable.creating.value) {
            timetable.toggleCellSelectionStatus(cellPosition);
        } else {
            timetable.startCreating(cellPosition);
            showCreateLessonDialog.value = true;
        }
    }

    function createLessons() {
        timetable.stopCreating();
        //TODO: Implement
    }

    function onCreateLessonDialogExit(result: ICreateLessonDialogResult) {
        if (!result.success) timetable.stopCreating();
    }
</script>