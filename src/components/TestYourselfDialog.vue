<template>
    <v-dialog class="h-100 justify-center" width="900" scroll-strategy="block">
        <template v-slot:activator="{ props }">
            <v-col cols="auto">
                <v-btn variant="text" :ripple="false" class="test-yourself-btn" prepend-icon="mdi-check-bold">Test yourself</v-btn>
            </v-col>
        </template>
        <v-card class="test-yourself-card">
            <template v-slot:title>
                <v-row no-gutters>
                    <v-col class="pa-0">
                        <h2 class="py-2 title">Definičný obor – preskúšanie 1</h2>
                    </v-col>
                </v-row>
                
            </template>
            <v-card-text no-gutters class="pa-0">
                <v-row no-gutters class="pt-3">
                    <v-col class="pa-0">
                        <v-sheet class="dashed-divider" style="border-top: dashed black 3px;"/>
                    </v-col>

                </v-row>

                <v-row no-gutters class="pt-4">
                    <v-col class="pa-0 pl-6" cols="auto">
                        <v-chip size="large" class="px-6 chip-question">1.</v-chip>
                    </v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col class="pa-0 pl-6 pt-6">
                        <h3>1. Vyber pravdivé tvrdenie o definičnom obore</h3>
                    </v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col class="pa-0 pl-3 pt-2" cols="auto">
                        <v-radio-group>
                            <v-radio value="1"/>
                            <v-radio value="2"/>
                            <v-radio value="3"/>
                            <v-radio value="4"/>
                        </v-radio-group>
                    </v-col>

                    <v-col cols="auto" class="pt-4">
                        <v-col class="pa-0 pl-1">
                            <p>a) Predstavuje množinu všetkých závislých premenných, pre ktoré je funkcia definovaná</p>
                        </v-col>
                        
                        <v-col class="pa-0 pl-1 pt-4">
                            <p>b) Ak definičný obor nie je zadaný, tak funkcia neexistuje</p>
                        </v-col>

                        <v-col class="pa-0 pl-1 pt-4">
                            <p>c) Definičný obor označujeme ako H(f)</p>
                        </v-col>
                        

                        <v-col class="pa-0 pl-1 pt-4">
                            <p>d) Žiadna z uvedených odpovedí nie je správna</p>
                        </v-col>
                        
                    </v-col>

                </v-row>


                <v-row no-gutters height="auto">
                    <v-col align="center" align-self="end">
                        <v-btn class="finish-btn" width="900" height="50" variant="text">Finish</v-btn>
                    </v-col>
                </v-row>
                    
            </v-card-text>
        </v-card>
    </v-dialog>

</template>

<style lang="scss" scoped>

.title{
    color: black;
}
.test-yourself-card {
    background-color: #efefef;
    border-radius: 6px;
}

.chip-question{
    background-color: #E2E2E2;
    border: 2px black solid;
    color: black;
}

.dashed-divider{
    opacity: 30%;
}

.finish-btn{
    background-color: #00A6E2;
    color: white !important;
    font-size: large;
    font-weight: bold;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
}
</style>

<script lang="ts" setup>

</script>