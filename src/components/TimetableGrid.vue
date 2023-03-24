<template>
    <table>
        <tr>
            <th></th>
            <th v-for="i in lessonsPerDay">{{ (firstLessonNumber+i-1)+["th", "st", "nd", "rd", "th"][Math.min((firstLessonNumber+i-1)%10, 4)] }}</th>
        </tr>
        <template v-for="(visible, day) in daysOfWeek">
            <tr v-if="visible">
                <th>
                    <p class="text-uppercase">{{ DayOfWeek[day].substring(0, 3) }}</p>
                    <p class="text-uppercase">{{ timetableStore.weekDates[day].toLocaleDateString(undefined, {month: "numeric", day: "numeric"}) }}</p>
                </th>
                <template v-for="i in lessonsPerDay">
                    <template v-for="lesson in [lessons.find((item, index, array) => item.dayOfWeek === day && item.lessonNumber === i-1)]" :key="lesson?.lessonId"> <!-- TODO: This is hella jank, maybe change the way it works? -->
                        <TimetableLesson v-if="lesson != null" :lesson="lesson"/>
                        <td v-else></td>
                    </template>
                </template>
            </tr>
        </template>
    </table>
</template>

<script lang="ts" setup>
    import { useTimetableStore } from '@/stores/useTimetableStore';
    import { DayOfWeek, ILesson } from '@/api/RectureApi';
    import TimetableLesson from './TimetableLesson.vue';

    const props = defineProps<{
        daysOfWeek: boolean[]
        lessonsPerDay: number
        firstLessonNumber: number
        lessons: ILesson[]
    }>();

    const timetableStore = useTimetableStore();
</script>