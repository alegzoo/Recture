<template>
    <VDialog width="800" persistent>
        <VCard class="v-card-quizzes-manage">
            <VCardTitle>
                <VRow no-gutters align="center" align-self="center" class="pt-3">
                    <VCol>
                        <h2 class="pl-3">MANAGE QUIZZES</h2>
                    </VCol>
                    <VSpacer/>
                    <VCol cols="auto" class="pr-3" align-self="center" align="center">
                        <VBtn @click="showCreateNewQuestionSeriesDialog = true" class="plus-btn" icon="mdi-plus" variant="flat"></VBtn>
                            <VTooltip
                                activator="parent"
                                location="left"
                                class="spiked-tr"
                                >Create new question series
                            </VTooltip>
                    </VCol>    
                </VRow>         
            </VCardTitle>      
            <VCardText>
                    <VRow class="pt-4">
                        <VCol class="pa-0 px-4">
                            <VTextField
                            label="Search by the title"
                            variant="outlined"
                            single-line
                            hide-details
                            class="text-field-search"
                            />
                        </VCol>
                    </VRow>
                    <VRow class="pt-2">
                        <VCol align="center">
                            <VBtnToggle mandatory selected-class="selected"  class="filter-btns">
                                <VBtn :active="false" :ripple="false" class="newest-btn" variant="flat">Newest</VBtn>
                                <VBtn :active="false" :ripple="false" class="oldest-btn" variant="flat">Oldest</VBtn>
                            </VBtnToggle>
                        </VCol>
                    </VRow>
                    <VRow class="pt-3">
                        <VTable class="w-100 px-4 rows-items-manage-quizzes" fixed-header>
                            <thead>
                                <tr>
                                    <th class="text-left rows-items-manage-quizzes">Name</th>
                                    <th class="text-right rows-items-manage-quizzes">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <QuizRow v-for="item in tableItems" :quiz="item" @rename="showRenameDialog(item)" @delete="showDeleteDialog(item)"  @edit="showEditQuizDialog(item)" />
                            </tbody>

                        </VTable>
                    </VRow>

                    <VRow class="pt-10 pb-2" no-gutters>
                        <VCol class="pa-0" align="end">
                            <VBtn  variant="default" @click="emit('update:modelValue', false)">Close</VBtn>
                        </VCol>
                    </VRow>
            </VCardText>
            <CreateNewQuestionSeriesDialog v-model="showCreateNewQuestionSeriesDialog"/>
            <ConfirmationDialog v-model="confirmationDialogVisible" :title="'DELETE &quot;'+selectedItem?.title+'&quot;'" :message="'Are you sure you want to delete &quot;'+selectedItem?.title+'&quot;? This action is irreversible.'" positiveButtonText="Delete" negativeButtonText="Cancel" positiveButtonColor="error" @optionSelected="confirmationDialogOptionSelected"/>
            <InputDialog v-model="renameDialogVisible" :title="'RENAME &quot;'+selectedItem?.title+'&quot;'" :inputLabel="'Enter a new name for &quot;'+selectedItem?.title+'&quot;'" positiveButtonText="Rename" @inputEntered="renameDialogInputEntered"/>
            <MessageDialog v-model="errorDialogVisible" title="ERROR" :message="errorDialogMessage"/>
            <EditQuizDialog v-model="editQuizDialogVisible"/>
        </VCard>
    </VDialog>
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";
    @import "@/styles/mixins.scss";
    .v-card-quizzes-manage{
        background-color: #efefef;
    }

    .rows-items-manage-quizzes{
        background-color: transparent !important;
    }

    .filter-btns{
        background-color: white;
        border: 2px solid black;
        border-radius: 0px;
        font-weight: bold;
        border-radius: 9999px;
        //box-shadow: 0 3px 0 0 black;
    }

    .filter-btns .selected{
        background-color: $recture-yellow;
    }

    .newest-btn{
        border-right: 2px black solid !important;
    }

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

    import CreateNewQuestionSeriesDialog from './CreateNewQuestionSeriesDialog.vue';
    import { ref } from 'vue';
    import QuizRow from './QuizRow.vue';
    import { IQuiz } from '@/api/RectureApi';
    import InputDialog from './InputDialog.vue';
    import MessageDialog from './MessageDialog.vue';
    import ConfirmationDialog from './ConfirmationDialog.vue';
    import EditQuizDialog from './EditQuizDialog.vue';
    
    const confirmationDialogVisible = ref<boolean>(false);
    const renameDialogVisible = ref<boolean>(false);
    const editQuizDialogVisible = ref<boolean>(false);

    
    const errorDialogVisible = ref<boolean>(false);
    const errorDialogMessage = ref<string>("");

    const loadingOverlayVisible = ref<boolean>(false);

    const showCreateNewQuestionSeriesDialog = ref<boolean>(false);


    const selectedItem = ref<IQuiz | null>(null);

    confirmationDialogVisible.value = false;
    renameDialogVisible.value = false;
    editQuizDialogVisible.value = false;

    errorDialogVisible.value = false;
    errorDialogMessage.value = "";

    const tableItems = ref<IQuiz[] | null>([{
        quizId: 1,
        title: "Test",
        subjectId: 1,
        subjectName: "MAT",
        questions: []
    }]);

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void,
        (e: "dataModified"): void
    }>();

    function showDeleteDialog(item: IQuiz ) {
        selectedItem.value = item;
        confirmationDialogVisible.value = true;
    }

    function showRenameDialog(item: IQuiz ) {
        selectedItem.value = item;
        renameDialogVisible.value = true;
    }

    function showEditQuizDialog(item: IQuiz ) {
        selectedItem.value = item;
        editQuizDialogVisible.value = true;
    }

    function confirmationDialogOptionSelected(positive: boolean) {
        if (!positive) return;
    }

    function renameDialogInputEntered(positive: boolean, input: string) {
        if (!positive) return;
    }


</script>

