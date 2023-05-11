<template>
    <v-dialog class="h-100 justify-center" width="1000" scroll-strategy="block">
        <v-card>
            <template v-slot:title>
                <v-row no-gutters>
                    <v-col class="pa-0">
                        <h2 class="pt-3">NEW QUIZ</h2>
                    </v-col>
                </v-row>
                
            </template>

            <v-card-text no-gutters class="pa-0 pt-4">

                <v-row no-gutters>
                    <v-col class="pl-6">
                        <h4 class="subtitles">Lessons chosen</h4>
                    </v-col>
                </v-row>

                <v-row no-gutters class="pl-6 pt-2" align-self="center" align="center">
                    <v-col  cols="auto" class="pa-0">
                        <v-icon class="info-icon" icon="mdi-information" ></v-icon>
                    </v-col>

                    <v-col cols="auto" class="pa-0 pl-1">
                        <h5 class="subtitles">You can add this quiz to other recordings too just by clicking Edit in the right corner of its page</h5>
                    </v-col>
                </v-row>


                <v-row no-gutters class="pt-2 pb-3">
                    <v-col cols="2" class="pa-0 pl-6" align="start" align-self="center">
                        <v-sheet no-gutters class="v-sheet-lesson-name pl-5 pt-2" :height="40" :width="170"><p class="font-weight-bold">Definičný obor</p></v-sheet>
                    </v-col>

                    <v-col cols="1" class="pa-0" align="start" align-self="center">
                        <v-sheet class="v-sheet-subject pl-7 pt-2" :height="40" :width="120"><p class="font-weight-bold">MAT</p></v-sheet>
                    </v-col>

                    <v-col cols="1" class="pa-0" align="start" align-self="center">
                        <v-sheet no-gutters class="v-sheet-class pl-9 pt-2" :height="40" :width="120"><p class="font-weight-bold">I.C</p></v-sheet>
                    </v-col>

                    <v-col cols="1" class="pa-0" align="center" align-self="center">
                        <v-sheet no-gutters class="v-sheet-thematic-unit pt-2" :height="40" :width="120"><p class="font-weight-bold">FUNKCIE</p></v-sheet>
                    </v-col>

                    <v-col cols="1" class="pa-0 pl-10" align="center" align-self="center">
                        <v-btn icon="mdi-close" :ripple="false" variant="plain"></v-btn>
                    </v-col>
                </v-row>

            <v-container no-gutters class="h-100 questions-making-section">

                    <v-row no-gutters>
                        <v-col cols="12" class="pa-0 pl-2 pr-5">
                            <v-text-field class="title-field" variant="underlined" label="Title of your quiz..." single-line hide-details></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row no-gutters class="pt-7 pb-5">
                        <v-row no-gutters>
                            <v-col cols="1">
                                <v-row no-gutters>
                                    <v-col class="pa-0" align="center">
                                        <h2>1.</h2>
                                    </v-col>
                                </v-row>
                            </v-col>

                            <v-col cols="11" class="pr-5">
                                <v-sheet class="v-sheet-question">
                                    <v-col class="pa-0">
                                        <v-sheet class="v-sheet-question-2">
                                            

                                            <v-row no-gutters>
                                            <v-col cols="12" class="pa-0 pt-4 px-4">
                                                    <v-textarea variant="outlined" rows="1" label="Your question" row-height="5" auto-grow hide-details></v-textarea>
                                                </v-col>  
                                            </v-row>
                                        
                                            <v-row no-gutters class="pt-4">
                                                <v-col cols="auto" class="pl-6 pr-3" align-self="center" align="center">
                                                    <v-radio value="0" hide-details color="success"/>
                                                </v-col>

                                                <v-col class="pr-0" align-self="center" align="center">
                                                    <v-textarea variant="outlined" label="First option" rows="1" row-height="5" auto-grow hide-details></v-textarea>
                                                </v-col>

                                                <v-col cols="auto" class="pa-0 px-2" disabled align-self="center" align="center">
                                                    <v-btn :disabled="true" icon="mdi-close" variant="plain"/>
                                                </v-col>
                                            </v-row>

                                            <v-row no-gutters class="pt-4">
                                                <NewOptionQuiz/>
                                            </v-row>

                                            <v-row no-gutters class="pl-1 pt-1 pb-1">
                                                <v-col class="pa-0">
                                                    <v-btn variant="flat" :ripple="false" icon="mdi-plus"/>
                                                </v-col>
                                            </v-row>  
                                        </v-sheet>
                                    </v-col>
                                </v-sheet>
                            </v-col>


                        </v-row>
                    </v-row>

                <v-row no-gutters>
                    <v-col class="pa-0 pt-8 pl-4 pb-4">
                        <v-btn icon="mdi-plus" :ripple="false" class="new-question-btn" variant="flat"></v-btn>
                    </v-col>
                </v-row>

            </v-container>


            </v-card-text>

            <v-row no-gutters height="auto">
                <v-col align="center" align-self="end">
                    <v-btn class="create-new-quiz-btn" width="1100" height="50" variant="text">CREATE</v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>

</template>


<style lang="scss" scoped>
    @import "@/styles/constants.scss";
    @import "@/styles/mixins.scss";
    @import "@/styles/lesson-colors.scss";

    .v-card {
        background-color: #efefef;
        border-radius: 6px;
    }

    .v-sheet-header {
        background-color: black;
    }

    .subject-chip-header {
        background-color: $recture-yellow;
        color: black;
    }

    .header-title {
        color: white;
    }

    .header-date {
        color: white;
    }

    .v-divider-under-title {
        border-top-style: dashed;
        border-top-width: 3px;
        border-top-color: black;
        background-color: transparent;
        opacity: 20%;
    }

    .v-col-question {
        background-color: white;
    }


    .v-sheet-question {
        background-color: white;
        border-radius: 6px;
        border-width: 2px;
        border-style: solid;
        border-color: black;
    }


    .v-sheet-question:hover {
        box-shadow: 4px 4px 0px 0px black;
    }

    .v-sheet-question-2 {
        background-color: white;
        border-radius: 6px !important;
    }


    .create-new-quiz-btn {
        background-color: #5cb978;
        color: white !important;
        font-size: large;
        font-weight: bold;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        }

    .new-question-btn {
        @include elevated-button(3px, 3px, 1px);
        background-color: $recture-yellow;
        color: black;
        border-radius: 9999px;
        border-color: black;
        border-style: solid;
        border-width: 2px;
    }

    .subtitles {
        color: black;
        opacity: 50%;
    }

    .v-sheet-lesson-name {
        border-top-left-radius: 9999px;
        border-bottom-left-radius: 9999px;
        background-color: black;
        color: white;
    }

    .v-sheet-subject {
        border-top-left-radius: 9999px;
        border-bottom-left-radius: 9999px;
        background-color: $recture-yellow;
        color: black;
        border: black 2px solid;
    }

    .v-sheet-class {
        background-color: #e24a42;
        border: black 2px solid;
        border-top-left-radius: 9999px;
        border-bottom-left-radius: 9999px;
        color: white;
    }

    .info-icon {
        color: black;
        opacity: 50%;
        font-size: large;
    }

    .v-sheet-thematic-unit {
        background-color: white;
        color: black;
        border: black 2px solid;
        border-radius: 9999px;
    }

    .questions-making-section {
        background-color: #afafaf;
    }

    .title-field * {
        font-size: 20px;
    }
</style>
    
<script lang="ts" setup>
    import NewOptionQuiz from '@/components/NewOptionQuiz.vue';
</script>