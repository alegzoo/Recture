<template>
    <v-container class="h-100" fluid no gutters>
        <v-row class="pl-6 mt-1 pr-3">
            <v-col cols="auto" align-self="start">
                <p id="your-timetable-text" class="text-h4 font-weight-medium">Your timetable</p>
            </v-col>

            <v-spacer></v-spacer>

            <v-col cols="auto" align-self="center">
                <v-btn id="timetable-edit-button" :ripple="false" variant="text" icon="mdi-lead-pencil"/>
            </v-col>
        </v-row>

        <v-row class="pl-6 mt-0">
            <v-col cols="auto" align-self="start">
                <v-icon icon="mdi-information"/>
            </v-col>    
            <v-col cols="auto" class="pl-0" align-self="start">
                <p class="text-h10 font-weight-medium">For adding a new class, click on an empty place in your timetable</p>
            </v-col>
        </v-row>

        <v-row class="mx-16">
            <v-col>
                <v-sheet
                    id="v-sheet-edit"
                    height="600"
                    rounded
                />
            </v-col>
        </v-row>

        <v-row class="pr-16" id="v-row-edit-btns">
            <v-spacer></v-spacer>
            <v-col cols="auto" align-self="start">
                <v-btn variant="text" class="plus-btn" :ripple="false" append-icon="mdi-plus-circle">
                    NEW THEMATIC UNIT
                </v-btn>
            </v-col>

            <v-col cols="auto" align-self="start">
                <v-btn variant="text" class="plus-btn" :ripple="false" append-icon="mdi-plus-circle">
                    NEW QUESTION SERIES
                </v-btn>
            </v-col>
        </v-row>

    </v-container>


</template>

<style>

</style>

<script lang="ts" setup>
    import "@/styles/timetable.scss";
</script>