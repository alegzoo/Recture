<template>
    <v-dialog activator="parent" class="h-100 justify-center" width="1100" scroll-strategy="block" no-gutters>
        <template v-slot:activator>
            <v-btn icon="mdi-checkbox" theme="light"/>
        </template>
        <v-card class="upload-card" no-gutters>
            <v-card-text no-gutters class="pa-0 pl-2">
                <v-row no-gutters class="pl-3">
                    <v-col cols="7" class="left-col-upload">
                            <v-row no-gutters>
                                <v-col cols="auto">
                                    <h1 class="pt-3">UPLOAD</h1>
                                </v-col>
                            </v-row>

                            <v-row no-gutters class="pt-4">
                                <v-col class="subtitles pl-1">
                                    <h4>Subject and class</h4>
                                </v-col>
                            </v-row>

                            <v-row class="pl-1 pt-4" align="center" no-gutters>
                                
                                <v-col cols="1">
                                    <v-sheet class="v-sheet-subject pa-2 pl-4 " :width="90" :height="44"><p class="font-weight-bold">MAT</p></v-sheet>      
                                </v-col>
                                
                                <v-col class="pl-4">
                                    
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

                            <v-row no-gutters class="pt-5">
                                <v-col class="subtitles pl-1">
                                    <h4>Thematic unit *</h4>
                                </v-col>
                            </v-row>

                            <v-row>

                                <v-row align="center" class="px-1 pl-4" no-gutters>
                                    <v-col cols="5">
                                        <v-menu>
                                            <template v-slot:activator="{ props }">
                                                <v-btn
                                                :ripple=false
                                                variant="flat"
                                                append-icon="mdi-chevron-down"
                                                v-bind="props"
                                                class="choose-thematic-unit"
                                                >
                                                Choose thematic unit
                                                </v-btn>
                                            </template>
                                            <v-list>
                                                <v-list-item
                                                        v-for="(item, index) in items"
                                                        :key="index"
                                                    >
                                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </v-col>

                                    <v-col class="pl-10" cols="2">
                                        <h2>or</h2>
                                    </v-col>

                                    <v-col cols="5" class="pr-10">
                                        <v-text-field
                                        label="Create new thematic unit"
                                        variant="underlined"
                                        single-line
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                            </v-row>

                            <v-row>
                                <v-col cols="12" class="pl-5 pr-11">
                                    <v-text-field variant="underlined" single-line label="Title of the lesson *"></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row no-gutters class="pt-3 pr-8">
                                <v-col>
                                    <v-textarea
                                    class="pl-2 text-area-description"
                                    label="Description of the lesson (optional)"
                                    :ripple="false"
                                    :active="false"
                                    auto-grow
                                    variant="outlined"
                                    rows="3"
                                    row-height="15"
                                    >
                                    </v-textarea>
                                </v-col>
                            </v-row>

                            <v-row no-gutters class="pt-3">
                                <v-col class="subtitles pl-2">
                                    <h4>Comments *</h4>
                                </v-col>
                            </v-row>

                            <v-row no-gutters class="pt-3">
                                <v-col>
                                    <v-radio-group inline>
                                        <v-radio label="Allow" value="1"></v-radio>
                                        <v-radio class="pl-8" label="Deny" value="2"></v-radio>
                                    </v-radio-group>
                                </v-col>
                            </v-row>

                            <v-row no-gutters class="pt-1" align-content="center">
                                <v-col class="subtitles pl-3" cols="auto" align-self="center">
                                    <h4>Visibility *</h4>
                                </v-col>
                                <v-col cols="auto" class="pl-3" align-self="center">
                                    <h5 class="subtitles">(For saving as a concept, leave Visibility on "Private" and get back to it later)</h5>
                                </v-col>
                            </v-row>
                            <v-row no-gutters class="pt-2">
                                <v-col>
                                    <v-radio-group inline>
                                        <v-radio label="Public" value="1"></v-radio>
                                        <v-radio class="pl-8" label="Private" value="2"></v-radio>
                                    </v-radio-group>
                                </v-col>
                            </v-row>
                    </v-col>


                    <v-col cols="5" class="right-col-upload">
                        <v-row align="center" class="h-100" align-self="center" justify="center">

                            <v-card :height="300" :width="360" class="v-sheet-lesson-preview">
                                <v-sheet :height="180" class="w-100" no-gutters>
                                    <v-row class="h-100 pa-2 v-row-top-upload" no-gutters align="center">
                                        <v-col class="h-100 v-col-outline">

                                            <v-row no-gutters align-self="center">

                                                <v-col cols="12" align="center" class="pt-3">
                                                        <v-icon class="upload-icon" icon="mdi-upload"></v-icon>
                                                </v-col>
                                                
                                                <v-col cols="12" align="center">
                                                        <p class="font-weight-medium">Drop a file or choose a file</p>
                                                </v-col>

                                                <v-col cols="12" align="center" class="pt-2">
                                                    <v-btn class="choose-a-file-btn" variant="text">CHOOSE A FILE</v-btn>
                                                </v-col>
                                            </v-row>
                                            
                                        </v-col>
                                    </v-row>
                                </v-sheet>

                                <v-sheet :height="120" class="w-100" no-gutters>
                                    <v-row class="h-100" no-gutters>

                                        <v-col cols="12" class="pl-3 pt-2">
                                            <h2 class="lesson-headline">Title of the lesson</h2>
                                            <p class="font-weight-regular pt-1">28.2.2023</p>
                                            <p class="font-weight-bold pt-1">I.C</p>
                                        </v-col>

                                    </v-row>                                
                                </v-sheet>

                            
                            </v-card>
                                                       
                        </v-row>
                    </v-col>

            </v-row>
        </v-card-text>


            <v-row no-gutters height="auto">
                <v-col align="center" align-self="end">
                    <v-btn class="save-btn-upload" width="1100" height="50" variant="text">CREATE</v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>

</template>

<style lang="scss">

</style>


<script lang="ts" setup>
    import { ref } from 'vue';
    import "@/styles/main.scss";

    const dialog = ref(false);
    const items = ref([
        { title: 'FUNKCIE' },
        { title: 'LOGARITMY' },
        { title: 'ROVNICE' },
        { title: 'POSTUPNOSTI' }
    ]);
    const items2 = ref([
        { title: 'MAT' },
        { title: 'INF' },
    ]);
</script>