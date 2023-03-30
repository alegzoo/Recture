<template>
        <v-dialog activator="parent" class="h-100 justify-center" width="630" scroll-strategy="block">
            <template v-slot:activator>
                <v-btn icon="mdi-checkbox" theme="light"/>
            </template>
            <v-card class="upload-card">
                <template v-slot:title>
                    <h2 class="pt-3 pl-1">CREATE A LESSON</h2>
                </template>
                <v-card-text>
                    <v-row align="center" class="px-1">
                        <v-col cols="6">
                            <v-menu>
                                <template v-slot:activator="{ props }">
                                    <v-btn
                                    :ripple="false"
                                    class="choose-btns"
                                    variant="flat"
                                    append-icon="mdi-chevron-down"
                                    v-bind="props"
                                    >
                                    Choose a class
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item
                                            v-for="(item, index) in items"
                                            :key="index"
                                        >
                                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-col>

                        <v-col cols="2">
                            <h2>or</h2>
                        </v-col>

                        <v-col cols="4">
                            <v-text-field
                            class="txt-field-upload"
                            label="Name of the new class"
                            variant="underlined"
                            single-line
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row align="center" class="px-1">
                        <v-col cols="6">
                            <v-menu>
                                <template v-slot:activator="{ props }">
                                    <v-btn
                                    :ripple=false
                                    variant="flat"
                                    append-icon="mdi-chevron-down"
                                    v-bind="props"
                                    class="choose-btns"
                                    >
                                    Choose a subject
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item
                                            v-for="(item, index) in items2"
                                            :key="index"
                                        >
                                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-col>

                        <v-col cols="2">
                            <h2>or</h2>
                        </v-col>

                        <v-col cols="4">
                            <v-text-field
                            class="txt-field-upload"
                            label="Name your new subject"
                            variant="underlined"
                            single-line
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
</template>

<style lang="scss">

</style>

<script lang="ts" setup>
    import { ref } from 'vue';

    const dialog = ref(false);
    const items = ref([
        { title: 'I.A' },
        { title: 'II.B' },
        { title: 'III.C' },
        { title: 'oktáva A' }
    ]);
    const items2 = ref([
        { title: 'MAT' },
        { title: 'INF' },
    ]);
</script>