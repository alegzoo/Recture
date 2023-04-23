<template>
    <v-list active-class="active" :ripple="false" mandatory>
        <v-list-item v-for="rec in recordings" variant="plain" :ripple="false" :to="'/videos/'+rec.recordingId">{{ rec.title }}</v-list-item>
    </v-list>
</template>

<style lang="scss" scoped>
    .v-list {
        background-color: transparent;
    }

    .v-list-item {
        opacity: 100%;
    }

    .v-list-item.active {
        font-size: 25px !important;
        font-weight: bold !important;
    }

    .v-list-item:hover {
        font-weight: bold !important;
    }
</style>

<script lang="ts" setup>
    import { ref, watch, onMounted } from 'vue';
    import { IRecording, RecordingSortKey, RectureApi, SortOrder } from '@/api/RectureApi';

    const props = defineProps<{
        recording: IRecording | null | undefined
    }>();

    const recordings = ref<IRecording[]>();

    onMounted(() => loadRecordings());
    watch(() => props.recording, () => loadRecordings());

    function loadRecordings() {
        if (props.recording != null) {
            //TODO: Add pagination!
            RectureApi.getRecordings(0, 100, { sortKey: RecordingSortKey.ByRecordingDate, sortOrder: SortOrder.Ascending }, null, null, null, [props.recording.topicId], null, null).then((result) => {
                //TODO: Maybe show error if !result.success or exception or if props.recording == null
                if (result.success && result.data != null) recordings.value = result.data.data;
            });
        }
    }
</script>