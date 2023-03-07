<template>
    <MenuButton @click="homeStore.sidebarVisible = !homeStore.sidebarVisible"/>
    <Sidebar v-model="homeStore.sidebarVisible"/>
    <Topbar/>
    <v-container id="home-content" fluid>
        <router-view/>
    </v-container>
</template>

<script lang="ts" setup>
    import { useHomeStore } from '@/stores/useHomeStore';
    import { useAccountStore } from '@/stores/useAccountStore';

    import MenuButton from '@/components/MenuButton.vue';
    import Sidebar from '@/components/Sidebar.vue';
    import Topbar from '@/components/Topbar.vue';

    const homeStore = useHomeStore();
    const accountStore = useAccountStore();

    homeStore.$reset();
    accountStore.fetchData();
</script>