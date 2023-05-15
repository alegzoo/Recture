import { DayOfWeek, ILesson, LessonColor, RectureApi } from "@/api/RectureApi";
import { defineStore } from "pinia"

export const useTimetableStore = defineStore("timetableStore", {
    state: () => ({
        colors: {
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
});