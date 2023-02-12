<template>
    <v-container id="video-container" fluid>
        <v-row id="video-row-button">
            <v-btn-toggle id="subject-button-toggle" selected-class="selected" :model-value="[0]" mandatory>
                <SubjectButton text="MAT"/>
                <SubjectButton text="INF"/>
            </v-btn-toggle>
        </v-row>
    </v-container>
</template>

<style lang="scss">

</style>

<script lang="ts" setup>
    import SubjectButton from '@/components/SubjectButton.vue';
</script>