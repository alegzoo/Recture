import { ILesson, ITopic, RectureApi } from '@/api/RectureApi';
import { ref, computed, Ref } from 'vue';

export interface IUsableUploadForm {
    title: Ref<string>,
    description: Ref<string>,
    selectedTopic: Ref<ITopic | string | undefined>,
    commentsAllowed: Ref<boolean | undefined>,
    published: Ref<boolean | undefined>,
    file: Ref<File | null>,

    className: Ref<string>,
    subjectName: Ref<string>,
    dateString: Ref<string>,

    topics: Ref<ITopic[]>,

    fetchTopics(): void,
    setFile(file: File): void
}

export function useUploadForm(lesson: ILesson, date: Date) : IUsableUploadForm {
    const title = ref<string>("");
    const description = ref<string>("");
    const selectedTopic = ref<ITopic | string | undefined>(undefined);
    const commentsAllowed = ref<boolean | undefined>(undefined);
    const published = ref<boolean | undefined>(undefined);
    const file = ref<File | null>(null);

    const className = computed<string>(() => lesson.className);
    const subjectName = computed<string>(() => lesson.subjectName);
    const dateString = computed<string>(() => date.toLocaleDateString(undefined, {year: "numeric", month: "numeric", day: "numeric"}).toLocaleUpperCase());

    const topics = ref<ITopic[]>([]);

    function fetchTopics(): void {
        RectureApi.getTopics(lesson.classId, lesson.subjectId).then(result => {
            if (result.success && result.data != null) topics.value = result.data;
            //TODO: Maybe show error on unsuccessful result/exception
        });
    }

    function setFile(val: File | null) {
        file.value = val;
    }

    return { title, description, selectedTopic, commentsAllowed, published, file, className, subjectName, dateString, topics, fetchTopics, setFile };
}