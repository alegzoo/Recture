<template>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          expand-on-hover
          rail
        >
          <v-list>
            <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
              title="John Doe"
              subtitle="johndoe@example.gov"
            ></v-list-item>
          </v-list>

          <v-divider></v-divider>
  
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home" title="Home" value="myfiles"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="Account" value="shared"></v-list-item>
            <v-list-item prepend-icon="mdi-file-document" title="My T&C" value="starred"></v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
  </template>

<script lang="ts" setup>

</script>

<style>
    .v-navigation-drawer {
        padding-top: 48px;
    }
</style>