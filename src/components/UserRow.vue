<template>
    <tr>
        <td class="pt-2">
            <v-row no-gutters>
                <v-col cols="auto" align-self="center">
                    <v-avatar :image="userInfo.avatar"/>
                </v-col>
                <v-col cols="auto" align-self="center">
                    <span class="pl-3 font-weight-black">{{ userFullName }}</span>
                </v-col>
            </v-row>
        </td>
        <td class="text-right">
            <v-tooltip text="Kick" :location="'start'">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="plain" icon="mdi-account-remove" @click="emit('kick')"/>
                </template>
            </v-tooltip>
        </td>
    </tr>
</template>

<script lang="ts" setup>
    import { computed } from 'vue';
    import { IPublicUserInfo } from '@/api/RectureApi';

    const props = defineProps<{
        userInfo: IPublicUserInfo
    }>();

    const emit = defineEmits<{
        (e: "kick"): void
    }>();

    const userFullName = computed<string | null>(() => props.userInfo != null ? (props.userInfo.firstName+" "+props.userInfo.lastName) : null);
</script>