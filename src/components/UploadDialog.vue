<template>
    <v-dialog activator="parent" class="h-100 justify-center" width="900" scroll-strategy="block" no-gutters>
        <template v-slot:activator>
            <v-btn icon="mdi-checkbox" theme="light"/>
        </template>
        <v-card class="upload-card">
            <template v-slot:title>
                <h2 class="pt-3 pl-1">UPLOAD</h2>
            </template>
            <v-card-text no-gutters>
                <v-row no-gutters align-content="center">
                        <v-col cols="7" class="left-col-upload">

                            <v-row no-gutters class="pt-4">
                                <v-col class="subtitles pl-1">
                                    <h4>Subject and class</h4>
                                </v-col>
                            </v-row>

                            <v-row class="pl-1 pt-4" align="center" no-gutters>
                                
                                <v-col cols="1">
                                    <v-sheet class="v-sheet-subject pa-2 pl-4 " :width="85" :height="44"><p class="font-weight-bold">MAT</p></v-sheet>      
                                </v-col>
                                
                                <v-col class="pl-5">
                                    
                                    <v-chip class="class-chip-comment px-6" size="x-large" variant="text">I.C</v-chip>
                                </v-col>

                            </v-row>

                            <v-row no-gutters class="pt-10">
                                <v-col class="subtitles pl-1">
                                    <h4>Date</h4>
                                </v-col>
                            </v-row>

                            <v-row no-gutters class="pt-3">
                                <v-col class="pl-1">
                                    <h2>28.2.2023</h2>
                                </v-col>
                            </v-row>

                        </v-col>

                        <v-col cols="5">
                            <v-card-text class="right-col-upload" no-gutters fluid>

                            </v-card-text>
                        </v-col>
                    
                </v-row>
            </v-card-text>


            <v-row no-gutters class="pt-4" height="auto">
                    <v-col align="center">
                        <v-btn class="save-btn-upload" width="900" height="50" variant="text">CREATE</v-btn>
                    </v-col>
            </v-row>
        </v-card>




    </v-dialog>
</template>

<style lang="scss">

</style>


<script lang="ts" setup>

</script>