<template>
    <v-row no-gutters>
        <v-col class="pa-0 pl-6 pt-6">
            <h3>{{ questionNumber + ") " + question.content }}</h3>
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col class="pa-0 pl-3 pt-2" cols="auto">
            <v-radio-group :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)" :disabled="revealed">
                <v-radio v-for="answer in question.answers" :key="answer.answerId" :value="answer" :label="answer.content" :class="revealed ? (answer.correct ? 'correct' : 'incorrect') : undefined"/>
            </v-radio-group>
        </v-col>
    </v-row>
</template>

<style lang="scss" setup>
    @import "@/styles/constants.scss";

    .v-radio {
        opacity: 100% !important;
    }

    .v-radio.correct {
        color: $recture-green;
    }

    .v-radio.incorrect {
        color: $recture-light-red;
    }
</style>

<script lang="ts" setup>
    import { IQuizAnswer, IQuizQuestion } from '@/api/RectureApi';

    const props = defineProps<{
        modelValue?: IQuizAnswer | null,
        question: IQuizQuestion,
        questionNumber: number,
        revealed: boolean
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: IQuizAnswer | null): void
    }>();
</script>