<template>
    <v-dialog width="700" persistent>
        <v-card class="edit-profile-card">
            <v-card-title>
                <v-row class="pa-0 pl-3 pt-3">
                    <v-col cols="auto" align-self="center">
                        <h2>PROFILE EDIT</h2>
                    </v-col> 
                    <v-spacer/>
                    <v-col cols="auto" class="pr-5" align-self="center">
                        <v-icon :size="50" icon="mdi-card-account-details"></v-icon>
                    </v-col>
                </v-row>
                             
            </v-card-title>      
            <v-card-text no-gutters>
                    <v-row class="pa-0 pl-4 pt-3 subtle">
                        <v-col class="pa-0">
                            <h4>Profile picture</h4>
                        </v-col>
                    </v-row>

                    <v-row class="pa-0">
                        <v-col cols="4">
                            <v-col cols="auto" class="pa-0 pl-5 pt-7" >
                                <v-avatar :size="140"></v-avatar>
                            </v-col>
                        </v-col>
                        
                        <v-col cols="8" align-self="center">
                            <v-col cols="12" class="pa-0" align="start" align-self="center">
                                <h4 class="subtle">*Click on the icon to choose a file</h4>
                            </v-col>

                            <v-col cols="12" class="pa-0 pt-2" align="start" align-self="center">
                                <v-file-input density="compact" clearable variant="solo" class="txt-field" hide-details hide-message></v-file-input>
                            </v-col>
                        </v-col>
                    </v-row>
            
                    <v-row class="pa-0 pt-4">
                        <v-col cols="4" align-self="center" class="pl-4">
                            <h4 class="subtle">First name</h4>
                        </v-col>

                        <v-col cols="8" align-self="center">
                            <v-text-field density="compact" hide-details class="txt-field" variant="solo"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row class="pa-0 pt-4">
                        <v-col cols="4" align-self="center" class="pl-4">
                            <h4 class="subtle">Last name</h4>
                        </v-col>

                        <v-col cols="8" align-self="center">
                            <v-text-field density="compact" hide-details class="txt-field" variant="solo"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row class="pa-0 pt-4">
                        <v-col cols="4" align-self="center" class="pl-4">
                            <h4 class="subtle">Password</h4>
                        </v-col>

                        <v-col cols="8" align-self="center" align="center">
                            <v-btn :ripple="false" @click="NewPasswordDialogVisible = true" class="change-password-btn" variant="text">CHANGE YOUR PASSWORD</v-btn>
                        </v-col>
                    </v-row>

                    <v-row class="pa-0 pt-4">
                        <v-col cols="4" align-self="center" class="pl-4">
                            <h4 class="subtle">School (optional)</h4>
                        </v-col>

                        <v-col cols="8" align-self="center">
                            <v-text-field density="compact" hide-details class="txt-field" variant="solo"></v-text-field>
                        </v-col>
                    </v-row>


                    <v-row class="pa-0 pt-4">
                        <v-col cols="4" align-self="start" class="pl-4">
                            <h4 class="subtle">Bio</h4>
                        </v-col>

                        <v-col cols="8" align-self="center">
                            <v-textarea hide-details auto-grow class="txt-field" variant="solo"></v-textarea>
                        </v-col>
                    </v-row>
            </v-card-text>

                <v-row no-gutters height="auto" class="pt-4">
                    <v-col align="center">
                        <v-btn hide-details @click="closeDialog(false)" class="w-100 save-btn" height="50" variant="text">SAVE</v-btn>
                    </v-col>
                </v-row>


        <NewPasswordDialog v-model="NewPasswordDialogVisible"/>
        </v-card>

    </v-dialog>
    


</template>

<style lang="scss" scoped>
@import "@/styles/constants.scss";
@import "@/styles/mixins.scss";

.edit-profile-card{
    background-color: #efefef;
}


.subtle {
    color: rgba(0, 0, 0, 0.5);
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


.save-btn{
    border-radius: 0px !important;
    background-color: #5cb978;
    color: white !important;
    font-size: large;
    font-weight: bold;
}

.v-file-input :deep(*) {
    background-color: transparent !important;
    box-shadow: none !important;
    padding-left: 8px;
}

.change-password-btn{
    @include elevated-button(4px, 4px, 2px);
    background-color: $recture-yellow;
    border: 2px black solid;
    border-radius: 0px;

}

</style>


<script lang="ts" setup>

import { ref } from 'vue';
import NewPasswordDialog from './NewPasswordDialog.vue';
const NewPasswordDialogVisible = ref<boolean>(false);


const emit = defineEmits<{
(e: "update:modelValue", val: boolean): void,
(e: "optionSelected", positive: boolean): void
}>();

function closeDialog(result: boolean) {
    emit("update:modelValue", false);
    emit("optionSelected", result);
}
</script>

