<template>
    <v-col class="timetable-grid-cell timetable-lesson" @mouseover="mouseOver = true" @mouseleave="mouseOver = false">
        <v-icon v-show="mouseOver && idle" size="24" icon="mdi-export-variant" @click="emit('shareButtonClick')"/>
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
    import { ref } from 'vue';

    const props = defineProps<{
        lesson: ILesson,
        idle: boolean,
        editing: boolean
    }>();

    const emit = defineEmits<{
        (e: "shareButtonClick"): void,
        (e: "deleteButtonClick"): void
    }>();

    const timetableStore = useTimetableStore();

    const mouseOver = ref<boolean>(false);
</script>