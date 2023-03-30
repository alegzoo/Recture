<template>
    <v-col class="timetable-grid-cell">
        <v-row no-gutters class="h-100">
            <v-col align-self="center">
                <v-icon icon="mdi-plus" size="32"/>
                <p v-show="smAndUp">CREATE LESSON</p>
            </v-col>
        </v-row>
    </v-col>
</template>

<script lang="ts" setup>
    import { useDisplay } from 'vuetify/lib/framework.mjs';

    const { smAndUp } = useDisplay();
</script>