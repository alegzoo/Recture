import { DayOfWeek, ILesson, LessonColor } from "@/api/RectureApi";
import { defineStore } from "pinia"

export const useTimetableStore = defineStore("timetableStore", {
    state: () => ({
        //TODO: Change defaults and implement fetching
        daysOfWeek: [true, true, true, true, true, false, false] as boolean[],
        lessonsPerDay: 7 as number,
        firstLessonNumber: 1 as number,
        lessons: [
            {lessonId: 1, dayOfWeek: DayOfWeek.Monday, lessonNumber: 2, color: 'mustard', className: 'IV.A', subjectName: 'MAT', classId: 1, subjectId: 1},
            {lessonId: 1, dayOfWeek: DayOfWeek.Wednesday, lessonNumber: 4, color: 'aqua', className: 'IV.B', subjectName: 'INF', classId: 1, subjectId: 1}
        ] as ILesson[],
        weekDates: [] as Date[],

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
        }
    }
});