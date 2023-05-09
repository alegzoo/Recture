<template>
    <v-container class="signup h-100 pa-0" fluid no-gutters>
        <v-row class="h-100" no-gutters align-self="end">
            <v-col align="center" cols="6" align-self="center">
                <v-col class="pa-0 pl-7" cols="9">
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <h4 class="title-left-col">You're just a step<br>away from discovering<br>a new way of<br><span class="font-learning">learning</span></h4>
                </v-col> 
            </v-col>
            
            <v-col cols="4" align="center" class="v-col-signup-form pa-0" align-self="end">
                <v-form validate-on="input" class="px-12" no-gutters>
                    <v-img src="@/assets/combined_recture_logo.svg" class="my-3" style="height: 200px;"/>
                    <v-text-field class="textfield-edit py-2" label="First name" variant="plain" single-line hide-details/>
                    <v-col class="pa-0 textfield-form"/>
                    <v-text-field class="textfield-edit py-2" label="Last name" variant="plain" single-line hide-details/>
                    <v-col class="pa-0 textfield-form"/>
                    <v-text-field class="textfield-edit py-2" label="Email" :rules="[validateEmail]" variant="plain" single-line hide-details/>
                    <v-col class="pa-0 textfield-form"/>
                    <v-text-field class="textfield-edit py-2" label="Password" :rules="[validatePassword]" variant="plain" single-line hide-details :type="showPassword?'text':'password'" :append-inner-icon="showPassword?'mdi-eye':'mdi-eye-off'" @click:append-inner="showPassword = !showPassword"/>
                    <v-col class="pa-0 textfield-form"/>
                    <v-text-field class="textfield-edit py-2" label="Password again" :rules="[validatePassword]" variant="plain" single-line hide-details :type="showPassword?'text':'password'" :append-inner-icon="showPassword?'mdi-eye':'mdi-eye-off'" @click:append-inner="showPassword = !showPassword"/>
                    <v-col class="pa-0 textfield-form"/>
                    <v-text-field class="textfield-edit py-2" label="School (optional)" variant="plain" single-line hide-details/>
                    <v-col class="pa-0 textfield-form"/>

                    <v-row no-gutters class="pt-2">
                        <v-col class="pa-0" cols="1">
                            <v-checkbox hide-details align="center" align-self="center" :ripple="false"/>
                        </v-col>
                        <v-col align-self="center" align="center" class="pa-0 pl-4" cols="auto">
                            <h4>I agree with</h4>
                        </v-col>
                        <v-col align-self="center" align="center" class="pa-0 pl-2" cols="auto">
                            <router-link class="router-link-conditions" to="/"> Recture terms and conditions</router-link>
                        </v-col>
                    </v-row>

                    <v-row no-gutters>
                        <v-spacer/>
                        <v-col class="pb-2">
                            <v-btn variant="text" type="submit" theme="none">Sign up</v-btn>
                        </v-col>
                    </v-row>

                    <v-row no-gutters>
                        <v-spacer/>
                        <v-col class="pa-0">
                            <v-sheet class="v-sheet-signature"/>
                        </v-col>
                    </v-row>
                        
                    <v-row no-gutters>
                        <v-spacer/>
                        <v-col class="py-4" cols="auto">
                            <router-link class="router-link-conditions" to="/signin">Already have an account ? Sign in!</router-link>
                        </v-col>
                    </v-row>
                    
                    
                </v-form>
            </v-col>
            <v-col/>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped>
@import "@/styles/constants.scss";
@import "@/styles/mixins.scss";

.font-learning{
    font-family: 'Dancing Script', cursive;
    text-decoration: underline;
}

.title-left-col{
    font-size: 50px;
    text-align: left;
}

.v-col-signup-form{
    background-image: url("@/assets/bg_signup.svg");
    background-size: 120%;
    border: 2px black solid;
    border-bottom: none;
    box-shadow: 5px 5px 0px 0px black;
    background-repeat: repeat;
}

.signup {
    background-image: url("@/assets/bg_pattern.png");
    background-size: cover;
}

.signup p {
    font-weight: bold;
    color: black;
    font-size: 20px;
}

.textfield-edit{
    font-weight: bold;
}

.signup .v-field .v-icon {
    color: black;
    opacity: 80%;
    transition: opacity 0.1s;
}

.signup .v-btn {
    background-color: transparent;
}

.signup a {
    color: black;
}

.v-sheet-signature{
    border-bottom: 3px dotted black;
    background-color: transparent;
}

.textfield-form{
    border-bottom: black dotted 3px;
    opacity: 50%;
}

.router-link-conditions{
    font-weight: bold;
}

</style>

<script lang="ts" setup>
import { ref } from 'vue';
const showPassword = ref<boolean>(false);

function validateEmail(email: string): boolean | string {
    if (email.length > 0) return true;
    else return "Email is required.";
}

function validatePassword(password: string): boolean | string {
    if (password.length > 0) return true;
    else return "Password is required.";
}

</script>