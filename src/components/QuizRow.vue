<template>
    <tr>
        <td class="pt-2">
            <span class="font-weight-black">{{ quiz.title }}</span>
            <v-chip variant="flat" class="px-4 ml-4" :text="quiz.subjectName"/>
            <v-tooltip text="Change title / subject" location="end">
                <template v-slot:activator="{ props }">
                    <v-btn :ripple="false" v-bind="props" variant="plain" icon="mdi-pencil" @click="emit('rename')"/>
                </template>
            </v-tooltip>
        </td>
        <td class="text-right" >
            <v-tooltip text="Edit questions" location="start">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="plain" icon="mdi-puzzle-edit" @click="emit('edit')"/>
                </template>
            </v-tooltip>
            <v-tooltip text="Delete" location="end">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="plain" icon="mdi-delete" @click="emit('delete')"/>
                </template>
            </v-tooltip>
        </td>
    </tr>
</template>

<style lang="scss" scoped>
    .v-chip {
        background-color: black;
        color: white;
    }
</style>

<script lang="ts" setup>
    import { IQuiz } from '@/api/RectureApi';
    const props = defineProps<{
        quiz: IQuiz
    }>();

    const emit = defineEmits<{
        (e: "rename"): void,
        (e: "delete"): void,
        (e: "edit"): void
    }>();
</script>