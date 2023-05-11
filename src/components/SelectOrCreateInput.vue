<template>
    <v-container class="px-0 py-0" fluid>
        <v-row align="center" no-gutters>
            <v-col>
                <v-select
                    hide-details
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
                    ref="textField"
                    v-model="newItemName"
                    :rules="rules"
                    :label="fieldLabel"
                    variant="underlined"
                    single-line
                ></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
    import { ref, reactive, watch, onMounted } from 'vue';

    const props = defineProps<{
        modelValue?: any | string | undefined,
        selectLabel: string,
        fieldLabel: string,
        items: any[],
        itemTitle: string,
        mandatory?: boolean
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: any | string): void
    }>();

    const textField = ref<any>();

    const selectedItem = ref<any | null>(null);
    const newItemName = ref<string | null>(null);

    const rules = reactive<((value: any) => boolean | string)[]>([]);

    watch(selectedItem, value => {
        if (value != null) {
            newItemName.value = null;
            textField.value.validate();
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
        if (props.mandatory) {
            rules.push(() => {
                //TODO: Maybe add whitespace check
                if (selectedItem.value != null || (newItemName.value != null && newItemName.value.length > 0)) return true;
                else return "Please select an item or enter a value.";
            });
        }

        if (props.modelValue != undefined) {
            if (props.modelValue instanceof String || typeof props.modelValue === "string") newItemName.value = props.modelValue as string;
            else selectedItem.value = props.modelValue;
        }
    });
</script>