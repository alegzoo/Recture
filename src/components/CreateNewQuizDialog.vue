<template>
    <v-dialog width="500">
            <v-card class="v-card-create-new-quiz">
                <v-card-title>
                    <v-row no-gutters align="center" align-self="center" class="pt-3">
                        <v-col>
                            <h2 class="pl-3">CREATE NEW QUIZ</h2>
                        </v-col>
                    </v-row>         
                </v-card-title>      
                <v-card-text>
                    <v-row>
                        <v-col class="pa-0 px-4">
                            <v-text-field label="Title of your new quiz" variant="underlined" single-line></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="pa-0 px-1 pt-4" no-gutters>
                        <v-combobox
                            hide-details
                            label="Choose subject"
                            :items="['MAT', 'INF']"
                            variant="solo"
                            density="compact"
                            single-line
                            >
                        </v-combobox>
                    </v-row>


                </v-card-text>
                    <v-row no-gutters height="auto" class="pt-4">
                        <v-col align="center" align-self="end">
                            <v-btn class="create-new-quiz-btn" width="500" height="50" variant="text">CREATE</v-btn>
                        </v-col>
                    </v-row>
            </v-card>
    </v-dialog>
</template>

<style lang="scss" scoped>
.v-card-create-new-quiz{
    background-color: #efefef;
}
    .create-new-quiz-btn {
        background-color: #5cb978;
        color: white !important;
        font-size: large;
        font-weight: bold;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        }
</style>

<script lang="ts" setup>

</script>