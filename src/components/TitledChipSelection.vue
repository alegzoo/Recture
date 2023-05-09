<template>
    <v-row no-gutters>
        <v-col cols="12">
            <h5>{{ title }}</h5>
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col cols="12">
            <template v-if="loading">
                <v-chip-group column>
                    <v-chip v-for="size in skeletonChips.sizes.value" :style="'width: '+size+'px;'" class="skeleton" disabled/>
                </v-chip-group>
            </template>
            <v-chip-group v-else-if="data.length > 0" multiple column :model-value="modelValue" @update:model-value="selection => {emit('update:modelValue', selection)}">
                <!-- TODO: Maybe add key to v-for? -->
                <v-chip v-for="chip in data" class="px-4" :value="chip" selected-class="selected" :ripple="false" variant="outlined" append-icon="mdi-close-circle-outline">{{ chip.name }}</v-chip>
            </v-chip-group>
            <p v-else>{{ emptyMessage }}</p>
        </v-col>
    </v-row>
</template>
  
<script lang="ts" setup>
    import { useSkeletons } from '@/composables/useSkeletons';
    import { watch } from 'vue';

    export interface IChipData {
        name: string
    }

    const props = defineProps<{
        title: string
        emptyMessage: string
        loading: boolean
        data: IChipData[]
        modelValue?: IChipData[]
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", selection: IChipData[]): void
    }>();

    const skeletonChips = useSkeletons(4, 8, 65, 95);

    watch(() => props.loading, () => {
        if (props.loading === true) skeletonChips.generate();
    });
</script>
  
<style lang="scss" scoped>
    h5, p {
        color: black;
    }
</style>