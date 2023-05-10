<template>
    <div class="w-100 h-100 d-flex flex-column align-center justify-center">
        <template v-if="state === 'joining'">
            <v-progress-circular class="flex-grow-0" color="recture-yellow" indeterminate size="96" width="6"/>
            <h2 class="flex-grow-0 pt-5">Joining group</h2>
        </template>
        <template v-else>
            <h2 class="flex-grow-0 pb-5">{{ message }}</h2>

            <v-btn v-if="state === 'success'" variant="outlined" class="mb-5" theme="none" to="/">Continue</v-btn>
            <router-link v-else to="/">Back</router-link>
        </template>
    </div>  
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";
    @import "@/styles/mixins.scss";

    div {
        background-image: url("@/assets/bg_pattern.png");
        background-size: cover;
    }

    .v-btn {
        @include elevated-button(0px, 3px, 1px);
        background-color: $recture-yellow;
        border-radius: 4px;
        border-width: 2px;
        border-style: solid;
        border-color: black;
    }

    a {
        color: black;
    }
</style>

<script lang="ts" setup>
    import { RectureApi } from '@/api/RectureApi';
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    import status from 'http-status';

    const message = ref<string>("");
    const state = ref<"joining" | "success" | "error">("joining");

    const route = useRoute();

    if (!(route.params.code instanceof String || typeof route.params.code === "string")) {
        message.value = "This invitation is invalid.";
        state.value = "error";
    } else {
        const code = route.params.code as string

        RectureApi.useInvitation(code).then(result => {
            if (result.success) {
                message.value = "You have been successfully added to a group!";
                state.value = "success";
            } else if (result.statusCode === status.FORBIDDEN) {
                message.value = "This invitation is invalid or expired.";
                state.value = "error";
            } else if (result.statusCode === status.NOT_MODIFIED) {
                message.value = "You are already a member of this group.";
                state.value = "error";
            } else {
                message.value = "Failed to join group.";
                state.value = "error";
            }
        }).catch(reason => {
            message.value = "Failed to join group.";
            state.value = "error";
        });
    }
</script>