<template>
    <v-col :class="{'timetable-grid-cell': true, 'selected': selected}">
        <v-row no-gutters class="h-100">
            <v-col align-self="center">
                <template v-if="interactive">
                    <template v-if="selected">
                        <v-icon icon="mdi-check" size="32"/>
                    </template>
                    <template v-else>
                        <v-icon icon="mdi-plus" size="32"/>
                        <p v-show="smAndUp">CREATE LESSON</p>
                    </template>
                </template>
            </v-col>
        </v-row>
    </v-col>
</template>

<script lang="ts" setup>
    import { useDisplay } from 'vuetify/lib/framework.mjs';

    const { smAndUp } = useDisplay();

    const props = withDefaults(defineProps<{
        selected: boolean,
        interactive: boolean
    }>(), {
        selected: false,
        interactive: false
    });
</script>