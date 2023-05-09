<template>
    <v-dialog :model-value="modelValue" width="500" persistent>
        <v-card>
            <template v-slot:title>
                <h2 class="pt-3">{{ title }}</h2>
            </template>
            <v-card-text class="pb-3">
                <span>{{ message }}</span>
            </v-card-text>
            <v-card-actions class="px-5 pb-5">
                <v-btn variant="flat" class="w-100" @click="closeDialog()" :color="closeButtonColor">{{ closeButtonText }}</v-btn>
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

<style lang="scss" scoped>
    @import "@/styles/constants.scss";

    .v-card {
        background-color: #efefef;
    }

    .v-btn {
        background-color: $recture-yellow;
        color: black !important;
        border: solid 2px black;
        box-shadow: 0px 3px 0px 0px black;
    }
</style>