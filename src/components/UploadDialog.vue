<template>
    <v-dialog :model-value="modelValue" @update:model-value="(value) => emit('update:modelValue', value)" class="h-100 justify-center" width="1200" scroll-strategy="block">
        <UploadDialogTimetable v-if="modelValue === true && state === 'timetable'" @lesson-selected="onTimetableLessonSelected"/>
        <UploadDialogForm v-else-if="modelValue === true && state === 'form'" :lesson="(selectedLesson as ILesson)" :date="(selectedDate as Date)"/> 
    </v-dialog>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
    import { ref, watch } from 'vue'; 
    import UploadDialogTimetable from './UploadDialogTimetable.vue';
    import UploadDialogForm from './UploadDialogForm.vue';
    import { ILesson } from '@/api/RectureApi';

    const props = defineProps<{
        modelValue?: boolean
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void
    }>();

    const selectedLesson = ref<ILesson | null>(null);
    const selectedDate = ref<Date | null>(null);
    const state = ref<"timetable" | "form">("timetable");

    function onTimetableLessonSelected(lesson: ILesson, date: Date) {
        selectedLesson.value = lesson;
        selectedDate.value = date;
        state.value = "form";
    }

    watch(() => props.modelValue, (value) => {
        selectedLesson.value = null;
        selectedDate.value = null;
        state.value = "timetable";
    });
</script>