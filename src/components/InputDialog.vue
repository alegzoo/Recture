<template>
    <v-dialog :model-value="modelValue" width="500" persistent>
        <v-card class="v-card-rename-dialog">
            <template v-slot:title>
                <h2 class="pt-3">{{ title }}</h2>
            </template>
            <v-card-text>
                <v-row v-if="message">
                    <v-col>
                        <span>{{ message }}</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field variant="underlined" single-line v-model="input" :label="inputLabel" class="py-5" hide-details/>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="pb-5" align-content="center">
                <v-spacer/>
                <v-btn variant="flat" class="positive-button" width="215" @click="closeDialog(true)" :color="positiveButtonColor">{{ positiveButtonText }}</v-btn>
                <v-spacer/>
                <v-btn variant="text" width="215" @click="closeDialog(false)" :color="negativeButtonColor">{{ negativeButtonText }}</v-btn>
                <v-spacer/>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";

    .v-table:deep(.v-table__wrapper tbody > tr) {
        outline: dashed 1px #00000033 !important;
        overflow: visible !important;
    }

    .v-table:deep(.v-table__wrapper thead > tr > th) {
        border-bottom: solid 2px black !important;
    }

    .v-card {
        background-color: #efefef;
    }

    .positive-button {
        background-color: $recture-yellow;
        color: black !important;
        border: solid 2px black;
        box-shadow: 0px 3px 0px 0px black !important;
    }
</style>

<script lang="ts" setup>
    import { ref, watch } from 'vue';

    const props = withDefaults(defineProps<{
        modelValue?: boolean,
        title: string,
        message?: string,
        inputLabel?: string,
        positiveButtonText?: string,
        negativeButtonText?: string,
        positiveButtonColor?: string | undefined,
        negativeButtonColor?: string | undefined
    }>(), {
        title: "",
        message: undefined,
        inputLabel: "",
        positiveButtonText: "Confirm",
        negativeButtonText: "Cancel",
        positiveButtonColor: undefined,
        negativeButtonColor: undefined
    });

    const input = ref<string>("");

    watch(() => props.modelValue, value => {
        if (value === true) input.value = "";
    });

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void,
        (e: "inputEntered", positive: boolean, input: string): void
    }>();

    function closeDialog(result: boolean) {
        emit("update:modelValue", false);
        emit("inputEntered", result, input.value);
    }
</script>