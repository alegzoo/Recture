<template>
    <v-dialog class="h-100 justify-center" width="1200" scroll-strategy="block">
        <v-card class="upload-timetable-card">
            <v-card-text class="pa-0 d-flex flex-column">
                <v-row class="flex-grow-0" no-gutters>
                    <v-col cols="6" class="pl-7 pt-3" align-self="center">
                        <h1>YOUR TIMETABLE</h1>
                    </v-col>

                    <v-spacer/>

                    <v-col cols="auto" align-self="center" class="pt-3">
                        <v-btn variant="plain" :ripple="false" icon="mdi-chevron-left"></v-btn>
                    </v-col>

                    <v-col cols="auto" align-self="center" class="pt-3">
                        <h3>Week 8</h3>
                    </v-col>

                    <v-col cols="auto" align-self="center" class="pt-3 pr-4">
                        <v-btn variant="plain" :ripple="false" icon="mdi-chevron-right"></v-btn>
                    </v-col>

                </v-row>

                <v-row class="flex-grow-0 pt-1" no-gutters>
                    <v-col align-self="center" cols="auto" class="pl-7">
                        <v-icon class="info-icon" icon="mdi-information"></v-icon>
                    </v-col>

                    <v-col cols="auto" class="pl-2 headline-colors">
                        <p class="headline-colors font-weight-bold">Choose a lesson you want to upload</p>
                    </v-col>
                </v-row>

                <v-row class="flex-grow-1" no-gutters>
                    <v-col class="pa-8">
                        <TimetableGrid :standalone="true" class="h-100"/>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>


<style lang="scss" scoped>
    .upload-timetable-card {
        min-height: 60vh;
        background-color: #efefef;
    }

    .headline-colors {
        opacity: 50%;
    }

    .info-icon {
        opacity: 20%;
    }
</style>

<script lang="ts" setup>
    import { useDisplay } from 'vuetify/lib/framework.mjs';
    import TimetableGrid from '@/components/TimetableGrid.vue';
</script>