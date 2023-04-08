<template>
    <v-row no-gutters class="pt-2">
        <v-col class="pa-0 pl-11" cols="1">
            <v-avatar class="teacher-student-avatar" size="large" image="/jano.png"></v-avatar>
        </v-col>
        <v-col class="pa-0 pl-6 pt-1" cols="10">
            <v-textarea class="field-add-comment" label="Your reply..." variant="outlined" auto-grow row-height="10" rows="1"></v-textarea>
        </v-col>
        <v-col cols="1" class="pa-0 pb-3" align-self="end" align="center">
            <v-btn variant="text" :ripple="false" class="post-btn" theme="light" icon="mdi-send"></v-btn>
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-spacer/>
        <v-col align-self="center" align="center" cols="3" class="pr-1">
            <v-btn class="cancel-btn-comment" variant="text">Cancel</v-btn>
        </v-col>
    </v-row>
</template>

<style lang="scss" scoped>

.teacher-student-avatar{
    border-width: 2px;
    border-color: black;
    border-style: solid;
}

.cancel-btn-comment{
    background-color: black;
    color: white;
}


</style>

<script lang="ts" setup>


</script>