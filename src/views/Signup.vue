<template>
    <v-container class="h-100 pa-0" fluid no-gutters>
        <SignupForm v-if="userType != null" :user-type="userType"/>

        <template v-else>
            <v-row no-gutters align-content="center" align="center" align-self="center" class="h-100">
                <v-col align-self="center" align="center">
                    <v-col class="pa-0" align-self="center" align="center">
                        <h1>I want to create an account as a</h1>
                    </v-col>       
                    <v-row no-gutters>
                        <v-col class="pa-0 pr-10 pt-4" align="right">
                            <v-btn :ripple="false" :width="200" :height="50" variant="text" @click="userType = 'TEACHER'">Teacher</v-btn>
                        </v-col>
                        <v-col class="pa-0 pl-10 pt-4" align="left">
                            <v-btn :ripple="false" :width="200" :height="50" variant="text" @click="userType = 'STUDENT'">Student</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>     
        </template>
    </v-container>
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";
    @import "@/styles/mixins.scss";

    .container {
        background-image: url("@/assets/bg_pattern.png");
        background-size: cover;
    }

    .v-btn {
        background-color: white;
        border: 2px black solid;
        font-weight: bold;
        @include elevated-button(5px, 5px, 2px);
    }

    .v-btn:hover {
        background-color: $recture-yellow;
        color: black;
    }
</style>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { UserType } from '@/api/RectureApi';
    import SignupForm from '@/components/SignupForm.vue';

    const userType = ref<UserType | undefined>(undefined);
</script>