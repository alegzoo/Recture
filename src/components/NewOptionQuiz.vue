<template>
    <v-col cols="auto" class="pl-6 pr-3" align-self="center" align="center">
        <v-radio value="0" hide-details color="success"/>
    </v-col>

    <v-col class="pr-0" align-self="center" align="center">
        <v-textarea variant="outlined" label="Second option" rows="1" row-height="5" auto-grow hide-details></v-textarea>
    </v-col>

    <v-col cols="auto" class="pa-0 px-2" disabled align-self="center" align="center">
        <v-btn :disabled="false" icon="mdi-close" variant="plain"/>
    </v-col>

</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>

</script>