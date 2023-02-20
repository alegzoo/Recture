<template>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        location="start"
    >
        <template v-slot:activator="{ props }">
            <v-btn
                theme="light"
                v-bind="props"
                prepend-icon="mdi-filter-outline"
                rounded
            >
                Filters
            </v-btn>
        </template>

        <v-card min-width="300" theme="light">
            <v-list>
                <v-list-item>
                    <h4>FILTER & SORT</h4>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
                <v-list-item>
                    Filter by visibilty:
                </v-list-item>
                <v-list-item>
                    <v-radio-group v-model="selectedVisibilityFilter">
                        <v-radio label="All" :value="RecordingVisibilityFilter.SHOW_ALL"></v-radio>
                        <v-radio label="Public only" :value="RecordingVisibilityFilter.SHOW_PUBLIC_ONLY"></v-radio>
                        <v-radio label="Private only" :value="RecordingVisibilityFilter.SHOW_PRIVATE_ONLY"></v-radio>
                    </v-radio-group>
                </v-list-item>

                <v-list-item>
                    Sort by:
                </v-list-item>
                <v-list-item>
                    <v-radio-group v-model="selectedSort">
                        <v-radio label="Newest" :value="{ sortKey: RecordingSortKey.BY_RECORDING_DATE, sortOrder: SortOrder.DESCENDING }"></v-radio>
                        <v-radio label="Oldest" :value="{ sortKey: RecordingSortKey.BY_RECORDING_DATE, sortOrder: SortOrder.ASCENDING }"></v-radio>
                    </v-radio-group>
                </v-list-item>
            </v-list>

            <v-card-actions>
                <v-spacer/>
                <v-btn
                    variant="text"
                    @click="reset"
                >
                    Reset
                </v-btn>
                <v-spacer/>
            </v-card-actions>
        </v-card>
    </v-menu>
  </template>

<style lang="scss">

</style>

<script lang="ts" setup>
    import { IRecordingSort, RecordingVisibilityFilter, RecordingSortKey, SortOrder } from '@/api/RectureApi';
    import { ref } from 'vue';

    const menu = ref(false);

    const selectedVisibilityFilter = ref();
    const selectedSort = ref();

    reset();

    function reset() {
        selectedVisibilityFilter.value = RecordingVisibilityFilter.SHOW_ALL;
        selectedSort.value = { sortKey: RecordingSortKey.BY_RECORDING_DATE, sortOrder: SortOrder.DESCENDING } as IRecordingSort;
    }
</script>