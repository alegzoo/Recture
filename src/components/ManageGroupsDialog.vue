<template>
    <v-dialog :model-value="modelValue" width="800" persistent>
        <v-card class="manage-dialog-v-card">
            <v-card-title>
                <h2 class="pa-5">MANAGE CLASSES AND SUBJECTS</h2>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-spacer/>
                    <v-col cols="auto">
                        <v-btn-toggle class="btns-classes-subjects" v-model="view" mandatory selected-class="selected">
                            <v-btn class="classes" variant="flat" value="classes" :active="false" :ripple="false">CLASSES</v-btn>
                            <v-btn class="subjects" variant="flat" value="subjects" :active="false" :ripple="false">SUBJECTS</v-btn>
                        </v-btn-toggle>
                    </v-col>
                    <v-spacer/>
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
                            <tbody v-if="view === 'classes'">
                                <GroupRow v-for="item in tableItems" :key="(item as IClass).classId" :group="(item as IClass)" @rename="showRenameDialog(item)" @delete="showDeleteDialog(item)"/>
                            </tbody>
                            <tbody v-else-if="view === 'subjects'">
                                <GroupRow v-for="item in tableItems" :key="(item as ISubject).subjectId" :group="(item as ISubject)" @rename="showRenameDialog(item)" @delete="showDeleteDialog(item)"/>
                            </tbody>
                        </v-table>
                        <p v-show="tableItems?.length === 0" class="w-100 py-5 text-h6 text-center">No data</p>
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
                <v-btn variant="text" @click="emit('update:modelValue', false)">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <ConfirmationDialog v-model="confirmationDialogVisible" :title="'DELETE &quot;'+selectedItem?.name+'&quot;'" :message="'Are you sure you want to delete &quot;'+selectedItem?.name+'&quot;? This action is irreversible.'" positiveButtonText="Delete" negativeButtonText="Cancel" positiveButtonColor="error" @optionSelected="confirmationDialogOptionSelected"/>
    <InputDialog v-model="renameDialogVisible" :title="'RENAME &quot;'+selectedItem?.name+'&quot;'" :inputLabel="'Enter a new name for &quot;'+selectedItem?.name+'&quot;'" positiveButtonText="Rename" @inputEntered="renameDialogInputEntered"/>
    <MessageDialog v-model="errorDialogVisible" title="ERROR" :message="errorDialogMessage"/>
    <v-overlay :model-value="loadingOverlayVisible" class="align-center justify-center" contained>
        <v-progress-circular color="primary" indeterminate size="64"/>
    </v-overlay>
</template>

<script lang="ts" setup>
    //TODO: Add some way of managing topics
    import { RectureApi, IClass, ISubject } from '@/api/RectureApi';
    import { ref, watch } from 'vue';
    import status from 'http-status';
    import ConfirmationDialog from './ConfirmationDialog.vue';
    import InputDialog from './InputDialog.vue';
    import MessageDialog from './MessageDialog.vue';
    import GroupRow from './GroupRow.vue';

    const props = defineProps<{
        modelValue?: boolean
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void,
        (e: "dataModified"): void
    }>();

    const view = ref<"classes" | "subjects" | null>(null);
    const tableItems = ref<(IClass | ISubject)[] | null>([]);

    const confirmationDialogVisible = ref<boolean>(false);
    const renameDialogVisible = ref<boolean>(false);
    
    const errorDialogVisible = ref<boolean>(false);
    const errorDialogMessage = ref<string>("");

    const loadingOverlayVisible = ref<boolean>(false);

    const selectedItem = ref<IClass | ISubject | null>(null);

    watch(view, value => loadView(value));

    watch(() => props.modelValue, value => {
        if (value === true) view.value = "classes";
    });

    let fetchAbortController = new AbortController();

    function loadView(view: "classes" | "subjects" | null) {
        fetchAbortController.abort();
        fetchAbortController = new AbortController();
        tableItems.value = null;
        
        if (view === "classes") {
            RectureApi.getClasses(fetchAbortController.signal).then(result => {
                if (result.success && result.data != null) tableItems.value = result.data;
                else tableItems.value = [];
            }).catch(reason => {
                if (reason.name !== "AbortError") tableItems.value = [];
            });
        } else if (view === "subjects") {
            RectureApi.getSubjects(fetchAbortController.signal).then(result => {
                if (result.success && result.data != null) tableItems.value = result.data;
                else tableItems.value = [];
            }).catch(reason => {
                if (reason.name !== "AbortError") tableItems.value = [];
            });
        } else {
            tableItems.value = [];
        }
    }

    function showDeleteDialog(item: IClass | ISubject) {
        selectedItem.value = item;
        confirmationDialogVisible.value = true;
    }

    function showRenameDialog(item: IClass | ISubject) {
        selectedItem.value = item;
        renameDialogVisible.value = true;
    }

    function confirmationDialogOptionSelected(positive: boolean) {
        if (!positive) return;

        const item = selectedItem.value;

        if ((item as IClass).classId) {
            loadingOverlayVisible.value = true;
            const classId = (item as IClass).classId;
            RectureApi.deleteClass(classId).then(result => {
                if (result.success) {
                    emit("dataModified");
                    if (tableItems.value != null) tableItems.value = tableItems.value?.filter(val => val !== item);
                } else {
                    if (result.statusCode == status.CONFLICT) errorDialogMessage.value = "Cannot delete class to which one or more recordings is assigned.";
                    else errorDialogMessage.value = "Failed to delete class.";
                    errorDialogVisible.value = true;
                }
            }).catch(reason => {
                errorDialogMessage.value = "Failed to delete class.";
                errorDialogVisible.value = true;
            }).finally(() => {
                loadingOverlayVisible.value = false;
                selectedItem.value = null;
            });
        } else if ((item as ISubject).subjectId) {
            loadingOverlayVisible.value = true;
            const subjectId = (item as ISubject).subjectId;
            RectureApi.deleteSubject(subjectId).then(result => {
                if (result.success) {
                    emit("dataModified");
                    if (tableItems.value != null) tableItems.value = tableItems.value?.filter(val => val !== item);
                } else {
                    if (result.statusCode == status.CONFLICT) errorDialogMessage.value = "Cannot delete subject to which one or more recordings is assigned.";
                    else errorDialogMessage.value = "Failed to delete subject.";
                    errorDialogVisible.value = true;
                }
            }).catch(reason => {
                errorDialogMessage.value = "Failed to delete subject.";
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
        if (!positive || input.trim().length === 0) return;

        const item = selectedItem.value;

        if ((item as IClass).classId) {
            loadingOverlayVisible.value = true;
            const classId = (item as IClass).classId;
            RectureApi.renameClass(classId, input).then(result => {
                if (result.success) {
                    emit("dataModified");
                    if (item != null) item.name = input;
                } else {
                    //TODO: Add separate message for incorrect name format
                    errorDialogMessage.value = "Failed to rename class.";
                    errorDialogVisible.value = true;
                }
            }).catch(reason => {
                errorDialogMessage.value = "Failed to rename class.";
                errorDialogVisible.value = true;
            }).finally(() => {
                loadingOverlayVisible.value = false;
                selectedItem.value = null;
            });
        } else if ((item as ISubject).subjectId) {
            loadingOverlayVisible.value = true;
            const subjectId = (item as ISubject).subjectId;
            RectureApi.renameSubject(subjectId, input).then(result => {
                if (result.success) {
                    emit("dataModified");
                    if (item != null) item.name = input;
                } else {
                    //TODO: Add separate message for incorrect name format
                    errorDialogMessage.value = "Failed to rename subject.";
                    errorDialogVisible.value = true;
                }
            }).catch(reason => {
                errorDialogMessage.value = "Failed to rename subject.";
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
</script>