<template>
    <v-dialog width="800" persistent>
        <v-card class="manage-question-series-card">
            <v-card-title>
                <v-col cols="auto">
                    <h2>MANAGE QUESTION SERIES</h2>
                </v-col>                
            </v-card-title>      
            <v-card-text>
                    <v-row>
                        <v-col>
                            <v-text-field
                            label="Title of the question series"
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

.manage-question-series-card{
    background-color: #efefef;
}


.subtle {
    color: rgba(0, 0, 0, 0.5);
}

</style>


<script lang="ts" setup>

</script>

