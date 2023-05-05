<template>
    <v-dialog activator="parent" class="h-100 justify-center" width="700" scroll-strategy="block">
        <template v-slot:activator="{ props }">
            <v-col cols="auto">
                <v-btn icon="mdi-plus" class="plus-condition-btn" variant="flat"></v-btn>
            </v-col>
        </template>
        <v-card class="new-condition-card">
            <template v-slot:title>
                <h2 class="pt-2">NEW CONDITION</h2>
            </template>
            <v-card-text no-gutters class="pa-0">
                <v-row no-gutters class="pl-5 pt-4">
                    <v-col class="subtitles pl-1">
                        <h4>Give your new condition a title *</h4>
                    </v-col>
                </v-row>

                <v-row no-gutters class="px-6 pt-4">
                    <v-col cols="12">
                        <v-text-field variant="underlined" single-line label="Title"></v-text-field>
                    </v-col>
                </v-row>

                <v-row no-gutters class="pl-5 pt-4">
                    <v-col class="subtitles pl-1" cols="12">
                        <h4>Write an exact description of what your condition applies to</h4>
                    </v-col>
                    <v-col class="subtitles pl-1" cols="12">
                        <p class="text-subtitle-2">(don't forget to name the people to whom it applies to and also think about the edge-cases)</p>
                    </v-col>
                </v-row>

                <v-row no-gutters class="px-6 pt-7 pb-2">
                    <v-col cols="12">
                        <v-textarea variant="outlined" label="Your description..."></v-textarea>
                    </v-col>
                </v-row>

            </v-card-text>
        <v-row no-gutters height="auto">
            <v-col align="center" align-self="center">
                <v-btn class="create-new-condition" width="700" height="50" variant="text">CREATE</v-btn>
            </v-col>
        </v-row>
        </v-card>
    </v-dialog>
</template>

<style lang="scss" scoped>
@import "@/styles/constants.scss";
@import "@/styles/mixins.scss";

.new-condition-card {
    background-color: #efefef;
    border-radius: 6px;
}

.subtitles{
    color: black;
    opacity: 50%;
}

.create-new-condition{
    background-color: #5cb978;
    color: white !important;
    font-size: large;
    font-weight: bold;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
}

.plus-condition-btn{
    @include elevated-button(3px, 3px, 1px);
    background-color: $recture-yellow;
    color: black;
    border-radius: 9999px;
    border-color: black;
    border-style: solid;
    border-width: 2px;
}

</style>

<script lang="ts" setup>

</script>