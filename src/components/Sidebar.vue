<template>
    <v-navigation-drawer id="sidebar" rail>
        <v-list id="sidebar-panel" density="compact" nav>
            <v-avatar size="36px">
                <v-img src="https://randomuser.me/api/portraits/men/85.jpg"/>
                <v-tooltip
                    activator="parent"
                    location="end"
                >johndoe@example.gov</v-tooltip>
            </v-avatar>
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