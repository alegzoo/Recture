<template>
    <v-container class="timetable-container px-6 h-100 d-flex flex-column" fluid>
        <v-row class="mt-1 pr-3 flex-grow-0">
            <v-col align-self="start">
                <p id="your-timetable-text" class="text-h4 font-weight-medium">Your timetable</p>
            </v-col>

            <v-spacer/>
            
            <v-col cols="auto" align-self="center">
                <v-btn id="timetable-edit-button" :ripple="false" variant="text" :icon="timetableStore.editing?'mdi-close':'mdi-lead-pencil'" @click="timetableStore.toggleEditing()"/>
            </v-col>
        </v-row>

        <v-row class="mt-0 flex-grow-0"> 
            <v-col cols="12" align-self="start">
                <v-icon icon="mdi-information" class="mr-2"/>
                <span class="text-h10 font-weight-medium" style="vertical-align: middle;">Click on an empty space in the timetable to add a new lesson</span>
            </v-col>
        </v-row>

        <v-row class="flex-grow-1">
            <v-col cols="12" :class="'h-100 d-flex flex-column py-7'+(mdAndUp?' px-10':'')">
                <TimetableGrid id="timetable-grid" align="stretch" class="flex-grow-1" rounded/>
                <v-row align="end" align-content="end" justify="end" class="flex-grow-0 pt-7">
                    <v-col cols="auto">
                        <v-btn variant="text" class="footer-button" :ripple="false" :disabled="timetableStore.editing" prepend-icon="mdi-table-edit" @click="showManageGroupsDialog = !showManageGroupsDialog">
                            MANAGE CLASSES AND SUBJECTS
                        </v-btn>
                    </v-col>

                    <v-spacer v-show="lgAndUp"/>

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
                </v-row>
            </v-col>
        </v-row>
    </v-container>
    <ManageGroupsDialog v-model="showManageGroupsDialog" @dataModified="timetableStore.fetchLessons()"/>
</template>

<style>

</style>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { useTimetableStore } from '@/stores/useTimetableStore';
    import TimetableGrid from '@/components/TimetableGrid.vue';
    import ManageGroupsDialog from '@/components/ManageGroupsDialog.vue';
    import { useDisplay } from 'vuetify/lib/framework.mjs';

    import "@/styles/timetable.scss";

    const { mdAndUp, lgAndUp } = useDisplay();

    const showManageGroupsDialog = ref(false);

    const timetableStore = useTimetableStore();
    
    timetableStore.$reset();
    timetableStore.setWeek();
    timetableStore.fetchTimetable();
    timetableStore.fetchLessons();
</script>