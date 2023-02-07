<template>
  <v-toolbar density="compact" color="#282828" title="REC • TURE">
    <v-spacer></v-spacer>

    <Searchbar></Searchbar>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-upload</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-message</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts" setup>
    import Searchbar from './Searchbar.vue';
</script>

<style>
    .v-navigation-drawer {
        color: #282828;
    }
</style>