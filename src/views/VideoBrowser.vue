<template>
    <v-container id="video-container" fluid>
        <v-row id="video-row-button">
            <v-btn-toggle id="subject-button-toggle" selected-class="selected" :model-value="[0]" mandatory>
                <SubjectButton text="MAT"/>
                <SubjectButton text="INF"/>
            </v-btn-toggle>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <h1 style="text-align: center;">{{ videoBrowserStore.welcomeText.primary }}</h1>
            </v-col>
            <v-col cols="12" md="6">
                <h2 style="text-align: center;">{{ videoBrowserStore.welcomeText.secondary }}</h2>
            </v-col>
        </v-row>
        <v-row class="pa-4">
            <template v-for="recording in videoBrowserStore.recordings" :key="recording.recordingId">
                <v-col cols="12" sm="6" md="4" lg="3" xxl="2" class="pa-1">
                    <VideoBox :recording="recording"/>
                </v-col>
            </template>
        </v-row>
    </v-container>
</template>

<style lang="scss">

</style>

<script lang="ts" setup>
    import { useAccountStore } from '@/stores/useAccountStore';
    import { useVideoBrowserStore } from '@/stores/useVideoBrowserStore';
    import SubjectButton from '@/components/SubjectButton.vue';
    import VideoBox from '@/components/VideoBox.vue';

    const accountStore = useAccountStore();
    const videoBrowserStore = useVideoBrowserStore();

    videoBrowserStore.fetchRecordings(0);

    videoBrowserStore.clearWelcomeText();
    accountStore.$subscribe((mutation, state) => {
        videoBrowserStore.formatWelcomeText();
    });
    videoBrowserStore.generateWelcomeText();
</script>