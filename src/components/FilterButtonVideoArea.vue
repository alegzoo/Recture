<template>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :location="mdAndUp?'start':'bottom center'"
    >
        <template v-slot:activator="{ props }">
            <v-btn
                class="filter-button"
                v-bind="props"
                append-icon="mdi-filter-outline"
                variant="text"
                rounded
                :ripple="false"
                align-content="center"
            >
            Filter
            </v-btn>
        </template>

        <v-card min-width="300" id="recording-filter-menu" class="mr-2">
            <v-list>
                <v-list-item 
                    class="filter-sort-title"
                    title="FILTER & SORT"
                    prepend-icon="mdi-filter"
                />
            </v-list>

            <v-divider thickness="2"/>

            <v-list>
                <v-list-item>
                    Filter by visibility:
                </v-list-item>
                <v-list-item>
                    <v-radio-group v-model="selectedVisibilityFilter">
                        <v-radio label="All" :value="RecordingVisibilityFilter.ShowAll"></v-radio>
                        <v-radio label="Public only" :value="RecordingVisibilityFilter.ShowPublicOnly"></v-radio>
                        <v-radio label="Private only" :value="RecordingVisibilityFilter.ShowPrivateOnly"></v-radio>
                    </v-radio-group>
                </v-list-item>

                <v-list-item>
                    Sort by:
                </v-list-item>
                <v-list-item>
                    <v-radio-group v-model="selectedSort">
                        <v-radio label="Newest" :value="{ sortKey: RecordingSortKey.ByRecordingDate, sortOrder: SortOrder.Descending }"></v-radio>
                        <v-radio label="Oldest" :value="{ sortKey: RecordingSortKey.ByRecordingDate, sortOrder: SortOrder.Ascending }"></v-radio>
                    </v-radio-group>
                </v-list-item>
            </v-list>

            <v-card-actions>
                <v-btn
                    variant="text"
                    @click="reset"
                    class="rounded-0"
                    block
                >
                    Reset
                </v-btn>
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
        selectedVisibilityFilter.value = RecordingVisibilityFilter.ShowAll;
        selectedSort.value = { sortKey: RecordingSortKey.ByRecordingDate, sortOrder: SortOrder.Descending } as IRecordingSort;
    }
</script>