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
                            <v-btn-toggle v-model="selectedColor" divided class="toggle-btns-colors" selected-class="selected" mandatory>

                                <v-btn class="mustard btn-group-colors" size="small" value="mustard" :active="false" :ripple="false"/>

                                <v-btn class="aqua btn-group-colors" size="small" value="aqua" :active="false" :ripple="false"/>

                                <v-btn class="steel-blue btn-group-colors" size="small" value="steel-blue" :active="false" :ripple="false"/>

                                <v-btn class="red btn-group-colors" size="small" value="red" :active="false" :ripple="false"/>

                                <v-btn class="gray btn-group-colors" size="small" value="gray" :active="false" :ripple="false"/>

                                <v-btn class="rose btn-group-colors" size="small" value="rose" :active="false" :ripple="false"/>

                                <v-btn class="melon btn-group-colors" size="small" value="melon" :active="false" :ripple="false"/>

                                <v-btn class="blush btn-group-colors" size="small" value="blush" :active="false" :ripple="false"/>

                                <v-btn class="crystal-blue btn-group-colors" size="small" value="cystal-blue" :active="false" :ripple="false"/>

                                <v-btn class="canary btn-group-colors" size="small" value="canary" :active="false" :ripple="false"/>

                                <v-btn class="orchid btn-group-colors" size="small" value="orchid" :active="false" :ripple="false"/>

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

<style lang="scss" scoped>
    .create-lesson-card {
        background-color: #efefef;
        border-radius: 7px !important;
    }

    .choose-btns {
        border: solid 2px black;
        border-radius: 0px;
        box-shadow: 3px 3px 0px 0px black;
    }

    .headline-colors {
        opacity: 50%;
    }

    .btn-group-colors {
        border-color: black !important;
        border-width: 2px !important;
        box-shadow: none;
        transition: border-style 0.2s ease-out, transform 0.1s ease-out, box-shadow 0.2s ease-out;
    }

    .btn-group-colors:hover {
        box-shadow: 0px 0px 0px 2px black inset;
    }

    .btn-group-colors.selected, .btn-group-colors.selected:hover {
        box-shadow: none;
        border: solid 4px black !important;
        transform: scale(1.1);
        border-style: solid !important;
        z-index: 100;
        transition: border-style none, transform 0.1s ease-in, box-shadow 0.2s ease-in;
    }

    .v-btn-toggle {
        position: relative;
        border-top-left-radius: 0px !important;
        border-bottom-left-radius: 0px !important;
        border-bottom-right-radius: 0px !important;
        border-top-right-radius: 0px !important;
        overflow: visible;
    }

    .copy-btn {
        font-size: large;
    }

    .invitation-btn {
        background-color: #00A6E2;
        color: white !important;
        rotate: 90;
    }

    .create-btn-upload {
        border-top-right-radius: 0px !important;
        border-top-left-radius: 0px !important;
        background-color: #5cb978;
        color: white !important;
        font-size: large;
        font-weight: bold;
    }
</style>

<script lang="ts" setup>
    import { ref } from 'vue';
    import "@/styles/lesson-colors.scss";
    import "@/styles/main.scss";
    import { LessonColor } from '@/api/RectureApi';

    const selectedColor = ref<LessonColor | null>(null);

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