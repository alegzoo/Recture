<template>
    <v-dialog :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)" width="600" scroll-strategy="block" :persistent="creatingInvitation">
        <v-card>
            <template v-slot:title>
                <h2 class="pt-3">CREATE INVITATION</h2>
            </template>
            <v-card-text no-gutters class="pa-0">
                <v-form validate-on="input" @submit.prevent="submitHandler">
                    <v-row no-gutters class="pa-0">
                        <v-col class="px-5">
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

                            <v-row class="pt-5">
                                <v-col class="pb-0">
                                    <SquareCheckbox v-model="timeLimited" label="Set expiration date"/>
                                </v-col>
                                <v-col class="pb-0">
                                    <SquareCheckbox v-model="useCountLimited" label="Set maximum use count"/>
                                </v-col>
                            </v-row>

                            <v-row class="pb-5">
                                <v-col class="pt-0">
                                    <v-text-field
                                        v-model="expirationDate"
                                        variant="underlined"
                                        label="Expires on"
                                        type="date"
                                        :rules="[validateExpirationDate]"
                                        :disabled="!timeLimited"
                                    />
                                </v-col>
                                <v-col class="pt-1">
                                    <v-text-field
                                        v-model="maximumUses"
                                        variant="underlined"
                                        label="Maximum uses"
                                        :rules="[validateMaximumUses]"
                                        :disabled="!useCountLimited"
                                    />
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row no-gutters> 
                        <v-col align="center" align-self="end">
                            <v-btn class="w-100" height="50" variant="text" type="submit">CREATE</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-overlay v-model="creatingInvitation" class="align-center justify-center" contained persistent>
                <v-progress-circular class="ma-auto" color="primary" indeterminate size="64"/>
            </v-overlay>
        </v-card>
    </v-dialog>
    <InvitationCreatedDialog v-model="invitationCreatedDialogVisible" :subject-name="subjectName" :class-name="className" :code="createdInvitation?.code" :link="createdInvitation?.link" @update:model-value="onInvitationCreatedDialogToggled"/>
    <MessageDialog v-model="errorDialogVisible" title="ERROR" :message="errorDialogMessage"/>
</template>

<style lang="scss" scoped>
    .v-card {
        background-color: #efefef;;
    }

    .subtle {
        color: rgba(0, 0, 0, 0.5);
    }

    .v-btn[type="submit"] {
        border-radius: 0px !important;
        background-color: #5cb978;
        color: white !important;
        font-size: large;
        font-weight: bold;
    }
</style>

<script lang="ts" setup>
    import { ref, computed, watch, onMounted } from 'vue';
    import { RectureApi, ILesson, IInvitation } from '@/api/RectureApi';
    import SquareCheckbox from './SquareCheckbox.vue';
    import SubjectClassLabel from './SubjectClassLabel.vue';
    import MessageDialog from './MessageDialog.vue';
    import InvitationCreatedDialog from './InvitationCreatedDialog.vue';

    const props = defineProps<{
        modelValue?: boolean,
        lesson: ILesson | null
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void
    }>();

    const timeLimited = ref<boolean>(false);
    const useCountLimited = ref<boolean>(false);

    const expirationDate = ref<string | null>(null);
    const maximumUses = ref<string | null>(null);

    const creatingInvitation = ref<boolean>(false);

    const createdInvitation = ref<IInvitation | null>(null);
    const invitationCreatedDialogVisible = ref<boolean>(false);

    const errorDialogVisible = ref<boolean>(false);
    const errorDialogMessage = ref<string>("");

    const subjectName = computed<string>(() => props.lesson != null ? props.lesson.subjectName : "");
    const className = computed<string>(() => props.lesson != null ? props.lesson.className : "");

    watch(() => [props.modelValue, props.lesson], () => {
        if (props.modelValue === true) initialize();
    });
    onMounted(() => initialize());

    function initialize(): void {
        timeLimited.value = false;
        useCountLimited.value = false;

        expirationDate.value = null;
        maximumUses.value = null;

        creatingInvitation.value = false;
        
        createdInvitation.value = null;
        invitationCreatedDialogVisible.value = false;

        errorDialogVisible.value = false;
        errorDialogMessage.value = "";
    }

    function validateExpirationDate(): boolean | string {
        if (timeLimited.value === false) return true;
        else if (expirationDate.value != null) {
            const date = Date.parse(expirationDate.value);
            const currentTime = new Date().getTime();

            if (date > currentTime) return true;
            else return "Date must be in the future.";
        } else return "Must be a valid date.";
    }

    function validateMaximumUses(): boolean | string {
        if (useCountLimited.value === false || (maximumUses.value != null && /^[0-9]+$/.test(maximumUses.value))) return true;
        else return "Must be a positive integer.";
    }

    function submitHandler() {
        if (props.lesson == null || validateExpirationDate() !== true || validateMaximumUses() !== true) return;

        creatingInvitation.value = true;

        const uses = maximumUses.value != null ? parseInt(maximumUses.value) : null;
        const expirationTimestamp = expirationDate.value != null ? Date.parse(expirationDate.value) : null;

        RectureApi.createInvitation(props.lesson.classId, props.lesson.subjectId, uses, expirationTimestamp).then(result => {
            if (result.success && result.data != null) {
                createdInvitation.value = result.data;
                invitationCreatedDialogVisible.value = true;
            } else {
                errorDialogMessage.value = "Failed to create invitation";
                errorDialogVisible.value = true;
            }
        }).catch(reason => {
            errorDialogMessage.value = "Failed to create invitation";
            errorDialogVisible.value = true;
        }).finally(() => {
            creatingInvitation.value = false;
        });
    }

    function onInvitationCreatedDialogToggled(visible: boolean) {
        if (!visible) closeDialog();
    }

    function closeDialog() {
        emit("update:modelValue", false);
    }
</script>