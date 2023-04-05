<template>
        <v-dialog activator="parent" class="h-100 justify-center" width="550" scroll-strategy="block">
            <template v-slot:activator>
                <v-col cols="12" md="auto" align="center" :class="mdAndUp?'ml-5':'mb-2'">
                    <v-btn 
                        variant="text" 
                        class="btn-new-theme-unit"  
                        append-icon="mdi-plus-circle">
                        NEW THEMATIC UNIT
                    </v-btn>
                </v-col>  
            </template>
            <v-card class="new-theme-unit-card">
                <template v-slot:title>
                    <h2 class="pt-3 pl-1">NEW THEMATIC UNIT</h2>
                </template>
                <v-card-text no-gutters class="pa-0">

                    <v-row no-gutters>
                        <v-col cols="12" class="px-7 pt-3">
                            <v-text-field single-line variant="underlined" label="Give a title to your new thematic unit"></v-text-field>
                        </v-col>
                    </v-row>


                    <v-row no-gutters>
                        <v-col no-gutters>
                            <v-col cols="12" class="pl-7 pb-10 pr-7">
                                <v-combobox
                                    hide-details
                                    no-gutters
                                    class="choose-selectors"
                                    label="Choose a subject"
                                    :items="['MAT', 'INF']"
                                    variant="solo"
                                    density="comfortable"
                                    single-line
                                ></v-combobox>
                            </v-col>
                        </v-col>

                        <v-col no-gutters>
                            <v-col cols="12" class="pl-7 pb-10 pr-6">
                                <v-combobox
                                    hide-details
                                    no-gutters
                                    class="choose-selectors"
                                    label="Choose a class"
                                    :items="['I.A', 'II.B', 'III.C', 'oktáva A']"
                                    variant="solo"
                                    density="comfortable"
                                    single-line
                                ></v-combobox>
                            </v-col>
                        </v-col>
                    </v-row>


                </v-card-text>

                <v-row no-gutters height="auto">
                    <v-col align="center" align-self="end">
                        <v-btn class="create-btn-new-thematic-unit" width="550" height="50" variant="text">CREATE</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>

</template>

<style lang="scss" scoped>

.btn-new-theme-unit {
    border-radius: 9999px;
    border-style: solid;
}

.new-theme-unit-card {
    background-color: #efefef;
    border-radius: 7px !important;
}

.choose-selectors{
    border: solid 2px black !important;
    border-radius: 0px !important;
    box-shadow: 2px 2px 0px 0px black !important;
    background-color: white !important;
    font-weight: bold;
    color: black !important;
    text-transform: uppercase !important;
}


.v-combobox .v-label *{
    opacity: 100% !important;
    color: black !important;
}

.create-btn-new-thematic-unit{
    background-color: #5cb978;
    color: white !important;
    font-size: large;
    font-weight: bold;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
}

</style>

<script lang="ts" setup>

import { useDisplay } from 'vuetify/lib/framework.mjs';
const { smAndDown, mdAndUp, xlAndUp } = useDisplay();

</script>