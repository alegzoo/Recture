<template>
    <tr>
        <td class="pt-2 text-left">
            <span class="font-weight-black">{{ question.content }}</span>
        </td>
        <td class="pt-2 text-right">
            <v-tooltip text="Rename question" location="bottom">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="plain" icon="mdi-pencil" @click="emit('rename')"/>
                </template>
            </v-tooltip>
            <v-tooltip text="Edit answers to the question" location="bottom">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" class="edit-answers" variant="plain" size="default" icon="mdi-text-box-edit" @click="emit('edit')"/>
                </template>
            </v-tooltip>
            <v-tooltip text="Delete question" location="bottom">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="plain" size="default" icon="mdi-delete" @click="emit('delete')"/>
                </template>
            </v-tooltip>
        </td>
    </tr>
</template>

<script lang="ts" setup>
    import { IQuizQuestion } from '@/api/RectureApi';

    const props = defineProps<{
        question: IQuizQuestion
    }>();

    const emit = defineEmits<{
        (e: "rename"): void,
        (e: "delete"): void,
        (e: "edit"): void,
    }>();
</script>