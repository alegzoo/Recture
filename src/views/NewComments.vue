<template>
    <v-container id="whole-comments-container" class="h-100 pa-0" fluid>
        <v-row class="pl-8 mt-10">
                <p class="text-h4 font-weight-medium">Comments</p>
        </v-row>

        <v-row class="mt-12" fluid align-content="start" align-self="start">
            <v-col cols="8" class="v-col-comments mb-n2">
                <v-row align-content="center">
                    <v-col class="ml-3" cols="auto">
                        <v-avatar outlined id="comments-avatar" size="50" image="/student1.png"></v-avatar>
                    </v-col>
                    <v-col cols="auto" align-self="center">
                        <h4>Gabriela Fotová</h4>
                    </v-col>
                    <v-col cols="auto" class="ml-1" align-self="center">
                        <v-chip id="class-chip-comment" variant="text">I.C</v-chip>
                    </v-col>
                    <v-col cols="auto" class="ml-1" align-self="center">
                        <h1 id="interpunct-comments">·</h1>
                    </v-col>
                    <v-col cols="auto" class="ml-1" align-self="center">
                        <h4 class="time-label">8 hours ago</h4>
                    </v-col>
                    <v-spacer></v-spacer>
                        <EditNewCommentsCard/>
                </v-row>
            
                <v-row class="mt-3 ml-16 mr-10" align-content="center">
                    <v-col class="ml-3" cols="auto">
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. t in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore 
                            Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, </p>
                    </v-col>
                </v-row>
                <v-row class="mt-3 ml-15 mr-10 mb-2" align-content="center">
                    <v-col cols="auto">
                        <v-btn @click="showReplyField" variant="plain" class="reply-ignore-dots-buttons" :ripple="false">
                            REPLY
                        </v-btn>
                    </v-col>
                    <v-col cols="auto" align-self="center">
                        <h2>/</h2>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn variant="plain" class="reply-ignore-dots-buttons" :ripple="false">
                            IGNORE
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="4" class="pl-4 v-col-video mb-n2">
                <v-row id="comments-row" no-gutters align-content="center">
                    <v-col>
                        <h2>Definičný obor 1/2</h2>
                    </v-col>
                </v-row>
                <v-row class="mt-1" id="comments-row" no-gutters align-content="center">
                    <v-col>
                        <p class="font-weight-normal">17.11.2023</p>
                    </v-col>
                </v-row>
                <v-row class="mt-1" id="comments-row" no-gutters align-content="center">
                    <v-col>
                        <p class="font-weight-medium">I.C</p>
                    </v-col>
                </v-row>
                <v-icon icon="mdi-play" class="play-icon"/>
            </v-col>
            <v-container fluid no-gutters class="pa-0">
                <v-row class="pb-1">
                    <v-img class="comment-bottom" src="@/assets/comment_bottom_6.svg"/>
                </v-row>
                <v-container no-gutters class="w-100 v-container-comment pb-7" fluid>
                    <ReplyTextField :comment-id="0"/>
                </v-container>
            </v-container>
        </v-row>
</v-container>
</template>

<style>

</style>

<script lang="ts" setup>
    import ReplyTextField from '@/components/ReplyTextField.vue'
    import "@/styles/newcomments.scss";
    import TimetableSetupDialog from '@/components/TimetableSetupDialog.vue';
    import EditNewCommentsCard from '@/components/EditNewCommentsCard.vue';

    function showReplyField() {    
    }
</script>