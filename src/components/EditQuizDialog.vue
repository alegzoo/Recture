<template>
    <v-dialog width="900">
            <v-card class="v-card-edit-questions">
                <v-card-title>
                    <v-row no-gutters align="center" align-self="center" class="pt-3">
                        <v-col>
                            <h2 class="pl-3">EDIT QUESTIONS</h2>
                        </v-col>
                    </v-row>         
                </v-card-title>      
                <v-card-text>

                <v-col class="pt-3 pa-0" v-show="tableItems != null">
                    <VTable class="w-100 px-1 rows-items-edit-questions" fixed-header>
                        <thead>
                            <tr class="w-100">
                                <th class="text-left rows-items-edit-questions">Questions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <QuestionRow v-for="item in tableItems" :question="item" @rename="showRenameDialog(item)" @delete="showDeleteDialog(item)"  @edit="showEditAnswersDialog(item)"/>
                        </tbody>
                        <p v-show="tableItems?.length === 0" class="w-100 py-5 text-h6 text-center">No data</p>
                    </VTable>
                </v-col>

                <v-row no-gutters class="pa-0 pt-5 pb-3">
                    <v-col>
                        <v-btn class="plus-btn" icon="mdi-plus" variant="flat"></v-btn>
                    </v-col>
                </v-row>

                </v-card-text>
                <InputDialog v-model="renameDialogVisible" :title="'RENAME &quot;'+selectedItem?.title+'&quot;'" :inputLabel="'Enter a new name for &quot;'+selectedItem?.title+'&quot;'" positiveButtonText="Rename" @inputEntered="renameDialogInputEntered"/>
                <ConfirmationDialog v-model="confirmationDialogVisible" :title="'DELETE &quot;'+selectedItem?.title+'&quot;'" :message="'Are you sure you want to delete &quot;'+selectedItem?.title+'&quot;? This action is irreversible.'" positiveButtonText="Delete" negativeButtonText="Cancel" positiveButtonColor="error" @optionSelected="confirmationDialogOptionSelected"/>
                <EditAnswersDialog v-model="editAnswersDialogVisible"/>
            </v-card>
    </v-dialog>
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";
    @import "@/styles/mixins.scss";

.v-card-edit-questions{
    background-color: #efefef;
}

.subtle {
    color: rgba(0, 0, 0, 0.5);
}

.plus-btn{
    @include elevated-button(3px, 3px, 1px);
    background-color: $recture-yellow;
    color: black;
    border-radius: 9999px;
    border-color: black;
    border-style: solid;
    border-width: 2px;
}

.rows-items-edit-questions{
        background-color: transparent !important;
    }
</style>

<script lang="ts" setup>

    import { ref } from 'vue';
    import { IQuiz } from '@/api/RectureApi';
    import InputDialog from './InputDialog.vue';
    import ConfirmationDialog from './ConfirmationDialog.vue';
    import QuestionRow from './QuestionRow.vue'
    import EditAnswersDialog from './EditAnswersDialog.vue';
    const selectedItem = ref<IQuiz | null>(null);

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void,
        (e: "dataModified"): void
    }>();


    const renameDialogVisible = ref<boolean>(false);
    renameDialogVisible.value = false;

    function showRenameDialog(item: IQuiz ) {
        selectedItem.value = item;
        renameDialogVisible.value = true;
    }
    function renameDialogInputEntered(positive: boolean, input: string) {
            if (!positive) return;
        }


    
    const confirmationDialogVisible = ref<boolean>(false);
    confirmationDialogVisible.value = false;

    function showDeleteDialog(item: IQuiz ) {
            selectedItem.value = item;
            confirmationDialogVisible.value = true;
        }

    function confirmationDialogOptionSelected(positive: boolean) {
            if (!positive) return;
        }


    const editAnswersDialogVisible = ref<boolean>(false);
    editAnswersDialogVisible.value = false;

    function showEditAnswersDialog(item: IQuiz ) {
            selectedItem.value = item;
            editAnswersDialogVisible.value = true;
        }



    const tableItems = ref<IQuiz[] | null>([{
        quizId: 1,
        title: "Who is the current president of the United States ?",
        subjectId: 1,
        subjectName: "MAT",
        questions: []
    }]);

</script>