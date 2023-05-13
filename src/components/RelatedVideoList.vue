<template>
    <v-list active-class="active" :ripple="false" mandatory>
        <v-list-item v-for="rec in recordings" variant="plain" :ripple="false" :to="'/videos/'+rec.recordingId">{{ rec.title }}</v-list-item>
        <v-btn v-if="totalPages != null && (page+1 < totalPages || (totalPages != null && page+1 === totalPages && recordingsLoading))" :disabled="recordingsLoading" :loading="recordingsLoading" variant="flat" color="recture-bright-blue" class="load-more-button rounded-pill" @click="loadRecordingsNextPage">Load more</v-btn>
    </v-list>
</template>

<style lang="scss" scoped>
    @import "@/styles/mixins.scss";

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
    
    .load-more-button {
        @include elevated-button(0px, 3px, 1px);
        border: solid 2px black;
    }
</style>

<script lang="ts" setup>
    import { ref, watch, onMounted } from 'vue';
    import { IRecording, RecordingSortKey, RectureApi, SortOrder } from '@/api/RectureApi';

    const props = defineProps<{
        recording: IRecording | null | undefined
    }>();

    const recordings = ref<IRecording[]>();
    const recordingsLoading = ref<boolean>(false);

    const page = ref<number>(0);
    const totalPages = ref<number | undefined>(undefined);

    onMounted(() => loadRecordings(false));
    watch(() => props.recording, () => loadRecordings(false));

    function loadRecordings(append: boolean) {
        if (props.recording != null) {
            if (append !== true) {
                recordings.value = [];
                page.value = 0;
            }

            recordingsLoading.value = true;

            RectureApi.getRecordings(page.value, 20, { sortKey: RecordingSortKey.ByRecordingDate, sortOrder: SortOrder.Ascending }, null, null, null, [props.recording.topicId], null, null).then((result) => {
                //TODO: Maybe show error if !result.success or exception or if props.recording == null
                if (result.success && result.data != null) {
                    if (append) {
                        result.data.data.forEach(r => {
                            if (recordings.value != undefined) recordings.value.push(r);
                        });
                    } else recordings.value = result.data.data;

                    totalPages.value = result.data.pages;
                } else {
                    totalPages.value = undefined;
                }
            }).catch(reason => {
                totalPages.value = undefined;
                //TODO: Maybe show error
            }).finally(() => {
                recordingsLoading.value = false;
            });
        }
    }

    function loadRecordingsNextPage() {
        page.value++;
        loadRecordings(true);
    }
</script>