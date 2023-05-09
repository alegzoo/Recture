<template>
    <v-dialog :model-value="modelValue" width="500" persistent>
        <v-card class="v-card">
            <template v-slot:title>
                <h2 class="pt-3">{{ title }}</h2>
            </template>
            <v-card-text class="pb-3">
                <span>{{ message }}</span>
            </v-card-text>
            <v-card-actions>

                <v-col class="pa-1 pl-4 pb-3" cols="6" align="center">
                    <v-btn class="delete-btn" variant="text" @click="closeDialog(true)" :color="positiveButtonColor">{{ positiveButtonText }}</v-btn>
                </v-col>

                <v-col class="pa-1 pr-4 pb-3" cols="6">
                    <v-btn class="cancel-btn" variant="text" @click="closeDialog(false)" :color="negativeButtonColor">{{ negativeButtonText }}</v-btn>
                </v-col>
                
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


<style lang="scss" scoped>



.v-card{
    background-color: #efefef;
}

.delete-btn{
    width: 999px;
    background-color: red;
    color: black !important;
    border: 2px solid black;
    box-shadow: 0px 3px 0px 0px;
}

.cancel-btn{
    width: 999px;
}

</style>