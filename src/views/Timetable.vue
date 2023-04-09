<template>
    <v-container class="timetable-container px-6 h-100 d-flex flex-column" fluid>
        <v-row class="mt-1 pr-3 flex-grow-0">
            <v-col align-self="start">
                <p id="your-timetable-text" class="text-h4 font-weight-medium">Your timetable</p>
            </v-col>

            <v-spacer/>
            
            <v-col cols="auto" align-self="center">
                <v-btn id="timetable-edit-button" :ripple="false" variant="text" :icon="timetableStore.editing?'mdi-close':'mdi-lead-pencil'" :disabled="timetableStore.creating" @click="timetableStore.toggleEditing()"/>
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
                <TimetableGrid align="stretch" class="flex-grow-1" rounded @timetable-cell-click="onGridCellClick"/>
                <v-row align="end" align-content="end" justify="end" class="flex-grow-0 pt-7">
                    <v-col cols="auto">
                        <v-btn variant="text" class="footer-button" :ripple="false" :disabled="!timetableStore.idle" prepend-icon="mdi-table-edit" @click="showManageGroupsDialog = !showManageGroupsDialog">
                            MANAGE CLASSES AND SUBJECTS
                        </v-btn>
                    </v-col>

                    <v-spacer v-show="lgAndUp"/>

                    <template v-if="timetableStore.creating">
                        <v-col cols="auto">
                            <v-btn variant="text" class="footer-button secondary creating-button" :ripple="false" @click="timetableStore.stopCreating()">
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
                            <v-btn variant="text" class="footer-button plus-button" :ripple="false" :disabled="timetableStore.editing" append-icon="mdi-plus-circle">
                                NEW THEMATIC UNIT
                            </v-btn>
                        </v-col>

                        <v-col cols="auto">
                            <v-btn variant="text" class="footer-button plus-button" :ripple="false" :disabled="timetableStore.editing" append-icon="mdi-plus-circle">
                                NEW QUESTION SERIES
                            </v-btn>
                        </v-col>
                    </template>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
    <v-overlay v-model="timetableStore.creating" persistent z-index="190"></v-overlay>
    <ManageGroupsDialog v-model="showManageGroupsDialog" @dataModified="timetableStore.fetchLessons()"/>
    <CreateLessonDialog v-model="showCreateLessonDialog" @dialog-exit="onCreateLessonDialogExit"/>
</template>

<style>

</style>

<script lang="ts" setup>
    import { ref, computed } from 'vue';
    import { ITimetableGridPosition, useTimetableStore } from '@/stores/useTimetableStore';
    import TimetableGrid from '@/components/TimetableGrid.vue';
    import ManageGroupsDialog from '@/components/ManageGroupsDialog.vue';
    import CreateLessonDialog, { ICreateLessonDialogResult } from '@/components/CreateLessonDialog.vue';
    import { useDisplay } from 'vuetify/lib/framework.mjs';

    import "@/styles/timetable.scss";

    const { mdAndUp, lgAndUp } = useDisplay();

    const showManageGroupsDialog = ref(false);
    const showCreateLessonDialog = ref(false);

    const createLessonsButtonText = computed<string>(() => timetableStore.selection.length > 1?`CREATE ${timetableStore.selection.length} LESSONS`:'CREATE LESSON');

    const timetableStore = useTimetableStore();
    
    timetableStore.$reset();
    timetableStore.setWeek();
    timetableStore.fetchTimetable();
    timetableStore.fetchLessons();

    function onGridCellClick(cellPosition: ITimetableGridPosition) {
        if (timetableStore.creating) {
            timetableStore.toggleCellSelectionStatus(cellPosition);
        } else {
            timetableStore.startCreating(cellPosition);
            showCreateLessonDialog.value = true;
        }
    }

    function createLessons() {
        timetableStore.stopCreating();
        //TODO: Implement
    }

    function onCreateLessonDialogExit(result: ICreateLessonDialogResult) {
        if (!result.success) timetableStore.stopCreating();
    }
</script>