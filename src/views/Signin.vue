<template>
    <v-container id="signin-container" class="h-100" fluid>
        <v-row class="h-100">
            <v-col/>
            <v-col cols="10" md="4" align="center" align-self="center">
                <v-form id="signin-form" validate-on="input" @submit.prevent="submitHandler">
                    <v-img src="@/assets/recture_logo.svg" id="signin-logo" class="my-10" style="height: 60px;"/>
                    <v-img src="@/assets/typeface_recture_logo.svg" alt="typeface-logo" class="my-10" style="height: 60px;"/>
                    <p class="my-10" id="signin-text-title">Sign in to start!</p>
                    <v-text-field id="email-input" v-model="email" :disabled="submitDisabled" :rules="[validateEmail]" label="Email" class="mb-2"/>
                    <v-text-field id="password-input" v-model="password" :disabled="submitDisabled" :rules="[validatePassword]" label="Password" class="mb-2"/>
                    <v-alert v-show="alertBody !== null" density="compact" type="warning" align="left" :text="(alertBody as string)" class="mb-5"/>
                    <v-btn type="submit" :disabled="submitDisabled" class="mb-5">Sign in</v-btn>
                    <br/>
                    <router-link to="/signup">No account? Sign up!</router-link>
                </v-form>
            </v-col>
            <v-col/>
        </v-row>
    </v-container>
</template>

<style>

</style>

<script lang="ts" setup>
    import { RectureApi } from '@/api/RectureApi';
    import * as status from 'http-status';
    import router from '@/router';
    import { ref } from 'vue';
    
    const email = ref<string>("");
    const password = ref<string>("");

    const alertBody = ref<string|null>(null);
    const submitDisabled = ref<boolean>(false);

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
        submitDisabled.value = true;
        RectureApi.signIn(email.value, password.value)
            .then((response) => {
                if (response.ok) {
                    router.push("/");
                } else if (response.status === status.UNAUTHORIZED || response.status === status.BAD_REQUEST) {
                    alertBody.value = "Incorrect username or password.";
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