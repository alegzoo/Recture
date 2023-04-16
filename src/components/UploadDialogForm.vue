<template>
    <v-card class="upload-card" no-gutters>
        <v-card-text no-gutters class="pa-0">
            <v-row no-gutters class="pa-0">
                <v-col cols="7" class="left-col-upload pl-5">
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
                        <v-col cols="auto" class="pr-0">
                            <v-row class="subject-sheet pa-0">
                                <v-col cols="auto" align="center" align-self="center" class="py-2">{{ subjectName }}</v-col>
                                <v-col cols="auto" align="center" align-self="center" class="class-sheet px-5 py-2">{{ className }}</v-col>
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
                            <h4>Thematic unit *</h4>
                        </v-col>
                    </v-row>

                    <v-row>

                        <v-row align="center" class="px-1 pl-4" no-gutters>
                            <v-col cols="5">
                                <v-select
                                    hide-details
                                    no-gutters
                                    class="choose-selectors"
                                    label="Choose a thematic unit"
                                    :items="topics"
                                    item-title="name"
                                    variant="solo"
                                    density="compact"
                                    single-line
                                ></v-select>
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
            <v-row no-gutters height="auto">
                <v-col align="center" align-self="end">
                    <v-btn class="save-btn-upload w-100" height="50" variant="text">CREATE</v-btn>
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

    .upload-card {
        background-color: #efefef;
        border-radius: 6px;
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

    .class-sheet, .subject-sheet {
        font-weight: bold;
    }

    .subject-sheet {
        border: solid 2px black;
        box-shadow: 4px 4px 0px 0px black;
        background-color: $recture-yellow !important;
        border-radius: 3px 9999px 9999px 3px !important;
        color: black;
    }

    .class-sheet {
        background-color: #e24a42;
        border-style: solid;
        border-width: 0px 0px 0px 2px;
        border-color: black;
        border-radius: 9999px !important;
        color: white;
    }

    .subtitles {
        color: black;
        opacity: 50%;
    }

    .info-icon {
        opacity: 50%;
    }

    .v-sheet-lesson-preview {
        color: white;
        border-radius: 20px !important;
        border-style: solid;
        border-width: 3px;
        border-color: black;
        box-shadow: 4px 4px 0px 0px black;
    }

    .v-col-outline{
        border-color: black;
        border-style: dashed;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-width: 2px;
    }

    .upload-icon{
        font-size: 70px;
    }

    .choose-a-file-btn{
        background-color: #00A6E2 !important;
        border-color: black !important;
        border-width: 2px !important;
        border-style: solid !important;
        font-weight: bold;
    }

    .v-row-top-upload{
        border-bottom-color: black !important;
        border-bottom-width: 2px !important;
        border-bottom-style: solid !important;
    }

    .lesson-headline{
        opacity: 50% !important;
    }
</style>


<script lang="ts" setup>
    import { ref, computed } from 'vue';

    import "@/styles/main.scss";
    import { ILesson, ITopic, RectureApi } from '@/api/RectureApi';

    const props = defineProps<{
        lesson: ILesson,
        date: Date
    }>();

    const className = computed<string>(() => props.lesson.className);
    const subjectName = computed<string>(() => props.lesson.subjectName);
    const dateString = computed<string>(() => props.date.toLocaleDateString(undefined, {year: "numeric", month: "numeric", day: "numeric"}).toLocaleUpperCase());

    const topics = ref<ITopic[]>([]);

    RectureApi.getTopics(props.lesson.classId, props.lesson.subjectId).then(result => {
        if (result.success && result.data != null) topics.value = result.data;
        //TODO: Maybe show error on unsuccessful result/exception
    });

</script>