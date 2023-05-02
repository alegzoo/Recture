<template>
    <tr>
        <td class="pt-2">
            <span class="font-weight-black">{{ invitation.subjectName }}</span>
        </td>
        <td class="pt-2">
            <span class="font-weight-black">{{ invitation.className }}</span>
        </td>
        <td class="pt-2">
            <span class="font-weight-black">{{ invitation.code }}</span>
        </td>
        <td class="pt-2">
            <span class="subtle">{{ expirationDateString }}</span>
        </td>
        <td class="pt-2">
            <span class="subtle">{{ remainingUsesString }}</span>
        </td>
        <td class="text-right">
            <v-tooltip text="Revoke" :location="'start'">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="plain" icon="mdi-close" @click="emit('revoke')"/>
                </template>
            </v-tooltip>
        </td>
    </tr>
</template>

<style lang="scss" scoped>
    span {
        font-weight: bold;
    }

    .subtle {
        color: rgba(0, 0, 0, 0.5);
    }
</style>

<script lang="ts" setup>
    import { computed } from 'vue';
    import { IInvitation, IPublicUserInfo } from '@/api/RectureApi';

    const props = defineProps<{
        invitation: IInvitation
    }>();

    const emit = defineEmits<{
        (e: "revoke"): void
    }>();

    const expirationDateString = computed<string>(() => {
        if (props.invitation.expirationTimestamp != null) return new Date(props.invitation.expirationTimestamp).toLocaleDateString(undefined, {year: "numeric", month: "numeric", day: "numeric"}).toLocaleUpperCase();
        else return "Never";
    });

    const remainingUsesString = computed<string>(() => {
        if (props.invitation.remainingUses != null) return props.invitation.remainingUses.toString();
        else return "Infinite";
    });
</script>