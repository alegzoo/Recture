<template>
    <v-dialog :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)" class="h-100 justify-center" width="630" scroll-strategy="block">
        <v-card class="create-lesson-card">
            <template v-slot:title>
                <h2 class="pt-3 pl-1">CREATE A LESSON</h2>
            </template>
            <v-card-text>
                <v-row no-gutters>
                    <v-col cols="12">
                        <SelectOrCreateInput v-model="selectedClass" select-label="Choose a class" field-label="Enter name of class to create" :items="classes" item-title="name"/>
                    </v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col cols="12">
                        <SelectOrCreateInput v-model="selectedSubject" select-label="Choose a subject" field-label="Enter name of subject to create" :items="subjects" item-title="name"/>
                    </v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col align="center" class="pt-5 pb-3">
                        <h4 class="headline-colors">Color of lesson in timetable</h4>
                    </v-col>
                </v-row>


                <v-row no-gutters>
                    <v-col align="center">
                        <v-btn-toggle v-model="selectedColor" divided class="toggle-btns-colors" selected-class="selected" mandatory>
                            <v-btn class="mustard btn-group-colors" size="small" value="mustard" :active="false" :ripple="false"/>
                            <v-btn class="aqua btn-group-colors" size="small" value="aqua" :active="false" :ripple="false"/>
                            <v-btn class="steel-blue btn-group-colors" size="small" value="steel-blue" :active="false" :ripple="false"/>
                            <v-btn class="red btn-group-colors" size="small" value="red" :active="false" :ripple="false"/>
                            <v-btn class="gray btn-group-colors" size="small" value="gray" :active="false" :ripple="false"/>
                            <v-btn class="rose btn-group-colors" size="small" value="rose" :active="false" :ripple="false"/>
                            <v-btn class="melon btn-group-colors" size="small" value="melon" :active="false" :ripple="false"/>
                            <v-btn class="blush btn-group-colors" size="small" value="blush" :active="false" :ripple="false"/>
                            <v-btn class="crystal-blue btn-group-colors" size="small" value="cystal-blue" :active="false" :ripple="false"/>
                            <v-btn class="canary btn-group-colors" size="small" value="canary" :active="false" :ripple="false"/>
                            <v-btn class="orchid btn-group-colors" size="small" value="orchid" :active="false" :ripple="false"/>
                        </v-btn-toggle>
                    </v-col>
                </v-row>

                <v-row no-gutters class="pt-10">
                    <v-col cols="6" class="headline-colors pl-1">
                        <h4>Code for students to connect</h4>
                    </v-col>
                </v-row>

                <v-row no-gutters class="px-1">
                    <v-col cols="auto" align-self="center">
                        <div class="text-h4 font-weight-bold">{{ inviteCode }}</div>
                    </v-col>

                    <v-col align-self="center" cols="auto" class="pl-1">
                        <v-btn variant="plain" icon="mdi-content-copy" class="copy-btn" :ripple="false" @click="copyCodeToClipboard"/>
                    </v-col>

                    <v-spacer></v-spacer>

                    <v-col cols="auto" align-self="center">
                        <v-btn variant="text" class="invitation-btn" append-icon="mdi-send" theme="light" :ripple="false">SEND INVITATION</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-alert v-show="alertBody !== null" density="compact" :type="alertType" align="left" :text="(alertBody as string)" class="mx-5 my-2">
                <template v-slot:append>
                    <v-btn icon="mdi-close" class="w-100 h-100" variant="text" @click="alertBody = null"/>
                </template>
            </v-alert>

            <v-row no-gutters class="pt-4" height="auto">
                <v-col align="center">
                    <v-btn class="continue-button" width="630" height="50" variant="text" @click="closeDialog(true)">CONTINUE</v-btn>
                </v-col>
            </v-row>
        </v-card>

        <v-overlay v-model="loadingOverlayVisible" class="align-center justify-center" contained persistent>
            <v-progress-circular class="ma-auto" color="primary" indeterminate size="64"/>
        </v-overlay>
    </v-dialog>
</template> 

<style lang="scss" scoped>
    .v-dialog {
        z-index: 210 !important;
    }

    .create-lesson-card {
        background-color: #efefef;
    }

    .headline-colors {
        opacity: 50%;
    }

    .btn-group-colors {
        border-color: black !important;
        border-width: 2px !important;
        box-shadow: none;
        transition: border-style 0.2s ease-out, transform 0.1s ease-out, box-shadow 0.2s ease-out;
    }

    .btn-group-colors:hover {
        box-shadow: 0px 0px 0px 2px black inset;
    }

    .btn-group-colors.selected, .btn-group-colors.selected:hover {
        box-shadow: none;
        border: solid 4px black !important;
        transform: scale(1.1);
        border-style: solid !important;
        z-index: 210;
        transition: border-style none, transform 0.1s ease-in, box-shadow 0.2s ease-in;
    }

    .v-btn-toggle {
        position: relative;
        border-top-left-radius: 0px !important;
        border-bottom-left-radius: 0px !important;
        border-bottom-right-radius: 0px !important;
        border-top-right-radius: 0px !important;
        overflow: visible;
    }

    .copy-btn {
        font-size: large;
    }

    .invitation-btn {
        background-color: #00A6E2;
        color: white !important;
        rotate: 90;
    }

    .invitation-btn .v-icon {
        transform: rotate(-45deg);
    }

   .continue-button {
        border-top-right-radius: 0px !important;
        border-top-left-radius: 0px !important;
        background-color: #5cb978;
        color: white !important;
        font-size: large;
        font-weight: bold;
    }
</style>

<script lang="ts" setup>
    import { ref, watch } from 'vue';
    import "@/styles/lesson-colors.scss";
    import "@/styles/main.scss";
    import { IClass, ISubject, LessonColor, RectureApi } from '@/api/RectureApi';
    import SelectOrCreateInput from './SelectOrCreateInput.vue';

    export interface ICreateLessonDialogResult {
        success: boolean,
        class: IClass | string | undefined,
        subject: IClass | string | undefined,
        lessonColor: LessonColor | null
    }

    const props = defineProps<{
        modelValue?: boolean
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void,
        (e: "dialogExit", result: ICreateLessonDialogResult): void
    }>();

    
    const dialogSuccess = ref<boolean>(false);

    //TODO: Maybe make reactive and move to composable
    const classes = ref<IClass[]>([]);
    const subjects = ref<ISubject[]>([]);

    const selectedClass = ref<IClass | string | undefined>(undefined);
    const selectedSubject = ref<IClass | string | undefined>(undefined);

    const selectedColor = ref<LessonColor | null>(null);

    const inviteCode = ref<string | null>(null);

    const loadingOverlayVisible = ref<boolean>(false);

    const alertType = ref<"success" | "error">("error");
    const alertBody = ref<string | null>(null);

    watch(() => props.modelValue, value => {
        if (value === true) initialize();
        else {
            if (dialogSuccess.value === true) {
                emit('dialogExit', {
                    success: true,
                    class: selectedClass.value,
                    subject: selectedSubject.value,
                    lessonColor: selectedColor.value
                });
            } else {
                emit('dialogExit', {
                    success: false,
                    class: undefined,
                    subject: undefined,
                    lessonColor: null
                });
            }
        }
    });

    function initialize() {
        dialogSuccess.value = false;

        classes.value = [];
        subjects.value = [];

        selectedClass.value = undefined;
        selectedSubject.value = undefined;

        selectedColor.value = null;

        inviteCode.value = null;

        loadingOverlayVisible.value = true;

        alertType.value = "error";
        alertBody.value = null;

        Promise.all(
            [
                RectureApi.getClasses().then(result => {
                    if (result.success && classes.value != null) {
                        classes.value = result.data as IClass[];
                    } else return Promise.reject();
                }),
                RectureApi.getSubjects().then(result => {
                    if (result.success && subjects.value != null) {
                        subjects.value = result.data as ISubject[];
                    } else return Promise.reject();
                })
            ]
        ).then(value => {
            loadingOverlayVisible.value = false;
        }).catch(reason => {
            closeDialog(false);
        });
    }

    function closeDialog(success: boolean) {
        if (success && ((selectedClass.value == null) || (selectedSubject.value == null) || (selectedColor.value == null))) {
            alertType.value = "error";
            alertBody.value = "Fill out all fields to continue!";
            return;
        }

        dialogSuccess.value = success;
        //TODO: Somehow communicate whether a lesson should be created or not (in case user closes the dialog by clicking outside of it)
        emit('update:modelValue', false);
    }

    function copyCodeToClipboard() {
        //TODO: Check if it works once HTTPS is enabled
        if (navigator.clipboard && inviteCode.value != null) {
            navigator.clipboard.writeText(inviteCode.value);
            alertType.value = "success";
            alertBody.value = "Copied to clipboard!";
        } else {
            alertType.value = "error";
            alertBody.value = "Failed to copy!";
        }
    }

</script>