import { DayOfWeek, ILesson, LessonColor, RectureApi } from "@/api/RectureApi";
import { defineStore } from "pinia"

export const useTimetableStore = defineStore("timetableStore", {
    state: () => ({
        //TODO: Maybe change defaults?
        
        daysOfWeek: [false, false, false, false, false, false, false] as boolean[],
        lessonsPerDay: 0 as number,
        firstLessonNumber: 1 as number,
        lessons: [] as ILesson[],
        weekDates: [] as Date[],

        editing: false as boolean,

        colors: { //TODO: There has to be a better place to store this
            "mustard": "#FFBE5D",
            "aqua": "#90C2BD",
            "steel_blue": "#B8BCDF",
            "red": "#FF5B4C",
            "gray": "#AAAAAA",
            "rose": "#F9D2EC",
            "melon": "#FFBDB9",
            "blush": "#DE5C82",
            "crystal_blue": "#56AAB6",
            "canary": "#F9FF9B",
            "orchid": "#D699CA"
        }
    }),
    actions: {
        setWeek(dayOfWeek: Date | null = null) {
            this.weekDates = [] as Date[];
            if (dayOfWeek == null) dayOfWeek = new Date();
            else dayOfWeek = new Date(dayOfWeek);

            dayOfWeek.setDate(dayOfWeek.getDate()+2);

            let day = dayOfWeek.getDay();
            let diff = dayOfWeek.getDate() - day + (day == 0 ? -6:1);
            dayOfWeek.setDate(diff);

            for (let i = 0; i < 7; i++) {
                let date = new Date();
                date.setDate(dayOfWeek.getDate() + i);
                date.setHours(0, 0, 0, 0);
                this.weekDates[i] = date;
            }
        },

        fetchTimetable() {
            this.daysOfWeek = [false, false, false, false, false, false, false];
            this.lessonsPerDay = 0;
            this.firstLessonNumber = 1
            RectureApi.getTimetable().then(result => {
                if (result.success && result.data != null) {
                    this.daysOfWeek = result.data.daysOfWeek;
                    this.lessonsPerDay = result.data.lessonsPerDay;
                    this.firstLessonNumber = result.data.firstLessonNumber;
                }
            });
        },

        fetchLessons() {
            this.lessons = [];
            RectureApi.getLessons().then(result => {
                if (result.success && result.data != null) {
                    this.lessons = result.data;
                }
            });
        },

        deleteLesson(lesson: ILesson) {
            this.lessons = this.lessons.filter(item => item !== lesson);
            RectureApi.deleteLesson(lesson.lessonId).then(result => {
                if (!result.success) this.lessons.push(lesson);
            }).catch(reason => {
                this.lessons.push(lesson);
            });
        },

        toggleEditing() {
            this.editing = !this.editing;
        }
    }
});