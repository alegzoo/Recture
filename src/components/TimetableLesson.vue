<template>
    <v-col class="timetable-grid-cell timetable-lesson">
        <v-row no-gutters class="h-100" :style="'background-color:'+timetableStore.colors[lesson.color]">
            <v-col align-self="center">
                <p>{{ lesson.subjectName }}</p>
                <p>{{ lesson.className }}</p>
            </v-col>
        </v-row>
    </v-col>
</template>

<script lang="ts" setup>
    import { ILesson } from '@/api/RectureApi';
    import { useTimetableStore } from '@/stores/useTimetableStore';

    const props = defineProps<{
        lesson: ILesson
    }>();

    const timetableStore = useTimetableStore();
</script>