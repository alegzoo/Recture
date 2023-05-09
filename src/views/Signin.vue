<template>
    <v-container id="signin" class="h-100" fluid>
        <v-row class="h-100">
            <v-spacer/>
            <v-col cols="10" md="6" lg="4" align="center" align-self="center">
                <v-form validate-on="input" @submit.prevent="submitHandler">
                    <v-img src="@/assets/recture_logo.svg" id="signin-logo" class="my-10" style="height: 60px;"/>
                    <v-img src="@/assets/typeface_recture_logo.svg" alt="typeface-logo" class="my-10" style="height: 60px;"/>
                    <p class="my-10">Sign in to start!</p>
                    <v-text-field single-line v-model="email" :disabled="submitDisabled" :rules="[validateEmail]" label="Email" class="mb-2" variant="solo" type="email"/>
                    <v-text-field single-line v-model="password" :disabled="submitDisabled" :rules="[validatePassword]" label="Password" class="mb-2" variant="solo" :type="showPassword?'text':'password'" :append-inner-icon="showPassword?'mdi-eye':'mdi-eye-off'" @click:append-inner="showPassword = !showPassword"/>

                    <v-alert v-show="alertBody !== null" density="compact" type="error" align="left" :text="(alertBody as string)" class="mb-5"/>
                    <v-alert v-show="verifyEmailAlertVisible" density="compact" type="warning" align="left" class="mb-5">
                        <template v-slot:text>
                            You must verify your email before signing in. <router-link to="/verify">Resend verification link</router-link>
                        </template>
                    </v-alert>

                    <v-btn variant="outlined" type="submit" :disabled="submitDisabled" :loading="submitDisabled" class="mb-5" theme="none">Sign in</v-btn>
                    <br/>
                    <router-link to="/reset">Forgot password?</router-link>
                    <p class="my-10"></p>
                    <router-link to="/signup/select">No account? Create one now for free!</router-link>
                </v-form>
            </v-col>
            <v-spacer/>
        </v-row>
    </v-container>
</template>

<style>

</style>

<script lang="ts" setup>
    import { RectureApi } from '@/api/RectureApi';
    import status from "http-status";
    import router from '@/router';
    import { ref } from 'vue';
    import { useDisplay } from 'vuetify/lib/framework.mjs';

    import "@/styles/signin.scss";
    
    const email = ref<string>("");
    const password = ref<string>("");

    const alertBody = ref<string|null>(null);
    const verifyEmailAlertVisible = ref<boolean>(false);
    const submitDisabled = ref<boolean>(false);

    const showPassword = ref<boolean>(false);

    function validateEmail(email: string): boolean | string {
        if (email.length > 0) return true;
        else return "Email is required.";
    }

    function validatePassword(password: string): boolean | string {
        if (password.length > 0) return true;
        else return "Password is required.";
    }

    function submitHandler() {
        if (validateEmail(email.value) !== true || validatePassword(password.value) !== true) return;

        alertBody.value = null;
        verifyEmailAlertVisible.value = false;
        submitDisabled.value = true;
        RectureApi.signIn(email.value, password.value)
            .then((result) => {
                if (result.success) {
                    router.push("/").catch(reason => {
                        console.error(reason);
                    });
                } else if (result.statusCode === status.UNAUTHORIZED || result.statusCode === status.BAD_REQUEST) {
                    alertBody.value = "Incorrect username or password.";
                } else if (result.statusCode === status.NOT_FOUND) {
                    alertBody.value = "This account does not exist.";
                } else if (result.statusCode === status.CONFLICT) {
                    verifyEmailAlertVisible.value = true;
                } else {
                    alertBody.value = "An error has occurred.";
                }
                submitDisabled.value = false;
            })
            .catch((reason) => {
                alertBody.value = "An error has occurred.";
                submitDisabled.value = false;
            });
    }
</script>