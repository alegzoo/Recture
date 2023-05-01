import { RectureApi, ApiResult, ILesson, IRecording, ITopic, DayOfWeek } from "@/api/RectureApi";
import { defineStore } from "pinia"

export interface ITrackedUpload {
    title: string,
    lesson: ILesson,
    promise: Promise<ApiResult<IRecording>>,
    abortController: AbortController
}

export const useUploadStore = defineStore("uploadStore", {
    state: () => ({
        uploadsInProgress: [] as ITrackedUpload[]
    }),
    actions: {
        uploadRecording(file: File, lesson: ILesson, topic: ITopic, title: string, description: string | null, published: boolean, commentsAllowed: boolean, recordingTimestamp: number): ITrackedUpload {
            const abortController = new AbortController();
            const promise = RectureApi.createRecording(file, lesson.lessonId, topic.topicId, title, description, published, commentsAllowed, recordingTimestamp, abortController.signal);
            const trackedUpload = {
                title: title,
                lesson: lesson,
                promise: promise,
                abortController: abortController
            };

            this.uploadsInProgress.push(trackedUpload);
            return trackedUpload;
        },

        cancelUpload(upload: ITrackedUpload) {
            upload.abortController.abort();
        }
    }
});