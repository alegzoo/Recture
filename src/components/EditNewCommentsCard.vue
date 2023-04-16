<template>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :location="mdAndUp?'bottom center':'left'"
    >
    <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-horizontal" align-content="center" v-bind="props" :ripple="false" variant="plain" class="reply-ignore-dots-buttons"></v-btn>
    </template>
        <v-card width="auto" no-gutters class="v-card-editing">
            <v-btn class="trash-btn" :ripple="false" variant="text" append-icon="mdi-trash-can-outline">Delete comment</v-btn>
        </v-card>
    </v-menu>
</template>

<style lang="scss" scoped>
@import "@/styles/constants.scss";

.uploading-btn{
    border-radius: 9999px;
    border: dashed 1.8px black;
    color: black;
}

.title-v-list{
    background-color: black;
    color: white;
    border: 2px solid black;
}

.uploading-text-title{
    color: black;
}

.v-card-editing{
    border-width: 2px;
    border-color: black;
    border-style: solid;
    box-shadow: none !important;
    background-color: red !important;
}

.v-divider-uploading{
    border-top: solid black 2px;
    opacity: 100%;
}

.class-chip-comment{
    background-color: red;
    color: white;
}

.delete-title{
    color: white;
}

.trash-btn{
    background-color: transparent;
    border-radius: 0px;
}

</style>

<script lang="ts" setup>

import { ref, watch } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const { mdAndUp } = useDisplay();
const menu = ref(false);

</script>