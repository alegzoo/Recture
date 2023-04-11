<template>
    <v-dialog activator="parent" class="h-100 justify-center" width="450" scroll-strategy="block">
        <template v-slot:activator>
            <v-btn icon="" theme="light"/>
        </template>
        <v-card>
                <template v-slot:title>
                    <h2 class="pt-3 pl-1">TIMETABLE SETUP</h2>
                </template>
                
                <v-card-text>
                    <v-row no-gutters class="py-3">
                        <v-col cols="10" class="pl-1">
                            <h4>Select days of week on which you teach</h4>
                        </v-col>
                    </v-row>

                    <v-row no-gutters fluid>
                        <v-col>
                            <SquareCheckbox v-model="daysOfWeek[0]" label="Monday"/>
                            <SquareCheckbox v-model="daysOfWeek[1]" label="Tuesday"/>
                            <SquareCheckbox v-model="daysOfWeek[2]" label="Wednesday"/>
                            <SquareCheckbox v-model="daysOfWeek[3]" label="Thursday"/>
                            <SquareCheckbox v-model="daysOfWeek[4]" label="Friday"/>
                        </v-col>

                        <v-divider class="mx-5" vertical :thickness="2"></v-divider>

                        <v-col>
                            <SquareCheckbox v-model="daysOfWeek[5]" label="Saturday"/>
                            <SquareCheckbox v-model="daysOfWeek[6]" label="Sunday"/>
                        </v-col>
                    </v-row>

                    <v-row no-gutters class="pt-5">
                        <v-col class="pl-1">
                            <h4>Number of lessons per day at your school</h4>
                        </v-col>
                    </v-row>

                    <v-row no-gutters class="pt-5">
                        <v-spacer/>
                        <v-col cols="3">
                            <Spinner v-model="start"/>
                        </v-col>
                        <v-col cols="2" align="center" align-self="center">
                            <v-icon icon="mdi-minus"/>
                        </v-col>
                        <v-col cols="3">
                            <Spinner v-model="end"/>
                        </v-col>
                        <v-spacer/>
                    </v-row>
                    <v-row no-gutters class="pt-3">
                        <v-spacer/>
                        <v-col cols="4" class="spinner-label">Start</v-col>
                        <v-col cols="1"/>
                        <v-col cols="4" class="spinner-label">End</v-col>
                        <v-spacer/>
                    </v-row>
                </v-card-text>

                <v-row class="pt-4" height="auto" no-gutters>
                    <v-col align="center">
                        <v-btn class="apply-button" width="450" height="50" variant="text">CREATE</v-btn>
                    </v-col>
                </v-row>
        </v-card>
</v-dialog>
</template>

<style lang="scss" scoped>
    h4 {
        opacity: 50%;
    }

    .v-card {
        background-color: #efefef !important;
        border-radius: 7px !important;
    }

    .spinner-label {
        font-weight: bold;
        opacity: 50%;
        text-align: center;
    }

    .apply-button {
        border-top-right-radius: 0px !important;
        border-top-left-radius: 0px !important;
        background-color: #5cb978;
        color: white !important;
        font-size: large;
        font-weight: bold;
    }

    .v-divider {
        opacity: 100%;
    }
</style>

<script lang="ts" setup>
    import { ref, reactive, watch } from 'vue';
    import SquareCheckbox from './SquareCheckbox.vue';
    import Spinner from './Spinner.vue';

    const daysOfWeek = reactive<boolean[]>([true, true, true, true, true, false, false]);

    const start = ref<number | undefined>(0);
    const end = ref<number | undefined>(7);
</script>