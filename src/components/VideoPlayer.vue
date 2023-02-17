<template>
    <v-responsive :aspect-ratio="16/9" style="background-color: black;">
        <video autoplay controls style="width: 100%; height: 100%;">
            <source v-if="recording != null" v-for="source in recording.sources" :src="source.sourceUrl" :type="source.mimeType"/>
        </video>
    </v-responsive>
</template>
  
<script lang="ts" setup>
    import { IRecording } from '@/api/RectureApi';

    const props = defineProps<{
        recording: IRecording | null
    }>();
</script>
  
<style>
  
</style>