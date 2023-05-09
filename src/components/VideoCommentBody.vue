<template>
    <v-row no-gutters class="pt-5" @mouseover="mouseOver = true" @mouseleave="mouseOver = false">
        <!-- TODO: Add profile link -->
        <v-col cols="auto" align-self="start" class="author-profile-link" @click="visitAuthorProfile">
            <v-avatar v-if="avatar != null" size="large" :image="avatar"/>
        </v-col>
        <v-col class="pl-5">
            <v-row style="height: 44px;" no-gutters>
                <v-col cols="auto" align-self="center" class="author-profile-link" @click="visitAuthorProfile">
                    <h3>{{ authorFullName }}</h3>
                </v-col>
                <v-col v-if="postedByTeacher" cols="auto" align-self="center" class="pl-3">
                    <v-tooltip text="Teacher">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" icon="mdi-school" class="teacher-icon"/>
                        </template>
                    </v-tooltip>
                </v-col>
                <v-col cols="auto" align-self="center" class="pl-3">
                    <h4>&#x2022;</h4>
                </v-col>
                <v-col cols="auto" align-self="center" class="pl-3">
                    <h4>{{ dateText }}</h4>
                </v-col>
                <template v-if="mouseOver && deleteableByCurrentUser">
                    <v-spacer/>
                    <v-col cols="auto" align-self="center" class="pl-3 h-100">
                        <v-tooltip text="Delete comment" location="start">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" variant="plain" icon="mdi-delete" @click="() => emit('deleteButtonClick')"/>
                            </template>
                        </v-tooltip>
                    </v-col>
                </template>
            </v-row>

            <v-row no-gutters>
                <v-col class="pa-0 pt-3">
                    <p>
                        <router-link v-if="taggedUserLink != null && taggedUserFullName != null" :to="taggedUserLink" class="tagged-user-link">&#64;{{ taggedUserFullName }}</router-link>
                        {{ content }}
                    </p>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="auto" class="pa-0 pt-3">
                    <v-btn :ripple="false" class="px-0 reply-btn" variant="plain" @click="() => emit('replyButtonClick')">Reply</v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";

    .v-avatar {
        border-width: 2px;
        border-color: black;
        border-style: solid;
    }

    .author-profile-link {
        cursor: pointer;
    }

    .teacher-icon {
        color: $recture-yellow;
        filter: drop-shadow(1px 1px 0px black);
    }

    h4 {
        opacity: 50%;
        user-select: none;
    }

    .tagged-user-link {
        color: #0066CC;
        text-decoration: none;
    }

    .reply-btn {
        color: black;
        opacity: 100%;
        justify-content: start;
    }

    .post-btn {
        background-color: transparent;
        color: black;
    }
</style>

<script lang="ts" setup>
    import { ref, computed } from 'vue';
    import { UserType } from '@/api/RectureApi';
    import { useAccountStore } from '@/stores/useAccountStore';
    import router from '@/router';

    const props = defineProps<{
        avatar: string | null | undefined,
        authorId: number | null | undefined,
        authorFullName: string | null | undefined,
        authorUserType: UserType | null | undefined,
        taggedUserId: number | null | undefined,
        taggedUserFullName: string | null | undefined,
        content: string | null | undefined,
        creationTimestamp: number | null | undefined
    }>();

    const emit = defineEmits<{
        (e: "replyButtonClick"): void,
        (e: "deleteButtonClick"): void
    }>();

    const accountStore = useAccountStore();

    const mouseOver = ref<boolean>(false);

    const postedByTeacher = computed<boolean>(() => props.authorUserType === "TEACHER");
    const deleteableByCurrentUser = computed<boolean>(() => accountStore.userType === "TEACHER" || props.authorId === accountStore.userId);

    const taggedUserLink = computed(() => props.taggedUserId != null ? ("/profile/"+props.taggedUserId) : null);

    const dateText = computed<string | null>(() => {
        if (props.creationTimestamp == null) return null;
        const currentDate = new Date();
        const currentTimestamp = currentDate.getTime();

        const millisInMinute = 60*1000;
        const millisInHour = 60*millisInMinute;
        const millisInDay = 24*millisInHour;

        const diff = currentTimestamp - props.creationTimestamp;

        if (diff < 2*millisInMinute) return "Just now";
        else if (diff < millisInHour) return generateDateText(diff, millisInMinute, "minute"); 
        else if (diff < millisInDay) return generateDateText(diff, millisInHour, "hour");
        else return generateDateText(diff, millisInDay, "day");
    });

    function generateDateText(diff: number, unitSize: number, unit: string) {
        const amount = Math.round(diff/unitSize);
        if (amount == 1) return amount+" "+unit+" ago";
        else return amount+" "+unit+"s ago";
    }

    function visitAuthorProfile() : void {
        if (props.authorId != null) {
            router.push({ name: "profile", params: { userId: props.authorId } }).catch(reason => {
                console.error(reason);
            });
        }
    }
</script>