import { IPublicUserInfo, IRecording, RectureApi } from '@/api/RectureApi';
import { ref, computed, Ref, ComputedRef } from 'vue';

export interface IUsableRecording {
    recording: Ref<IRecording | null | undefined>,
    author: Ref<IPublicUserInfo | null | undefined>,

    recordingDate: ComputedRef<string | null>,
    authorFullName: ComputedRef<string | null>

    use(id: number | undefined) : void,
    fetchAll() : Promise<void>
}

export function useRecording(id: number | undefined = undefined) : IUsableRecording {
    const recordingId = ref<number | undefined>(id);

    const recording = ref<IRecording | null | undefined>(undefined);
    const author = ref<IPublicUserInfo | null | undefined>(undefined);

    const recordingDate = computed<string | null>(() => {
        if (recording.value != null) return new Date(recording.value.recordingTimestamp).toLocaleDateString(undefined, {year: "numeric", month: "numeric", day: "numeric"});
        else return null;
    });

    const authorFullName = computed<string | null>(() => author.value != null ? (author.value.firstName+" "+author.value.lastName) : null);

    async function use(id: number | undefined) {
        recordingId.value = id;
    }

    async function fetchAll() : Promise<void> {
        recording.value = undefined;
        author.value = undefined;

        if (recordingId.value != undefined) {
            const result = await RectureApi.getRecording(recordingId.value);
            if (result.success) {
                recording.value = result.data;
                if (recording.value != null) {
                    const authorResult = await RectureApi.getUserInfo(recording.value.teacherId);
                    if (authorResult.success) {
                        author.value = authorResult.data;
                    } else {
                        author.value = null;
                    }
                } else {
                    author.value = null;
                }
            } else {
                recording.value = null;
            }
        } else {
            recording.value = null;
        }
    }

    return { recording, author, recordingDate, authorFullName, use, fetchAll };
}