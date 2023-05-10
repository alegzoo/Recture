<template>
    <v-dialog width="550" scroll-strategy="block" persistent>
        <v-card class="password-change-dialog-card">
            <v-card-title>
                <v-col class="pa-0 pl-2 pt-3">
                    <h2>PASSWORD RESET</h2>
                </v-col>                
            </v-card-title>      
            <v-card-text no-gutters>
                <v-row class="pa-0 pt-2">
                    <v-col cols="12" align="start" class="subtle">
                        <h4>Old password</h4>
                    </v-col>

                    <v-col cols="12" class="pa-0 px-3">
                        <v-text-field hide-details class="txt-field" variant="solo" :type="showPassword?'text':'password'" :append-inner-icon="showPassword?'mdi-eye':'mdi-eye-off'" @click:append-inner="showPassword = !showPassword"></v-text-field>
                    </v-col>


                    <v-col cols="12" align="start" class="subtle pt-7">
                        <h4>New password</h4>
                    </v-col>

                    <v-col cols="12" class="pa-0 px-3">
                        <v-text-field hide-details class="txt-field" variant="solo" :type="showPassword?'text':'password'" :append-inner-icon="showPassword?'mdi-eye':'mdi-eye-off'" @click:append-inner="showPassword = !showPassword"></v-text-field>
                    </v-col>

                    <v-col cols="12" align="start" class="subtle pt-7">
                        <h4>New password again</h4>
                    </v-col>

                    <v-col cols="12" class="pa-0 px-3">
                        <v-text-field hide-details class="txt-field" variant="solo" :type="showPassword?'text':'password'" :append-inner-icon="showPassword?'mdi-eye':'mdi-eye-off'" @click:append-inner="showPassword = !showPassword"></v-text-field>
                    </v-col>

                </v-row>

            </v-card-text>

            <v-row class="pt-6 pa-4" no-gutters>
                <v-col cols="6" class="pa-3 pl-2">
                    <v-btn class="w-100 positive-btn" @click="closeDialog(false)" variant="text">RESET</v-btn>
                </v-col>

                <v-col cols="6" class="pa-3 pr-2">
                    <v-btn class="w-100 negative-btn" @click="closeDialog(false)" variant="flat">CANCEL</v-btn>
                </v-col>
            </v-row>

        </v-card>

        

    </v-dialog>

</template>

<style lang="scss" scoped>
@import "@/styles/constants.scss";
@import "@/styles/mixins.scss";
.password-change-dialog-card{
    background-color: #efefef;
}

.txt-field{
    box-shadow: none !important;
    border: 2px black solid;
    border-radius: 6px;
    background-color: white;
    font-weight: bold;
}

.txt-field:hover{
    box-shadow: 3px 3px 0 0 black !important;
}

.subtle {
    color: rgba(0, 0, 0, 0.5);
}

.positive-btn{
    box-shadow: 0 3px 0 0 black;
    border-radius: 4px !important;
    background-color: $recture-yellow;
    border: 2px black solid !important;
    color: black !important;
}

.negative-btn{
    background-color: transparent;
}
</style>

<script lang="ts" setup>

import { ref } from 'vue';
const showPassword = ref<boolean>(false);

const emit = defineEmits<{
    (e: "update:modelValue", val: boolean): void,
    (e: "optionSelected", positive: boolean): void
}>();

function closeDialog(result: boolean) {
    emit("update:modelValue", false);
    emit("optionSelected", result);
}



</script>

