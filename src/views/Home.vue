<template>
    <CornerLogo/>
    <Sidebar/>
    <Topbar/>
    <v-container id="home-content" fluid>
        <router-view/>
    </v-container>
</template>

<script lang="ts" setup>
    import { RectureApi, IAccount } from '@/api/RectureApi';
    import { useAccountStore } from '@/stores/useAccountStore';

    import CornerLogo from '@/components/CornerLogo.vue';
    import Sidebar from '@/components/Sidebar.vue';
    import Topbar from '@/components/Topbar.vue';

    const accountStore = useAccountStore();
    RectureApi.getAccountInfo().then((response) => {
        if (response.ok) {
            response.json().then((data) => {
                accountStore.loadData(data as IAccount);
            });
        }
    });
</script>