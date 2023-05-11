<template>
    <v-row class="h-100" no-gutters align-self="end">
        <v-col v-show="lgAndUp" cols="6" align="center" align-self="center" class="px-10">
            <p>{{ mainSideText }} <span class="cursive underlined">{{ cursiveSideText }}</span></p>
        </v-col>

        <v-col v-show="!lgAndUp" cols="1" sm="2"/>
        
        <v-col class="form-column pa-0" align-self="end">
            <v-form validate-on="input" @submit.prevent="submitHandler" class="w-100 h-100 px-12 d-flex flex-column" no-gutters>
                <img src="@/assets/recture_typeface_logo_2.svg" :width="200" class="flex-grow-0 py-15"/>

                <v-text-field v-model="firstName" class="py-2 flex-grow-0" label="First name" :rules="[validateField]" variant="plain" single-line hide-details/>
                <v-text-field v-model="lastName" class="py-2 flex-grow-0" label="Last name" :rules="[validateField]" variant="plain" single-line hide-details/>
                <v-text-field v-model="email" class="py-2 flex-grow-0" label="Email" :rules="[validateField]" variant="plain" single-line hide-details/>
                <v-text-field v-model="password" class="py-2 flex-grow-0 password-field" label="Password" :rules="[validateField]" variant="plain" single-line hide-details :type="showPassword?'text':'password'" :append-inner-icon="showPassword?'mdi-eye':'mdi-eye-off'" @click:append-inner="showPassword = !showPassword"/>
                <v-text-field v-model="organization" class="py-2 flex-grow-0" label="School / organization (optional)" variant="plain" single-line hide-details/>

                <div class="d-flex flex-grow-0">
                    <v-checkbox v-model="termsAgreedTo" class="flex-grow-0 align-self-center" :ripple="false" hide-details>
                        <template v-slot:label>
                            <span>I agree to the <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Terms of Service</a></span>
                        </template>
                    </v-checkbox>
                </div>

                <div class="flex-grow-1">
                    <v-alert v-show="alertBody !== null" density="compact" type="error" align="left" :text="(alertBody as string)"/>
                </div>

                <v-btn :class="{'flex-grow-0': true, 'align-self-end': true, 'w-50': true, 'cursive': creatingAccount === true || accountCreated === true}" variant="text" height="50" type="submit" theme="none" :text="signUpButtonText"/>
                    
                <router-link class="flex-grow-0 align-self-end mb-4 mt-8" to="/signin">Already have an account? Sign in!</router-link>
            </v-form>
        </v-col>

        <v-col class="pa-0" cols="1" sm="2" lg="1" xl="2"/>

        <v-overlay v-model="creatingAccount" class="align-center justify-center" contained persistent>
            <v-progress-circular class="ma-auto" color="primary" indeterminate size="64"/>
        </v-overlay>
    </v-row>

    <MessageDialog v-model="messageDialogVisible" :title="messageDialogTitle" :message="messageDialogText"/>
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";
    @import "@/styles/mixins.scss";

    .cursive {
        font-family: 'Dancing Script', cursive;
    }

    .underlined {
        text-decoration: underline;
    }

    p {
        font-size: 50px;
        font-weight: bold;
        text-align: left;
        max-width: 400px;
    }

    .form-column{
        background-image: url("@/assets/bg_signup.svg");
        background-size: cover;
        height: 95%;
        min-height: 95%;
        max-height: 95%;
        border: 2px black solid;
        border-bottom: none;
        box-shadow: 5px 5px 0px 0px black;
    }

    .v-text-field {
        border-bottom: dotted 3px black !important;
        padding-left: 5px;
        padding-right: 5px;
    }

    .v-checkbox :deep(.v-label) {
        opacity: 100% !important;
    }

    .v-btn[type="submit"] {
        border-bottom: dotted 3px black !important;
    }

    .v-btn[type="submit"].cursive {
        font-size: 2em;
    }

    .v-field .v-icon {
        color: black;
        opacity: 80%;
        transition: opacity 0.1s;
    }

    a {
        color: black;
    }
</style>

<script lang="ts" setup>
    import { RectureApi, UserType } from '@/api/RectureApi';
    import { ref, computed, watch } from 'vue';
    import status from 'http-status';
    import { useDisplay } from 'vuetify/lib/framework.mjs';
    import router from '@/router';
    import MessageDialog from './MessageDialog.vue';

    const props = defineProps<{
        userType: UserType
    }>();

    const firstName = ref<string>("");
    const lastName = ref<string>("");
    const email = ref<string>("");
    const password = ref<string>("");
    const organization = ref<string>("");
    const termsAgreedTo = ref<boolean>(false);

    const showPassword = ref<boolean>(false);

    const alertBody = ref<string | null>(null);

    const messageDialogVisible = ref<boolean>(false);
    const messageDialogTitle = ref<string>("");
    const messageDialogText = ref<string>("");

    const creatingAccount = ref<boolean>(false);
    const accountCreated = ref<boolean>(false);

    const mainSideText = computed<string>(() => props.userType === "TEACHER" ? "You're just a step away from making more off your" : "You're just a step away from discovering a new way of");
    const cursiveSideText = computed<string>(() => props.userType === "TEACHER" ? "knowledge" : "learning");

    const signUpButtonText = computed<string>(() => (creatingAccount.value === true || accountCreated.value === true) ? lastName.value : "Sign up");

    const { lgAndUp } = useDisplay();

    watch(messageDialogVisible, () => {
        if (messageDialogVisible.value === false && accountCreated.value === true) {
            router.push({ name: "signin" }).catch(reason => {
                console.error(reason);
            });
        }
    });

    function validateField(val: string): boolean | string {
        if (val.length > 0) return true;
        else return "This field is required.";
    }

    function submitHandler() {
        if (validateField(firstName.value) !== true || validateField(lastName.value) !== true || validateField(email.value) !== true || validateField(password.value) !== true) {
            alertBody.value = "Please fill out all required fields.";
            return;
        } else if (termsAgreedTo.value !== true) {
            alertBody.value = "You must agree to the Terms of Service in order to sign up.";
            return;
        } else alertBody.value = null;

        creatingAccount.value = true;

        const optionalOrganization = organization.value.trim().length > 0 ? organization.value : null;

        RectureApi.signUp(email.value, firstName.value, lastName.value,  optionalOrganization, password.value, props.userType).then(result => {
            if (result.success) {
                accountCreated.value = true;
                
                messageDialogTitle.value = "SUCCESS";
                messageDialogText.value = "Your account has been successfully created! A verification link has been sent to your email. Use it to activate your account before signing in.";
                messageDialogVisible.value = true;
            } else if (result.statusCode === status.CONFLICT) {
                messageDialogTitle.value = "ERROR";
                messageDialogText.value = "An account with this email already exists.";
                messageDialogVisible.value = true;
            } else {
                messageDialogTitle.value = "ERROR";
                messageDialogText.value = "Failed to create account.";
                messageDialogVisible.value = true;
            }
        }).catch(reason => {
            messageDialogTitle.value = "ERROR";
            messageDialogText.value = "Failed to create account.";
            messageDialogVisible.value = true;
        }).finally(() => {
            creatingAccount.value = false;
        });
    }
</script>