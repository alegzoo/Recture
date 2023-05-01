<template>
    <MenuButton @click="homeStore.sidebarVisible = !homeStore.sidebarVisible"/>
    <Sidebar v-model="homeStore.sidebarVisible"/>
    <Topbar/>
    <v-container id="home-content" :class="homeStore.sidebarVisible?'':'full'" fluid>
        <router-view/>
    </v-container>
</template>

<script lang="ts" setup>
    import { useHomeStore } from '@/stores/useHomeStore';
    import { useAccountStore } from '@/stores/useAccountStore';
    import { useUploadStore } from '@/stores/useUploadStore';

    import MenuButton from '@/components/MenuButton.vue';
    import Sidebar from '@/components/Sidebar.vue';
    import Topbar from '@/components/Topbar.vue';

    const homeStore = useHomeStore();
    const accountStore = useAccountStore();
    const uploadStore = useUploadStore();

    homeStore.$reset();
    accountStore.fetchData();

    //TODO: Maybe move elsewhere?
    window.onbeforeunload = function() {
        if (uploadStore.uploadsInProgress > 0) return "";
        else return undefined;
    };
</script>