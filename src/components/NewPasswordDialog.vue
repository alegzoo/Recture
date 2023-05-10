<template>
    <v-dialog :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)" width="550" scroll-strategy="block" persistent>
        <v-card>
            <v-card-title>
                <v-col class="pa-0 pl-2 pt-3">
                    <h2>CHANGE PASSWORD</h2>
                </v-col>                
            </v-card-title>      
            <v-card-text no-gutters>
                <v-row class="pa-0 pt-2">
                    <v-col cols="12" align="start" class="subtle">
                        <h4>Old password</h4>
                    </v-col>

                    <v-col cols="12" class="pa-0 px-3">
                        <v-text-field v-model="oldPassword" hide-details variant="solo" :type="showOldPassword?'text':'password'" :append-inner-icon="showOldPassword?'mdi-eye':'mdi-eye-off'" @click:append-inner="showOldPassword = !showOldPassword"/>
                    </v-col>

                    <v-col cols="12" align="start" class="subtle pt-7">
                        <h4>New password</h4>
                    </v-col>

                    <v-col cols="12" class="pa-0 px-3">
                        <v-text-field v-model="password" hide-details variant="solo" :type="showPassword?'text':'password'" :append-inner-icon="showPassword?'mdi-eye':'mdi-eye-off'" @click:append-inner="showPassword = !showPassword"/>
                    </v-col>

                    <v-col cols="12" align="start" class="subtle pt-7">
                        <h4>Confirm password</h4>
                    </v-col>

                    <v-col cols="12" class="pa-0 px-3">
                        <v-text-field v-model="confirmationPassword" hide-details variant="solo" :type="showConfirmationPassword?'text':'password'" :append-inner-icon="showConfirmationPassword?'mdi-eye':'mdi-eye-off'" @click:append-inner="showConfirmationPassword = !showConfirmationPassword"/>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-row class="pt-6 pa-4" no-gutters>
                <v-col cols="6" class="pa-3 pl-2">
                    <v-btn class="w-100 positive-btn" @click="changePassword()" variant="text">RESET</v-btn>
                </v-col>

                <v-col cols="6" class="pa-3 pr-2">
                    <v-btn class="w-100 negative-btn" @click="closeDialog()" variant="flat">CANCEL</v-btn>
                </v-col>
            </v-row>

            <v-overlay v-model="changingPassword" class="align-center justify-center" contained persistent>
                <v-progress-circular class="ma-auto" color="primary" indeterminate size="64"/>
            </v-overlay>
        </v-card>
    </v-dialog>
    <MessageDialog v-model="messageDialogVisible" :title="messageDialogTitle" :message="messageDialogText" @update:model-value="onMessageDialogClosed()"/>
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";
    @import "@/styles/mixins.scss";

    .v-card {
        background-color: #efefef;
    }

    .v-text-field {
        box-shadow: none !important;
        border: 2px black solid;
        border-radius: 6px;
        background-color: white;
        font-weight: bold;
    }

    .v-text-field:hover {
        box-shadow: 3px 3px 0 0 black !important;
    }

    .subtle {
        color: rgba(0, 0, 0, 0.5);
    }

    .positive-btn {
        box-shadow: 0 3px 0 0 black;
        border-radius: 4px !important;
        background-color: $recture-yellow;
        border: 2px black solid !important;
        color: black !important;
    }

    .negative-btn {
        background-color: transparent;
    }
</style>

<script lang="ts" setup>
    import { ref, watch } from 'vue';
    import { RectureApi } from '@/api/RectureApi';
    import MessageDialog from './MessageDialog.vue';

    const oldPassword = ref<string>("");
    const password = ref<string>("");
    const confirmationPassword = ref<string>("");

    const showOldPassword = ref<boolean>(false);
    const showPassword = ref<boolean>(false);
    const showConfirmationPassword = ref<boolean>(false);

    const changingPassword = ref<boolean>(false);
    const successfullyChangedPassword = ref<boolean>(false);

    const messageDialogVisible = ref<boolean>(false);
    const messageDialogTitle = ref<string>("");
    const messageDialogText = ref<string>("");

    const props = defineProps<{
        modelValue?: boolean
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void
    }>();

    watch(() => props.modelValue, () => {
        oldPassword.value = "";
        password.value = "";
        confirmationPassword.value = "";

        showOldPassword.value = false;
        showPassword.value = false;
        showConfirmationPassword.value = false;

        changingPassword.value = false;
        successfullyChangedPassword.value = false;

        messageDialogTitle.value = "";
        messageDialogText.value = "";
        messageDialogVisible.value = false;
    });

    function changePassword() {
        if (!oldPassword.value || !password.value || !confirmationPassword.value) {
            messageDialogTitle.value = "ERROR";
            messageDialogText.value = "Please fill out all fields.";
            messageDialogVisible.value = true;
            return;
        }

        if (password.value !== confirmationPassword.value) {
            messageDialogTitle.value = "ERROR";
            messageDialogText.value = "Password and confirmation password must match.";
            messageDialogVisible.value = true;
            return;
        }

        changingPassword.value = true;
        successfullyChangedPassword.value = false;

        RectureApi.changePassword(password.value, oldPassword.value).then(result => {
            if (result.success) {
                messageDialogTitle.value = "SUCCESS";
                messageDialogText.value = "Password changed successfully.";
                messageDialogVisible.value = true;
                successfullyChangedPassword.value = true;
            } else {
                messageDialogTitle.value = "ERROR";
                messageDialogText.value = "Failed to change password.";
                messageDialogVisible.value = true;
            }
        }).catch(reason => {
            messageDialogTitle.value = "ERROR";
            messageDialogText.value = "Failed to change password.";
            messageDialogVisible.value = true;
        }).finally(() => {
            changingPassword.value = false;
        })
    }

    function onMessageDialogClosed(): void {
        if (successfullyChangedPassword.value === true) closeDialog();
    }

    function closeDialog(): void {
        emit("update:modelValue", false);
    }
</script>

