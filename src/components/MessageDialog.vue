<template>
    <v-dialog :model-value="modelValue" width="500" persistent>
        <v-card class="v-card">
            <template v-slot:title>
                <h2 class="pt-3">{{ title }}</h2>
            </template>
            <v-card-text class="pb-3">
                <span>{{ message }}</span>
            </v-card-text>
                <v-col class="pa-0 pb-4 px-4" cols="auto" align="center">
                    <v-card-actions>
                        <v-btn class="ok-btn" variant="text" @click="closeDialog()" :color="closeButtonColor">{{ closeButtonText }}</v-btn>
                    </v-card-actions>    
                </v-col>
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


.v-card{
    background-color: #efefef;
}


.ok-btn{
    width: 999px;
    background-color: $recture-yellow;
    color: black !important;
    border: 2px solid black;
    box-shadow: 0px 3px 0px 0px;
}
</style>