<template>
    <v-navigation-drawer id="sidebar" width="70" permanent floating>
        <v-list id="sidebar-panel" width="60" density="compact" nav>
            <v-list-item>
                <v-responsive :aspect-ratio="1">
                    <v-avatar size="38px" style="border-style: solid; border-color:black; border-width:2px">
                        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"/>
                    </v-avatar>
                </v-responsive>
                <v-tooltip
                    activator="parent"
                    location="end"
                    >johndoe@example.gov
                </v-tooltip>
            </v-list-item>
            <SidebarButton icon="mdi-home" text="Home" to="/"/>
            <SidebarButton icon="mdi-file-document" text="My T&C" to="/account/terms"/>
            <v-divider></v-divider>
            <SidebarButton icon="mdi-logout" text="Sign out" @click="signOut"/>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts" setup>
    import { RectureApi } from '@/api/RectureApi';
    import { Stores } from '@/stores/Stores';
    import router from '@/router';
    import SidebarButton from './SidebarButton.vue';

    function signOut() {
        RectureApi.signOut().then(function (response) {
            if (response.ok) {
                Stores.resetAllStores();
                router.push("/signin");
            }
        });
    }
</script>

<style>

</style>