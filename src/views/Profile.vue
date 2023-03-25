<template>
    <v-container id="whole-profile-container" class="h-100" fluid no gutters>
        <v-row class="pl-8 mt-2">
                <p class="text-h4 font-weight-medium">Profile</p>
        </v-row>
        <v-container class="mt-6 pl-15" fluid>
            <v-row align="center" class="pt-5 mb-10" no-gutters>

                <v-col align-content="center" class="pl-5" cols="auto">
                    <v-avatar v-if="accountStore.avatar != null" outlined id="profile-avatar" size="150" :image="accountStore.avatar"></v-avatar>
                </v-col>

                <v-col cols="auto" align-self="center" class="pl-10">
                    <p class="text-h2 text-md-h3 profile-name">{{ accountStore.fullName }}</p>
                </v-col>

                <v-spacer></v-spacer>

                <v-col cols="auto" align-self="start">
                    <v-btn id="profile-edit-icon" :ripple="false" variant="text" icon="mdi-lead-pencil"/>
                </v-col>
            </v-row>

            <v-sheet class="h-100" id="profile-v-sheet" background-color="transparent">
                <v-container class="mt-3 ml-2" fluid no-gutters>
                    <v-row class="pb-5 ml-5">
                        <v-col cols="2">
                            <p class="font-weight-medium">First Name</p>
                        </v-col>
                        <v-col>
                            <p class="font-weight-black">{{ accountStore.firstName }}</p>
                        </v-col>
                    </v-row>

                    <v-divider thickness="2" class="border-opacity-100"/>

                    <v-row class="pb-5 mt-3 ml-5">
                        <v-col cols="2">
                            <p class="font-weight-medium">Last Name</p>
                        </v-col>
                        <v-col>
                            <p class="font-weight-black">{{ accountStore.lastName }}</p>
                        </v-col>
                    </v-row>

                    <v-divider thickness="2" class="border-opacity-100"/>

                    <v-row class="pb-5 mt-3 ml-5">
                        <v-col cols="2">
                            <p class="font-weight-medium">Email</p>
                        </v-col>
                        <v-col>
                            <p class="font-weight-black">{{ accountStore.email }}</p>
                        </v-col>
                    </v-row>

                    <v-divider thickness="2" class="border-opacity-100"/>

                    <v-row class="pb-5 mt-3 ml-5">
                        <v-col cols="2">
                            <p class="font-weight-medium">School</p>
                        </v-col>
                        <v-col>
                            <p class="font-weight-black">{{ accountStore.organization }}</p>
                        </v-col>
                    </v-row>

                    <v-divider thickness="2" class="border-opacity-100"/>

                    <v-row class="pb-5 mt-3 ml-5">
                        <v-col cols="2">
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

    import "@/styles/profile.scss";

    const accountStore = useAccountStore();
</script>