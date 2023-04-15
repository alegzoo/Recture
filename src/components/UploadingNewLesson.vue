<template>

    <v-divider class="v-divider-uploading"/>

    <v-row no-gutters class="v-row-items py-2">
        <v-col cols="auto" class="pa-0 pl-4" align-self="center" align="start">
            <p>Postupnosti</p>
        </v-col>
        <v-spacer/>
        <v-col cols="auto" class="pa-0 pl-9" align="start" align-self="center">
            <v-chip class="class-chip-comment px-5" size="medium" variant="text">oktáva A</v-chip>
        </v-col>
        <v-col cols="auto" class="pl-1 pa-0 pr-1" align="start" align-self="center">
            <v-btn variant="plain" icon="mdi-close"></v-btn>
        </v-col>
    </v-row>

</template>

<style lang="scss" scoped>

.v-divider-uploading{
    border-top: dashed black 2px;
}

.class-chip-comment{
    background-color: #4eadb9;
    color: white;
}

</style>

<script lang="ts" setup>

</script>