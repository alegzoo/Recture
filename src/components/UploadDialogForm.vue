<template>
    <v-card no-gutters>
        <v-card-text no-gutters class="pa-0">
            <v-row no-gutters class="pa-0">
                <v-col cols="7" class="left-col-upload pl-5">
                    <v-row no-gutters>
                        <v-col cols="auto">
                            <h1 class="pt-3 pl-1">UPLOAD RECORDING</h1>
                        </v-col>
                    </v-row>

                    <v-row no-gutters class="pt-4">
                        <v-col class="subtitles pl-1">
                            <h4>Subject and class</h4>
                        </v-col>
                    </v-row>

                    <v-row class="pl-4 pt-5" align="center" no-gutters>
                        <v-col cols="auto" class="pr-0">
                            <v-row class="subject-class-row pa-0">
                                <v-col cols="auto" align="center" align-self="center" class="py-2">{{ subjectName }}</v-col>
                                <v-col cols="auto" align="center" align-self="center" class="class-label px-5 py-2">{{ className }}</v-col>                                
                            </v-row>      
                        </v-col>
                    </v-row>

                    <v-row no-gutters class="pt-10">
                        <v-col class="subtitles pl-1">
                            <h4>Date</h4>
                        </v-col>
                    </v-row>

                    <v-row no-gutters class="pt-3">
                        <v-col class="pl-1">
                            <h2>{{ dateString }}</h2>
                        </v-col>
                    </v-row>

                    <v-row no-gutters class="pt-5">
                        <v-col class="subtitles pl-1">
                            <h4>Thematic unit</h4>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" class="py-0 pl-5 pr-11">
                            <SelectOrCreateInput v-model="selectedTopic" select-label="Choose a thematic unit" field-label="Enter name of thematic unit to create" :items="topics" item-title="name"/>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" class="pl-5 pr-11">
                            <v-text-field v-model="title" variant="underlined" single-line label="Title of the lesson"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row no-gutters class="pt-3 pr-8">
                        <v-col>
                            <v-textarea
                                v-model="description"
                                class="pl-2 text-area-description"
                                label="Description of the lesson (optional)"
                                :ripple="false"
                                :active="false"
                                auto-grow
                                variant="outlined"
                                rows="3"
                                row-height="15"
                            />
                        </v-col>
                    </v-row>

                    <v-row no-gutters class="pt-3">
                        <v-col class="subtitles pl-2">
                            <h4>Comments</h4>
                        </v-col>
                    </v-row>

                    <v-row no-gutters class="pt-3">
                        <v-col>
                            <v-radio-group v-model="commentsAllowed" hide-details inline>
                                <v-radio label="Allow" :value="true"></v-radio>
                                <v-radio class="pl-8" label="Deny" :value="false"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>

                    <v-row no-gutters class="pt-5" align-content="center">
                        <v-col class="subtitles pl-3" cols="auto" align-self="center">
                            <h4>Visibility *</h4>
                        </v-col>
                    </v-row>
                    
                    <v-row no-gutters class="pt-3">
                        <v-col>
                            <v-radio-group v-model="published" hide-details inline>
                                <v-radio label="Public" :value="true"></v-radio>
                                <v-radio class="pl-8" label="Private" :value="false"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>

                    <v-row no-gutters class="py-5">
                        <v-col class="pl-3" align-self="center">
                            <h5 class="subtitles">* To save the recording as a concept, set visibility to "Private" and get back to it later.</h5>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col cols="5" class="right-col-upload">
                    <v-row align="center" class="h-100" align-self="center" justify="center">
                        <UploadPreviewCard :title="title" :lesson="lesson" :date-string="dateString" @file-select="uploadForm.setFile"/>
                    </v-row>
                </v-col>
            </v-row>
            <v-row no-gutters height="auto">
                <v-col align="center" align-self="end">
                    <v-btn class="save-btn-upload w-100" height="50" variant="text">UPLOAD</v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>

</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";

    .save-btn-upload {
        background-color: $recture-bright-blue;
        color: white !important;
        font-size: large;
        font-weight: bold;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
    }

    .left-col-upload {
        //background-image: url("@/assets/bckg-upload-dialog.png");
        background-color: #efefef;;
        background-size: cover  !important;
        //overflow: visible !important;
        //background-clip: content-box !important;
    }

    .right-col-upload {
        background-color: #C8C7C7 !important;
    }

    .subject-class-row, .class-label {
        font-weight: bold;
    }

    .subject-class-row {
        box-shadow: 4px 4px 0px 0px black;
        background-color: $recture-yellow;
        border-radius: 2500px 9999px 9999px 2500px; //TODO: What the fuck?!
        color: black;
        border: solid 2px black;
        overflow: hidden;
    }

    .class-label {
        background-color: #e24a42;
        border-radius: 9999px;
        color: white;
        box-shadow: 0px 0px 0px 2px black;
    }

    .subtitles {
        color: black;
        opacity: 50%;
    }

    .info-icon {
        opacity: 50%;
    }

    .choose-selectors-upload {
        border: solid 2px black !important;
        border-radius: 0px !important;
        box-shadow: 2px 2px 0px 0px black !important;
        background-color: white !important;
        font-weight: bold;
        color: black !important;
        text-transform: uppercase !important;
    }
</style>


<script lang="ts" setup>
    import { ILesson } from '@/api/RectureApi';
    import { useUploadForm } from '@/composables/useUploadForm';
    import UploadPreviewCard from './UploadPreviewCard.vue';
    import SelectOrCreateInput from './SelectOrCreateInput.vue';

    import "@/styles/main.scss";

    const props = defineProps<{
        lesson: ILesson,
        date: Date
    }>();

    const uploadForm = useUploadForm(props.lesson, props.date);
    uploadForm.fetchTopics();

    const { title, description, selectedTopic, commentsAllowed, published, file, className, subjectName, dateString, topics } = uploadForm;

</script>