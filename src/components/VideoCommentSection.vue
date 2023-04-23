<template>
    <v-row no-gutters class="pt-5">
        <v-col cols="2">
            <h3>2 comments</h3>
        </v-col>
    </v-row>

    <v-row no-gutters class="pt-5">
        <v-col class="pl-11" cols="1">
            <v-avatar size="large" image="/jano.png"></v-avatar>
        </v-col>
        <v-col cols="10" class="pl-5">
            <v-textarea class="field-add-comment" label="Add a comment..." variant="outlined" auto-grow row-height="10" rows="2"></v-textarea>
        </v-col>
        <v-col cols="auto" class="pl-5 pb-5" align-self="end" align="center">
            <v-btn variant="text" :ripple="false" class="post-btn" theme="light" icon="mdi-send"></v-btn>
        </v-col>
    </v-row>
    
    <template v-for="comment in comments">
        <v-row no-gutters class="pt-5">
            <v-col cols="1">
                <v-col class="pa-0 pl-11">
                    <v-avatar size="large" image="/student1.png"></v-avatar>
                </v-col>
                <v-col class="h-100 pl-12 pa-0" align="center" align-self="center">
                    <v-divider :class="'v-divider-comment'+(comment === replyingTo?' visible':'')" class="v-divider-comment" vertical :thickness="2"></v-divider>
                </v-col>
            </v-col>

            <v-col align-self="center" cols="11">
                <v-row no-gutters class="pt-3">
                    <v-col cols="2" class="pa-0 pl-6">
                        <h3>Gabriela Fotová</h3>
                    </v-col> 
                    <v-col  class="pa-0 pl-5">
                        <v-chip class="student-chip">IV.A</v-chip>
                    </v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col class="pa-0 pl-6 pt-4">
                        <p>Dobrý deň, chýbala som na dnešnej hodine a rada by som sa opýtala čo by sa stalo ak by namiesto mocniny bola odmocnina v druhom
                        príklade (21:12)</p>
                    </v-col>

                </v-row>

                <v-row no-gutters>
                    <v-col cols="1" class="pa-0 pl-4 pt-3">
                        <v-btn @click="showReplyToComment(comment)" :ripple="false" class="reply-btn" variant="plain">Reply</v-btn>
                    </v-col>
                </v-row>
            </v-col>


        </v-row>
        <ReplyToComment v-if="comment === replyingTo"></ReplyToComment>
    </template>

    <v-row no-gutters class="pt-10">
        <v-col class="pl-11" cols="auto">
            <v-avatar size="large" image="/student2.png"></v-avatar>
        </v-col>
        <v-col align-self="center" class="pl-5" cols="auto">
            <h3>Daniel Jachab</h3>
        </v-col>
        <v-col align-self="center" class="pl-5" cols="auto">
            <v-chip class="student-chip">IV.A</v-chip>
        </v-col>
    </v-row>
    
    <v-row no-gutters class="pt-2 pl-16">
        <v-col cols="12" class="pl-12">
            <p>Rád by som sa opýtal čo ste mysleli tou poznámkou v čase 37:44 lebo som tomu neporozumel a taktiež prečo bolo na tabuli napísané
            odmocnina z 3-troch v čase 38:55</p>
        </v-col>
    </v-row>

    <v-row no-gutters class="pt-2 pl-16">
        <v-col cols="auto" class="pl-8">
            <v-btn :ripple="false" class="reply-btn" variant="plain">Reply</v-btn>
        </v-col>
    </v-row>
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";
    @import "@/styles/mixins.scss";

    .v-avatar {
        border-width: 2px;
        border-color: black;
        border-style: solid;
    }

    .reply-btn {
        color: black;
        opacity: 100%;
    }

    .student-chip {
        background-color: $recture-red;
        border-style: solid;
        border-width: 2px;
        border-color: black;
        box-shadow: 3px 3px 0px 0px black;
    }

    .post-btn {
        background-color: transparent;
        color: black;
    }

    .v-divider-comment {
        opacity: 0%;
    }

    .v-divider-comment.visible {
        color: black !important;
        opacity: 100%;
    }
</style>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { IComment, ICommentReply } from '@/api/RectureApi';
    import ReplyToComment from './VideoCommentReply.vue';

    function showReplyToComment(comment: IComment) {   
        replyingTo.value = comment;
    }

    const comments = ref<IComment[]>([
        {
            commentId: 0,
            recordingId: 0,
            userId: 0,
            userFirstName: "test",
            userLastName: "test",
            content: "test",
            creationTimestamp: 0,
            lastEditTimestamp: 0
        }
    ]);
    
    const replyingTo = ref<IComment>();
</script>