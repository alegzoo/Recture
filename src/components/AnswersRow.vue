<template>
    <tr>
        <td class="pt-2 text-left">
            <span class="font-weight-black">{{ answers.content }}</span>
        </td>
        <td class="pt-2 text-right">
            <v-tooltip text="Rename answer" location="bottom">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="plain" icon="mdi-pencil" @click="emit('rename')"/>
                </template>
            </v-tooltip>
            <v-tooltip text="Delete answer" location="bottom">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="plain" size="default" icon="mdi-delete" @click="emit('delete')"/>
                </template>
            </v-tooltip>
        </td>
    </tr>
</template>

<style lang="scss" scoped>
.td .v-checkbox .v-input__slot * {
    padding: 0px !important;
}
</style>

<script lang="ts" setup>
    import { IQuizAnswer } from '@/api/RectureApi';

    const props = defineProps<{
        answers: IQuizAnswer
    }>();

    const emit = defineEmits<{
        (e: "rename"): void,
        (e: "delete"): void,
        (e: "edit"): void,
    }>();
</script>