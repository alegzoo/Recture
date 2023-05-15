<template>
    <v-dialog :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)" width="800" persistent>
        <v-card>
            <v-card-title>
                <v-row no-gutters align="center" align-self="center" class="pt-3">
                    <v-col>
                        <h2 class="pl-3">MANAGE QUIZZES</h2>
                    </v-col>
                    <v-spacer/>
                    <v-col cols="auto" class="pr-3" align-self="center" align="center">
                        <v-tooltip location="left" class="spiked-tr" text="Create new quiz">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" class="plus-btn" icon="mdi-plus" variant="flat" @click="createQuizDialogVisible = true"/>
                            </template>
                        </v-tooltip>
                    </v-col>
                </v-row>         
            </v-card-title>      
            <v-card-text>
                    <v-row class="pt-4">
                        <v-col class="pa-0 px-4">
                            <v-text-field
                                v-model="searchQuery"
                                label="Search by title"
                                variant="outlined"
                                single-line
                                hide-details
                                class="text-field-search"
                            />
                        </v-col>
                    </v-row>
                    <v-row class="pt-2">
                        <v-col align="center">
                            <v-btn-toggle v-model="sortOrder" selected-class="selected" mandatory>
                                <v-btn :active="false" :ripple="false" class="newest-btn" variant="flat" :value="SortOrder.Descending">Newest</v-btn>
                                <v-btn :active="false" :ripple="false" class="oldest-btn" variant="flat" :value="SortOrder.Ascending">Oldest</v-btn>
                            </v-btn-toggle>
                        </v-col>
                    </v-row>
                        <v-col class="pt-3 pa-0" align="center">
                            <v-table v-show="!loadingQuizzes && tableItems.length !== 0" class="w-100 rows-items-manage-timetable" fixed-header>
                                <thead>
                                    <tr>
                                        <th class="text-left rows-items-manage-timetable">Name</th>
                                        <th class="text-right rows-items-manage-timetable">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <QuizRow v-for="item in tableItems" :key="item.quizId" :quiz="item" @rename="showUpdateQuizDialog(item)" @delete="showDeleteDialog(item)" @edit="showEditQuizDialog(item)"/>
                                </tbody>
                            </v-table>
                            <p v-show="!loadingQuizzes && tableItems.length === 0" class="w-100 py-5 text-h6 text-center">No data</p>
                            <v-progress-circular v-show="loadingQuizzes" class="mx-auto my-10" color="primary" indeterminate size="64"/>
                        </v-col>
                    <v-row class="pt-10 pb-2" no-gutters>
                        <v-spacer/>
                        <v-col cols="auto" class="pa-0">
                            <v-btn variant="text" @click="emit('update:modelValue', false)">Close</v-btn>
                        </v-col>
                    </v-row>
            </v-card-text>
            <CreateQuizDialog v-model="createQuizDialogVisible" @data-modified="loadItems()"/>
            <UpdateQuizDialog v-model="updateQuizDialogVisible" :quiz="selectedItem"/>
            <ConfirmationDialog v-model="confirmationDialogVisible" :title="'DELETE &quot;'+selectedItem?.title+'&quot;'" :message="'Are you sure you want to delete &quot;'+selectedItem?.title+'&quot;? This action is irreversible.'" positiveButtonText="Delete" negativeButtonText="Cancel" positiveButtonColor="error" @optionSelected="confirmationDialogOptionSelected"/>
            <MessageDialog v-model="errorDialogVisible" title="ERROR" :message="errorDialogMessage"/>
            <EditQuizDialog v-model="editQuizDialogVisible" :quiz="selectedItem"/>
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

    .rows-items-manage-quizzes {
        background-color: transparent !important;
    }

    .v-btn-toggle {
        background-color: white;
        border: 2px solid black;
        border-radius: 0px;
        font-weight: bold;
        border-radius: 9999px;
        //box-shadow: 0 3px 0 0 black;
    }

    .v-btn-toggle .selected {
        background-color: $recture-yellow;
    }

    .newest-btn {
        border-right: 2px black solid !important;
    }

    .plus-btn {
        //@include elevated-button(3px, 3px, 1px);
        background-color: $recture-yellow;
        color: black;
        border-radius: 9999px;
        border-color: black;
        border-style: solid;
        border-width: 2px;
    }

    .plus-btn .v-icon {
        font-size: 100px;
    }
</style>



<script lang="ts" setup>
    import { ref, watch} from 'vue';
    import { RectureApi, IQuiz, SortOrder } from '@/api/RectureApi';
    import QuizRow from './QuizRow.vue';
    import CreateQuizDialog from './CreateQuizDialog.vue';
    import InputDialog from './InputDialog.vue';
    import MessageDialog from './MessageDialog.vue';
    import ConfirmationDialog from './ConfirmationDialog.vue';
    import EditQuizDialog from './EditQuizDialog.vue';
    import UpdateQuizDialog from './UpdateQuizDialog.vue';

    const props = defineProps<{
        modelValue?: boolean
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void
    }>();

    const searchQuery = ref<string>("");
    const sortOrder = ref<SortOrder>(SortOrder.Descending);

    const createQuizDialogVisible = ref<boolean>(false);
    const updateQuizDialogVisible = ref<boolean>(false);

    const confirmationDialogVisible = ref<boolean>(false);
    const renameDialogVisible = ref<boolean>(false);
    const editQuizDialogVisible = ref<boolean>(false);
    
    const errorDialogVisible = ref<boolean>(false);
    const errorDialogMessage = ref<string>("");

    const loadingQuizzes = ref<boolean>(false);
    const loadingOverlayVisible = ref<boolean>(false);
    const selectedItem = ref<IQuiz | null>(null);

    confirmationDialogVisible.value = false;
    renameDialogVisible.value = false;
    editQuizDialogVisible.value = false;

    errorDialogVisible.value = false;
    errorDialogMessage.value = "";

    const tableItems = ref<IQuiz[]>([]);

    watch(() => props.modelValue, value => {
        if (value === true) loadItems();
    });

    watch([searchQuery, sortOrder], () => loadItems());

    function loadItems() {
        tableItems.value = [];
        loadingQuizzes.value = true;

        RectureApi.getQuizzes(null, searchQuery.value, sortOrder.value).then(result => {
            if (result.success && result.data != null) tableItems.value = result.data;
            else {
                errorDialogMessage.value = "Failed to load quizzes.";
                errorDialogVisible.value = true;
            }
        }).catch(reason => {
            errorDialogMessage.value = "Failed to load quizzes.";
            errorDialogVisible.value = true;
        }).finally(() => {
            loadingQuizzes.value = false;
        });
    }

    function showDeleteDialog(item: IQuiz) {
        selectedItem.value = item;
        confirmationDialogVisible.value = true;
    }

    function showUpdateQuizDialog(item: IQuiz) {
        selectedItem.value = item;
        updateQuizDialogVisible.value = true;
    }

    function showEditQuizDialog(item: IQuiz) {
        selectedItem.value = item;
        editQuizDialogVisible.value = true;
    }

    function confirmationDialogOptionSelected(positive: boolean) {
        if (!positive || selectedItem.value == null) return;

        loadingOverlayVisible.value = true;

        const quiz = selectedItem.value;

        RectureApi.deleteQuiz(quiz.quizId).then(result => {
            if (result.success) {
                tableItems.value = tableItems.value.filter(item => item.quizId !== quiz.quizId);
            } else {
                errorDialogMessage.value = "Failed to delete quiz.";
                errorDialogVisible.value = true;
            }
        }).catch(reason => {
            errorDialogMessage.value = "Failed to delete quiz.";
            errorDialogVisible.value = true;
        }).finally(() => {
            selectedItem.value = null;
            loadingOverlayVisible.value = false;
        });
    }
</script>

