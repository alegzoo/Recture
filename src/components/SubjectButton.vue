<template>
    <v-btn>{{ subject?.name }}</v-btn>
</template>

<script lang="ts" setup>
    import { ISubject } from '@/api/RectureApi';

    const props = defineProps<{
        subject: ISubject | null
    }>();
</script>