<template>
    <v-dialog :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)" width="900">
            <v-card>
                <v-card-title>
                    <v-row no-gutters align="center" align-self="center" class="pt-3">
                        <v-col>
                            <h2 class="pl-3">EDIT QUESTIONS</h2>
                        </v-col>
                    </v-row>         
                </v-card-title>      
                <v-card-text>
                    <v-col class="pt-3 pa-0" v-show="tableItems != null">
                        <v-table v-show="tableItems.length !== 0" class="w-100 rows-items-manage-timetable" fixed-header>
                            <thead>
                                <tr>
                                    <th class="text-left">Name</th>
                                    <th class="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <QuestionRow v-for="item in tableItems" :key="item.questionId" :question="item" @rename="showRenameDialog(item)" @delete="showDeleteDialog(item)" @edit="showEditAnswersDialog(item)"/>
                            </tbody>
                        </v-table>
                        <p v-show="tableItems.length === 0" class="w-100 py-5 text-h6 text-center">No data</p>

                        <v-row no-gutters class="pa-0 pt-5 pb-3">
                            <v-col cols="auto">
                                <v-btn class="plus-btn" icon="mdi-plus" variant="flat" @click="createQuestionDialogVisible = true"/>
                            </v-col>
                        </v-row>
                    </v-col>

                </v-card-text>
                <InputDialog v-model="createQuestionDialogVisible" :title="'CREATE NEW QUESTION'" inputLabel="Enter a name for your new question" positiveButtonText="Create" @inputEntered="createQuestionDialogInputEntered"/>
                <InputDialog v-model="renameDialogVisible" :title="'RENAME &quot;'+selectedItem?.content+'&quot;'" :inputLabel="'Enter a new name for &quot;'+selectedItem?.content+'&quot;'" positiveButtonText="Rename" @inputEntered="renameDialogInputEntered"/>
                <ConfirmationDialog v-model="confirmationDialogVisible" :title="'DELETE &quot;'+selectedItem?.content+'&quot;'" :message="'Are you sure you want to delete &quot;'+selectedItem?.content+'&quot;? This action is irreversible.'" positiveButtonText="Delete" negativeButtonText="Cancel" positiveButtonColor="error" @optionSelected="confirmationDialogOptionSelected"/>
                <EditAnswersDialog v-model="editAnswersDialogVisible" :question="selectedItem"/>
                <MessageDialog v-model="errorDialogVisible" title="ERROR" :message="errorDialogMessage"/>
                <v-overlay v-model="loadingOverlayVisible" class="align-center justify-center" contained persistent>
                    <v-progress-circular class="ma-auto" color="primary" indeterminate size="64"/>
                </v-overlay>
            </v-card>
    </v-dialog>
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";
    @import "@/styles/mixins.scss";

    .v-card {
        background-color: #efefef;
    }

    .subtle {
        color: rgba(0, 0, 0, 0.5);
    }

    .plus-btn {
        @include elevated-button(3px, 3px, 1px);
        background-color: $recture-yellow;
        color: black;
        border-radius: 9999px;
        border-color: black;
        border-style: solid;
        border-width: 2px;
    }

    tr th {
        background-color: transparent !important;
    }
</style>

<script lang="ts" setup>
    import { ref, watch } from 'vue';
    import { IQuiz, IQuizQuestion, RectureApi } from '@/api/RectureApi';
    import InputDialog from './InputDialog.vue';
    import ConfirmationDialog from './ConfirmationDialog.vue';
    import QuestionRow from './QuestionRow.vue'
    import EditAnswersDialog from './EditAnswersDialog.vue';
    import MessageDialog from './MessageDialog.vue';

    const selectedItem = ref<IQuizQuestion | null>(null);

    const props = defineProps<{
        modelValue?: boolean,
        quiz: IQuiz | null
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void
    }>();

    const tableItems = ref<IQuizQuestion[]>([]);

    const createQuestionDialogVisible = ref<boolean>(false);
    const renameDialogVisible = ref<boolean>(false);
    const confirmationDialogVisible = ref<boolean>(false);
    const editAnswersDialogVisible = ref<boolean>(false);

    const errorDialogVisible = ref<boolean>(false);
    const errorDialogMessage = ref<string>("");

    const loadingOverlayVisible = ref<boolean>(false);

    watch(() => [props.modelValue, props.quiz], () => loadQuestions());

    function loadQuestions() {
        if (props.quiz != null) {
            tableItems.value = props.quiz.questions;
        } else {
            tableItems.value = [];
        }
    }

    function showRenameDialog(item: IQuizQuestion) {
        selectedItem.value = item;
        renameDialogVisible.value = true;
    }

    function showDeleteDialog(item: IQuizQuestion) {
        selectedItem.value = item;
        confirmationDialogVisible.value = true;
    }

    function showEditAnswersDialog(item: IQuizQuestion) {
        selectedItem.value = item;
        editAnswersDialogVisible.value = true;
    }

    function createQuestionDialogInputEntered(positive: boolean, input: string) {
        if (!positive || props.quiz == null) return;

        loadingOverlayVisible.value = true;

        RectureApi.createQuizQuestion(props.quiz.quizId, input).then(result => {
            if (result.success && result.data != null) {
                if (props.quiz != null) {
                    props.quiz.questions.push(result.data);
                    loadQuestions();
                }
            } else {
                errorDialogMessage.value = "Failed to create question.";
                errorDialogVisible.value = true;
            }
        }).catch(reason => {
            errorDialogMessage.value = "Failed to create question.";
            errorDialogVisible.value = true;
        }).finally(() => {
            loadingOverlayVisible.value = false;
        });
    }

    function confirmationDialogOptionSelected(positive: boolean) {
        if (!positive || selectedItem.value == null) return;

        loadingOverlayVisible.value = true;

        const question = selectedItem.value;

        RectureApi.deleteQuizQuestion(question.questionId).then(result => {
            if (result.success) {
                tableItems.value = tableItems.value.filter(item => item.questionId !== question.questionId);
            } else {
                errorDialogMessage.value = "Failed to delete question.";
                errorDialogVisible.value = true;
            }
        }).catch(reason => {
            errorDialogMessage.value = "Failed to delete question.";
            errorDialogVisible.value = true;
        }).finally(() => {
            selectedItem.value = null;
            loadingOverlayVisible.value = false;
        });
    }

    function renameDialogInputEntered(positive: boolean, input: string) {
        if (!positive || selectedItem.value == null) return;

        loadingOverlayVisible.value = true;

        const question = selectedItem.value;

        RectureApi.updateQuizQuestion(question.questionId, input).then(result => {
            if (result.success) {
                question.content = input;
            } else {
                errorDialogMessage.value = "Failed to rename question.";
                errorDialogVisible.value = true;
            }
        }).catch(reason => {
            errorDialogMessage.value = "Failed to rename question.";
            errorDialogVisible.value = true;
        }).finally(() => {
            selectedItem.value = null;
            loadingOverlayVisible.value = false;
        });
    }
</script>