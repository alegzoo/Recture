<template>
    <v-container id="video-container" fluid>
        <v-row id="video-row-button" style="align-items: flex-start;">
                <v-item-group>
                    <SubjectButton></SubjectButton>
                </v-item-group>
        </v-row>
    </v-container>
</template>

<style lang="scss">

</style>

<script lang="ts" setup>
    import SubjectButton from '@/components/SubjectButton.vue';
</script>