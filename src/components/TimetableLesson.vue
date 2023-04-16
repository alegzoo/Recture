<template>
    <v-col class="timetable-grid-cell timetable-lesson">
        <v-icon v-show="editing" size="24" icon="mdi-close" @click="emit('deleteButtonClick')"/>
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
        lesson: ILesson,
        editing: boolean
    }>();

    const emit = defineEmits<{
        (e: "deleteButtonClick"): void
    }>();

    const timetableStore = useTimetableStore();
</script>