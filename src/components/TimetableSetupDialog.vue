<template>
    <v-dialog :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)" class="h-100 justify-center" width="450" scroll-strategy="block">
        <v-card>
            <template v-slot:title>
                <h2 class="pt-3">TIMETABLE SETUP</h2>
            </template>
            
            <v-card-text class="pa-0">
                <v-form validate-on="input" @submit.prevent="submitHandler">
                    <v-row class="pa-5" no-gutters>
                        <v-col>
                            <v-row no-gutters class="py-3">
                                <v-col cols="10" class="pl-1">
                                    <h4>Select all days of week on which you teach</h4>
                                </v-col>
                            </v-row>

                            <v-row no-gutters fluid>
                                <v-col>
                                    <SquareCheckbox v-model="daysOfWeek[0]" label="Monday"/>
                                    <SquareCheckbox v-model="daysOfWeek[1]" label="Tuesday"/>
                                    <SquareCheckbox v-model="daysOfWeek[2]" label="Wednesday"/>
                                    <SquareCheckbox v-model="daysOfWeek[3]" label="Thursday"/>
                                    <SquareCheckbox v-model="daysOfWeek[4]" label="Friday"/>
                                </v-col>

                                <v-divider class="mx-5" vertical :thickness="2"></v-divider>

                                <v-col>
                                    <SquareCheckbox v-model="daysOfWeek[5]" label="Saturday"/>
                                    <SquareCheckbox v-model="daysOfWeek[6]" label="Sunday"/>
                                </v-col>
                            </v-row>

                            <v-row no-gutters class="pt-5">
                                <v-col class="pl-1">
                                    <h4>Number of lessons per day at your school</h4>
                                </v-col>
                            </v-row>

                            <v-row no-gutters class="pt-5">
                                <v-spacer/>
                                <v-col cols="3">
                                    <Spinner v-model="start"/>
                                </v-col>
                                <v-col cols="2" align="center" align-self="center">
                                    <v-icon icon="mdi-minus"/>
                                </v-col>
                                <v-col cols="3">
                                    <Spinner v-model="end"/>
                                </v-col>
                                <v-spacer/>
                            </v-row>
                            <v-row no-gutters class="pt-3">
                                <v-spacer/>
                                <v-col cols="4" class="spinner-label">Start</v-col>
                                <v-col cols="1"/>
                                <v-col cols="4" class="spinner-label">End</v-col>
                                <v-spacer/>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row no-gutters height="auto">
                        <v-col align="center" align-self="end">
                            <v-btn type="submit" class="w-100" height="50" variant="text">SAVE</v-btn>
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
    h4 {
        opacity: 50%;
    }

    .v-card {
        background-color: #efefef !important;
        border-radius: 7px !important;
    }

    .spinner-label {
        font-weight: bold;
        opacity: 50%;
        text-align: center;
    }

    .v-btn[type="submit"] {
        background-color: #5cb978;
        color: white !important;
        font-size: large;
        font-weight: bold;
        border-radius: 0px;
    }

    .v-divider {
        opacity: 100%;
    }
</style>

<script lang="ts" setup>
    import { ref, watch } from 'vue';
    import { RectureApi } from '@/api/RectureApi';
    import SquareCheckbox from './SquareCheckbox.vue';
    import Spinner from './Spinner.vue';
    import MessageDialog from './MessageDialog.vue';

    const props = defineProps<{
        modelValue?: boolean
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void,
        (e: "dataModified"): void
    }>();

    const daysOfWeek = ref<boolean[]>([true, true, true, true, true, false, false]);

    const start = ref<number | undefined>(undefined);
    const end = ref<number | undefined>(undefined);

    const loadingOverlayVisible = ref<boolean>(false);

    const errorDialogVisible = ref<boolean>(false);
    const errorDialogMessage = ref<string>("");

    watch(() => props.modelValue, () => {
        if (props.modelValue === true) initialize()
    });

    function initialize() {
        daysOfWeek.value = [false, false, false, false, false, false, false];
        start.value = undefined;
        end.value = undefined;

        loadingOverlayVisible.value = true;

        errorDialogVisible.value = false;
        errorDialogMessage.value = "";

        RectureApi.getTimetable().then(result => {
            if (result.success && result.data != null) {
                if (result.data.lessonsPerDay !== 0) {
                    daysOfWeek.value = result.data.daysOfWeek;
                    start.value = result.data.firstLessonNumber;
                    end.value = result.data.firstLessonNumber + result.data.lessonsPerDay - 1;
                } else {
                    daysOfWeek.value = [true, true, true, true, true, false, false];
                    start.value = 0;
                    end.value = 7;
                }
            } else {
                daysOfWeek.value = [true, true, true, true, true, false, false];
                start.value = 0;
                end.value = 7;
                errorDialogMessage.value = "Failed to load timetable data.";
                errorDialogVisible.value = true;
            }
        }).catch(reason => {
            daysOfWeek.value = [true, true, true, true, true, false, false];
            start.value = 0;
            end.value = 7;
            errorDialogMessage.value = "Failed to load timetable data.";
            errorDialogVisible.value = true;
        }).finally(() => {
            loadingOverlayVisible.value = false;
        });
    }

    function submitHandler() : void {
        if (start.value == undefined || end.value == undefined || start.value < 0 || end.value < start.value) {
            errorDialogMessage.value = "End must be greater than or equal to start and both must be non-negative integers.";
            errorDialogVisible.value = true;
            return;
        }

        loadingOverlayVisible.value = true;

        RectureApi.updateTimetable(daysOfWeek.value, end.value-start.value+1, start.value).then(result => {
            if (result.success) {
                emit("dataModified");
                emit("update:modelValue", false);
            } else {
                errorDialogMessage.value = "Failed to save timetable data.";
                errorDialogVisible.value = true;
            }
        }).catch(reason => {
            errorDialogMessage.value = "Failed to save timetable data.";
            errorDialogVisible.value = true;
        }).finally(() => {
            loadingOverlayVisible.value = false;
        });
    }
</script>