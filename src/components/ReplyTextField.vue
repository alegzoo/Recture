<template>
    <v-row no-gutters class="pt-1">
        <v-col class="pa-0 pl-2" cols="auto" align="center" align-self="start">
            <v-avatar class="teacher-student-avatar" size="large" image="/jano.png"></v-avatar>
        </v-col>
        <v-col cols="11" class="pa-0 pl-7">
            <v-textarea hide-details class="text-area-comment" variant="solo" row-height="15" rows="1" auto-grow label="Reply" outlined/>
        </v-col>
        <v-col cols="auto" class="pa-0 pl-2" align-self="end" align="center">
            <v-btn icon="mdi-send" variant="text"></v-btn>
        </v-col>
    </v-row>
</template>

<style>

</style>

<script lang="ts" setup>
import { ref } from "vue"

    const props = defineProps<{
        commentId: number
    }>();

    let replyText = ref ("")
    function submitReply(){

    }

</script>