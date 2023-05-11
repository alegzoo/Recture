<template>
    <v-dialog :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)" class="h-100 justify-center" width="700" scroll-strategy="block">
        <v-card class="video-edit-card">
            <template v-slot:title>
                <v-row no-gutters>
                    <v-col class="pa-0">
                        <h2 class="pt-2">DEFINIČNÝ OBOR</h2>
                    </v-col>
                    <v-spacer/>
                    <v-col cols="auto">
                        <v-btn icon="mdi-trash-can-outline" variant="plain"/>
                    </v-col>
                </v-row>
                
            </template>
            <v-card-text no-gutters class="pa-0">


                <v-row no-gutters class="pt-4">
                    <v-col class="subtitles pl-6">
                        <h4>Subject and class</h4>
                    </v-col>
                </v-row>


                <v-row class="pl-2 pt-4" align="center" no-gutters>
                                
                    <v-col cols="1" class="pl-4">
                        <v-sheet class="v-sheet-subject pa-2 pl-4 " :width="90" :height="44"><p class="font-weight-bold">MAT</p></v-sheet>      
                    </v-col>
                    
                    <v-col cols="auto" class="pl-6">
                        <v-chip class="class-chip-comment px-6" size="x-large" variant="text">I.C</v-chip>
                    </v-col>

                    <v-col class="pl-3">
                        <v-btn variant="plain" icon="mdi-lead-pencil"></v-btn>
                    </v-col>

                </v-row>

                <v-row no-gutters class="pt-8">
                    <v-col class="subtitles pl-6">
                        <h4>Date</h4>
                    </v-col>
                </v-row>

                <v-row no-gutters class="pt-3">
                    <v-col class="pl-6">
                        <h2>28.2.2023</h2>
                    </v-col>
                </v-row>

                <v-row no-gutters class="pt-8">
                    <v-col class="subtitles pl-6">
                        <h4>Thematic unit *</h4>
                    </v-col>
                </v-row>

                <v-row>

                    <v-row align="center" class="px-1 pl-3" no-gutters>
                        <v-col cols="5" class="pl-6">
                            <v-combobox
                                hide-details
                                no-gutters
                                class="choose-selectors-video-view-edit"
                                label="Choose thematic unit"
                                :items="['Definičný obor', 'Obor hodnôt', 'Vlastnosti funkcií', 'Lineárna funkcia', 'Kvadratické funkcie','Goniometrické funkcie','Inverzné funkcie', 'Priesečnik grafov lineárnych funkcií',]"
                                variant="solo"
                                density="compact"
                                single-line
                            ></v-combobox>
                        </v-col>

                        <v-col class="pl-12" cols="2">
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
                    <v-row align="center" class=" px-1 pt-6 pl-3" no-gutters>
                        <v-col cols="5" class=" pa-0 pl-6">
                            <v-combobox
                                hide-details
                                no-gutters
                                class="choose-selectors-video-view-edit"
                                label="Choose quiz"
                                :items="['Definičný obor - preskúšanie 1']"
                                variant="solo"
                                density="compact"
                                single-line
                            ></v-combobox>
                        </v-col>

                        <v-col class="pl-12" cols="2">
                            <h2>or</h2>
                        </v-col>

                        <v-col align="start" class="pa-0" cols="5">
                            <v-btn :ripple="false" class="px-10 new-quiz-btn" variant="text" @click="newQuizDialogVisible = true">NEW QUIZ</v-btn>
                        </v-col>
                    </v-row>
                </v-row>
                


                <v-row no-gutters class="pt-12 pr-8">
                    <v-col class="pl-4">
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
                    <v-col class="subtitles pl-6">
                        <h4>Comments *</h4>
                    </v-col>
                </v-row>

                <v-row no-gutters class="pt-3">
                    <v-col class="pl-4">
                        <v-radio-group inline>
                            <v-radio label="Allow" value="1"></v-radio>
                            <v-radio class="pl-8" label="Deny" value="2"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>

                <v-row no-gutters class="pt-1" align-content="center">
                    <v-col class="subtitles pl-7" cols="auto" align-self="center">
                        <h4>Visibility *</h4>
                    </v-col>
                </v-row>
                <v-row no-gutters class="pt-2">
                    <v-col class="pl-4">
                        <v-radio-group inline>
                            <v-radio label="Public" value="1"></v-radio>
                            <v-radio class="pl-8" label="Private" value="2"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>

            </v-card-text>

            <v-row no-gutters height="auto">
                <v-col align="center" align-self="end">
                    <v-btn class="save-btn-upload" width="700" height="50" variant="text">SAVE</v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
    <NewQuizDialog v-model="newQuizDialogVisible"/>

</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";
    @import "@/styles/mixins.scss";

    .video-edit-card {
        background-color: #efefef;
    }

    .subtitles {
        color: black;
        opacity: 50%;
    }

    .v-sheet-subject {
            background-color: $recture-yellow !important;
            border-radius: 3px 0 0 3px !important;
            border-color: black;
            border-style: solid;
            border-width: 2px;
            box-shadow: 4px 4px 0px 0px black;
        }

    .class-chip-comment {
        background-color: #e24a42;
        color: white;
        box-shadow: 4px 4px 0px 0px black;
    }

    .save-btn-upload {
            background-color: #00A6E2;
            color: white !important;
            font-size: large;
            font-weight: bold;
            border-top-left-radius: 0px;
            border-top-right-radius: 0px;
        }

        .upload-card {
            background-color: #efefef;
            border-radius: 6px;
        }

        .choose-selectors-video-view-edit {
        border: solid 2px black !important;
        border-radius: 0px !important;
        box-shadow: 2px 2px 0px 0px black !important;
        background-color: white !important;
        font-weight: bold;
        color: black !important;
        text-transform: uppercase !important;
        }

    .new-quiz-btn {
        @include elevated-button(4px, 4px, 2px);
        background-color: $recture-yellow;
        color: black;
        border: 2px black solid;
        border-radius: 0px;
    }
</style>

<script lang="ts" setup>
    import NewQuizDialog from './NewQuizDialog.vue';
    import { ref } from 'vue';

    const props = defineProps<{
        modelValue?: boolean
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void
    }>();
    
    const newQuizDialogVisible = ref<boolean>(false);
</script>