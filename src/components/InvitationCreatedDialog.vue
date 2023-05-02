<template>
    <v-dialog :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)" width="600" scroll-strategy="block" persistent>
        <v-card>
            <template v-slot:title>
                <h2 class="pt-3">INVITATION CREATED</h2>
            </template>
            <v-card-text class="pa-0">
                <v-row no-gutters class="pa-0">
                    <v-col class="px-5">
                        <v-row no-gutters class="pt-4">
                            <v-col class="subtle pl-1">
                                <h4>Subject and class</h4>
                            </v-col>
                        </v-row>

                        <v-row class="pl-4 pt-5" align="center" no-gutters>
                            <v-col cols="auto" class="pr-0">
                                <SubjectClassLabel :subject-name="subjectName" :class-name="className"/>
                            </v-col>
                        </v-row>

                        <v-row class="px-1 pt-12" no-gutters>
                            <v-col cols="auto" align-self="center">
                                <div class="text-h4 font-weight-bold">{{ code }}</div>
                            </v-col>

                            <v-col align-self="center" cols="auto">
                                <v-btn variant="plain" icon="mdi-content-copy" class="copy-button" :ripple="false" @click="copyCodeToClipboard"/>
                            </v-col>

                            <v-spacer></v-spacer>

                            <v-col cols="auto" align-self="center">
                                <v-btn variant="text" class="share-button" append-icon="mdi-send" theme="light" :ripple="false">SEND INVITATION</v-btn>
                            </v-col>
                        </v-row>

                        <v-row class="pt-5" no-gutters>
                            <v-col>
                                <v-text-field :model-value="link" label="Invite link" append-inner-icon="mdi-content-copy" variant="outlined" readonly hide-details @click:append-inner="copyLinkToClipboard"/>
                            </v-col>
                        </v-row>

                        <v-row v-show="alertBody != null" no-gutters>
                            <v-col>
                                <v-alert density="compact" :type="alertType" align="left" :text="(alertBody as string)" class="my-5">
                                    <template v-slot:append>
                                        <v-btn icon="mdi-close" class="w-100 h-100" variant="text" @click="alertBody = null"/>
                                    </template>
                                </v-alert>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn variant="text" @click="emit('update:modelValue', false)">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";

    .v-card {
        background-color: #efefef;;
    }

    .subtle {
        color: rgba(0, 0, 0, 0.5);
    }

    .copy-button {
        font-size: large;
    }

    .share-button {
        background-color: $recture-bright-blue;
        color: white !important;
        rotate: 90;
    }

    .share-button .v-icon {
        transform: rotate(-45deg);
    }
</style>

<script lang="ts" setup>
    import { ref, watch, onMounted } from 'vue';
    import SubjectClassLabel from './SubjectClassLabel.vue';
    
    const props = defineProps<{
        modelValue?: boolean,
        subjectName: string,
        className: string,
        code: string | undefined,
        link: string | undefined
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void
    }>();
    
    const alertType = ref<"success" | "error">("error");
    const alertBody = ref<string | null>(null);

    watch(() => [props.modelValue], () => {
        if (props.modelValue === true) initialize();
    });
    onMounted(() => initialize());

    function initialize() {
        alertBody.value = null;
        alertType.value = "error";
    }

    function copyCodeToClipboard() {
        //TODO: Check if it works once HTTPS is enabled
        if (navigator.clipboard && props.code != null) {
            navigator.clipboard.writeText(props.code);
            alertType.value = "success";
            alertBody.value = "Copied code to clipboard!";
        } else {
            alertType.value = "error";
            alertBody.value = "Failed to copy code!";
        }
    }

    function copyLinkToClipboard() {
        //TODO: Check if it works once HTTPS is enabled
        if (navigator.clipboard && props.link != null) {
            navigator.clipboard.writeText(props.link);
            alertType.value = "success";
            alertBody.value = "Copied link to clipboard!";
        } else {
            alertType.value = "error";
            alertBody.value = "Failed to copy link!";
        }
    }
</script>