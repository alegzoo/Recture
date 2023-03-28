import { IRecording, RectureApi } from '@/api/RectureApi';
import { ref, computed, Ref, ComputedRef } from 'vue';

export interface IUsableRecording {
    recording: Ref<IRecording | null | undefined>,
    recordingDate: ComputedRef<string | null>,

    fetchAll() : Promise<void>
}

export function useRecording(id: number) : IUsableRecording {
    const recording = ref<IRecording | null | undefined>(undefined);

    const recordingDate = computed<string | null>(() => {
        if (recording.value != null) return new Date(recording.value.recordingTimestamp).toLocaleDateString(undefined, {year: "numeric", month: "numeric", day: "numeric"});
        else return null;
    });

    async function fetchAll() : Promise<void> {
        recording.value = undefined;

        const result = await RectureApi.getRecording(id);
        if (result.success) {
            recording.value = result.data;
        } else {
            recording.value = null;
        }
    }

    return { recording, recordingDate, fetchAll };
}