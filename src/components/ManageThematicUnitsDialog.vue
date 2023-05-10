<template>
    <v-dialog :model-value="modelValue" width="750" persistent>
        <v-card class="manage-thematic-units-v-card">
            <v-card-title>
                <v-row no-gutters align="center" align-self="center" class="pt-3">
                    <v-col>
                        <h2 class="pl-3">MANAGE THEMATIC UNITS</h2>
                    </v-col>
                    <v-spacer/>
                    <v-col cols="auto" class="pr-3" align-self="center" align="center">
                        <v-btn @click="showNewThematicUnitDialog = true" class="plus-btn" icon="mdi-plus" variant="flat"></v-btn>
                            <v-tooltip
                                activator="parent"
                                location="left"
                                class="spiked-tr"
                                >Create new thematic unit
                            </v-tooltip>
                    </v-col>
                </v-row>
                
            </v-card-title>
            <v-card-text>
                <v-row class="pt-4">
                    <v-col cols="6" class="pl-4">
                        <v-select
                            hide-details
                            no-gutters
                            label="Choose a class"
                            v-model="selectedClass"
                            :items="classes"
                            :disabled="classes.length === 0"
                            item-title="name"
                            return-object
                            variant="solo"
                            density="compact"
                            single-line
                        />
                    </v-col>
                    <v-col cols="6">
                        <v-select
                            hide-details
                            no-gutters
                            label="Choose a subject"
                            v-model="selectedSubject"
                            :items="subjects"
                            :disabled="subjects.length === 0"
                            item-title="name"
                            return-object
                            variant="solo"
                            density="compact"
                            single-line
                        />
                    </v-col>
                    
                </v-row>
                <v-row v-show="tableItems != null">
                    <v-col>
                        <v-table v-show="tableItems?.length !== 0" class="w-100 rows-items-manage-timetable" fixed-header>
                            <thead>
                                <tr>
                                    <th class="text-left rows-items-manage-timetable">Name</th>
                                    <th class="text-right rows-items-manage-timetable">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <GroupRow v-for="item in tableItems" :key="item.topicId" :group="item" :show-view-members-button="false" @rename="showRenameDialog(item)" @delete="showDeleteDialog(item)"/>
                            </tbody>
                        </v-table>
                        <p v-show="emptyTableText != null" class="w-100 py-5 text-h6 text-center">{{ emptyTableText }}</p>
                    </v-col>
                </v-row>
                <v-row v-show="tableItems == null">
                    <v-spacer/>
                    <v-col cols="auto">
                        <v-progress-circular class="ma-auto" indeterminate size="48"/>
                    </v-col>
                    <v-spacer/>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn variant="text" @click="closeDialog">Close</v-btn>
            </v-card-actions>
            <v-overlay v-model="loadingOverlayVisible" class="align-center justify-center" contained persistent>
                <v-progress-circular class="ma-auto" color="primary" indeterminate size="64"/>
            </v-overlay>
        </v-card>
    </v-dialog>
    <ConfirmationDialog v-model="confirmationDialogVisible" :title="'DELETE &quot;'+selectedItem?.name+'&quot;'" :message="'Are you sure you want to delete &quot;'+selectedItem?.name+'&quot;? This action is irreversible.'" positiveButtonText="Delete" negativeButtonText="Cancel" positiveButtonColor="error" @optionSelected="confirmationDialogOptionSelected"/>
    <InputDialog v-model="renameDialogVisible" :title="'RENAME &quot;'+selectedItem?.name+'&quot;'" :inputLabel="'Enter a new name for &quot;'+selectedItem?.name+'&quot;'" positiveButtonText="Rename" @inputEntered="renameDialogInputEntered"/>
    <MessageDialog v-model="errorDialogVisible" title="ERROR" :message="errorDialogMessage"/>
    <NewThematicUnitDialog v-model="showNewThematicUnitDialog"/>
</template>

<style lang="scss" scoped>
@import "@/styles/constants.scss";
@import "@/styles/mixins.scss";


.plus-btn{
    //@include elevated-button(3px, 3px, 1px);
    background-color: $recture-yellow;
    color: black;
    border-radius: 9999px;
    border-color: black;
    border-style: solid;
    border-width: 2px;
}

.plus-btn .v-icon{
    font-size: 100px;
}

</style>



<script lang="ts" setup>
    import { RectureApi, IClass, ISubject, ITopic } from '@/api/RectureApi';
    import { ref, computed, watch, onMounted } from 'vue';
    import status from 'http-status';
    import ConfirmationDialog from './ConfirmationDialog.vue';
    import InputDialog from './InputDialog.vue';
    import MessageDialog from './MessageDialog.vue';
    import GroupRow from './GroupRow.vue';
    import { useDisplay } from 'vuetify/lib/framework.mjs';
    import NewThematicUnitDialog from './NewThematicUnitDialog.vue';

    
    const showNewThematicUnitDialog = ref<boolean>(false);

    const props = defineProps<{
        modelValue?: boolean
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void
    }>();

    const classes = ref<IClass[]>([]);
    const subjects = ref<ISubject[]>([]);

    const selectedClass = ref<IClass | null>(null);
    const selectedSubject = ref<ISubject | null>(null);
    const tableItems = ref<(ITopic)[] | null>([]);

    const confirmationDialogVisible = ref<boolean>(false);
    const renameDialogVisible = ref<boolean>(false);
    
    const errorDialogVisible = ref<boolean>(false);
    const errorDialogMessage = ref<string>("");

    const loadingOverlayVisible = ref<boolean>(false);

    const selectedItem = ref<ITopic | null>(null);

    const emptyTableText = computed<string | null>(() => (selectedClass.value == null || selectedSubject.value == null) ? "Select a class and a subject" : ((tableItems.value == null || tableItems.value.length === 0) ? "No data" : null))

    const { mdAndUp } = useDisplay(); 

    watch(() => props.modelValue, () => {
        if (props.modelValue === true) initialize();
    });
    watch([selectedClass, selectedSubject], () => loadTopics());

    let fetchAbortController = new AbortController();

    function loadTopics() {
        fetchAbortController.abort();
        fetchAbortController = new AbortController();

        if (selectedClass.value == null || selectedSubject.value == null) {
            tableItems.value = [];
            return;
        }

        tableItems.value = null;

        RectureApi.getTopics(selectedClass.value.classId, selectedSubject.value.subjectId, fetchAbortController.signal).then(result => {
            if (result.success && result.data != null) tableItems.value = result.data;
            else tableItems.value = [];
        }).catch(reason => {
            if (reason.name !== "AbortError") tableItems.value = [];
        });
    }

    function initialize() {
        classes.value = [];
        subjects.value = [];

        tableItems.value = [];
        selectedClass.value = null;
        selectedSubject.value = null;

        confirmationDialogVisible.value = false;
        renameDialogVisible.value = false;

        errorDialogVisible.value = false;
        errorDialogMessage.value = "";

        loadingOverlayVisible.value = true;
        
        Promise.all(
            [
                RectureApi.getClasses().then(result => {
                    if (result.success && classes.value != null) {
                        classes.value = result.data as IClass[];
                    } else return Promise.reject();
                }),
                RectureApi.getSubjects().then(result => {
                    if (result.success && subjects.value != null) {
                        subjects.value = result.data as ISubject[];
                    } else return Promise.reject();
                })
            ]
        ).catch(reason => {
            classes.value = [];
            subjects.value = [];
            errorDialogMessage.value = "Failed to load data";
            errorDialogVisible.value = true;
        }).finally(() => {
            loadingOverlayVisible.value = false;
        });
    }

    function showDeleteDialog(item: ITopic) {
        selectedItem.value = item;
        confirmationDialogVisible.value = true;
    }

    function showRenameDialog(item: ITopic) {
        selectedItem.value = item;
        renameDialogVisible.value = true;
    }

    function confirmationDialogOptionSelected(positive: boolean) {
        if (!positive) return;

        const item = selectedItem.value;

        if (item != null) {
            loadingOverlayVisible.value = true;
            const topicId = item.topicId;
            RectureApi.deleteTopic(topicId).then(result => {
                if (result.success) {
                    if (tableItems.value != null) tableItems.value = tableItems.value?.filter(val => val.topicId !== item.topicId);
                } else {
                    if (result.statusCode == status.CONFLICT) errorDialogMessage.value = "Cannot delete topic to which one or more recordings is assigned.";
                    else errorDialogMessage.value = "Failed to delete thematic unit.";
                    errorDialogVisible.value = true;
                }
            }).catch(reason => {
                errorDialogMessage.value = "Failed to delete thematic unit.";
                errorDialogVisible.value = true;
            }).finally(() => {
                loadingOverlayVisible.value = false;
                selectedItem.value = null;
            });
        } else {
            loadingOverlayVisible.value = false;
            selectedItem.value = null;
        }
    }

    function renameDialogInputEntered(positive: boolean, input: string) {
        if (!positive) return;

        if (input.trim().length === 0) {
            errorDialogMessage.value = "The name you entered is invalid.";
            errorDialogVisible.value = true;
            return;
        }

        const item = selectedItem.value;

        if (item != null) {
            loadingOverlayVisible.value = true;
            const topicId = item.topicId;
            RectureApi.renameTopic(topicId, input).then(result => {
                if (result.success) {
                    if (item != null) item.name = input;
                } else {
                    //TODO: Add separate message for incorrect name format
                    errorDialogMessage.value = "Failed to rename thematic unit.";
                    errorDialogVisible.value = true;
                }
            }).catch(reason => {
                errorDialogMessage.value = "Failed to rename thematic unit.";
                errorDialogVisible.value = true;
            }).finally(() => {
                loadingOverlayVisible.value = false;
                selectedItem.value = null;
            });
        } else {
            loadingOverlayVisible.value = false;
            selectedItem.value = null;
        }
    }

    function closeDialog() {
        emit('update:modelValue', false);
    }
</script>