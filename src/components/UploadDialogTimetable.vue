<template>
    <v-dialog class="h-100 justify-center" width="1200" scroll-strategy="block">
        <v-card class="upload-timetable-card">
            <v-card-text class="pa-0 d-flex flex-column">
                <v-row class="flex-grow-0" no-gutters>
                    <v-col cols="6" class="pl-7 pt-3" align-self="center">
                        <h1>UPLOAD RECORDING</h1>
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
                    <v-col align="center" align-self="center" cols="auto" class="pl-7">
                        <v-icon class="info-icon h-100" icon="mdi-information"></v-icon>
                    </v-col>

                    <v-col align="center" align-self="center" cols="auto" class="pl-2">
                        <p class="headline-colors font-weight-bold">Select the recording's lesson to continue</p>
                    </v-col>
                </v-row>

                <v-row class="flex-grow-1" no-gutters>
                    <v-col class="pa-8">
                        <TimetableGrid :timetable="timetable" :init-on-mounted="true" class="h-100"/>
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

    .headline-colors, .info-icon::before {
        color: black;
        opacity: 35%;
    }
</style>

<script lang="ts" setup>
    import TimetableGrid from '@/components/TimetableGrid.vue';
    import { useTimetable } from '@/composables/useTimetable';

    const timetable = useTimetable("selecting");
</script>