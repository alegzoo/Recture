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

                    <v-row no-gutters class="pt-3">
                        <v-col class="days-headline pl-1">
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

<style lang="scss" scoped>
    .v-divider {
        opacity: 100%;
    }
</style>

<script lang="ts" setup>
    import { ref, reactive, watch } from 'vue';
    import SquareCheckbox from './SquareCheckbox.vue';

    const daysOfWeek = reactive<boolean[]>([true, true, true, true, true, false, false]);
    const start = ref<number | undefined>(undefined);

    watch(start, () => {
        console.log(start);
    });
</script>