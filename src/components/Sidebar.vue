<template>
    <v-navigation-drawer id="sidebar" width="70" permanent floating :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)">
        <v-list id="sidebar-panel" width="60" density="compact" active-class="active" nav>
            <SidebarButton icon="mdi-home" text="Home" to="/"/>
            <SidebarButton icon="mdi-account" text="Profile" to="/account"/>
            <SidebarButton icon="mdi-comment-text" text="New comments" to="/newcomments"/>
            <SidebarButton icon="mdi-calendar-clock" text="Timetable" to="/timetable"/>
            <v-divider/>
            <SidebarButton icon="mdi-logout" text="Sign out" @click="signOut"/>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts" setup>
    import { RectureApi } from '@/api/RectureApi';
    import { Stores } from '@/stores/Stores';
    import router from '@/router';
    import SidebarButton from './SidebarButton.vue';

    const props = defineProps<{
        modelValue?: boolean
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void
    }>();

    function signOut() {
        RectureApi.signOut().then(function (result) {
            if (result.success) {
                Stores.resetAllStores();
                router.push("/signin");
            }
        });
    }
</script>

<style>

</style>