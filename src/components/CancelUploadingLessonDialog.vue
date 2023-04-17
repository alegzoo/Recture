<template>
    <v-dialog v-model="showCancelUploadingLessonDialog" class="h-100 justify-center" width="300" scroll-strategy="block">
        <v-card class="new-question-series-card">
            <template v-slot:title>
                <v-row no-gutters>
                    <v-col class="pa-0">
                        <h2 class="pt-3">ARE YOU SURE ?</h2>
                    </v-col>
                </v-row>
            </template>

            <v-card-text no-gutters class="pa-0 pt-4">
                <v-row no-gutters>
                    <v-col class="pa-0">
                        <h4>With clicking Stop you will stop uploading lesson Definičný obor</h4>
                    </v-col>
                    <v-col class="pa-0">
                        <v-btn>Stop</v-btn>
                    </v-col>
                    <v-col class="pa-0">
                        <v-btn>Cancel</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts" setup>
import { ref } from 'vue';
const showCancelUploadingLessonDialog = ref<boolean>(false);

</script>