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
                <v-btn variant="text" @click="closeDialog()" :color="closeButtonColor">{{ closeButtonText }}</v-btn>
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
        closeButtonText?: string,
        closeButtonColor?: string | undefined,
    }>(), {
        title: "",
        message: "",
        closeButtonText: "OK",
        closeButtonColor: undefined
    });

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void,
    }>();

    function closeDialog() {
        emit("update:modelValue", false);
    }
</script>