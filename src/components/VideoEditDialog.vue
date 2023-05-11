<template>
    <v-dialog :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)" class="h-100 justify-center" width="700" scroll-strategy="block">
        <v-card>
            <template v-slot:title>
                <div class="pt-3 d-flex">
                    <h2 class="d-flex flex-grow-1 align-self-center">EDIT RECORDING</h2>
                    <v-tooltip text="Delete recording" location="start">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" variant="plain" :ripple="false" class="d-flex flex-grow-0 align-self-center" @click="onDeleteButtonClicked">
                                <v-icon icon="mdi-delete" size="28"/>
                            </v-btn>
                        </template>
                    </v-tooltip>
                </div>
            </template>
            <v-card-text class="pa-0">
                <v-form validate-on="input" @submit.prevent="submitHandler">
                    <v-row no-gutters class="pa-0">
                        <v-col cols="12" class="form-column pl-5">
                            <v-row no-gutters class="pt-4">
                                <v-col class="subtle pl-1">
                                    <h4>Subject and class</h4>
                                </v-col>
                            </v-row>

                            <v-row class="pl-4 pt-5" align="center" no-gutters>
                                <v-col cols="auto" class="pr-0">
                                    <SubjectClassLabel :subject-name="subjectName" :class-name="className"/>
                                </v-col>
                                <!-- <v-col cols="auto" class="pl-5">
                                    <v-tooltip  text="Change" location="end">
                                        <template v-slot:activator="{ props }">
                                            <v-btn v-bind="props" variant="plain" icon="mdi-lead-pencil"/>
                                        </template>
                                    </v-tooltip>
                                </v-col> -->
                            </v-row>

                            <v-row no-gutters class="pt-10">
                                <v-col class="subtle pl-1">
                                    <h4>Date</h4>
                                </v-col>
                            </v-row>

                            <v-row no-gutters class="pt-3">
                                <v-col class="pl-1">
                                    <h2>{{ dateString }}</h2>
                                </v-col>
                            </v-row>

                            <v-row no-gutters class="pt-8">
                                <v-col class="subtle pl-1">
                                    <h4>Quiz (optional)</h4>
                                </v-col>
                            </v-row>

                            <v-row class="pt-5" align="start" no-gutters align-self="center">
                                <v-col class="py-0 pl-1">
                                    <v-combobox
                                        v-model="selectedQuiz"
                                        hide-details
                                        label="Choose quiz"
                                        :items="quizzes"
                                        item-title="title"
                                        return-object
                                        variant="solo"
                                        density="compact"
                                        single-line
                                        clearable
                                    />
                                </v-col>
                                <!-- A bit of a hack, but it works -->
                                <v-col cols="auto" class="px-15"/>
                                <v-spacer/>
                            </v-row>

                            <v-row no-gutters class="pt-5">
                                <v-col class="subtle pl-1">
                                    <h4>Thematic unit</h4>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="12" class="py-0 pl-4 pr-11">
                                    <SelectOrCreateInput v-model="selectedTopic" select-label="Choose a thematic unit" field-label="Enter name of thematic unit to create" :items="topics" item-title="name" :mandatory="true"/>
                                </v-col>
                            </v-row>

                            <v-row class="mt-+">
                                <v-col cols="12" class="pl-5 pr-11">
                                    <v-text-field v-model="title" :rules="formRules" variant="underlined" label="Title" class="title-field" single-line/>
                                </v-col>
                            </v-row>

                            <v-row no-gutters class="pt-3 pr-8">
                                <v-col>
                                    <v-textarea
                                        v-model="description"
                                        class="pl-2 text-area-description"
                                        label="Description (optional)"
                                        :ripple="false"
                                        :active="false"
                                        auto-grow
                                        variant="outlined"
                                        rows="3"
                                        row-height="15"
                                        single-line
                                    />
                                </v-col>
                            </v-row>

                            <v-row no-gutters class="pt-3">
                                <v-col class="subtle pl-2">
                                    <h4>Comments</h4>
                                </v-col>
                            </v-row>

                            <v-row no-gutters class="pt-3">
                                <v-col>
                                    <v-radio-group v-model="commentsAllowed" :rules="formRules" inline>
                                        <v-radio label="Allow" :value="true"></v-radio>
                                        <v-radio class="pl-8" label="Deny" :value="false"></v-radio>
                                    </v-radio-group>
                                </v-col>
                            </v-row>

                            <v-row no-gutters class="pt-3" align-content="center">
                                <v-col class="subtle pl-3" cols="auto" align-self="center">
                                    <h4>Visibility</h4>
                                </v-col>
                            </v-row>
                            
                            <v-row no-gutters class="pt-3">
                                <v-col>
                                    <v-radio-group v-model="published" :rules="formRules" inline>
                                        <v-radio label="Public" :value="true"></v-radio>
                                        <v-radio class="pl-8" label="Private" :value="false"></v-radio>
                                    </v-radio-group>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row no-gutters height="auto">
                        <v-col align="center" align-self="end">
                            <v-btn type="submit" class="w-100" height="50" variant="text">SAVE</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-overlay v-model="loadingOverlayVisible" class="align-center justify-center" contained persistent>
                <v-progress-circular class="ma-auto" color="primary" indeterminate size="64"/>
            </v-overlay>
        </v-card>
    </v-dialog>
    <MessageDialog v-model="errorDialogVisible" title="ERROR" :message="errorDialogMessage"/>
    <ConfirmationDialog v-model="deletionConfirmationDialogVisible" :title="'DELETE RECORDING'" :message="'Are you sure you want to delete this recording? This action is irreversible.'" positiveButtonText="Delete" negativeButtonText="Cancel" positiveButtonColor="error" @optionSelected="deletionConfirmationDialogOptionSelected"/>
    <NewQuizDialog v-model="newQuizDialogVisible"/>
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";
    @import "@/styles/mixins.scss";

    .v-card {
        background-color: #efefef;
    }

    .file-column {
        background-color: #C8C7C7 !important;
    }

    .subtle {
        color: rgba(0, 0, 0, 0.5);
    }

    .v-btn[type="submit"] {
        background-color: $recture-bright-blue;
        color: white !important;
        font-size: large;
        font-weight: bold;
        border-radius: 0px;
    }

    .title-field :deep(input) {
        font-weight: bold !important;
    }
</style>

<script lang="ts" setup>
    import { ref, reactive, watch } from 'vue';
    import { IRecording, RectureApi } from '@/api/RectureApi';
    import { useRecordingEditForm } from '@/composables/useRecordingEditForm';
    import SubjectClassLabel from './SubjectClassLabel.vue';
    import SelectOrCreateInput from './SelectOrCreateInput.vue';
    import MessageDialog from './MessageDialog.vue';
    import ConfirmationDialog from './ConfirmationDialog.vue';
    import NewQuizDialog from './NewQuizDialog.vue';
import router from '@/router';

    const props = defineProps<{
        modelValue?: boolean,
        recording: IRecording | null | undefined
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void,
        (e: "dataModified"): void
    }>();

    watch(() => [props.modelValue, props.recording], () => {
        if (props.modelValue === true) initialize();
    });

    function initialize() {
        loadingOverlayVisible.value = true;

        editForm.loadData(props.recording).catch(() => {
            errorDialogMessage.value = "Failed to load data";
            errorDialogVisible.value = true;
        }).finally(() => {
            loadingOverlayVisible.value = false;
        });
    }
    
    const loadingOverlayVisible = ref<boolean>(false);

    const errorDialogVisible = ref<boolean>(false);
    const errorDialogMessage = ref<string>("");

    const deletionConfirmationDialogVisible = ref<boolean>(false);

    const newQuizDialogVisible = ref<boolean>(false);

    const editForm = useRecordingEditForm();

    const { title, description, selectedTopic, selectedQuiz, commentsAllowed, published, className, subjectName, dateString, topics, quizzes } = editForm;

    const formRules = reactive<((value: any) => boolean | string)[]>([((val: any) => {
        if (val instanceof String || typeof val === "string") {
            if (val.trim().length > 0) return true;
            else return "Must not be blank.";
        } else if (val != null) return true;
        else return "Please select one of the options.";
    })]);

    function submitHandler(): void {
        if (props.recording == null || !editForm.validateForm()) return;

        loadingOverlayVisible.value = true;

        editForm.saveData(props.recording.recordingId).then(result => {
            if (result.success) {
                emit("dataModified");
                emit("update:modelValue", false);
            } else {
                errorDialogMessage.value = "Failed to update recording.";
                errorDialogVisible.value = true;
            }
        }).catch(reason => {
            errorDialogMessage.value = "Failed to update recording.";
            errorDialogVisible.value = true;
        }).finally(() => {
            loadingOverlayVisible.value = false;
        });
    }

    function onDeleteButtonClicked(): void {
        deletionConfirmationDialogVisible.value = true;
    }
    
    function deletionConfirmationDialogOptionSelected(positive: boolean) {
        if (positive === true) {
            if (props.recording == null) {
                errorDialogMessage.value = "Failed to delete recording.";
                errorDialogVisible.value = true;
                return;
            }

            loadingOverlayVisible.value = true;
            
            RectureApi.deleteRecording(props.recording.recordingId).then(result => {
                if (result.success) {
                    emit("update:modelValue", false);
                    router.push("/");
                } else {
                    errorDialogMessage.value = "Failed to delete recording.";
                    errorDialogVisible.value = true;
                }
            }).catch(reason => {
                errorDialogMessage.value = "Failed to delete recording.";
                errorDialogVisible.value = true;
            }).finally(() => {
                loadingOverlayVisible.value = false;
            })
        }
    }
</script>