<template>
        <router-link class="floating-avatar" to="/profile">
            <v-avatar :image="(accountStore.avatar != null ? accountStore.avatar as string : undefined)"/>
            <p>{{ accountStore.fullName }}</p>
        </router-link>
</template>

<style lang="scss">

</style>

<script lang="ts" setup>
    import { useAccountStore } from '@/stores/useAccountStore';

    const accountStore = useAccountStore();
</script>