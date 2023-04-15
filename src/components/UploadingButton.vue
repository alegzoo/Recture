<template>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :location="mdAndUp?'bottom left':'left'"
    >
    <template v-slot:activator="{ props }">
            <v-btn
                class="uploading-btn"
                v-bind="props"
                icon="mdi-upload"
                rounded
                :ripple="false"
                align-content="center"
            >
            </v-btn>
    </template>


    <v-card min-width="400" class="v-card-uploading">
        <v-list class="title-v-list" no-gutters>
            <v-row no-gutters>
                <v-col class="pa-0 pl-4">
                    <h4>Uploading...</h4>
                </v-col>
            </v-row>
        </v-list>

        <v-divider class="v-divider-uploading"/>

        <v-list class="v-list-items py-1">
            <v-row no-gutters class="v-row-items py-2">
                <v-col cols="auto" class="pa-0 pl-4" align-self="center" align="start">
                    <p>Definičný obor</p>
                </v-col>
                <v-spacer/>
                <v-col cols="auto" class="pa-0 pl-9" align="start" align-self="center">
                    <v-chip class="class-chip-comment px-5" size="medium" variant="text">I.C</v-chip>
                </v-col>
                <v-col cols="auto" class="pl-1 pa-0 pr-1" align="start" align-self="center">
                    <v-btn variant="plain" icon="mdi-close"></v-btn>
                </v-col>
            </v-row>

            <UploadingNewLesson/>

        </v-list>
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

.v-card-uploading{
    border-width: 2px;
    border-color: black;
    border-style: solid;
    box-shadow: none !important;
}

.v-divider-uploading{
    border-top: solid black 2px;
    opacity: 100%;
}

.class-chip-comment{
    background-color: #e24a42;
    color: white;
}



</style>

<script lang="ts" setup>

import { ref, watch } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import UploadingNewLesson from '@/components/UploadingNewLesson.vue';

const { mdAndUp } = useDisplay();

const menu = ref(false);

</script>