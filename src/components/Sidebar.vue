<template>
    <v-navigation-drawer id="sidebar" width="70" permanent floating :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)">
        <v-list id="sidebar-panel" width="60" density="compact" active-class="active" nav>
            <SidebarButton icon="mdi-home" text="Home" to="/"/>
            <SidebarButton icon="mdi-account" text="Profile" to="/profile"/>
            <SidebarButton v-if="accountStore.teacher" icon="mdi-calendar-clock" text="Timetable" to="/timetable"/>
            <v-divider/>
            <SidebarButton icon="mdi-logout" text="Sign out" @click="signOut"/>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts" setup>
    import { RectureApi } from '@/api/RectureApi';
    import { Stores } from '@/stores/Stores';
    import router from '@/router';
    import { useAccountStore } from '@/stores/useAccountStore';
    import SidebarButton from './SidebarButton.vue';

    const props = defineProps<{
        modelValue?: boolean
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void
    }>();

    const accountStore = useAccountStore();

    function signOut() {
        RectureApi.signOut().then(function (result) {
            if (result.success) {
                Stores.resetAllStores();
                //TODO: router.push does not work on ios safari? At least this one. Maybe async is causing issues?
                router.push({ name: "signin" }).catch(reason => {
                    console.error(reason);
                });
            }
        }).catch(reason => {
            //TODO: Maybe show error
        });
    }
</script>

<style>

</style>