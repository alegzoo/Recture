<template>
    <v-container id="signin-container" class="h-100" fluid>
        <v-row align="center" align-content="center" class="h-100">
            <v-col cols="1" md="3"></v-col>
            <v-col cols="10" md="6">
                <h1 class="mb-5">Sign in</h1>
                <v-form>
                    <v-text-field label="E-mail"></v-text-field>
                    <v-text-field label="Password"></v-text-field>
                    <v-btn class="me-4" type="submit">submit</v-btn>
                </v-form>
            </v-col>
            <v-col cols="1" md="3"></v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>

</script>