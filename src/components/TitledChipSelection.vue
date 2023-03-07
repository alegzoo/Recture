<template>
    <v-row no-gutters>
        <v-col cols="12">
            <h5>{{ title }}</h5>
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col cols="12">
            <v-chip-group v-if="data.length > 0" multiple column :model-value="modelValue" @update:model-value="selection => {emit('update:modelValue', selection)}">
                <v-chip v-for="chip in data" class="px-4" :value="chip" selected-class="selected" :ripple="false" variant="outlined" filter filter-icon="mdi-close-circle-outline">{{ chip.name }}</v-chip>
            </v-chip-group>
            <p v-else>{{ emptyMessage }}</p>
        </v-col>
    </v-row>
</template>
  
<script lang="ts" setup>
    export interface IChipData {
        name: string
    }

    const props = defineProps<{
        title: string
        emptyMessage: string
        data: IChipData[]
        modelValue?: IChipData[]
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", selection: IChipData[]): void
    }>();
</script>
  
<style>
  
</style>