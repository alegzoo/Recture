<template>
    <v-dialog :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)" class="h-100 justify-center" width="700" scroll-strategy="block">
        <v-card>
            <template v-slot:title>
                <h2 class="pt-2">NEW CONDITION</h2>
            </template>
            <v-card-text no-gutters class="pa-0">
                <v-form validate-on="input" @submit.prevent="submitHandler">
                    <v-row no-gutters class="pa-0">
                        <v-col class="px-6 py-4">
                            <v-row no-gutters>
                                <v-col class="subtle">
                                    <h4>Give your new condition a title:</h4>
                                </v-col>
                            </v-row>

                            <v-row no-gutters>
                                <v-col cols="12">
                                    <v-text-field v-model="title" :rules="[validateField]" variant="underlined" label="Title" single-line/>
                                </v-col>
                            </v-row>

                            <v-row no-gutters>
                                <v-col class="subtle pt-3" cols="12">
                                    <h4>Write an exact description of your condition:</h4>
                                </v-col>
                                <v-col class="subtle" cols="12">
                                    <p class="text-subtitle-2">(make sure to list everyone it applies to and remember to think about possible edge cases)</p>
                                </v-col>
                            </v-row>

                            <v-row no-gutters>
                                <v-col cols="12" class="pt-3">
                                    <v-textarea v-model="content" :rules="[validateField]" variant="outlined" placeholder="Your description..."/>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>

                    <v-row no-gutters height="auto">
                        <v-col align="center" align-self="end">
                            <v-btn type="submit" class="w-100" height="50" variant="text">CREATE</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>

            <v-overlay v-model="loadingOverlayVisible" class="align-center justify-center" contained persistent>
                <v-progress-circular class="ma-auto" color="primary" indeterminate size="64"/>
            </v-overlay>
        </v-card>
    </v-dialog>
    <MessageDialog v-model="errorDialogVisible" title="ERROR" message="Failed to create condition."/>
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";
    @import "@/styles/mixins.scss";

    .v-card {
        background-color: #efefef;
        border-radius: 6px;
    }

    .subtle {
        color: black;
        opacity: 50%;
    }

    .v-btn[type="submit"] {
        background-color: #5CB978;
        color: white !important;
        font-size: large;
        font-weight: bold;
        border-radius: 0px;
    }
</style>

<script lang="ts" setup>
    import { RectureApi } from '@/api/RectureApi';
    import { ref, watch } from 'vue';
    import MessageDialog from './MessageDialog.vue';

    const props = defineProps<{
        modelValue?: boolean
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void,
        (e: "dataModified"): void
    }>();

    watch(() => props.modelValue, () => {
        if (props.modelValue === true) {
            title.value = "";
            content.value = "";
            errorDialogVisible.value = false;
            loadingOverlayVisible.value = false;
        }
    })

    const title = ref<string>("");
    const content = ref<string>("");

    const errorDialogVisible = ref<boolean>(false);
    const loadingOverlayVisible = ref<boolean>(false);

    function validateField(val: string): boolean | string {
        if (val.length > 0) return true;
        else return "This field is required.";
    }

    function submitHandler() {
        if (validateField(title.value) !== true || validateField(content.value) !== true) return;
        
        loadingOverlayVisible.value = true;

        RectureApi.createPolicy(title.value, content.value).then(result => {
            if (result.success) {
                emit("dataModified");
                emit("update:modelValue", false);
            } else errorDialogVisible.value = true;
        }).catch(reason => {
            errorDialogVisible.value = true;
        }).finally(() => {
            loadingOverlayVisible.value = false;
        });
    }
</script>