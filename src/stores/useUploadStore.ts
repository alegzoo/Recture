import { RectureApi, ApiResult, ILesson, IRecording, ITopic, IQuiz } from "@/api/RectureApi";
import { defineStore } from "pinia"

export interface ITrackedUpload {
    title: string,
    lesson: ILesson,
    promise: Promise<ApiResult<IRecording>>,
    abortController: AbortController,
    completed: boolean
}

export const useUploadStore = defineStore("uploadStore", {
    state: () => ({
        trackedUploads: [] as ITrackedUpload[],
        uploadsInProgress: 0 as number
    }),
    actions: {
        uploadRecording(file: File, lesson: ILesson, topic: ITopic, quiz: IQuiz | null | undefined, title: string, description: string | null, published: boolean, commentsAllowed: boolean, recordingTimestamp: number): ITrackedUpload {
            const abortController = new AbortController();
            const quizId = quiz != null ? quiz.quizId : null;
            const promise = RectureApi.createRecording(file, lesson.lessonId, topic.topicId, quizId, title, description, published, commentsAllowed, recordingTimestamp, abortController.signal);
            const trackedUpload = {
                title: title,
                lesson: lesson,
                promise: promise,
                abortController: abortController,
                completed: false
            };

            promise.finally(() => {
                trackedUpload.completed = true;
                this.countUploadsInProgress();
            });

            this.trackedUploads.push(trackedUpload);
            this.countUploadsInProgress();

            return trackedUpload;
        },

        cancelUpload(upload: ITrackedUpload): void {
            upload.abortController.abort();
        },

        countUploadsInProgress() {
            let count = 0;
            this.trackedUploads.forEach(upload => {
                if (!upload.completed) count += 1;
            });
            this.uploadsInProgress = count;
        }
    } 
});