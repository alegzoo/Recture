<template>
    <v-toolbar id="topbar" height="58">
        <v-container id="topbar-panel" fluid>
            <v-row no-gutters align-content="center" justify="center" class="h-100 overflow-hidden">
                <v-col :cols="smAndUp?3:''" align-self="center" class="h-100">
                    <FloatingAvatar/>
                </v-col>
                <v-col :cols="smAndUp?'':6" align="center" align-self="center">
                    <v-responsive width="165" :aspect-ratio="1">
                        <router-link to="/">
                            <img src="@/assets/typeface_recture_logo.svg" style="width: 100%; height: 100%;"/>
                        </router-link>
                    </v-responsive>
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
    import FloatingAvatar from './FloatingAvatar.vue';
    const { smAndUp } = useDisplay();
</script>