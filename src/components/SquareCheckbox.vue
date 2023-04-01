<template>
    <v-checkbox :model-value="modelValue" @update:model-value="(val: boolean) => emit('update:modelValue', val)"  :class="modelValue?'selected':''" true-icon="mdi-check" :ripple="false" :label="label" hide-details/>
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";

    .v-checkbox {

        :deep(.v-icon) {
            border: solid 2px black;
            box-shadow: none;
            background-color: transparent;
            opacity: 100%;
            transition: box-shadow 0.1s ease-in-out;
        }

        :deep(.v-label) {
            opacity: 100%;
            font-weight: bold;
        }

        :deep(.v-icon::before) {
            visibility: hidden;
        }

        :deep(.v-label) {
            padding-left: 5px;
        }

    }

    .v-checkbox.selected {

        :deep(.v-icon) {
            border: solid 2px black;
            box-shadow: 3px 3px 0px black;
            background-color: $recture-yellow;
            transition: box-shadow 0.1s ease-in-out;
        }

        :deep(.v-icon::before) {
            visibility: visible;
        }

    }
</style>

<script lang="ts" setup>
    const props = defineProps<{
        modelValue?: boolean,
        label: string
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void
    }>();
</script>