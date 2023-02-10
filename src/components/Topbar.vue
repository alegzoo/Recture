<template>
    <v-toolbar id="topbar" height="60">
        <v-container id="topbar-panel" class="overflow-hidden" fluid>
            <v-row no-gutters align-content="center" justify="center" class="h-100">
                <v-col v-show="smAndUp" cols="2" align="left" align-self="center">
                    <v-img id= "topbar-logo" src="@/assets/typeface_recture_logo.svg" width="165"></v-img>
                </v-col>
                <v-col align-self="center" class="px-1">
                    <Searchbar/>
                </v-col>
                <v-col :cols="smAndUp?2:'auto'" align-self="center" class="h-100">
                    <v-container fluid class="h-100 pa-0">
                        <v-row no-gutters align-content="center" justify="center" class="h-100">
                            <v-col align="center" align-self="center">
                                <v-icon v-show="mdAndUp" icon="mdi-upload" class="pa-5" style="border-radius: 9999px; border: dashed 1px white;"></v-icon>
                            </v-col>
                            <v-col cols="auto" align="right" align-self="center" class="h-100">
                                <v-sheet width="60" height="60" align="center" class="rounded-bs-pill" theme="light">
                                    <v-icon icon="mdi-message-text-outline" class="ml-3 pt-5"></v-icon>
                                </v-sheet>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
    </v-toolbar>
</template>

<style lang="scss">

</style>

<script lang="ts" setup>
    import { useDisplay } from 'vuetify/lib/framework.mjs';
    import Searchbar from './SearchBar.vue';
    const { mdAndUp, smAndUp } = useDisplay();
</script>