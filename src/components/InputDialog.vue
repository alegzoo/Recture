<template>
    <v-dialog :model-value="modelValue" width="500" persistent>
        <v-card>
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
                        <v-text-field v-model="input" :label="inputLabel" class="py-5" hide-details/>
                    </v-col>
                </v-row>
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
        positiveButtonColor: "#00AA00",
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