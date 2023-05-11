<template>
    <v-dialog width="800" persistent>
        <v-card>
            <v-card-title>
                <v-col cols="auto">
                    <h2>MANAGE QUIZZES</h2>
                </v-col>                
            </v-card-title>      
            <v-card-text>
                    <v-row>
                        <v-col>
                            <v-text-field
                            label="Search by quiz title"
                            variant="solo"
                            single-line
                            class="text-field-search"
                            />
                        </v-col>
                    </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<style lang="scss" scoped>
    .v-card{
        background-color: #efefef;
    }


    .subtle {
        color: rgba(0, 0, 0, 0.5);
    }
</style>


<script lang="ts" setup>

</script>

