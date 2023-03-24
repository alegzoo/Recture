<template>
    <td class="timetable-lesson" :style="'background-color: '+timetableStore.colors[lesson.color]">
        <p class="pa-0">{{ lesson.subjectName }}</p>
        <p class="pa-0">{{ lesson.className }}</p>
    </td>
</template>

<script lang="ts" setup>
    import { ILesson } from '@/api/RectureApi';
    import { useTimetableStore } from '@/stores/useTimetableStore';

    const props = defineProps<{
        lesson: ILesson
    }>();

    const timetableStore = useTimetableStore();
</script>