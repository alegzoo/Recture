<template>
    <v-card :to="'videos/'+recording.recordingId" variant="outlined" class="video-box">
        <v-img :src="recording.thumbnail" :aspect-ratio="16/9" class="video-box-thumbnail" cover/>
        <v-container class="video-box-info-area pa-0">
            <v-row class="h-100">
                <v-col cols="8">
                    <v-container>
                        <v-row>
                            <v-col cols="12" class="video-box-title py-0 pt-1">{{ recording.title }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="py-0">{{ date }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="py-0 pb-2">{{ recording.className }}</v-col>
                        </v-row>
                    </v-container>
                </v-col>
                <v-col>
                    
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

    const date = computed(() => new Date(props.recording.recordingTimestamp*1000).toLocaleDateString());
</script>
  
<style>
  
</style>