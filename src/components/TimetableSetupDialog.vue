<template>
    <v-dialog activator="parent" class="h-100 justify-center" width="450" scroll-strategy="block">
        <template v-slot:activator>
                    <v-btn icon="" theme="light"/>
        </template>
        <v-card class="setup-timetable-card">
                <template v-slot:title>
                    <h2 class="pt-3 pl-1">TIMETABLE SET UP</h2>
                </template>
                
                <v-card-text>
                    <v-row no-gutters class="pt-3 pb-3">
                        <v-col cols="10" class="days-headline pl-1">
                            <h4>Select days in a week in which you teach</h4>
                        </v-col>
                    </v-row>

                    <v-row no-gutters fluid>
                        <v-col cols="6">
                            <v-checkbox class="checkbox" :ripple="false" label="Monday"></v-checkbox>
                        </v-col>

                        <v-divider vertical :thickness="2"></v-divider>

                        <v-col cols="4" class="pl-7">
                            <v-checkbox :ripple="false" label="Saturday"></v-checkbox>
                        </v-col>

                    </v-row>


                    <v-row no-gutters class="pt-3">
                        <v-col cols="10" class="days-headline pl-1">
                            <h4>Number of lessons in a day at your school</h4>
                        </v-col>
                    </v-row>

                </v-card-text>

                <v-row class="pt-4" height="auto" no-gutters>
                    <v-col align="center">
                        <v-btn class="set-up-timetable" width="450" height="50" variant="text">APPLY</v-btn>
                    </v-col>
                </v-row>
        </v-card>
</v-dialog>
</template>


<script lang="ts" setup>

</script>