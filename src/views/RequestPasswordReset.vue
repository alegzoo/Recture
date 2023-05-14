<template>
    <v-container class="h-100" fluid>
        <v-row class="h-100">
            <v-spacer/>
            <v-col cols="10" md="6" lg="4" align="center" align-self="center">
                <v-form validate-on="input" @submit.prevent="submitHandler">
                    <h1 class="my-10">Reset password</h1>
                    <v-text-field single-line v-model="email" :disabled="submitDisabled" :rules="[validateEmail]" label="Email" class="mb-2" variant="solo" type="email"/>

                    <v-row class="mt-8" no-gutters>
                        <v-col align="left" class="py-0">
                            <router-link to="/signin">Back</router-link>
                        </v-col>
                        <v-col align="right" class="py-0">
                            <v-btn variant="outlined" type="submit" :disabled="submitDisabled" :loading="submitDisabled" theme="none">Reset password</v-btn>
                        </v-col>
                    </v-row>
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
    import status from 'http-status';
    
    const email = ref<string>("");

    const messageDialogVisible = ref<boolean>(false);
    const messageDialogTitle = ref<string>("");
    const messageDialogText = ref<string>("");

    const submitDisabled = ref<boolean>(false);
    const requestSuccessful = ref<boolean>(false);

    watch(messageDialogVisible, () => {
        if (messageDialogVisible.value === false && requestSuccessful.value === true) {
            router.push({ name: "signin" }).catch(reason => {
                console.error(reason);
            });
        }
    });

    function validateEmail(email: string): boolean | string {
        if (email.length > 0) return true;
        else return "Email is required.";
    }

    function submitHandler() {
        if (validateEmail(email.value) !== true) return;

        submitDisabled.value = true;

        RectureApi.requestPasswordReset(email.value).then(result => {
            if (result.success) {
                requestSuccessful.value = true;

                messageDialogTitle.value = "SUCCESS";
                messageDialogText.value = "A link to reset your password has been sent to your email!";
                messageDialogVisible.value = true;
            } else if (result.statusCode === status.NOT_FOUND) {
                messageDialogTitle.value = "ERROR";
                messageDialogText.value = "No account with this email exists.";
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