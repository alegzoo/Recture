<template>
    <v-toolbar id="topbar" height="58">
        <v-container id="topbar-panel" fluid>
            <v-row no-gutters align-content="center" justify="center" class="h-100 overflow-hidden">
                <v-col v-show="router.currentRoute.value.name !== 'videoBrowser' || smAndUp" sm="3" align-self="center" class="h-100">
                    <FloatingAvatar v-show="router.currentRoute.value.name === 'videoBrowser' && smAndUp"/>
                </v-col>
                <v-col :cols="smAndUp?'':6" :align="smAndUp?'center':'start'" align-self="center">
                    <v-responsive width="165" :aspect-ratio="1">
                        <router-link to="/">
                            <img src="@/assets/typeface_recture_logo.svg" style="width: 100%; height: 100%;"/>
                        </router-link>
                    </v-responsive>
                </v-col>
                <v-col sm="3" align-self="center" class="h-100">
                    <v-row v-if="accountStore.teacher" no-gutters align-content="center" justify="center" class="h-100">
                        <v-col align="center" align-self="center">
                            <UploadTrackerMenuButton id="upload-tracker-menu-button"/>
                            <UploadTrackerMenu activator="#upload-tracker-menu-button"/>
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
    import router from '@/router';
    import { useAccountStore } from '@/stores/useAccountStore';
    import { useDisplay } from 'vuetify/lib/framework.mjs';
    import FloatingAvatar from './FloatingAvatar.vue';
    import UploadTrackerMenu from './UploadTrackerMenu.vue';
    import UploadTrackerMenuButton from './UploadTrackerMenuButton.vue';

    const accountStore = useAccountStore();

    const { smAndUp } = useDisplay();
</script>