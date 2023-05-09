<template>
    <v-row class="pb-1 pt-8" no-gutters>
        <v-col cols="12">
            <p class="text-h4 font-weight-medium">Teacher's terms and conditions</p>
        </v-col>
    </v-row>

    <v-row class="pt-1 pb-5" no-gutters>
        <v-col cols="auto" class="h-100" align-self="center">
            <v-icon icon="mdi-information"/>
        </v-col>
        <v-col cols="auto" class="h-100 pl-2" align-self="center">
            <p>Conditions listed hereunder apply to all of this teacher's uploaded recordings and can be viewed by their students</p>
        </v-col>
    </v-row>

    <template v-for="policy in policies" :key="policy.policyId">
        <v-row align="center" justify="center" class="policy px-6 py-5 mb-5" no-gutters>
            <v-col cols="12" class="d-flex">
                <h1 class="flex-grow-1">{{ policy.title }}</h1>
                <v-tooltip v-if="editable" location="start" text="Delete condition" class="spiked-tr">
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" icon="mdi-delete" variant="plain" class="flex-grow-0"/>
                    </template>
                </v-tooltip>
            </v-col>
            <v-col cols="12" class="pt-3">
                <p>{{ policy.content }}</p>
            </v-col>
        </v-row>
    </template>

    <template v-if="policies === null">
        <v-row no-gutters class="pt-5 pb-8">
            <v-col>
                <h4>Failed to load conditions.</h4>
            </v-col>
        </v-row>
    </template>
    <template v-else-if="policies === undefined">
        <v-row no-gutters class="pt-5 pb-8">
            <v-col align="center" align-self="center">
                <v-progress-circular
                    class="ma-auto"
                    indeterminate
                    size="48"
                ></v-progress-circular>
            </v-col>
        </v-row>
    </template>
    <template v-else-if="policies.length === 0">
        <v-row no-gutters class="pt-5 pb-8">
            <v-col>
                <h4>This teacher has not set any conditions.</h4>
            </v-col>
        </v-row>
    </template>

    <v-row v-if="editable" align="center" justify="start" no-gutters>
        <v-col cols="auto">
            <v-tooltip v-if="editable" location="end" text="Create new condition" class="spiked-tl">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" icon="mdi-plus" class="new-policy-button" variant="flat" @click="newPolicyDialogVisible = true"/>
                </template>
            </v-tooltip>
        </v-col>
    </v-row>

    <NewPolicyDialog v-model="newPolicyDialogVisible" @data-modified="fetchPolicies()"/>
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";
    @import "@/styles/mixins.scss";

    .policy {
        background-color: transparent;
        border: dashed 4px rgba(0, 0, 0, 0.12);
    }

    .new-policy-button {
        @include elevated-button(3px, 3px, 1px);
        background-color: $recture-yellow;
        color: black;
        border-radius: 9999px;
        border-color: black;
        border-style: solid;
        border-width: 2px;
    }
</style>

<script lang="ts" setup>
    import { ref, watch, onMounted } from 'vue';
    import { IPolicy, RectureApi } from '@/api/RectureApi';
    import NewPolicyDialog from './NewPolicyDialog.vue';

    const props = defineProps<{
        teacherId: number,
        editable: boolean
    }>();

    const policies = ref<IPolicy[] | null | undefined>(undefined);

    const newPolicyDialogVisible = ref<boolean>(false);

    let fetchAbortController = new AbortController();

    watch(() => props.teacherId, () => fetchPolicies());
    onMounted(() => fetchPolicies());

    function fetchPolicies() {
        fetchAbortController.abort();
        fetchAbortController = new AbortController();

        policies.value = undefined;

        RectureApi.getPoliciesByTeacher(props.teacherId, fetchAbortController.signal).then(result => {
            if (result.success && result.data != null) policies.value = result.data;
            else policies.value = null;
        }).catch(reason => {
            if (reason.name !== "AbortError") policies.value = null;
        });
    }
</script>