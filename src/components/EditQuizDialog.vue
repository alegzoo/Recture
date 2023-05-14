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
                        <v-table class="w-100 px-1 rows-items-edit-questions" fixed-header>
                            <thead>
                                <tr class="w-100">
                                    <th class="text-left rows-items-edit-questions">Questions</th>
                                    <th class="text-right rows-items-edit-questions">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                <QuestionRow v-for="item in tableItems" :key="item.questionId" :question="item" @rename="showRenameDialog(item)" @delete="showDeleteDialog(item)"  @edit="showEditAnswersDialog(item)"/>
                            </tbody>
                            <p v-show="tableItems?.length === 0" class="w-100 py-5 text-h6 text-center">No data</p>
                        </v-table>
                    </v-col>

                    <v-row no-gutters class="pa-0 pt-5 pb-3">
                        <v-col cols="auto">
                            <v-btn class="plus-btn" icon="mdi-plus" variant="flat"/>
                        </v-col>
                    </v-row>
                </v-card-text>
                <InputDialog v-model="renameDialogVisible" :title="'RENAME &quot;'+selectedItem?.content+'&quot;'" :inputLabel="'Enter a new name for &quot;'+selectedItem?.content+'&quot;'" positiveButtonText="Rename" @inputEntered="renameDialogInputEntered"/>
                <ConfirmationDialog v-model="confirmationDialogVisible" :title="'DELETE &quot;'+selectedItem?.content+'&quot;'" :message="'Are you sure you want to delete &quot;'+selectedItem?.content+'&quot;? This action is irreversible.'" positiveButtonText="Delete" negativeButtonText="Cancel" positiveButtonColor="error" @optionSelected="confirmationDialogOptionSelected"/>
                <EditAnswersDialog v-model="editAnswersDialogVisible"/>
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

    .rows-items-edit-questions {
        background-color: transparent !important;
    }
</style>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { IQuiz, IQuizQuestion } from '@/api/RectureApi';
    import InputDialog from './InputDialog.vue';
    import ConfirmationDialog from './ConfirmationDialog.vue';
    import QuestionRow from './QuestionRow.vue'
    import EditAnswersDialog from './EditAnswersDialog.vue';

    const selectedItem = ref<IQuizQuestion | null>(null);

    const props = defineProps<{
        modelValue?: boolean,
        quiz: IQuiz | null
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void
    }>();

    const tableItems = ref<IQuizQuestion[]>([{
        questionId: 1,
        content: "Who is the current president of the United States ?",
        answers: []
    }]);

    const confirmationDialogVisible = ref<boolean>(false);
    const renameDialogVisible = ref<boolean>(false);
    const editAnswersDialogVisible = ref<boolean>(false);

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

    function renameDialogInputEntered(positive: boolean, input: string) {
        if (!positive) return;
    }

    function confirmationDialogOptionSelected(positive: boolean) {
        if (!positive) return;
    }
</script>