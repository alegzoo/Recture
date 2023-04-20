<template>
    <v-container class="px-0 py-0" fluid>
        <v-row align="center" no-gutters>
            <v-col>
                <v-select
                    hide-details
                    no-gutters
                    :label="selectLabel"
                    v-model="selectedItem"
                    :items="items"
                    :item-title="itemTitle"
                    return-object
                    variant="solo"
                    density="compact"
                    single-line
                ></v-select>
            </v-col>

            <v-col cols="auto" class="px-8">
                <h2>or</h2>
            </v-col>

            <v-col>
                <v-text-field
                    v-model="newItemName"
                    :label="fieldLabel"
                    variant="underlined"
                    single-line
                ></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
    import { ref, watch, onMounted } from 'vue';

    const props = defineProps<{
        modelValue?: any | string | undefined,
        selectLabel: string,
        fieldLabel: string,
        items: any[],
        itemTitle: string
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: any | string): void
    }>();

    const selectedItem = ref<any | null>(null);
    const newItemName = ref<string | null>(null);

    watch(selectedItem, value => {
        if (value != null) {
            newItemName.value = null;
            emit('update:modelValue', value);
        }
    });

    watch(newItemName, value => {
        if (value != null) {
            selectedItem.value = null;
            emit('update:modelValue', value);
        }
    });

    onMounted(() => {
        if (props.modelValue != undefined) {
            if (props.modelValue instanceof String || typeof props.modelValue === "string") newItemName.value = props.modelValue as string;
            else selectedItem.value = props.modelValue;
        }
    });
</script>