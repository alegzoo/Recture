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
                            <v-col class="heading pl-1">
                                <h4>Subject and class</h4>
                            </v-col>
                        </v-row>

                        <v-row class="pl-4 pt-5" align="center" no-gutters>
                            <v-col cols="auto" class="pr-0">
                                <v-row class="subject-class-row pa-0">
                                    <v-col cols="auto" align="center" align-self="center" class="py-2">{{ subjectName }}</v-col>
                                    <v-col cols="auto" align="center" align-self="center" class="class-label px-5 py-2">{{ className }}</v-col>                                
                                </v-row>      
                            </v-col>
                        </v-row>

                        <v-row no-gutters class="pt-10">
                            <v-col class="heading pl-1">
                                <h4>Date</h4>
                            </v-col>
                        </v-row>

                        <v-row no-gutters class="pt-3">
                            <v-col class="pl-1">
                                <h2>{{ dateString }}</h2>
                            </v-col>
                        </v-row>

                        <v-row no-gutters class="pt-5">
                            <v-col class="heading pl-1">
                                <h4>Thematic unit</h4>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12" class="py-0 pl-5 pr-11">
                                <SelectOrCreateInput v-model="selectedTopic" select-label="Choose a thematic unit" field-label="Enter name of thematic unit to create" :items="topics" item-title="name" :mandatory="true"/>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12" class="pl-5 pr-11">
                                <v-text-field v-model="title" :rules="formRules" variant="underlined" single-line label="Title of the lesson"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row no-gutters class="pt-3 pr-8">
                            <v-col>
                                <v-textarea
                                    v-model="description"
                                    class="pl-2 text-area-description"
                                    label="Description of the lesson (optional)"
                                    :ripple="false"
                                    :active="false"
                                    auto-grow
                                    variant="outlined"
                                    rows="3"
                                    row-height="15"
                                />
                            </v-col>
                        </v-row>

                        <v-row no-gutters class="pt-3">
                            <v-col class="heading pl-2">
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
                            <v-col class="heading pl-3" cols="auto" align-self="center">
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
                                <h5 class="heading">* To save the recording as a concept, set visibility to "Private" and get back to it later.</h5>
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

    .form-column {
        //background-image: url("@/assets/bckg-upload-dialog.png");
        background-color: #efefef;;
        background-size: cover  !important;
        //overflow: visible !important;
        //background-clip: content-box !important;
    }

    .file-column {
        background-color: #C8C7C7 !important;
    }

    .subject-class-row, .class-label {
        font-weight: bold;
    }

    .subject-class-row {
        box-shadow: 4px 4px 0px 0px black;
        background-color: $recture-yellow;
        border-radius: 2500px 9999px 9999px 2500px; //TODO: What the fuck?!
        color: black;
        border: solid 2px black;
        overflow: hidden;
    }

    .class-label {
        background-color: #e24a42;
        border-radius: 9999px;
        color: white;
        box-shadow: 0px 0px 0px 2px black;
    }

    .heading {
        color: black;
        opacity: 50%;
    }

    .v-btn[type="submit"] {
        background-color: $recture-bright-blue;
        color: white !important;
        font-size: large;
        font-weight: bold;
        border-radius: 0px;
    }
</style>


<script lang="ts" setup>
    import { ref, reactive, watch } from 'vue';
    import { ILesson, ITopic, RectureApi } from '@/api/RectureApi';
    import { useUploadStore } from '@/stores/useUploadStore';
    import { useUploadForm } from '@/composables/useUploadForm';
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

    const { title, description, selectedTopic, commentsAllowed, published, file, className, subjectName, dateString, topics } = uploadForm;

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
        uploadStore.uploadRecording(file.value as File, props.lesson, topic, title.value, desc, published.value as boolean, commentsAllowed.value as boolean, props.date.getTime());
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