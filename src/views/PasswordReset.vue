<template>
    <v-container class="h-100" fluid>
        <v-row class="h-100">
            <v-spacer/>
            <v-col cols="10" md="6" lg="4" align="center" align-self="center">
                <v-form validate-on="submit" @submit.prevent="submitHandler">
                    <h1 class="my-10">Choose a new password</h1>
                    <v-text-field single-line v-model="password" :disabled="submitDisabled" :rules="[validatePassword]" label="Password" class="mb-2" variant="solo" :type="showPassword?'text':'password'" :append-inner-icon="showPassword?'mdi-eye':'mdi-eye-off'" @click:append-inner="showPassword = !showPassword"/>
                    <v-text-field single-line v-model="confirmationPassword" :disabled="submitDisabled" :rules="[validateConfirmationPassword]" label="Confirm password" class="mb-2" variant="solo" :type="showConfirmationPassword?'text':'password'" :append-inner-icon="showConfirmationPassword?'mdi-eye':'mdi-eye-off'" @click:append-inner="showConfirmationPassword = !showConfirmationPassword"/>

                    <v-btn variant="outlined" type="submit" :disabled="submitDisabled" :loading="submitDisabled" theme="none">Reset password</v-btn>
                </v-form>
            </v-col>
            <v-spacer/>
        </v-row>
    </v-container>
    <MessageDialog v-model="messageDialogVisible" :title="messageDialogTitle" :message="messageDialogText"/>
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";
    @import "@/styles/mixins.scss";

    .v-container {
        background-image: url("@/assets/bg_pattern.png");
        background-size: cover;
        background-attachment: fixed;
    }

    :deep(.v-field) {
        background-color: white;
        border-style: solid;
        border-color: black;
        border-width: 2px;
        border-radius: 4px;
        box-shadow: none;
        border-radius: 4px;
        transition: box-shadow 0.1s;
    }

    :deep(.v-field):focus-within {
        box-shadow: 5px 5px 0px 0px black;
        transition: box-shadow 0.1s;
    }

    .v-btn {
        @include elevated-button(0px, 3px, 1px);
        background-color: $recture-yellow;
        border-radius: 4px;
        border-width: 2px;
        border-style: solid;
        border-color: black;
    }

    a {
        color: black;
    }
</style>

<script lang="ts" setup>
    import { RectureApi } from '@/api/RectureApi';
    import { ref, watch } from 'vue';
    import MessageDialog from '@/components/MessageDialog.vue';
    import router from '@/router';
    import { useRoute } from 'vue-router';
    
    const password = ref<string>("");
    const confirmationPassword = ref<string>("");

    const showPassword = ref<boolean>(false);
    const showConfirmationPassword = ref<boolean>(false);

    const messageDialogVisible = ref<boolean>(false);
    const messageDialogTitle = ref<string>("");
    const messageDialogText = ref<string>("");

    const submitDisabled = ref<boolean>(false);
    const resetComplete = ref<boolean>(false);

    const route = useRoute();

    watch(messageDialogVisible, () => {
        if (messageDialogVisible.value === false && resetComplete.value === true) {
            router.push({ name: "signin" }).catch(reason => {
                console.error(reason);
            });
        }
    });

    function validatePassword(password: string): boolean | string {
        if (password.length > 0) return true;
        else return "Password is required.";
    }

    function validateConfirmationPassword(confirmationPassword: string): boolean | string {
        if (confirmationPassword.length > 0 && confirmationPassword === password.value) return true;
        else return "Passwords must match.";
    }

    function submitHandler() {
        if (validatePassword(password.value) !== true || validateConfirmationPassword(confirmationPassword.value) !== true) return;

        if (!(route.params.code instanceof String || typeof route.params.code === "string")) {
            resetComplete.value = true;

            messageDialogTitle.value = "ERROR";
            messageDialogText.value = "Invalid password reset code.";
            messageDialogVisible.value = true;
            return;
        }

        const code = route.params.code as string;

        submitDisabled.value = true;

        RectureApi.resetPassword(password.value, code).then(result => {
            resetComplete.value = true;

            if (result.success) {
                messageDialogTitle.value = "SUCCESS";
                messageDialogText.value = "You can now sign in with your new password!";
                messageDialogVisible.value = true;
            } else {
                messageDialogTitle.value = "ERROR";
                messageDialogText.value = "Failed to request password reset.";
                messageDialogVisible.value = true;
            }
        }).catch(reason => {
            messageDialogTitle.value = "ERROR";
            messageDialogText.value = "Failed to request password reset.";
            messageDialogVisible.value = true;
        }).finally(() => {
            submitDisabled.value = false;
        });
    }
</script>