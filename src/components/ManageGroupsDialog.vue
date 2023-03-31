<template>
    <v-dialog :model-value="modelValue" width="800" persistent>
        <v-card>
            <v-card-title>
                <h2 class="pa-5">MANAGE CLASSES AND SUBJECTS</h2>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-spacer/>
                    <v-col cols="auto">
                        <v-btn-toggle v-model="view">
                            <v-btn value="classes">CLASSES</v-btn>
                            <v-btn value="subjects">SUBJECTS</v-btn>
                        </v-btn-toggle>
                    </v-col>
                    <v-spacer/>
                </v-row>
                <v-row v-show="tableItems != null">
                    <v-col>
                        <v-table v-show="tableItems?.length !== 0" class="w-100" fixed-header>
                            <thead>
                                <tr>
                                    <th class="text-left">Name</th>
                                    <th class="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in tableItems">
                                    <td>
                                        <span>{{ item.name }}</span>
                                        <v-tooltip text="Rename" location="end">
                                            <template v-slot:activator="{ props }">
                                                <v-btn v-bind="props" variant="plain" icon="mdi-pencil" @click="showRenameDialog(item)"/>
                                            </template>
                                        </v-tooltip>
                                    </td>
                                    <td class="text-right">
                                        <v-tooltip text="View members" location="start">
                                            <template v-slot:activator="{ props }">
                                                <v-btn v-bind="props" variant="plain" icon="mdi-account-multiple"/>
                                            </template>
                                        </v-tooltip>
                                        <v-tooltip text="Delete" location="end">
                                            <template v-slot:activator="{ props }">
                                                <v-btn v-bind="props" variant="plain" icon="mdi-delete" @click="showDeleteDialog(item)"/>
                                            </template>
                                        </v-tooltip>
                                    </td>
                                </tr>
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
    <v-overlay :model-value="loadingOverlayVisible" class="align-center justify-center" contained>
        <v-progress-circular color="primary" indeterminate size="64"/>
    </v-overlay>
</template>

<script lang="ts" setup>
    //TODO: Create some way of managing topics
    import { RectureApi, IClass, ISubject } from '@/api/RectureApi';
    import { ref, watch } from 'vue';
    import ConfirmationDialog from './ConfirmationDialog.vue';
    import InputDialog from './InputDialog.vue';

    const props = defineProps<{
        modelValue?: boolean
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void,
        (e: "dataUpdated"): void
    }>();

    const view = ref<"classes" | "subjects" | null>(null);
    const tableItems = ref<(IClass | ISubject)[] | null>([]);

    const confirmationDialogVisible = ref<boolean>(false);
    const renameDialogVisible = ref<boolean>(false);
    const loadingOverlayVisible = ref<boolean>(false);

    const selectedItem = ref<IClass | ISubject | null>(null);

    watch(view, value => loadView(value));

    watch(() => props.modelValue, value => {
        if (value === true) view.value = "classes";
    });

    function loadView(view: "classes" | "subjects" | null) {
        tableItems.value = null;
        
        if (view === "classes") {
            RectureApi.getClasses().then(result => {
                if (result.success && result.data != null) tableItems.value = result.data;
            }).catch(reason => {
                tableItems.value = [];
            });
        } else if (view === "subjects") {
            RectureApi.getSubjects().then(result => {
                if (result.success && result.data != null) tableItems.value = result.data;
            }).catch(reason => {
                tableItems.value = [];
            });;
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
        //if (tableItems.value != null) tableItems.value = tableItems.value?.filter(val => val !== item);

        if ((item as IClass).classId) {
            loadingOverlayVisible.value = true;
            const classId = (item as IClass).classId;
            RectureApi.deleteClass(classId).then(result => {
                loadingOverlayVisible.value = false;
                selectedItem.value = null;
                if (result.success) {
                    emit("dataUpdated");
                    if (tableItems.value != null) tableItems.value = tableItems.value?.filter(val => val !== item);
                    //else loadView(view.value);
                } //else loadView(view.value);
            }).catch(reason => {
                loadingOverlayVisible.value = false;
                selectedItem.value = null;
                //loadView(view.value);
            });
        } else if ((item as ISubject).subjectId) {
            loadingOverlayVisible.value = true;
            const subjectId = (item as ISubject).subjectId;
            RectureApi.deleteSubject(subjectId).then(result => {
                loadingOverlayVisible.value = false;
                selectedItem.value = null;
                if (result.success) {
                    emit("dataUpdated");
                    if (tableItems.value != null) tableItems.value = tableItems.value?.filter(val => val !== item);
                    //else loadView(view.value);
                } //else loadView(view.value);
            }).catch(reason => {
                loadingOverlayVisible.value = false;
                selectedItem.value = null;
                //loadView(view.value);
            });
        } else {
            loadingOverlayVisible.value = false;
            selectedItem.value = null;
            //loadView(view.value);
        }
    }

    function renameDialogInputEntered(positive: boolean, input: string) {
        if (!positive || input.trim().length === 0) return;

        const item = selectedItem.value;

        if ((item as IClass).classId) {
            loadingOverlayVisible.value = true;
            const classId = (item as IClass).classId;
            RectureApi.renameClass(classId, input).then(result => {
                loadingOverlayVisible.value = false;
                selectedItem.value = null;
                if (result.success) {
                    emit("dataUpdated");
                    if (item != null) item.name = input;
                    //else loadView(view.value);
                } //else loadView(view.value);
            }).catch(reason => {
                loadingOverlayVisible.value = false;
                selectedItem.value = null;
                //loadView(view.value);
            });
        } else if ((item as ISubject).subjectId) {
            loadingOverlayVisible.value = true;
            const subjectId = (item as ISubject).subjectId;
            RectureApi.renameSubject(subjectId, input).then(result => {
                loadingOverlayVisible.value = false;
                selectedItem.value = null;
                if (result.success) {
                    emit("dataUpdated");
                    if (item != null) item.name = input;
                    //else loadView(view.value);
                } //else loadView(view.value);
            }).catch(reason => {
                loadingOverlayVisible.value = false;
                selectedItem.value = null;
                //loadView(view.value);
            });
        } else {
            loadingOverlayVisible.value = false;
            selectedItem.value = null;
            //loadView(view.value);
        }
    }
</script>