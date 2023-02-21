<template>
    <v-container class="h-100" fluid>
        <v-row class="h-100">
            <v-col cols="12" align="center" align-self="center">
                <p class="text-h5 text-md-h3">This page doesn't exist.</p>
                <v-btn theme="dark" class="mt-6" @click="router.back">Go back</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
    import router from '@/router';
</script>