<template>
    <v-container id="whole-profile-container" class="h-100" fluid no gutters>
        <v-row>
            <v-col cols="12">
                <p class="text-h4 font-weight-medium">Profile</p>
            </v-col>
        </v-row>
        <template v-if="userInfo != null">
            <v-container :class="'mt-6'+(mdAndUp?' pl-15':'')" fluid>
                <v-row align="center" justify="center" class="pt-5 mb-10" no-gutters>
                    <v-col align="center" align-content="center" align-self="center" :cols="mdAndUp?'auto':12" :class="mdAndUp?'pl-5 ':''">
                        <v-avatar v-if="userInfo?.avatar != null" outlined id="profile-avatar" size="150" :image="userInfo.avatar"></v-avatar>
                    </v-col>

                    <v-col :cols="mdAndUp?'auto':12" align-self="center" :class="mdAndUp?'pl-10':'pa-5'">
                        <p :class="'text-h2 font-weight-bold profile-name'+(mdAndUp?' text-left':' text-center')">{{ userFullName }}</p>
                    </v-col>

                    <v-spacer/>

                    <template v-if="!showingOnlyPublicInfo">
                        <v-col :cols="mdAndUp?'auto':12" align="center" align-self="start">
                            <v-btn @click="ProfileEditDialogVisible = true" id="profile-edit-icon" :ripple="false" variant="text" icon="mdi-lead-pencil"/>
                            <v-tooltip
                            activator="parent"
                            location="end"
                            class="spiked-tr"
                            >Edit profile
                            </v-tooltip>
                        </v-col>
                        
                    </template>
                    <ProfileEditDialog v-model="ProfileEditDialogVisible"/>

                </v-row>

                <v-sheet class="h-100" id="profile-v-sheet" background-color="transparent">
                    <v-container class="mt-3 ml-2" fluid no-gutters>
                        <v-row class="pb-5 ml-5">
                            <v-col :cols="mdAndUp?2:12">
                                <p class="font-weight-medium">First Name</p>
                            </v-col>
                            <v-col>
                                <p class="font-weight-black">{{ userInfo?.firstName }}</p>
                            </v-col>
                        </v-row>

                        <v-divider thickness="2" class="border-opacity-100"/>

                        <v-row class="pb-5 mt-3 ml-5">
                            <v-col :cols="mdAndUp?2:12">
                                <p class="font-weight-medium">Last Name</p>
                            </v-col>
                            <v-col>
                                <p class="font-weight-black">{{ userInfo?.lastName }}</p>
                            </v-col>
                        </v-row>

                        <v-divider thickness="2" class="border-opacity-100"/>

                        <v-row class="pb-5 mt-3 ml-5">
                            <v-col :cols="mdAndUp?2:12">
                                <p class="font-weight-medium">Email</p>
                            </v-col>
                            <v-col>
                                <p class="font-weight-black">{{ userInfo?.email }}</p>
                            </v-col>
                        </v-row>

                        <v-divider thickness="2" class="border-opacity-100"/>

                        <v-row class="pb-5 mt-3 ml-5">
                            <v-col :cols="mdAndUp?2:12">
                                <p class="font-weight-medium">School</p>
                            </v-col>
                            <v-col>
                                <p class="font-weight-black">{{ userInfo?.organization }}</p>
                            </v-col>
                        </v-row>

                        <v-divider thickness="2" class="border-opacity-100"/>

                        <v-row class="pb-5 mt-3 ml-5">
                            <v-col :cols="mdAndUp?2:12">
                                <p class="font-weight-medium">Bio</p>
                            </v-col>
                            <v-col>
                                <p class="font-weight-black">{{ userInfo?.bio }}</p>
                            </v-col>
                        </v-row>

                    </v-container>
                </v-sheet>

                <TeacherPoliciesSection v-if="userInfo.userType === 'TEACHER' && userInfo.userId != null" :teacher-id="userInfo.userId" :editable="!showingOnlyPublicInfo"/>
            </v-container>

        </template>
        <template v-else-if="userInfo === undefined">
            <v-row>
                <v-col align="center" align-self="center">
                    <v-progress-circular
                        class="ma-auto"
                        indeterminate
                        size="48"
                    ></v-progress-circular>
                </v-col>
            </v-row>
        </template>
        <template v-else>
            <v-row>
                <v-col>
                    Profile not found.
                </v-col>
            </v-row>
        </template>
    </v-container>

</template>

<style>

</style>

<script lang="ts" setup>
    import { ref, computed, watch, onMounted } from 'vue';
    import { useAccountStore, IAccountStore } from '@/stores/useAccountStore';
    import { IPublicUserInfo, RectureApi } from '@/api/RectureApi';
    import { useDisplay } from 'vuetify/lib/framework.mjs';
    import { useRoute } from 'vue-router';
    import TeacherPoliciesSection from '@/components/TeacherPoliciesSection.vue';
    import ProfileEditDialog from '@/components/ProfileEditDialog.vue';

    import "@/styles/profile.scss";

    const accountStore = useAccountStore();

    const userInfo = ref<IPublicUserInfo | IAccountStore | undefined | null>(undefined);
    const showingOnlyPublicInfo = ref<boolean>(true);
    const ProfileEditDialogVisible = ref<boolean>(false);


    const userFullName = computed<string | null>(() => userInfo.value != null ? (userInfo.value.firstName+" "+userInfo.value.lastName) : null);

    const { mdAndUp } = useDisplay();

    const route = useRoute();

    watch(() => route.params.userId, () => initialize());
    onMounted(() => initialize());

    function initialize() {
        userInfo.value = undefined;

        const userId = route.params.userId;

        let parsedUserId = null as number | null;
        if (userId && (userId instanceof String || typeof userId === "string")) parsedUserId = parseInt(userId as string);

        if (parsedUserId == null || parsedUserId === accountStore.userId) {
            userInfo.value = accountStore;
            showingOnlyPublicInfo.value = false;
        } else {
            fetchUserInfo(parsedUserId);
            showingOnlyPublicInfo.value = true;
        }
    }

    function fetchUserInfo(userId: number) {
        userInfo.value = undefined;
        RectureApi.getUserInfo(userId).then(result => {
            if (result.success && result.data != null) userInfo.value = result.data;
            else userInfo.value = null;
        }).catch(reason => {
            userInfo.value = null;
        });
    }
</script>