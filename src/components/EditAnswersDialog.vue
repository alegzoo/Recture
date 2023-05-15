<template>
    <v-dialog :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)" width="800">
            <v-card>
                <v-card-title>
                    <v-row no-gutters align="center" align-self="center" class="pt-3">
                        <v-col>
                            <h2 class="pl-3">EDIT ANSWERS</h2>
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
                                <AnswerRow v-for="item in tableItems" :key="item.answerId" :answer="item" @rename="showRenameDialog(item)" @delete="showDeleteDialog(item)"/>
                            </tbody>
                        </v-table>
                        <p v-show="tableItems.length === 0" class="w-100 py-5 text-h6 text-center">No data</p>
                        
                        <v-row no-gutters class="pa-0 pt-5 pb-3">
                            <v-col cols="auto">
                                <v-btn class="plus-btn" icon="mdi-plus" variant="flat" @click="createAnswerDialogVisible = true"/>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-card-text>
                <InputDialog v-model="createAnswerDialogVisible" :title="'CREATE NEW ANSWER'" inputLabel="Enter a name for your new answer" positiveButtonText="Create" @inputEntered="createAnswerDialogInputEntered"/>
                <InputDialog v-model="renameDialogVisible" :title="'RENAME &quot;'+selectedItem?.content+'&quot;'" :inputLabel="'Enter a new name for &quot;'+selectedItem?.content+'&quot;'" positiveButtonText="Rename" @inputEntered="renameDialogInputEntered"/>
                <ConfirmationDialog v-model="confirmationDialogVisible" :title="'DELETE &quot;'+selectedItem?.content+'&quot;'" :message="'Are you sure you want to delete &quot;'+selectedItem?.content+'&quot;? This action is irreversible.'" positiveButtonText="Delete" negativeButtonText="Cancel" positiveButtonColor="error" @optionSelected="confirmationDialogOptionSelected"/>
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
    tr th {
        background-color: transparent !important;
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
</style>

<script lang="ts" setup>
    import { ref, watch } from 'vue';
    import { IQuizAnswer, IQuizQuestion, RectureApi } from '@/api/RectureApi';
    import AnswerRow from './AnswerRow.vue';
    import InputDialog from './InputDialog.vue';
    import ConfirmationDialog from './ConfirmationDialog.vue';
    import MessageDialog from './MessageDialog.vue';

    const props = defineProps<{
        modelValue?: boolean,
        question: IQuizQuestion | null
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void
    }>();

    watch(() => [props.modelValue, props.question], () => loadAnswers());

    const tableItems = ref<IQuizAnswer[]>([]);

    const selectedItem = ref<IQuizAnswer | null>(null);

    const createAnswerDialogVisible = ref<boolean>(false);

    const confirmationDialogVisible = ref<boolean>(false);
    const renameDialogVisible = ref<boolean>(false);

    const errorDialogVisible = ref<boolean>(false);
    const errorDialogMessage = ref<string>("");

    const loadingOverlayVisible = ref<boolean>(false);

    function loadAnswers() {
        if (props.question != null) {
            tableItems.value = props.question.answers;
        } else {
            tableItems.value = [];
        }
    }

    function showRenameDialog(item: IQuizAnswer) {
        selectedItem.value = item;
        renameDialogVisible.value = true;
    }

    function showDeleteDialog(item: IQuizAnswer) {
        selectedItem.value = item;
        confirmationDialogVisible.value = true;
    }

    function createAnswerDialogInputEntered(positive: boolean, input: string) {
        if (!positive || props.question == null) return;

        loadingOverlayVisible.value = true;

        RectureApi.createQuizAnswer(props.question.questionId, input, false).then(result => {
            if (result.success && result.data != null) {
                if (props.question != null) {
                    props.question.answers.push(result.data);
                    loadAnswers();
                }
            } else {
                errorDialogMessage.value = "Failed to create answer.";
                errorDialogVisible.value = true;
            }
        }).catch(reason => {
            errorDialogMessage.value = "Failed to create answer.";
            errorDialogVisible.value = true;
        }).finally(() => {
            loadingOverlayVisible.value = false;
        });
    }

    function confirmationDialogOptionSelected(positive: boolean) {
        if (!positive || selectedItem.value == null) return;

        loadingOverlayVisible.value = true;

        const answer = selectedItem.value;

        RectureApi.deleteQuizAnswer(answer.answerId).then(result => {
            if (result.success) {
                tableItems.value = tableItems.value.filter(item => item.answerId !== answer.answerId);
            } else {
                errorDialogMessage.value = "Failed to delete answer.";
                errorDialogVisible.value = true;
            }
        }).catch(reason => {
            errorDialogMessage.value = "Failed to delete answer.";
            errorDialogVisible.value = true;
        }).finally(() => {
            selectedItem.value = null;
            loadingOverlayVisible.value = false;
        });
    }

    function renameDialogInputEntered(positive: boolean, input: string) {
        if (!positive || selectedItem.value == null) return;

        loadingOverlayVisible.value = true;

        const answer = selectedItem.value;

        RectureApi.updateQuizAnswer(answer.answerId, input, null).then(result => {
            if (result.success) {
                answer.content = input;
            } else {
                errorDialogMessage.value = "Failed to rename answer.";
                errorDialogVisible.value = true;
            }
        }).catch(reason => {
            errorDialogMessage.value = "Failed to rename answer.";
            errorDialogVisible.value = true;
        }).finally(() => {
            selectedItem.value = null;
            loadingOverlayVisible.value = false;
        });
    }
</script>