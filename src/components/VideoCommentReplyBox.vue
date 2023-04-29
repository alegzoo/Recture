<template>
    <v-row class="reply-box">
        <v-col class="pr-5">
            <v-row no-gutters>
                <v-col cols="auto" align-self="start">
                    <v-avatar size="large" :image="(accountStore.avatar as string)"/>
                </v-col>    
                <v-col align-self="center">
                    <v-textarea :disabled="disabledAndLoading" :loading="disabledAndLoading" v-model="replyText" class="ml-5" label="Your reply..." variant="outlined" row-height="10" rows="1" :hint="hint" persistent-hint auto-grow/>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-spacer/>
                <v-col align-self="center" align="center" cols="auto">
                    <v-btn :disabled="disabledAndLoading" class="cancel-button" variant="text" height="36" @click="emit('cancelButtonClick')">Cancel</v-btn>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="auto" align-self="end">
            <v-btn :disabled="disabledAndLoading" variant="plain" height="36" :ripple="false" theme="light" icon="mdi-send" @click="emit('postButtonClick', replyText)"/>
        </v-col>
    </v-row>
</template>

<style lang="scss" scoped>
    .reply-box > .v-col:first-child {
        padding-left: 80px;
    }

    .v-avatar {
        border-width: 2px;
        border-color: black;
        border-style: solid;
    }

    .cancel-button {
        background-color: black;
        color: white;
    }

    .v-btn {
        opacity: 100%;
    }
</style>

<script lang="ts" setup>
    import { ref, computed } from 'vue';
    import { useAccountStore } from '@/stores/useAccountStore';
    import { ICommentReply } from '@/api/RectureApi';

    const props = defineProps<{
        replyingTo: ICommentReply | null,
        disabledAndLoading: boolean
    }>();

    const emit = defineEmits<{
        (e: "postButtonClick", replyText: string): void
        (e: "cancelButtonClick"): void
    }>();

    const accountStore = useAccountStore();

    const replyText = ref<string>("");

    const hint = computed<string | undefined>(() => props.replyingTo != null ? ("Replying to "+props.replyingTo.userFirstName+" "+props.replyingTo.userLastName) : undefined);
</script>