<template>
        <v-dialog activator="parent" class="h-100 justify-center" width="630" scroll-strategy="block">
            <template v-slot:activator>
                <v-btn icon="mdi-checkbox" theme="light"/>
            </template>
            <v-card class="create-lesson-card">
                <template v-slot:title>
                    <h2 class="pt-3 pl-1">CREATE A LESSON</h2>
                </template>
                <v-card-text>
                    <v-row align="center" class="px-1" no-gutters>
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
                            label="Name of the new class"
                            variant="underlined"
                            single-line
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row align="center" class="px-1" no-gutters>
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
                            label="Name your new subject"
                            variant="underlined"
                            single-line
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row no-gutters>
                        <v-col align="center" class="pt-5 pb-3">
                            <h4 class="headline-colors">Color of class in timetable</h4>
                        </v-col>
                    </v-row>


                    <v-row no-gutters>
                        <v-col align="center">
                            <v-btn-toggle v-model="toggle_one" divided class="toggle-btns-colors" selected-class="selected">

                            <v-btn class="mustard btn-group-colors" size="small"  :active="false" :ripple="false"/>

                            <v-btn class="aqua btn-group-colors" size="small" :active="false" :ripple="false"/>

                            <v-btn class="steel-blue btn-group-colors" size="small" :active="false" :ripple="false"/>

                            <v-btn class="red btn-group-colors" size="small" :active="false" :ripple="false"/>

                            <v-btn class="grey btn-group-colors" size="small" :active="false" :ripple="false"/>

                            <v-btn class="rose btn-group-colors" size="small" :active="false" :ripple="false"/>

                            <v-btn class="melon btn-group-colors" size="small" :active="false" :ripple="false"/>

                            <v-btn class="blush btn-group-colors" size="small" :active="false" :ripple="false"/>

                            <v-btn class="crystal-blue btn-group-colors" size="small" :active="false" :ripple="false"/>

                            <v-btn class="canary btn-group-colors" size="small" :active="false" :ripple="false"/>

                            <v-btn class="orchid btn-group-colors" size="small" :active="false" :ripple="false"/>

                            </v-btn-toggle>
                        </v-col>
                    </v-row>

                    <v-row no-gutters class="pt-10">
                        <v-col cols="6" class="headline-colors pl-1">
                            <h4>Code for students to connect</h4>
                        </v-col>
                    </v-row>

                    <v-row no-gutters class="px-1">
                        <v-col cols="auto" align-self="center">
                            <div class="text-h4 font-weight-bold">#7UWBKL</div>
                        </v-col>

                        <v-col align-self="center" cols="auto" class="pl-1">
                            <v-btn variant="plain" icon="mdi-content-copy" class="copy-btn" :ripple="false"/>
                        </v-col>

                        <v-spacer></v-spacer>

                        <v-col cols="auto" align-self="center">
                            <v-btn variant="text" class="invitation-btn" append-icon="mdi-send" theme="light" :ripple="false">SEND INVITATION</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-row no-gutters class="pt-4" height="auto">
                    <v-col align="center">
                        <v-btn class="create-btn-upload" width="630" height="50" variant="text">CREATE</v-btn>
                    </v-col>
                </v-row>

                
            </v-card>
        </v-dialog>
</template>

<style lang="scss">

</style>

<script lang="ts" setup>
    import { ref } from 'vue';
    import "@/styles/lesson-colors.scss";
    import "@/styles/main.scss";
    const toggle_one = ref<boolean>(false);

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