import { ApiResult, IClass, IQuiz, IRecording, ISubject, ITopic, RectureApi } from '@/api/RectureApi';
import { ref, computed, Ref } from 'vue';

export interface IUsableRecordingEditForm {
    title: Ref<string>,
    description: Ref<string>,
    selectedTopic: Ref<ITopic | string | undefined>,
    selectedQuiz: Ref<IQuiz | null | undefined>,
    commentsAllowed: Ref<boolean | undefined>,
    published: Ref<boolean | undefined>,

    className: Ref<string>,
    subjectName: Ref<string>,
    dateString: Ref<string>,

    topics: Ref<ITopic[]>,
    quizzes: Ref<IQuiz[]>,

    loadData(recording: IRecording | null | undefined): Promise<void>,
    validateForm(): boolean,
    saveData(recordingId: number): Promise<ApiResult<null>>
}

export function useRecordingEditForm(): IUsableRecordingEditForm {
    const title = ref<string>("");
    const description = ref<string>("");
    const selectedTopic = ref<ITopic | string | undefined>(undefined);
    const selectedQuiz = ref<IQuiz | null | undefined>(undefined);
    const commentsAllowed = ref<boolean | undefined>(undefined);
    const published = ref<boolean | undefined>(undefined);

    const clazz = ref<IClass | undefined>(undefined);
    const subject = ref<ISubject | undefined>(undefined);
    const recordingDate = ref<Date | undefined>(undefined);

    const className = computed<string>(() => clazz.value != null ? clazz.value.name : "");
    const subjectName = computed<string>(() => subject.value != null ? subject.value.name : "");
    const dateString = computed<string>(() => recordingDate.value != null ? recordingDate.value.toLocaleDateString(undefined, {year: "numeric", month: "numeric", day: "numeric"}).toLocaleUpperCase() : "");

    const topics = ref<ITopic[]>([]);
    const quizzes = ref<IQuiz[]>([]);

    async function loadData(recording: IRecording | null | undefined): Promise<void> {
        title.value = "";
        description.value = "";
        selectedTopic.value = "";
        selectedQuiz.value = undefined;
        commentsAllowed.value = undefined;
        published.value = undefined;

        clazz.value = undefined;
        subject.value = undefined;
        recordingDate.value = undefined;

        topics.value = [];
        quizzes.value = [];

        if (recording == null) return;

        title.value = recording.title;
        description.value = recording.description != null ? recording.description : "";
        selectedTopic.value = { topicId: recording.topicId, name: recording.topicName };

        const topicsResult = await RectureApi.getTopics(recording.classId, recording.subjectId);
        if (!topicsResult.success || topicsResult.data == null) throw new Error("Failed to load topics");
        topics.value = topicsResult.data;

        const quizzesResult = await RectureApi.getQuizzes(recording.subjectId);
        if (!quizzesResult.success || quizzesResult.data == null) throw new Error("Failed to load quizzes");
        quizzes.value = quizzesResult.data;

        if (recording.quizId != null) {
            const quizResult = await RectureApi.getQuizById(recording.quizId);
            if (!quizResult.success || quizResult.data == null) throw new Error("Failed to load recording quiz");
            selectedQuiz.value = quizResult.data;
        } else {
            selectedQuiz.value = null;
        }

        commentsAllowed.value = recording.commentsAllowed;
        published.value = recording.published;

        clazz.value = { classId: recording.classId, name: recording.className }
        subject.value = { subjectId: recording.subjectId, name: recording.subjectName }
        recordingDate.value = new Date(recording.recordingTimestamp);
    }

    function validateForm(): boolean {
        if (title.value.trim().length == 0) return false;
        if (selectedTopic.value == null) return false;
        if (commentsAllowed.value == null) return false;
        if (published.value == null) return false;

        return true;
    }

    async function saveData(recordingId: number): Promise<ApiResult<null>> {
        const classId = clazz.value != null ? clazz.value.classId : null;
        const subjectId = subject.value != null ? subject.value.subjectId : null;

        if (classId == null) throw new Error("Cannot update recording: classId is null");
        if (subjectId == null) throw new Error("Cannot update recording: subjectId is null");
        
        if (selectedTopic.value == null) throw new Error("Cannot update recording: selectedTopic is null");
        
        let topicId = null as number | null;
        if (selectedTopic.value instanceof String || typeof selectedTopic.value === "string") {
            const topicCreationResult = await RectureApi.createTopic(classId, subjectId, selectedTopic.value as string);
            if (topicCreationResult.success !== true) throw new Error("Cannot update recording: failed to create topic");
        } else {
            topicId = selectedTopic.value.topicId;
        }

        let quizId = -1;
        if (selectedQuiz.value != null) quizId = selectedQuiz.value.quizId;

        if (topicId == null || title.value == null || description.value == null || published.value == null || commentsAllowed.value == null || recordingDate.value == null) throw new Error("Cannot update recording: one of the required values is null or undefined");

        return await RectureApi.updateRecording(recordingId, classId, subjectId, topicId, quizId, title.value, description.value, published.value, commentsAllowed.value, recordingDate.value.getTime());
    }

    return { title, description, selectedTopic, selectedQuiz, commentsAllowed, published, className, subjectName, dateString, topics, quizzes, loadData, validateForm, saveData };
}