import { ILesson, IQuiz, ITopic, RectureApi } from '@/api/RectureApi';
import { ref, computed, Ref } from 'vue';

export interface IUsableUploadForm {
    title: Ref<string>,
    description: Ref<string>,
    selectedTopic: Ref<ITopic | string | undefined>,
    selectedQuiz: Ref<IQuiz | undefined>,
    commentsAllowed: Ref<boolean | undefined>,
    published: Ref<boolean | undefined>,
    file: Ref<File | null>,

    className: Ref<string>,
    subjectName: Ref<string>,
    dateString: Ref<string>,

    topics: Ref<ITopic[]>,
    quizzes: Ref<IQuiz[]>,

    fetchTopics(): void,
    fetchQuizzes(): void,
    setFile(file: File): void,
    validateForm(): boolean
}

export function useUploadForm(lesson: ILesson, date: Date) : IUsableUploadForm {
    const title = ref<string>("");
    const description = ref<string>("");
    const selectedTopic = ref<ITopic | string | undefined>(undefined);
    const selectedQuiz = ref<IQuiz | undefined>(undefined);
    const commentsAllowed = ref<boolean | undefined>(undefined);
    const published = ref<boolean | undefined>(undefined);
    const file = ref<File | null>(null);

    const className = computed<string>(() => lesson.className);
    const subjectName = computed<string>(() => lesson.subjectName);
    const dateString = computed<string>(() => date.toLocaleDateString(undefined, {year: "numeric", month: "numeric", day: "numeric"}).toLocaleUpperCase());

    const topics = ref<ITopic[]>([]);
    const quizzes = ref<IQuiz[]>([]);

    function fetchTopics(): void {
        RectureApi.getTopics(lesson.classId, lesson.subjectId).then(result => {
            if (result.success && result.data != null) topics.value = result.data;
            //TODO: Maybe show error on unsuccessful result/exception
        }).catch(reason => {
            //TODO: Maybe show error
        });
    }

    function fetchQuizzes(): void {
        RectureApi.getQuizzes(lesson.subjectId).then(result => {
            if (result.success && result.data != null) quizzes.value = result.data;
            //TODO: Maybe show error on unsuccessful result/exception
        }).catch(reason => {
            //TODO: Maybe show error
        });
    }

    function setFile(val: File | null) : void {
        file.value = val;
    }

    function validateForm(): boolean {
        if (title.value.trim().length == 0) return false;
        if (selectedTopic.value == null) return false;
        if (commentsAllowed.value == null) return false;
        if (published.value == null) return false;
        if (file.value == null) return false;

        return true;
    }

    return { title, description, selectedTopic, selectedQuiz, commentsAllowed, published, file, className, subjectName, dateString, topics, quizzes, fetchTopics, fetchQuizzes, setFile, validateForm };
}