<template>
    <v-dialog :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)" width="550" scroll-strategy="block" :persistent="topicBeingCreated">
        <v-card>
            <template v-slot:title>
                <h2 class="pt-3 pl-1">NEW THEMATIC UNIT</h2>
            </template>
            <v-card-text no-gutters class="pa-0">
                <v-form validate-on="input" @submit.prevent="submitHandler">
                    <v-row no-gutters>
                        <v-col cols="12" class="px-7 pt-3">
                            <v-text-field v-model="title" variant="underlined" label="Give a title to your new thematic unit" :rules="[validateTitle]" single-line/>
                        </v-col>
                    </v-row>

                    <v-row class="pt-3 pb-8" no-gutters>
                        <v-spacer v-show="mdAndUp"/>
                        <v-col cols="12" sm="6" md="5">
                            <v-select
                                hide-details
                                no-gutters
                                label="Choose a class"
                                v-model="selectedClass"
                                :items="classes"
                                item-title="name"
                                :rules="[validateSelect]"
                                return-object
                                variant="solo"
                                density="compact"
                                single-line
                            />
                        </v-col>
                        <v-spacer v-show="mdAndUp"/>
                        <v-col cols="12" sm="6" md="5">
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
                        <v-spacer v-show="mdAndUp"/>
                    </v-row>

                    <v-row no-gutters> 
                        <v-col align="center" align-self="end">
                            <v-btn class="w-100" height="50" variant="text" type="submit" :disabled="topicBeingCreated" :loading="topicBeingCreated">CREATE</v-btn>
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
    import { RectureApi, IClass, ISubject } from '@/api/RectureApi';
    import { ref, watch, onMounted } from 'vue';
    import { useDisplay } from 'vuetify/lib/framework.mjs';
    import MessageDialog from './MessageDialog.vue';
 
    const props = defineProps<{
        modelValue?: boolean
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void
    }>();

    const classes = ref<IClass[]>([]);
    const subjects = ref<ISubject[]>([]);

    const title = ref<string>("");
    const selectedClass = ref<IClass | undefined>(undefined);
    const selectedSubject = ref<ISubject | undefined>(undefined);

    const loadingOverlayVisible = ref<boolean>(false);
    const topicBeingCreated = ref<boolean>(false);

    const errorDialogVisible = ref<boolean>(false);
    const errorDialogMessage = ref<string>("");

    const { mdAndUp } = useDisplay();

    watch(() => props.modelValue, () => {
        if (props.modelValue === true) initialize();
    });
    onMounted(() => initialize());

    function initialize() {
        classes.value = [];
        subjects.value = [];

        title.value = "";
        selectedClass.value = undefined;
        selectedSubject.value = undefined;

        loadingOverlayVisible.value = true;
        topicBeingCreated.value = false;

        errorDialogVisible.value = false;
        errorDialogMessage.value = "";

        Promise.all(
            [
                RectureApi.getClasses().then(result => {
                    if (result.success && result.data != null) {
                        classes.value = result.data;
                    } else return Promise.reject();
                }),
                RectureApi.getSubjects().then(result => {
                    if (result.success && result.data != null) {
                        subjects.value = result.data;
                    } else return Promise.reject();
                })
            ]
        ).then(value => {
            loadingOverlayVisible.value = false;
        }).catch(reason => {
            closeDialog();
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
        if (validateTitle(title.value) !== true || validateSelect(selectedClass.value) !== true || validateSelect(selectedSubject.value) !== true) return;

        topicBeingCreated.value = true;

        RectureApi.createTopic((selectedClass.value as IClass).classId, (selectedSubject.value as ISubject).subjectId, title.value).then(result => {
            if (result.success) closeDialog();
            else {
                errorDialogMessage.value = "Failed to create thematic unit.";
                errorDialogVisible.value = true;
            }
        }).catch(reason => {
            errorDialogMessage.value = "Failed to create thematic unit.";
            errorDialogVisible.value = true;
        }).finally(() => {
            topicBeingCreated.value = false;
        })
    }

    function closeDialog() {
        emit("update:modelValue", false);
    }
</script>