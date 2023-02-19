<template>
    <v-row id="buttons-video-area" class="d-flex flex-row mb-2">
        <v-btn id="upload-btn" variant="text" append-icon="mdi-download" height="40px" width="180px">
            UPLOAD
        </v-btn>
        <h3>
            NEW THEME UNIT
            <v-btn id="btn-new-theme-unit" variant="text">
            +
            </v-btn>
        </h3>
        <h3>
            NEW QUESTION SERIES
            <v-btn variant="text">
            +
            </v-btn>
        </h3>
        <v-spacer></v-spacer> 
            <FilterButtonVideoArea v-text="button"/>
    </v-row>
</template>

<style lang="scss">

</style>

<script lang="ts" setup>
import FilterButtonVideoArea from './FilterButtonVideoArea.vue';


</script>