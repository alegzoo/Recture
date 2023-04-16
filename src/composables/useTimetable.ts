import { DayOfWeek, ILesson, RectureApi } from '@/api/RectureApi';
import status from 'http-status';
import { ref, reactive, computed, Ref, ComputedRef } from 'vue';

export interface IUsableTimetable {
    daysOfWeek: Ref<boolean[]>,
    lessonsPerDay: Ref<number>,
    firstLessonNumber: Ref<number>,
    lessons: Ref<ILesson[]>,
    weekDates: Ref<Date[]>,

    state: Ref<TimetableState>,
    selection: Ref<ITimetableGridPosition[]>,

    idle: ComputedRef<boolean>,
    editing: ComputedRef<boolean>,
    creating: ComputedRef<boolean>,
    selecting: ComputedRef<boolean>,

    setWeek(dayOfWeek?: Date | null): void,
    setRelativeWeek(relativeWeekNumber: number): void,
    getFormattedWeekDate(dayOfWeek: DayOfWeek, year?: "numeric" | "2-digit" | undefined, month?: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined, day?: "numeric" | "2-digit" | undefined): string,
    fetchTimetable(): void,
    fetchLessons(): void,
    deleteLesson(lesson: ILesson): void,
    toggleEditing(): void,
    startCreating(initialSelection: ITimetableGridPosition): void,
    stopCreating(): void,
    toggleCellSelectionStatus(cellPosition: ITimetableGridPosition): void
}

export interface ITimetableGridPosition {
    dayOfWeek: DayOfWeek,
    lessonNumber: number
}

export type TimetableState = "idle" | "editing" | "creating" | "selecting";

export function useTimetable(initialState: TimetableState = "idle") : IUsableTimetable {
    //TODO: Maybe use reactives for arrays?
    const daysOfWeek = /*reactive*/ref([false, false, false, false, false, false, false] as boolean[]);
    const lessonsPerDay = ref<number>(0);
    const firstLessonNumber = ref<number>(1 as number);
    const lessons = /*reactive*/ref<ILesson[]>([]);
    const weekDates = /*reactive*/ref<Date[]>([]);

    const state = ref<TimetableState>(initialState);
    const selection = /*reactive*/ref<ITimetableGridPosition[]>([]);

    const idle = computed<boolean>(() => state.value === "idle");
    const editing = computed<boolean>(() => state.value === "editing");
    const creating = computed<boolean>(() => state.value === "creating");
    const selecting = computed<boolean>(() => state.value === "selecting");

    function setWeek(dayOfWeek: Date | null = null): void {
        weekDates.value = [] as Date[];
        if (dayOfWeek == null) dayOfWeek = new Date();
        else dayOfWeek = new Date(dayOfWeek);

        dayOfWeek.setHours(0, 0, 0, 0);

        let day = dayOfWeek.getDay();
        let diff = dayOfWeek.getDate() - day + (day == 0 ? -6:1);
        dayOfWeek.setDate(diff);

        for (let i = 0; i < 7; i++) {
            let date = new Date(dayOfWeek);
            date.setDate(date.getDate() + i);
            weekDates.value[i] = date;
        }
    }

    function setRelativeWeek(relativeWeekNumber: number): void {
        if (weekDates.value.length > 0) {
            let date = new Date(weekDates.value[0]);
            date.setDate(date.getDate() + relativeWeekNumber*7);
            setWeek(date);
        }
        //TODO: Maybe throw exception on failure?
    }

    function getFormattedWeekDate(dayOfWeek: DayOfWeek, year: "numeric" | "2-digit" | undefined = undefined, month: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined = "numeric", day: "numeric" | "2-digit" | undefined = "numeric"): string {
        return weekDates.value[dayOfWeek].toLocaleDateString(undefined, {year: year, month: month, day: day}).toLocaleUpperCase()
    }

    function fetchTimetable(): void {
        daysOfWeek.value = [false, false, false, false, false, false, false];
        lessonsPerDay.value = 0;
        firstLessonNumber.value = 1
        RectureApi.getTimetable().then(result => {
            if (result.success && result.data != null) {
                daysOfWeek.value = result.data.daysOfWeek;
                lessonsPerDay.value = result.data.lessonsPerDay;
                firstLessonNumber.value = result.data.firstLessonNumber;
            }
        });
    }

    function fetchLessons(): void {
        lessons.value = [];
        RectureApi.getLessons().then(result => {
            if (result.success && result.data != null) {
                lessons.value = result.data;
            }
        });
    }

    function deleteLesson(lesson: ILesson): void {
        lessons.value = lessons.value.filter(item => item !== lesson);
        RectureApi.deleteLesson(lesson.lessonId).then(result => {
            if (!result.success && result.statusCode !== status.NOT_FOUND) lessons.value.push(lesson);
        }).catch(reason => {
            lessons.value.push(lesson);
        });
    }

    function toggleEditing(): void {
        if (state.value === "idle") state.value = "editing";
        else if (state.value === "editing") state.value = "idle";
        else console.error("Attempted to toggle timetable editing state while not in idle or editing state");
    }

    function startCreating(initialSelection: ITimetableGridPosition): void {
        if (state.value === "idle") {
            selection.value = [initialSelection];
            state.value = "creating";
        } else console.error("Attempted to switch into timetable creating state while not in idle state");
    }

    function stopCreating(): void {
        if (state.value === "creating") {
            selection.value = [];
            state.value = "idle";
        } else console.error("Attempted to exit timetable creating state while not in creating state");
    }

    function toggleCellSelectionStatus(cellPosition: ITimetableGridPosition): void {
        const searchFunction = (pos: ITimetableGridPosition) => (pos.dayOfWeek === cellPosition.dayOfWeek && pos.lessonNumber === cellPosition.lessonNumber);
        if (selection.value.find(searchFunction)) {
            selection.value = selection.value.filter(pos => !searchFunction(pos));
            if (selection.value.length === 0) stopCreating();
        } else selection.value.push(cellPosition);
    }
    
    return { daysOfWeek, lessonsPerDay, firstLessonNumber, lessons, weekDates, state, selection, idle, editing, creating, selecting, setWeek, setRelativeWeek, getFormattedWeekDate, fetchTimetable, fetchLessons, deleteLesson, toggleEditing, startCreating, stopCreating, toggleCellSelectionStatus }
}