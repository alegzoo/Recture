import { DayOfWeek, ILesson, LessonColor, RectureApi } from "@/api/RectureApi";
import { defineStore } from "pinia"

export interface ITimetableGridPosition {
    dayOfWeek: DayOfWeek,
    lessonNumber: number
}

export const useTimetableStore = defineStore("timetableStore", {
    state: () => ({
        //TODO: Maybe change defaults?
        
        daysOfWeek: [false, false, false, false, false, false, false] as boolean[],
        lessonsPerDay: 0 as number,
        firstLessonNumber: 1 as number,
        lessons: [] as ILesson[],
        weekDates: [] as Date[],

        state: "idle" as "idle" | "editing" | "creating",
        selection: [] as ITimetableGridPosition[],

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
    getters: {
        idle: (state) => state.state === "idle",
        editing: (state) => state.state === "editing",
        creating: (state) => state.state === "creating"
    },
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
            if (this.state === "idle") this.state = "editing";
            else if (this.state === "editing") this.state = "idle";
            else console.error("Attempted to toggle timetable editing state while not in idle or editing state");
        },

        startCreating(initialSelection: ITimetableGridPosition) {
            if (this.state === "idle") {
                this.selection = [initialSelection];
                this.state = "creating";
            } else console.error("Attempted to switch into timetable creating state while not in idle state");
        },

        stopCreating() {
            if (this.state === "creating") {
                this.selection = [];
                this.state = "idle";
            } else console.error("Attempted to exit timetable creating state while not in creating state");
        },

        toggleCellSelectionStatus(cellPosition: ITimetableGridPosition) {
            const searchFunction = (pos: ITimetableGridPosition) => (pos.dayOfWeek === cellPosition.dayOfWeek && pos.lessonNumber === cellPosition.lessonNumber);
            if (this.selection.find(searchFunction)) {
                this.selection = this.selection.filter(pos => !searchFunction(pos));
                if (this.selection.length === 0) this.stopCreating();
            } else this.selection.push(cellPosition);
        }
    }
});