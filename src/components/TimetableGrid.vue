<template>
    <v-container :class="{'timetable-grid': true, 'pa-0': true, 'idle': timetableStore.idle, 'editing': timetableStore.editing, 'creating': timetableStore.creating}" fluid>
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
        <!-- TODO: Fix bug: If a row is fully filled with lessons or selected cells then it shrinks -->
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
                        <TimetableCell v-else :selected="timetableStore.selection.filter(item => item.dayOfWeek === day && item.lessonNumber === i-1).length > 0" :interactive="!standalone" @click="emit('timetableCellClick', { dayOfWeek: day, lessonNumber: i-1 })"/> <!-- TODO: Setting selected is also pretty damn jank -->
                    </template>
                </template>
            </v-row>
        </template>
    </v-container>
</template>

<style lang="scss">
    //TODO: Maybe make this style block scoped
    @import "@/styles/constants.scss";

    .timetable-grid {
        background-color: white;
        border-radius: 15px;
        border: solid 2px black;
        box-shadow: 6px 6px 0px 0px black;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        .timetable-grid-header, .timetable-grid-cell {
            border: solid 1px black;
            text-align: center;
            overflow: hidden;
        }

        .timetable-grid-cell {
            background-color: transparent;
            cursor: pointer;
            text-align: center;
            font-weight: bold;

            * {
                overflow: hidden;
            }

            p {
                user-select: none;
            }
        }

        .timetable-grid-cell.timetable-lesson {
            cursor: default;
        }

        .timetable-grid-cell .v-row {
            box-shadow: none;
            transition: box-shadow 0.1s linear;
        }

        .timetable-lesson {
            position: relative;

            .v-icon {
                position: absolute;
                top: 10px;
                right: 10px;
            }
        }

        &.editing .timetable-grid-cell {
            cursor: default;
        }

        &.editing .timetable-lesson {
            animation: edit-shake;
            animation-duration: 0.4s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            border: solid 2px black;
        }

        .timetable-grid-cell:hover .v-row {
            box-shadow: 0px 0px 0px 2px black inset, -5px -5px 0px 0px black inset;
            transition: box-shadow 0.1s linear;
        }

        &.idle, &.editing {
            .timetable-grid-cell:not(.timetable-lesson) .v-row > * {
                opacity: 0%;
                transition: opacity none;
            }
        }

        &.idle .timetable-grid-cell:not(.timetable-lesson):hover .v-row > * {
            opacity: 30%;
            transition: opacity 0.1s linear;
        }

        &.creating .timetable-grid-cell:not(.timetable-lesson, .selected) .v-row > * {
            opacity: 0%;
            transition: opacity none;
        }

        &.creating .timetable-grid-cell.selected {
            position: relative;

            .v-row > * {
                opacity: 100%;
                transition: opacity none;
                padding: 0px 10px 10px 0px;
            }

            .v-icon {
                position: absolute;
                bottom: 10px;
                right: 10px;
                background-color: $recture-bright-blue;
                border: solid 2px black;
            }
        }

        .timetable-grid-header {
            font-weight: bold;
        }

        .timetable-grid-row:first-child {
            height: 50px;
            max-height: 50px;
            border-top: none;
        }

        .timetable-grid-row:first-child:only-child {
            height: 100%;
            max-height: 100%;
        }

        .timetable-grid-row:first-child > * {
            border-top: none;
        }

        .timetable-grid-row:first-child .timetable-grid-header:first-child {
            background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuXzgyeGM2NyIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48bGluZSB4MT0iMCIgeT0iMCIgeDI9IjAiIHkyPSIxMCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiLz48L3BhdHRlcm4+PC9kZWZzPiA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm5fODJ4YzY3KSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==');
            background-size: cover;
        }

        .timetable-grid-row:last-child * {
            border-bottom: none;
        }

        .timetable-grid-cell:first-child, .timetable-grid-header:first-child {
            border-left: none;
        }

        .timetable-grid-cell:last-child, .timetable-grid-header:last-child {
            border-right: none;
        }
    }

    @keyframes edit-shake {
        0% {
            transform: rotate(0deg);
        }
        25% {
            transform: rotate(1deg);
        }
        75% {
            transform: rotate(-1deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }
</style>

<script lang="ts" setup>
    import { onMounted } from 'vue';
    import { ITimetableGridPosition, useTimetableStore } from '@/stores/useTimetableStore';
    import { DayOfWeek } from '@/api/RectureApi';
    import TimetableCell from './TimetableCell.vue';
    import TimetableLesson from './TimetableLesson.vue';

    const timetableStore = useTimetableStore();

    const props = withDefaults(defineProps<{
        standalone: boolean
    }>(), {
        standalone: false
    });

    const emit = defineEmits<{
        (e: "timetableCellClick", cellPosition: ITimetableGridPosition): void
    }>();

    onMounted(() => {
        if (props.standalone === true) {
            timetableStore.$reset();
            timetableStore.setWeek();
            timetableStore.fetchTimetable();
            timetableStore.fetchLessons();
        }
    });
</script>