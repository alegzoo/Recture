<template>
    <v-row  style="background-image: url('/comment_bottom_textfield.svg')">
        <v-text-field v-model="replyText" label="Reply" outlined></v-text-field>
        <v-btn @click="submitReply" color="primary">Send</v-btn>
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