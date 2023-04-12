<template>
    <v-dialog class="h-100 justify-center" width="1000" scroll-strategy="block">
        <v-card class="new-theme-unit-card">
            <v-sheet class="v-sheet-header" :height="30" :width="1000" no-gutters>
                <v-row no-gutters>
                    <v-col cols="4" align-self="center">
                        <h2 class="header-title pl-4">Definičný obor</h2>
                    </v-col>
                    <v-col cols="4" align-self="center" align="center">
                        <v-chip class="subject-chip-header" size="large">MAT</v-chip>
                    </v-col>
                    <v-col cols="1" align-self="center">
                        <h4 class="header-date">5.4.2023</h4>
                    </v-col>
                </v-row>
            </v-sheet>

            <v-card-text no-gutters class="pa-0">

            </v-card-text>
        </v-card>
    </v-dialog>

</template>


<style lang="scss" scoped>

.v-sheet-header{
    background-color: black;

}

.header-title{
    color: white;
}

.header-date{
    color: white;
}

</style>
    
<script lang="ts" setup>


</script>