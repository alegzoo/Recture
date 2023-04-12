<template>
    <v-dialog class="h-100 justify-center" width="1000" scroll-strategy="block">
        <v-card class="new-question-series-card">

            <v-sheet :height="55" :width="1000" class="v-sheet-header" no-gutters>
                <v-row no-gutters class="pt-2" align-self="center" align="start">
                    <v-col cols="4" align-self="center" class="pa-0" align="start">
                        <h2 class="header-title pl-5">Definičný obor</h2>
                    </v-col>
                    <v-col cols="4" align-self="center" align="center">
                        <v-chip class="subject-chip-header" size="large">MAT</v-chip>
                    </v-col>
                    <v-col cols="4" justify="center" align-self="center" align="end" class="pr-5">
                        <p class="text-h6 header-date">5.4.2023</p>
                    </v-col>
                </v-row>
            </v-sheet>

            
            <v-card-text no-gutters class="pa-0 pt-2">
                <v-row no-gutters class="pt-2">
                    <v-col cols="4" align-self="center" class="pa-0" align="start">
                        <h2 class="pl-5">NEW QUESTION SERIES</h2>
                    </v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col cols="12" class="px-5">
                        <v-text-field variant="underlined" single-line hide-details label="Title"></v-text-field>
                    </v-col>
                </v-row>

                <v-row no-gutters class="pt-7">
                    <v-col cols="12">
                        <v-sheet class="pt-2 v-divider-under-title" :thickness="2"/>
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
                                            <v-col cols="auto" class="pa-0 pl-2" align-self="center" align="center">
                                                <v-radio value="0" hide-details color="success"/>
                                            </v-col>

                                            <v-col cols="auto" class="pa-0 pr-3" align-self="center" align="center">
                                                <v-radio valie="1" hide-details />
                                            </v-col>

                                            <v-col class="pr-4" align-self="center" align="center">
                                                <v-textarea variant="outlined" label="First option" rows="1" row-height="5" auto-grow hide-details></v-textarea>
                                            </v-col>
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


            </v-card-text>

            <v-row no-gutters height="auto">
                <v-col align="center" align-self="end">
                    <v-btn class="create-new-q-series-btn" width="1100" height="50" variant="text">CREATE</v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>

</template>


<style lang="scss" scoped>
@import "@/styles/constants.scss";
@import "@/styles/mixins.scss";

.new-question-series-card{
    background-color: #efefef;
    border-radius: 6px;
}

.v-sheet-header{
    background-color: black;
}

.subject-chip-header{
    background-color: $recture-yellow;
    color: black;
}

.header-title{
    color: white;
}

.header-date{
    color: white;
}

.v-divider-under-title{
    border-top-style: dashed;
    border-top-width: 3px;
    border-top-color: black;
    background-color: transparent;
    opacity: 20%;
}

.v-col-question{
    background-color: white;
}


.v-sheet-question{
    background-color: white;
    border-radius: 6px;
    border-width: 2px;
    border-style: solid;
    border-color: black;
}

.v-sheet-question-2{
    background-color: white;
    border-radius: 6px !important;
}


.create-new-q-series-btn{
    background-color: #5cb978;
    color: white !important;
    font-size: large;
    font-weight: bold;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    }

.new-question-btn{
    @include elevated-button(3px, 3px, 1px);
    background-color: $recture-yellow;
    color: black;
    border-radius: 9999px;
    border-color: black;
    border-style: solid;
    border-width: 2px;
}

</style>
    
<script lang="ts" setup>


</script>