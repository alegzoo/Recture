<template>
    <v-container id="signin-container" class="h-100" fluid>
        <v-row class="h-100">
            <v-col/>
            <v-col cols="10" md="6" align="center" align-self="center">
                <v-form id="signin-form" validate-on="submit" @submit.prevent="submitHandler">
                    <v-img src="@/assets/recture_logo.svg" id="login-logo" class="my-10" style="height: 60px;"/>
                    <v-img src="@/assets/typeface_recture_logo.svg" alt="typeface-logo" class="my-10" style="height: 60px;"/>
                    <p class="my-10">Log in to start!</p>
                    <v-text-field id="email-input" v-model="email" :rules="[validateEmail]" label="Email" class="mb-2"/>
                    <v-text-field id="password-input" v-model="password" :rules="[validatePassword]" label="Password" class="mb-2"/>
                    <v-btn type="submit" class="mb-5">Sign in</v-btn>
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
    import { ref } from 'vue';
    const email = ref<string>("")
    const password = ref<string>("")

    function validateEmail(email: string): boolean | string {
        if (email.length > 0) return true;
        else return "Email is required."
    }

    function validatePassword(password: string): boolean | string {
        if (password.length > 0) return true;
        else return "Password is required."
    }

    function submitHandler() {

    }
</script>