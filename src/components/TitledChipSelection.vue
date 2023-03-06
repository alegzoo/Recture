<template>
    <v-row no-gutters>
        <v-col cols="12">
            <h5>{{ title }}</h5>
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col cols="12">
            <v-chip-group v-if="data.length > 0" multiple column  @update:model-value="selection => {emit('selectionChanged', selection);}">
                <v-chip v-for="chip in data" :value="chip" selected-class="selected" :ripple="false" variant="outlined" filter filter-icon="mdi-close-circle-outline">{{ chip.name }}</v-chip>
            </v-chip-group>
            <p v-else>{{ emptyMessage }}</p>
        </v-col>
    </v-row>
</template>
  
<script lang="ts" setup>
    export interface IChipData {
        name: string
    }

    //TODO: These props are not reactive - using chip filters can sometimes be buggy (filter by thematic units on one page in a way that results in no recordings found, then switch to a different subject and back to see the bug)
    //      not sure if this is truly caused by lack of reactivty or not, though
    const props = defineProps<{
        title: string
        emptyMessage: string
        data: IChipData[]
    }>();

    const emit = defineEmits<{
        (e: "selectionChanged", selection: IChipData[]): void
    }>();
</script>
  
<style>
  
</style>