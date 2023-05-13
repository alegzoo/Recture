<template>
    <v-dialog width="900">
            <v-card class="v-card-quizzes-manage">
                <v-card-title>
                    <v-row no-gutters align="center" align-self="center" class="pt-3">
                        <v-col>
                            <h2 class="pl-3">EDIT QUIZ</h2>
                        </v-col>
                    </v-row>         
                </v-card-title>      
                <v-card-text>

                    <VRow class="pt-3 pl-1" no-gutters>
                        <h3 class="subtle">Questions</h3>
                    </VRow>
                    <v-row class="pt-2" no-gutters>
                        <v-divider/>
                    </v-row>
                    <v-row no-gutters class="pt-3 pl-1">
                        <v-col cols="auto" align-self="top">
                            <h2>1.</h2>
                        </v-col>
                        <v-col cols="8" class="pl-6" align-self="top">
                            <h2>Who is the current president of the United States ?</h2>
                        </v-col>
                        <v-spacer/>
                        <v-col cols="3" class="pa-0" align-self="top" align="end">
                            <v-btn variant="plain" icon="mdi-pencil"></v-btn>
                            <v-btn class="edit-answers" variant="plain" size="default" icon="mdi-text-box-edit"></v-btn>
                            <v-btn variant="plain" size="default" icon="mdi-delete"></v-btn>
                        </v-col>
                    </v-row>
                    <v-row no-gutters class="pa-0 pt-5 pb-3">
                        <v-col>
                            <v-btn class="plus-btn" icon="mdi-plus" variant="flat"></v-btn>
                        </v-col>
                        
                    </v-row>
                </v-card-text>
            </v-card>
    </v-dialog>
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";
    @import "@/styles/mixins.scss";
.subtle {
    color: rgba(0, 0, 0, 0.5);
}

.plus-btn{
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