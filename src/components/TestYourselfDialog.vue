<template>
    <v-dialog :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)" class="h-100" width="900" scroll-strategy="block">
        <v-card>
            <template v-slot:title>
                <v-row no-gutters>
                    <v-col class="pa-0">
                        <h2 class="py-2 title">{{ quiz?.title }}</h2>
                    </v-col>
                </v-row>
            </template>
            <v-card-text no-gutters class="pa-0">
                <v-row no-gutters class="pt-3">
                    <v-col class="pa-0">
                        <v-divider/>
                    </v-col>

                </v-row>

                <template v-if="quiz != null && quiz.questions.length > 0">
                    <v-row no-gutters class="pt-4">
                        <v-col v-for="(question, i) in quiz.questions" :key="question.questionId" class="pa-0 pl-6" cols="auto">
                            <v-chip size="large" :class="{ 'px-6': true, 'correct': revealed && (answers[i]?.correct === true), 'incorrect': revealed && (answers[i]?.correct === false) }">{{ i+1 }}</v-chip>
                        </v-col>
                    </v-row>

                    <QuizQuestion v-for="(question, i) in quiz.questions" v-model="answers[i]" :key="question.questionId" :question="question" :question-number="i+1" :revealed="revealed"/>
                </template>
                <template v-else>
                    <v-row no-gutters>
                        <v-col class="pa-6">
                            <h3 v-if="quiz != null">This quiz does not contain any questions.</h3>
                            <h3 v-else-if="quiz === undefined">Loading...</h3>
                            <h3 v-else>Failed to load quiz.</h3>
                        </v-col>
                    </v-row>
                </template>

                <v-row no-gutters height="auto">
                    <v-col align="center" align-self="end">
                        <v-btn width="900" height="50" variant="text" :disabled="revealed" @click="revealed = true">Finish</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-overlay v-model="loadingOverlayVisible" class="align-center justify-center" contained persistent>
                <v-progress-circular class="ma-auto" color="primary" indeterminate size="64"/>
            </v-overlay>
        </v-card>
    </v-dialog>

</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";
    @import "@/styles/mixins.scss";

    .title {
        color: black;
    }

    .v-card {
        background-color: #efefef;
        border-radius: 6px;
    }

    .v-chip {
        background-color: #E2E2E2;
        border: 2px black solid;
        color: black;
    }

    .v-chip.correct {
        background-color: $recture-green;
    }

    .v-chip.incorrect {
        background-color: $recture-light-red;
    }

    .v-divider {
        border-top: dashed 3px black;
        opacity: 30%;
    }

    .v-btn {
        background-color: #00A6E2;
        color: white !important;
        font-size: large;
        font-weight: bold;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
    }
</style>

<script lang="ts" setup>
    import { ref, watch, onMounted } from 'vue';
    import { IQuiz, IQuizAnswer } from '@/api/RectureApi';
    import QuizQuestion from './QuizQuestion.vue';
    import { RectureApi } from '@/api/RectureApi';

    const props = defineProps<{
        modelValue?: boolean,
        quizId: number | undefined
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void
    }>();

    const quiz = ref<IQuiz | null | undefined>(undefined);

    const answers = ref<(IQuizAnswer | null)[]>([null]);
    const revealed = ref<boolean>(false);

    const loadingOverlayVisible = ref<boolean>(false);

    let fetchAbortController = new AbortController();

    watch(() => props.quizId, () => fetchQuiz());
    watch(() => props.modelValue, () => {
        if (props.modelValue === true) fetchQuiz()
    });
    onMounted(() => fetchQuiz());

    function fetchQuiz() {
        fetchAbortController.abort();
        fetchAbortController = new AbortController();

        quiz.value = undefined;
        answers.value = [];
        revealed.value = false;

        if (props.quizId == null) return;

        loadingOverlayVisible.value = true;

        RectureApi.getQuizById(props.quizId, fetchAbortController.signal).then(result => {
            if (result.success && result.data != null) {
                quiz.value = result.data;
                answers.value = new Array(quiz.value.questions.length).fill(null);
            } else {
                quiz.value = null;
                answers.value = [];
                revealed.value = false;
            }
        }).catch(reason => {
            if (reason.name !== "AbortError") {
                quiz.value = null;
                answers.value = [];
                revealed.value = false;
            }
        }).finally(() => {
            loadingOverlayVisible.value = false;
        });
    }
</script>