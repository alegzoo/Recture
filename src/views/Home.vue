<template>
    <CornerLogo/>
    <Sidebar/>
    <Topbar/>
    <v-container id="home-content" fluid>
        <router-view/>
    </v-container>
</template>

<script lang="ts" setup>
    import { useAccountStore } from '@/stores/useAccountStore';

    import CornerLogo from '@/components/CornerLogo.vue';
    import Sidebar from '@/components/Sidebar.vue';
    import Topbar from '@/components/Topbar.vue';

    const accountStore = useAccountStore();
    accountStore.fetchData();
</script>