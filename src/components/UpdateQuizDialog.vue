<template>
    <v-dialog :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)" width="550" scroll-strategy="block" :persistent="quizBeingCreated">
        <v-card>
            <template v-slot:title>
                <h2 class="pt-3 pl-1">EDIT QUIZ</h2>
            </template>
            <v-card-text no-gutters class="pa-0">
                <v-form validate-on="input" @submit.prevent="submitHandler">
                    <v-row no-gutters>
                        <v-col class="px-7 pt-3">
                            <v-text-field v-model="title" variant="underlined" label="Give a title to your new quiz" :rules="[validateTitle]" single-line/>
                        </v-col>
                    </v-row>

                    <v-row class="px-7 pt-3 pb-8" no-gutters>
                        <v-col>
                            <v-select
                                hide-details
                                no-gutters
                                label="Choose a subject"
                                v-model="selectedSubject"
                                :items="subjects"
                                item-title="name"
                                :rules="[validateSelect]"
                                return-object
                                variant="solo"
                                density="compact"
                                single-line
                            />
                        </v-col>
                    </v-row>

                    <v-row no-gutters> 
                        <v-col align="center" align-self="end">
                            <v-btn class="w-100" height="50" variant="text" type="submit" :disabled="quizBeingCreated" :loading="quizBeingCreated">CREATE</v-btn>
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
</template>

<style lang="scss" scoped>
    .v-card {
        background-color: #efefef;
        border-radius: 7px !important;
    }

    .v-btn {
        background-color: #5cb978;
        color: white;
        font-size: large;
        font-weight: bold;
        border-radius: 0px !important;
    }
</style>

<script lang="ts" setup>
    import { RectureApi, IClass, ISubject, IQuiz } from '@/api/RectureApi';
    import { ref, watch, onMounted } from 'vue';
    import { useDisplay } from 'vuetify/lib/framework.mjs';
    import MessageDialog from './MessageDialog.vue';
 
    const props = defineProps<{
        modelValue?: boolean,
        quiz: IQuiz | null | undefined
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void
    }>();

    const subjects = ref<ISubject[]>([]);

    const title = ref<string>("");
    const selectedSubject = ref<ISubject | undefined>(undefined);

    const loadingOverlayVisible = ref<boolean>(false);
    const quizBeingCreated = ref<boolean>(false);

    const errorDialogVisible = ref<boolean>(false);
    const errorDialogMessage = ref<string>("");

    const { mdAndUp } = useDisplay();

    watch(() => props.modelValue, () => {
        if (props.modelValue === true) initialize();
    });
    onMounted(() => initialize());

    function initialize() {
        subjects.value = [];

        title.value = "";
        selectedSubject.value = undefined;

        loadingOverlayVisible.value = true;
        quizBeingCreated.value = false;

        errorDialogVisible.value = false;
        errorDialogMessage.value = "";

        RectureApi.getSubjects().then(result => {
            if (result.success && result.data != null && props.quiz != null) {
                subjects.value = result.data;

                title.value = props.quiz.title;

                selectedSubject.value = {
                    subjectId: props.quiz.subjectId,
                    name: props.quiz.subjectName
                }
            } else {
                closeDialog();
            }
        })
        .catch(reason => {
            closeDialog();
        }).finally(() => {
            loadingOverlayVisible.value = false;
        });
    }

    function validateTitle(title: string): boolean | string {
        if (title.trim().length > 0) return true;
        else return "Must not be blank.";
    }

    function validateSelect(selectedItem: IClass | ISubject | undefined): boolean | string {
        if (selectedItem != null) return true;
        else return "An item must be selected.";
    }

    function submitHandler() {
        if (validateTitle(title.value) !== true || validateSelect(selectedSubject.value) !== true || selectedSubject.value == null || props.quiz == null) return;

        quizBeingCreated.value = true;

        const subject = selectedSubject.value;
        const titleString = title.value;

        RectureApi.updateQuiz(props.quiz.quizId, subject.subjectId, titleString).then(result => {
            if (result.success) {
                if (props.quiz != null) {
                    props.quiz.title = titleString;
                    props.quiz.subjectId = subject.subjectId;
                    props.quiz.subjectName = subject.name;
                }

                closeDialog();
            } else {
                errorDialogMessage.value = "Failed to update quiz.";
                errorDialogVisible.value = true;
            }
        }).catch(reason => {
            errorDialogMessage.value = "Failed to update quiz.";
            errorDialogVisible.value = true;
        }).finally(() => {
            quizBeingCreated.value = false;
        })
    }

    function closeDialog() {
        emit("update:modelValue", false);
    }
</script>