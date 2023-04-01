<template>
    <v-container class="pa-0" fluid>
        <v-row no-gutters>
            <v-col>
                <v-text-field :model-value="modelValue" @update:modelValue="(val: any) => updateModel(val)" :label="label" variant="solo" single-line hide-details/>
            </v-col>    
            <v-col cols="auto">
                <v-row no-gutters>
                    <v-col>
                        <v-btn icon="mdi-chevron-up" variant="text" density="compact" @click="incrementValue"/>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col>
                        <v-btn icon="mdi-chevron-down" variant="text" density="compact" @click="decrementValue"/>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped>
    .v-container {
        background-color: white;
        border: solid 2px black;
        border-radius: 6px;
        box-shadow: 3px 3px 0px 0px black;
    }

    .v-container:deep(.v-field) {
        box-shadow: none !important;
        font-size: 32px;
        font-weight: bold;
    }

    .v-container:deep(.v-label) {
        font-size: 18px;
    }

    .v-container:deep(input), .v-container:deep(.v-label) {
        padding-top: 0px;
        padding-bottom: 0px;
        text-align: center !important;
    }
</style>

<script lang="ts" setup>
    const props = withDefaults(defineProps<{
        modelValue?: number | undefined,
        label?: string
    }>(), {
        modelValue: undefined,
        label: ""
    });

    const emit = defineEmits<{
        (e: "update:modelValue", val: number | undefined): void
    }>();

    function updateModel(val: string) {
        const intVal = parseInt(val);

        if (Number.isNaN(intVal)) emit("update:modelValue", undefined);
        else emit("update:modelValue", intVal);
    }

    function incrementValue() {
        if (props.modelValue == undefined) emit("update:modelValue", 0);
        else emit("update:modelValue", props.modelValue+1);
    }

    function decrementValue() {
        if (props.modelValue == undefined) emit("update:modelValue", 0);
        else emit("update:modelValue", props.modelValue-1);
    }
</script>