<template>
    <v-toolbar id="topbar" height="58">
        <v-container id="topbar-panel" class="overflow-hidden" fluid>
            <v-row no-gutters align-content="center" justify="center" class="h-100">
                <v-col :cols="smAndUp?3:''" align-self="center" class="h-100"/>
                <v-col :cols="smAndUp?'':6" align="center" align-self="center">
                    <v-img id="topbar-logo" src="@/assets/typeface_recture_logo.svg" width="165" :aspect-ratio="1"/>
                </v-col>
                <v-col :cols="smAndUp?3:''" align-self="center" class="h-100">
                    <v-row no-gutters align-content="center" justify="center" class="h-100">
                        <v-col align="center" align-self="center">
                            <v-icon v-show="smAndUp" icon="mdi-upload" class="pa-5" style="border-radius: 9999px; border: dashed 1.8px black; color: black;"/>
                        </v-col>
                        <v-col cols="auto" align="right" align-self="center" class="h-100">
                            <v-sheet width="60" height="60" align="center" class="rounded-bs-pill" theme="dark">
                                <v-icon icon="mdi-message-text-outline" class="ml-3 pt-5" style="color: white;"></v-icon>
                            </v-sheet>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-toolbar>
</template>

<style lang="scss">

</style>

<script lang="ts" setup>
    import { useDisplay } from 'vuetify/lib/framework.mjs';
    const { smAndUp } = useDisplay();
</script>