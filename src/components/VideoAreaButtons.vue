<template>
    <v-row id="buttons-video-area" align="center" align-self="center" :class="mdAndUp?'':'mx-0'" no-gutters>
        <v-col cols="12" md="auto" align="center">
            <v-btn id="upload-btn" variant="text" append-icon="mdi-download" class="px-12">
                UPLOAD
            </v-btn>
        </v-col>

        <v-col cols="12" md="auto" align="center">
            <v-btn 
                variant="text" 
                id="btn-new-theme-unit"  
                append-icon="mdi-plus-circle">
                NEW THEMATIC UNIT
            </v-btn>
        </v-col>  

        <v-col cols="12" md="auto" align="center">
            <v-btn 
                variant="text" 
                id="btn-new-question-series" 
                append-icon="mdi-plus-circle">
                NEW QUESTION SERIES
            </v-btn>
        </v-col>

        <v-col/>

        <v-col cols="12" md="auto" :align="mdAndUp?'right':'center'">
            <FilterButtonVideoArea/>
        </v-col>   
    </v-row>
</template>

<style lang="scss">

</style>

<script lang="ts" setup>
    import { useDisplay } from 'vuetify/lib/framework.mjs';
    import FilterButtonVideoArea from './FilterButtonVideoArea.vue';

    const { mdAndUp } = useDisplay();
</script>