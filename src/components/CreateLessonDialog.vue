<template>
    <v-dialog :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)" class="h-100 justify-center" width="630" scroll-strategy="block">
        <v-card>
            <template v-slot:title>
                <h2 class="pt-3">CREATE A LESSON</h2>
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
                        <h4 class="subtle">Color of lesson in timetable</h4>
                    </v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col align="center">
                        <v-btn-toggle v-model="selectedColor" selected-class="selected" divided mandatory>
                            <v-btn class="mustard" size="small" value="mustard" :active="false" :ripple="false"/>
                            <v-btn class="aqua" size="small" value="aqua" :active="false" :ripple="false"/>
                            <v-btn class="steel-blue" size="small" value="steel_blue" :active="false" :ripple="false"/>
                            <v-btn class="red" size="small" value="red" :active="false" :ripple="false"/>
                            <v-btn class="gray" size="small" value="gray" :active="false" :ripple="false"/>
                            <v-btn class="rose" size="small" value="rose" :active="false" :ripple="false"/>
                            <v-btn class="melon" size="small" value="melon" :active="false" :ripple="false"/>
                            <v-btn class="blush" size="small" value="blush" :active="false" :ripple="false"/>
                            <v-btn class="crystal-blue" size="small" value="cystal_blue" :active="false" :ripple="false"/>
                            <v-btn class="canary" size="small" value="canary" :active="false" :ripple="false"/>
                            <v-btn class="orchid" size="small" value="orchid" :active="false" :ripple="false"/>
                        </v-btn-toggle>
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
                    <v-btn class="continue-button w-100" height="50" variant="text" @click="closeDialog(true)">CONTINUE</v-btn>
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

    .v-card {
        background-color: #efefef;
    }

    .subtle {
        color: rgba(0, 0, 0, 0.5);
    }

    .v-btn-toggle .v-btn {
        border-color: black !important;
        border-width: 2px !important;
        box-shadow: none;
        transition: border-style 0.2s ease-out, transform 0.1s ease-out, box-shadow 0.2s ease-out;
    }

    .v-btn-toggle .v-btn:hover {
        box-shadow: 0px 0px 0px 2px black inset;
    }

    .v-btn-toggle .v-btn.selected, .v-btn-toggle .v-btn.selected:hover {
        box-shadow: none;
        border: solid 4px black !important;
        transform: scale(1.1);
        border-style: solid !important;
        z-index: 210;
        transition: border-style none, transform 0.1s ease-in, box-shadow 0.2s ease-in;
    }

    .v-btn-toggle {
        position: relative;
        border-radius: 0px !important;
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
        border-radius: 0px !important;
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
        emit('update:modelValue', false);
    }

    function copyCodeToClipboard() {
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