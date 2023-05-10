<template>
    <tr>
        <td class="pt-2">
            <span class="font-weight-black">{{ group.name }}</span>
            <v-tooltip text="Rename" location="end">
                <template v-slot:activator="{ props }">
                    <v-btn :ripple="false" v-bind="props" variant="plain" icon="mdi-pencil" @click="emit('rename')"/>
                </template>
            </v-tooltip>
        </td>
        <td class="text-right">
            <v-tooltip v-if="showViewMembersButton" text="View members" location="start">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="plain" icon="mdi-account-multiple" @click="emit('viewMembers')"/>
                </template>
            </v-tooltip>
            <v-tooltip text="Delete" :location="showViewMembersButton?'end':'start'">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="plain" icon="mdi-delete" @click="emit('delete')"/>
                </template>
            </v-tooltip>
        </td>
    </tr>
</template>

<script lang="ts" setup>
    import { IClass, ISubject, ITopic } from '@/api/RectureApi';

    const props = withDefaults(defineProps<{
        group: IClass | ISubject | ITopic,
        showViewMembersButton?: boolean
    }>(), {
        showViewMembersButton: true
    });

    const emit = defineEmits<{
        (e: "rename"): void,
        (e: "delete"): void,
        (e: "viewMembers"): void
    }>();
</script>