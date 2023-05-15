<template>
    <tr>
        <td class="pt-2 text-left d-flex align-center">
            <v-checkbox-btn v-model="correct" :disabled="updatingCorrect" class="pr-2" density="compact" color="success" inline @update:model-value="updateCorrect()"/>
            <span class="font-weight-black">{{ answer.content }}</span>
            <v-tooltip text="Rename" location="end">
                <template v-slot:activator="{ props }">
                    <v-btn :ripple="false" v-bind="props" variant="plain" icon="mdi-pencil" @click="emit('rename')"/>
                </template>
            </v-tooltip>
        </td>
        <td class="pt-2 text-right">
            <v-tooltip text="Delete answer" location="start">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="plain" size="default" icon="mdi-delete" @click="emit('delete')"/>
                </template>
            </v-tooltip>
        </td>
    </tr>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
    import { ref, watch, onMounted } from 'vue';
    import { IQuizAnswer, RectureApi } from '@/api/RectureApi';

    const props = defineProps<{
        answer: IQuizAnswer
    }>();

    const emit = defineEmits<{
        (e: "rename"): void,
        (e: "delete"): void
    }>();

    const correct = ref<boolean>(false);
    const updatingCorrect = ref<boolean>(false);

    watch(() => props.answer, () => loadData());
    onMounted(() => loadData());

    function loadData() {
        correct.value = props.answer.correct;
    }

    function updateCorrect() {
        if (updatingCorrect.value !== false) return;

        updatingCorrect.value = true;

        const val = updatingCorrect.value;

        RectureApi.updateQuizAnswer(props.answer.answerId, null, val).then(result => {
            if (result.success) props.answer.correct = val;
            else {
                correct.value = props.answer.correct;
            }
        }).catch(reason => {
            correct.value = props.answer.correct;
        }).finally(() => {
            updatingCorrect.value = false;
        });
    }
</script>