<template>
    <v-dialog :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)" width="800">
            <v-card class="v-card-edit-answers">
                <v-card-title>
                    <v-row no-gutters align="center" align-self="center" class="pt-3">
                        <v-col>
                            <h2 class="pl-3">EDIT ANSWERS</h2>
                        </v-col>
                    </v-row>         
                </v-card-title>      
                <v-card-text>
                    <v-col class="pt-3 pa-0" v-show="tableItems != null">
                        <v-table class="w-100 px-1 rows-items-edit-answers" fixed-header>
                            <thead>
                                <tr class="w-100">
                                    <th class="text-left rows-items-edit-answers">Answers</th>
                                    <th class="text-right rows-items-edit-answers">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                <AnswersRow v-for="item in tableItems" :key="item.answerId" :answers="item" @rename="showRenameDialog(item)" @delete="showDeleteDialog(item)" />
                            </tbody>
                            <p v-show="tableItems?.length === 0" class="w-100 py-5 text-h6 text-center">No data</p>
                        </v-table>
                    </v-col>

                </v-card-text>
                <InputDialog v-model="renameDialogVisible" :title="'RENAME &quot;'+selectedItem?.content+'&quot;'" :inputLabel="'Enter a new name for &quot;'+selectedItem?.content+'&quot;'" positiveButtonText="Rename" @inputEntered="renameDialogInputEntered"/>
                <ConfirmationDialog v-model="confirmationDialogVisible" :title="'DELETE &quot;'+selectedItem?.content+'&quot;'" :message="'Are you sure you want to delete &quot;'+selectedItem?.content+'&quot;? This action is irreversible.'" positiveButtonText="Delete" negativeButtonText="Cancel" positiveButtonColor="error" @optionSelected="confirmationDialogOptionSelected"/>
            </v-card>
    </v-dialog>

</template>

<style lang="scss" scoped>

.v-card-edit-answers{
    background-color: #efefef;
}
.rows-items-edit-answers{
    background-color: transparent !important;
}


</style>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { IQuiz, IQuizAnswer } from '@/api/RectureApi';
    import InputDialog from './InputDialog.vue';
    import ConfirmationDialog from './ConfirmationDialog.vue';
    import AnswersRow from './AnswersRow.vue';


    const selectedItem = ref<IQuizAnswer | null>(null);

    const props = defineProps<{
        modelValue?: boolean,
        quiz: IQuiz | null
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void
    }>();

    const tableItems = ref<IQuizAnswer[]>([{
        answerId: 1,
        content: "Odpoved",
        correct: true    
    }]);


    const confirmationDialogVisible = ref<boolean>(false);
    const renameDialogVisible = ref<boolean>(false);
        const editAnswersDialogVisible = ref<boolean>(false);

    function showRenameDialog(item: IQuizAnswer) {
        selectedItem.value = item;
        renameDialogVisible.value = true;
    }

    function showDeleteDialog(item: IQuizAnswer) {
        selectedItem.value = item;
        confirmationDialogVisible.value = true;
    }


    function renameDialogInputEntered(positive: boolean, input: string) {
        if (!positive) return;
    }

    function confirmationDialogOptionSelected(positive: boolean) {
        if (!positive) return;
    }
</script>