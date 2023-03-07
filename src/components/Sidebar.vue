<template>
    <v-navigation-drawer id="sidebar" width="70" permanent floating :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)">
        <v-list id="sidebar-panel" width="60" density="compact" nav>
            <v-list-item height="58" to="/account">
                <v-avatar size="38px">
                    <v-img src="https://randomuser.me/api/portraits/men/85.jpg"/>
                </v-avatar>
                <v-tooltip
                    activator="parent"
                    location="end"
                    >johndoe@example.gov
                </v-tooltip>
            </v-list-item>
            <SidebarButton icon="mdi-home" text="Home" to="/"/>
            <SidebarButton icon="mdi-comment-text" text="New comments" to="/comments"/>
            <SidebarButton icon="mdi-lead-pencil" text="Edit" to="/edit"/>
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

    const props = defineProps<{
        modelValue?: boolean
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void
    }>();

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