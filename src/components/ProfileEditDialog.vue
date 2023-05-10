<template>
    <v-dialog :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)" width="700" :persistent="updatingProfile">
        <v-card>
            <v-card-title>
                <v-row class="pa-0 pl-3 pt-3">
                    <v-col cols="auto" align-self="center">
                        <h2>PROFILE EDIT</h2>
                    </v-col> 
                    <v-spacer/>
                    <v-col cols="auto" class="pr-5" align-self="center">
                        <v-icon :size="50" icon="mdi-card-account-details-outline"></v-icon>
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
                                <v-avatar :image="avatar" :size="140"/>
                            </v-col>
                        </v-col>
                        
                        <v-col cols="8" align-self="center">
                            <v-col cols="12" class="pa-0" align="start" align-self="center">
                                <h4 class="subtle">Update profile picture</h4>
                            </v-col>

                            <v-col cols="12" class="pa-0 pt-2" align="start" align-self="center">
                                <v-file-input v-model="profilePictureFile" density="compact" variant="solo" clearable hide-details single-line/>
                            </v-col>
                        </v-col>
                    </v-row>
            
                    <v-row class="pa-0 pt-4">
                        <v-col cols="4" align-self="center" class="pl-4">
                            <h4 class="subtle">First name</h4>
                        </v-col>

                        <v-col cols="8" align-self="center">
                            <v-text-field v-model="firstName" density="compact" hide-details variant="solo"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row class="pa-0 pt-4">
                        <v-col cols="4" align-self="center" class="pl-4">
                            <h4 class="subtle">Last name</h4>
                        </v-col>

                        <v-col cols="8" align-self="center">
                            <v-text-field v-model="lastName" density="compact" hide-details variant="solo"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row class="pa-0 pt-4">
                        <v-col cols="4" align-self="center" class="pl-4">
                            <h4 class="subtle">Password</h4>
                        </v-col>

                        <v-col cols="8" align-self="center" align="center">
                            <v-btn :ripple="false" class="change-password-btn" variant="text" @click="newPasswordDialogVisible = true">CHANGE YOUR PASSWORD</v-btn>
                        </v-col>
                    </v-row>

                    <v-row class="pa-0 pt-4">
                        <v-col cols="4" align-self="center" class="pl-4">
                            <h4 class="subtle">School / organization (optional)</h4>
                        </v-col>

                        <v-col cols="8" align-self="center">
                            <v-text-field v-model="organization" density="compact" hide-details variant="solo"></v-text-field>
                        </v-col>
                    </v-row>


                    <v-row class="pa-0 pt-4">
                        <v-col cols="4" align-self="start" class="pl-4">
                            <h4 class="subtle">Bio</h4>
                        </v-col>

                        <v-col cols="8" align-self="center">
                            <v-textarea v-model="bio" hide-details variant="solo"></v-textarea>
                        </v-col>
                    </v-row>
                </v-card-text>

            <v-row no-gutters height="auto" class="pt-4">
                <v-col align="center">
                    <v-btn hide-details @click="updateUserInfo()" class="w-100 save-btn" height="50" variant="text">SAVE</v-btn>
                </v-col>
            </v-row>

            <NewPasswordDialog v-model="newPasswordDialogVisible"/>

            <v-overlay v-model="updatingProfile" class="align-center justify-center" contained persistent>
                <v-progress-circular class="ma-auto" color="primary" indeterminate size="64"/>
            </v-overlay>
        </v-card>
    </v-dialog>
    <MessageDialog v-model="messageDialogVisible" :title="messageDialogTitle" :message="messageDialogText" @update:model-value="onMessageDialogClosed()"/>
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";
    @import "@/styles/mixins.scss";

    .v-card {
        background-color: #efefef;
    }

    .subtle {
        color: rgba(0, 0, 0, 0.5);
    }

    .v-text-field, .v-file-input {
        box-shadow: none !important;
        border: 2px black solid;
        border-radius: 6px;
        background-color: white;
        font-weight: bold;

        &:hover {
            box-shadow: 3px 3px 0 0 black !important;
        }
    }

    .v-file-input :deep(*) {
        background-color: transparent !important;
        box-shadow: none !important;
    }

    .v-file-input :deep(.v-icon) {
        padding-left: 24px;
    }

    .change-password-btn {
        @include elevated-button(4px, 4px, 2px);
        background-color: $recture-yellow;
        border: 2px black solid;
        border-radius: 0px;
    }

    .save-btn {
        border-radius: 0px !important;
        background-color: #5cb978;
        color: white !important;
        font-size: large;
        font-weight: bold;
    }
</style>


<script lang="ts" setup>
    import { ref, computed, watch, onMounted } from 'vue';
    import NewPasswordDialog from './NewPasswordDialog.vue';
    import { useAccountStore } from '@/stores/useAccountStore';
    import { RectureApi } from '@/api/RectureApi';
    import MessageDialog from './MessageDialog.vue';

    const props = defineProps<{
        modelValue?: boolean
    }>();

    const emit = defineEmits<{
        (e: "update:modelValue", val: boolean): void
    }>();

    const profilePictureFile = ref<File[] | undefined>(undefined);
    const firstName = ref<string>("");
    const lastName = ref<string>("");
    const organization = ref<string>("");
    const bio = ref<string>("");

    const updatingProfile = ref<boolean>(false);
    const successfullyUpdatedProfile = ref<boolean>(false);

    const newPasswordDialogVisible = ref<boolean>(false);

    const messageDialogVisible = ref<boolean>(false);
    const messageDialogTitle = ref<string>("");
    const messageDialogText = ref<string>("");

    const accountStore = useAccountStore();

    const avatar = computed<string | undefined>(() => accountStore.avatar != null ? accountStore.avatar : undefined);

    watch(() => props.modelValue, () => {
        if (props.modelValue === true) initialize();
    });
    onMounted(() => initialize());

    function initialize() {
        profilePictureFile.value = undefined;
        firstName.value = "";
        lastName.value = "";
        organization.value = "";
        bio.value = "";

        if (accountStore.firstName != null) firstName.value = accountStore.firstName;
        if (accountStore.lastName != null) lastName.value = accountStore.lastName;
        if (accountStore.organization != null) organization.value = accountStore.organization;
        if (accountStore.bio != null) bio.value = accountStore.bio;

        updatingProfile.value = false;
        successfullyUpdatedProfile.value = false;

        newPasswordDialogVisible.value = false;

        messageDialogVisible.value = false;
        messageDialogTitle.value = "";
        messageDialogText.value = "";
    }

    function updateUserInfo() {
        const fileToUpload = profilePictureFile.value != null && profilePictureFile.value.length > 0 ? profilePictureFile.value[0] : null;

        updatingProfile.value = true;

        RectureApi.updateProfile(firstName.value, lastName.value, bio.value, organization.value, fileToUpload).then(result => {
            if (result.success) {
                accountStore.fetchData();
                messageDialogTitle.value = "SUCCESS";
                messageDialogText.value = "Profile successfuly updated!";
                messageDialogVisible.value = true;
            } else {
                messageDialogTitle.value = "ERROR";
                messageDialogText.value = "Failed to update profile.";
                messageDialogVisible.value = true;
            }
        }).catch(reason => {
            messageDialogTitle.value = "ERROR";
            messageDialogText.value = "Failed to update profile.";
            messageDialogVisible.value = true;
        }).finally(() => {
            updatingProfile.value = false;
        });
    }

    function onMessageDialogClosed(): void {
        if (successfullyUpdatedProfile.value === true) closeDialog();
    }

    function closeDialog() {
        emit("update:modelValue", false);
    }
</script>

