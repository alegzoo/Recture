<template>
    <v-row id="buttons-video-area" align="center" align-self="center" no-gutters>
        <v-col cols="auto" class="h-100">
            <v-btn id="upload-btn" class="h-100" variant="text" append-icon="mdi-download" width="180px">
                UPLOAD
            </v-btn>
        </v-col>

        <v-col cols="auto" class="h-100" align="center">
            <v-btn 
                variant="text" 
                id="btn-new-theme-unit"  
                append-icon="mdi-plus-circle">
                NEW THEMATIC UNIT
            </v-btn>
        </v-col>  

        <v-col cols="auto" class="h-100" align="center">
            <v-btn 
                variant="text" 
                id="btn-new-question-series" 
                append-icon="mdi-plus-circle">
                NEW QUESTION SERIES
            </v-btn>
        </v-col>

        <v-col align="right" no gutters px="0" mx="0" class="h-100">
            <FilterButtonVideoArea class="h-100"/>
        </v-col>   
    </v-row>
</template>

<style lang="scss">

</style>

<script lang="ts" setup>
    import FilterButtonVideoArea from './FilterButtonVideoArea.vue';
</script>