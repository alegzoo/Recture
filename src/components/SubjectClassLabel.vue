<template>
    <v-row class="pa-0">
        <v-col cols="auto" align="center" align-self="center" class="py-2">{{ subjectName }}</v-col>
        <v-col cols="auto" align="center" align-self="center" class="px-5 py-2">{{ className }}</v-col>                                
    </v-row>   
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";

    .v-row, .v-col:last-child {
        font-weight: bold;
    }

    .v-row {
        box-shadow: 4px 4px 0px 0px black;
        background-color: $recture-yellow;
        border-radius: 2500px 9999px 9999px 2500px;
        color: black;
        border: solid 2px black;
        overflow: hidden;
    }

    .v-col:last-child {
        background-color: #e24a42;
        border-radius: 9999px;
        color: white;
        box-shadow: 0px 0px 0px 2px black;
    }
</style>

<script lang="ts" setup>
    const props = defineProps<{
        subjectName: string,
        className: string
    }>();
</script>