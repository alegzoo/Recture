<template>
    <v-card>
        <v-card-text class="pa-0">
            <v-form validate-on="input" @submit.prevent="submitHandler">
                <v-row no-gutters class="pa-0">
                    <v-col cols="7" class="form-column pl-5">
                        <v-row no-gutters>
                            <v-col cols="auto">
                                <h1 class="pt-3 pl-1">UPLOAD RECORDING</h1>
                            </v-col>
                        </v-row>

                        <v-row no-gutters class="pt-4">
                            <v-col class="subtle pl-1">
                                <h4>Subject and class</h4>
                            </v-col>
                        </v-row>

                        <v-row class="pl-4 pt-5" align="center" no-gutters>
                            <v-col cols="auto" class="pr-0">
                                <SubjectClassLabel :subject-name="subjectName" :class-name="className"/>
                            </v-col>
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
                                <h4>Visibility *</h4>
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

                        <v-row no-gutters class="py-5">
                            <v-col class="pl-3" align-self="center">
                                <h5 class="subtle">* To save the recording as a concept, set visibility to "Private" and get back to it later.</h5>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col cols="5" class="file-column d-flex align-content-center" align="center">
                        <div class="ma-auto">
                            <UploadPreviewCard :title="title" :lesson="lesson" :date-string="dateString" @file-select="uploadForm.setFile"/>
                            <v-alert v-show="showFileAlert" density="compact" type="error" align="left" text="A file must be selected." class="my-5"/>
                        </div>
                    </v-col>
                </v-row>
                <v-row no-gutters height="auto">
                    <v-col align="center" align-self="end">
                        <v-btn type="submit" class="w-100" height="50" variant="text">UPLOAD</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
        <v-overlay v-model="loadingOverlayVisible" class="align-center justify-center" contained persistent>
            <v-progress-circular class="ma-auto" color="primary" indeterminate size="64"/>
        </v-overlay>
    </v-card>
    <MessageDialog v-model="errorDialogVisible" title="ERROR" :message="errorDialogMessage"/>
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";
    @import "@/styles/mixins.scss";

    .form-column {
        background-color: #efefef;
        background-size: cover  !important;
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
    import { ILesson, ITopic, RectureApi } from '@/api/RectureApi';
    import { useUploadStore } from '@/stores/useUploadStore';
    import { useUploadForm } from '@/composables/useUploadForm';
    import SubjectClassLabel from './SubjectClassLabel.vue';
    import UploadPreviewCard from './UploadPreviewCard.vue';
    import SelectOrCreateInput from './SelectOrCreateInput.vue';
    import MessageDialog from './MessageDialog.vue';

    import "@/styles/main.scss";

    const props = defineProps<{
        lesson: ILesson,
        date: Date
    }>();

    const emit = defineEmits<{
        (e: "uploadStart"): void
    }>();

    const uploadStore = useUploadStore();

    const uploadForm = useUploadForm(props.lesson, props.date);
    uploadForm.fetchTopics();
    uploadForm.fetchQuizzes();

    const { title, description, selectedTopic, selectedQuiz, commentsAllowed, published, file, className, subjectName, dateString, topics, quizzes } = uploadForm;

    const formRules = reactive<((value: any) => boolean | string)[]>([((val: any) => {
        if (val instanceof String || typeof val === "string") {
            if (val.trim().length > 0) return true;
            else return "Must not be blank.";
        } else if (val != null) return true;
        else return "Please select one of the options.";
    })]);

    const loadingOverlayVisible = ref<boolean>(false);

    const showFileAlert = ref<boolean>(false);

    const errorDialogVisible = ref<boolean>(false);
    const errorDialogMessage = ref<string>("");

    watch(file, () => validateFile(false));

    function submitHandler() : void {
        if (!validateFile() || !uploadForm.validateForm()) return;

        if (selectedTopic.value instanceof String || typeof selectedTopic.value === "string") {
            loadingOverlayVisible.value = true;
            RectureApi.createTopic(props.lesson.classId, props.lesson.subjectId, selectedTopic.value as string).then(result => {
                if (result.success && result.data != null) uploadRecording(result.data);
                else {
                    errorDialogMessage.value = "Failed to create thematic unit.";
                    errorDialogVisible.value = true;
                }
            }).catch(reason => {
                errorDialogMessage.value = "Failed to create thematic unit.";
                errorDialogVisible.value = true;
            }).finally(() => {
                loadingOverlayVisible.value = false;
            });
        } else {
            uploadRecording(selectedTopic.value as ITopic);
        }
    }

    function uploadRecording(topic: ITopic): void {
        const desc = (uploadForm.description.value.trim().length > 0 ? uploadForm.description.value : null) as string | null;
        uploadStore.uploadRecording(file.value as File, props.lesson, topic, selectedQuiz.value, title.value, desc, published.value as boolean, commentsAllowed.value as boolean, props.date.getTime());
        emit("uploadStart");
    }

    function validateFile(showAlertOnFailure: boolean = true) : boolean {
        if (file.value != null) {
            showFileAlert.value = false;
            return true;
        } else {
            showFileAlert.value = showAlertOnFailure;
            return false;
        }
    }
</script>