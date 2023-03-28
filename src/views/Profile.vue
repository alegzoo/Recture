<template>
    <v-container id="whole-profile-container" class="h-100" fluid no gutters>
        <v-row>
            <v-col cols="12">
                <p class="text-h4 font-weight-medium">Profile</p>
            </v-col>
        </v-row>
        <v-container :class="'mt-6'+(mdAndUp?' pl-15':'')" fluid>
            <v-row align="center" justify="center" class="pt-5 mb-10" no-gutters>
                <v-col align="center" align-content="center" align-self="center" :cols="mdAndUp?'auto':12" :class="mdAndUp?'pl-5 ':''">
                    <v-avatar v-if="accountStore.avatar != null" outlined id="profile-avatar" size="150" :image="accountStore.avatar"></v-avatar>
                </v-col>

                <v-col :cols="mdAndUp?'auto':12" align-self="center" :class="mdAndUp?'pl-10':'pa-5'">
                    <p :class="'text-h2 text-md-h3 profile-name'+(mdAndUp?' text-left':' text-center')">{{ accountStore.fullName }}</p>
                </v-col>

                <v-spacer></v-spacer>

                <v-col :cols="mdAndUp?'auto':12" align="center" align-self="start">
                    <v-btn id="profile-edit-icon" :ripple="false" variant="text" icon="mdi-lead-pencil"/>
                </v-col>
            </v-row>

            <v-sheet class="h-100" id="profile-v-sheet" background-color="transparent">
                <v-container class="mt-3 ml-2" fluid no-gutters>
                    <v-row class="pb-5 ml-5">
                        <v-col :cols="mdAndUp?2:12">
                            <p class="font-weight-medium">First Name</p>
                        </v-col>
                        <v-col>
                            <p class="font-weight-black">{{ accountStore.firstName }}</p>
                        </v-col>
                    </v-row>

                    <v-divider thickness="2" class="border-opacity-100"/>

                    <v-row class="pb-5 mt-3 ml-5">
                        <v-col :cols="mdAndUp?2:12">
                            <p class="font-weight-medium">Last Name</p>
                        </v-col>
                        <v-col>
                            <p class="font-weight-black">{{ accountStore.lastName }}</p>
                        </v-col>
                    </v-row>

                    <v-divider thickness="2" class="border-opacity-100"/>

                    <v-row class="pb-5 mt-3 ml-5">
                        <v-col :cols="mdAndUp?2:12">
                            <p class="font-weight-medium">Email</p>
                        </v-col>
                        <v-col>
                            <p class="font-weight-black">{{ accountStore.email }}</p>
                        </v-col>
                    </v-row>

                    <v-divider thickness="2" class="border-opacity-100"/>

                    <v-row class="pb-5 mt-3 ml-5">
                        <v-col :cols="mdAndUp?2:12">
                            <p class="font-weight-medium">School</p>
                        </v-col>
                        <v-col>
                            <p class="font-weight-black">{{ accountStore.organization }}</p>
                        </v-col>
                    </v-row>

                    <v-divider thickness="2" class="border-opacity-100"/>

                    <v-row class="pb-5 mt-3 ml-5">
                        <v-col :cols="mdAndUp?2:12">
                            <p class="font-weight-medium">Bio</p>
                        </v-col>
                        <v-col>
                            <p class="font-weight-black">{{ accountStore.bio }}</p>
                        </v-col>
                    </v-row>
                </v-container>
            </v-sheet>
        </v-container>
    </v-container>
</template>

<style>

</style>

<script lang="ts" setup>
    import { useAccountStore } from '@/stores/useAccountStore';
    import { useDisplay } from 'vuetify/lib/framework.mjs';

    import "@/styles/profile.scss";

    const accountStore = useAccountStore();

    const { mdAndUp } = useDisplay();
</script>