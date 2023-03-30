<template>
    <v-container :class="'pa-0'+(timetableStore.editing?' editing':'')" fluid>
        <v-row class="timetable-grid-row" no-gutters>
            <v-col class="timetable-grid-header"></v-col>
            <v-col class="timetable-grid-header" v-for="i in timetableStore.lessonsPerDay">
                <v-row no-gutters class="h-100">
                    <v-col align-self="center">
                        <p>{{ (timetableStore.firstLessonNumber+i-1)+["th", "st", "nd", "rd", "th"][Math.min((timetableStore.firstLessonNumber+i-1)%10, 4)] }}</p>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <template v-for="(visible, day) in timetableStore.daysOfWeek">
            <v-row class="timetable-grid-row" v-if="visible" no-gutters>
                <v-col class="timetable-grid-header">
                    <v-row no-gutters class="h-100">
                        <v-col align-self="center">
                            <p>{{ DayOfWeek[day].substring(0, 3).toLocaleUpperCase() }}</p>
                            <p>{{ timetableStore.weekDates[day].toLocaleDateString(undefined, {month: "numeric", day: "numeric"}).toLocaleUpperCase() }}</p>
                        </v-col>
                    </v-row>
                </v-col>
                <template v-for="i in timetableStore.lessonsPerDay">
                    <template v-for="lesson in [timetableStore.lessons.find((item, index, array) => item.dayOfWeek === day && item.lessonNumber === i-1)]" :key="lesson?.lessonId"> <!-- TODO: This is hella jank, maybe change the way it works? -->
                        <TimetableLesson v-if="lesson != null" :lesson="lesson"/>
                        <TimetableCell v-else/>
                    </template>
                </template>
            </v-row>
        </template>
    </v-container>
</template>

<script lang="ts" setup>
    import { useTimetableStore } from '@/stores/useTimetableStore';
    import { DayOfWeek } from '@/api/RectureApi';
    import TimetableCell from './TimetableCell.vue';
    import TimetableLesson from './TimetableLesson.vue';

    const timetableStore = useTimetableStore();
</script>