<template>
    <v-dialog :model-value="modelValue" width="500" persistent>
        <v-card>
            <template v-slot:title>
                <h2 class="pt-3">{{ title }}</h2>
            </template>
            <v-card-text class="pb-3">
                <span>{{ message }}</span>
            </v-card-text>
            <v-divider/>
            <v-card-actions>
                <v-spacer/>
                <v-btn variant="text" @click="closeDialog(true)" :color="positiveButtonColor">{{ positiveButtonText }}</v-btn>
                <v-spacer/>
                <v-btn variant="text" @click="closeDialog(false)" :color="negativeButtonColor">{{ negativeButtonText }}</v-btn>
                <v-spacer/>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
    const props = withDefaults(defineProps<{
        modelValue?: boolean,
        title: string,
        message: string
        positiveButtonText?: string,
        negativeButtonText?: string,
        positiveButtonColor?: string | undefined,
        negativeButtonColor?: string | undefined
    }>(), {
        title: "",
        message: "",
        positiveButtonText: "Yes",
        negativeButtonText: "No",
        positiveButtonColor: undefined,
        negativeButtonColor: undefined
    });

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void,
        (e: "optionSelected", positive: boolean): void
    }>();

    function closeDialog(result: boolean) {
        emit("update:modelValue", false);
        emit("optionSelected", result);
    }
</script>