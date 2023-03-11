<template>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :location="mdAndUp?'start':'bottom center'"
    >
        <template v-slot:activator="{ props }">
            <v-btn
                id="filter-btn"
                v-bind="props"
                append-icon="mdi-filter-outline"
                rounded
                :ripple="false"
                align-content="center"
            >
                Filter
            </v-btn>
        </template>

        <v-card min-width="300" id="filter-v-card">
            <v-list>
                <v-list-item 
                    id="filter-sort-title"
                    title="FILTER & SORT"
                    prepend-icon="mdi-filter"
                />
            </v-list>

            <v-divider id="v-divider" class="border-opacity-100" :thickness="2"/>

            <v-list>
                <v-list-item>
                    Filter by visibility:
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

            <v-divider id="v-divider" class="border-opacity-100" :thickness="2"/>

            <v-card-actions id="filter-v-card2">
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
    import { ref, watch } from 'vue';
    import { useDisplay } from 'vuetify/lib/framework.mjs';

    const { mdAndUp } = useDisplay();

    const menu = ref(false);

    //TODO: Maybe use v-model to bind these to the store?
    const selectedVisibilityFilter = ref();
    const selectedSort = ref();

    const emit = defineEmits<{
        (e: "filterOrSortChanged", filter: RecordingVisibilityFilter, sort: IRecordingSort): void
    }>();

    watch([selectedVisibilityFilter, selectedSort], () => {
        emit("filterOrSortChanged", selectedVisibilityFilter.value, selectedSort.value);
    });

    reset();

    function reset() {
        selectedVisibilityFilter.value = RecordingVisibilityFilter.SHOW_ALL;
        selectedSort.value = { sortKey: RecordingSortKey.BY_RECORDING_DATE, sortOrder: SortOrder.DESCENDING } as IRecordingSort;
    }
</script>