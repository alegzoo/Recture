<template>
    <v-card :to="'videos/'+recording.recordingId" variant="outlined" class="video-box d-flex flex-column h-100">
        <v-img :src="recording.thumbnail" :aspect-ratio="16/9" class="video-box-thumbnail flex-grow-0" cover/>
        <v-container class="video-box-info-area pa-0 flex-grow-1">
            <v-row class="h-100">
                <v-col>
                    <v-container>
                        <v-row>
                            <v-col cols="12" class="video-box-title py-0 pt-1" :title="recording.title">{{ recording.title }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="py-0">{{ date }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="py-0 pb-2">{{ recording.className }}</v-col>
                        </v-row>
                    </v-container>
                </v-col>
                <v-col v-show="props.recording.quizId != null" cols="auto" align="center" align-self="center" class="px-7">
                    <v-icon icon="mdi-help-box-multiple-outline" title="This recording contains a quiz." size="48"/>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>
  
<script lang="ts" setup>
    import { computed } from 'vue';
    import { IRecording } from '@/api/RectureApi';

    const props = defineProps<{
        recording: IRecording
    }>();

    const date = computed(() => new Date(props.recording.recordingTimestamp).toLocaleDateString());
</script>
  
<style>
  
</style>