<template>
    <v-card :width="360">
        <UploadFileInput class="w-100"/>

        <v-row class="w-100" no-gutters>
            <v-col cols="12" class="px-3 py-2">
                <h2 :class="{'blank': titleBlank}">{{ titleString }}</h2>
                <p class="font-weight-regular pt-1">{{ dateString }}</p>
                <p class="font-weight-bold pt-1">{{ lesson.className }}</p>
            </v-col>
        </v-row>                                
    </v-card>           
</template>

<style lang="scss" scoped>
    .v-card {
        background-color: #efefef;
        color: black;
        border-radius: 20px;
        border-style: solid;
        border-width: 3px;
        border-color: black;
        box-shadow: 3px 3px 0px 0px black;
    }

    h2 {
        display: -webkit-box;
        font-size: 1.4em;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        line-clamp: 2; 
        -webkit-box-orient: vertical;
    }

    h2.blank {
        opacity: 50%;
    }
</style>

<script lang="ts" setup>
    import { computed } from 'vue';
    import { ILesson } from '@/api/RectureApi';
    import UploadFileInput from './UploadFileInput.vue';

    const props = defineProps<{
        title: string,
        lesson: ILesson,
        dateString: string
    }>();

    const titleBlank = computed<boolean>(() => props.title.length === 0);
    const titleString = computed<string>(() => titleBlank.value ? "Title of the lesson" : props.title);
</script>