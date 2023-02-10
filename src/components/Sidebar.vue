<template>
    <v-navigation-drawer id="sidebar" permanent floating>
        <v-list id="sidebar-panel" width="60" density="compact" nav>
                <v-list-item>
                <v-avatar size="36px">
                    <v-img src="https://randomuser.me/api/portraits/men/85.jpg"/>
                </v-avatar>
                <v-tooltip
                        theme="light"
                        activator="parent"
                        location="end"
                    >johndoe@example.gov</v-tooltip>
            </v-list-item>
            <SidebarButton icon="mdi-home" text="Home"/>
            <SidebarButton icon="mdi-account" text="Account"/>
            <SidebarButton icon="mdi-file-document" text="My T&C"/>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts" setup>
    import SidebarButton from './SidebarButton.vue';
</script>

<style>

</style>