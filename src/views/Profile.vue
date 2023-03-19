<template>
    <v-container id="whole-profile-container" class="h-100" fluid no gutters>
        <v-row class="pl-8 mt-2">
                <p class="text-h4 font-weight-medium">Profile</p>
        </v-row>
        <v-container class="mt-6 pl-15" fluid>
            <v-row align="center" class="pt-5 mb-10" no-gutters>

                <v-col align-content="center" class="pl-5" cols="auto">
                    <v-avatar outlined id="profile-avatar" size="150" image="@/assets/jano.png"></v-avatar>
                </v-col>

                <v-col cols="auto" align-self="center" class="pl-10">
                    <p class="text-h2 text-md-h3 profile-name">Jano Číslový</p>
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
                            <p class="font-weight-medium">Name</p>
                        </v-col>
                        <v-col>
                            <p class="font-weight-black">Jano Číslový</p>
                        </v-col>
                    </v-row>

                    <v-divider thickness="2" class="border-opacity-100"/>

                    <v-row class="pb-5 mt-3 ml-5">
                        <v-col cols="2">
                            <p class="font-weight-medium">Email</p>
                        </v-col>
                        <v-col>
                            <p class="font-weight-black">jancislovy24@gmail.com</p>
                        </v-col>
                    </v-row>

                    <v-divider thickness="2" class="border-opacity-100"/>

                    <v-row class="pb-5 mt-3 ml-5">
                        <v-col cols="2">
                            <p class="font-weight-medium">School</p>
                        </v-col>
                        <v-col>
                            <p class="font-weight-black">GJAR</p>
                        </v-col>
                    </v-row>

                    <v-divider thickness="2" class="border-opacity-100"/>

                    <v-row class="pb-5 mt-3 ml-5">
                        <v-col cols="2">
                            <p class="font-weight-medium">Bio</p>
                        </v-col>
                        <v-col>
                            <p class="font-weight-black">
                                Ahoj. Volám sa Ján Číslový a som učiteľom informatiky a matematiky na škole GJAR.
                                Okrem toho že rád vzdelávam a vyučujem, mám kopec voľnočasových aktivít pri ktorých
                                si vetrám hlavu! Či už ide o horské bicyklovanie, alebo beh aj rád sledujem športy v televízii.
                                Ak chceš držať krok s tým čo robím vo svojom voľnom čase, môžeš ma nájsť aj na
                                instagrame pod menom @jan_cislovy.
                                Prajem ti príjemné vzdelávanie.
                                PS: Ak by si mal otázku ohľadom nejakej časti v nahrávke, naváhaj mi napísať !
                            </p>
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
    import router from '@/router';
</script>