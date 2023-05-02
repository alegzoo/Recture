<template>
    <v-row no-gutters class="pt-5">
        <v-col cols="2">
            <h3>{{ commentCount }} comments</h3>
        </v-col>
    </v-row>

    <v-row v-if="props.recording != null && props.recording.commentsAllowed" no-gutters class="pt-5">
        <v-col cols="auto">
            <v-avatar size="large" :image="(accountStore.avatar as string)"></v-avatar>
        </v-col>
        <v-col class="pl-5">
            <v-textarea v-model="newCommentText" :disabled="postingNewComment" :loading="postingNewComment" label="Add a comment..." variant="outlined" auto-grow row-height="10" rows="2"/>
        </v-col>
        <v-col cols="auto" class="pl-5 pb-5" align-self="end" align="center">
            <v-btn :disabled="postingNewComment" variant="plain" height="36" :ripple="false" theme="light" icon="mdi-send" @click="onPostButtonClicked"/>
        </v-col>
    </v-row>
    
    <template v-if="props.recording != null && props.recording.commentsAllowed && comments != null">
        <VideoComment v-for="comment in comments" :key="comment.commentId" :comment="comment" @delete-button-click="() => onCommentDeleteButtonClicked(comment)"/>
    </template>
    <template v-else-if="props.recording != null && !props.recording.commentsAllowed">
        <v-row>
            <v-col>
                Comments are disabled for this video.
            </v-col>
        </v-row>
    </template>
    <template v-else-if="comments === undefined">
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
            <v-col align="center" align-self="center">
                <p>Failed to load comments.</p>
            </v-col>
        </v-row>
    </template>
</template>

<style lang="scss" scoped>
    @import "@/styles/constants.scss";

    .v-avatar {
        border-width: 2px;
        border-color: black;
        border-style: solid;
    }

    .v-list {
        background-color: transparent;
    }

    .v-btn {
        opacity: 100%;
    }
</style>

<script lang="ts" setup>
    import { ref, computed, watch, onMounted } from 'vue';
    import { IComment, IRecording, RectureApi } from '@/api/RectureApi';
    import { useAccountStore } from '@/stores/useAccountStore';
    import VideoComment from './VideoComment.vue';

    const props = defineProps<{
        recording: IRecording | null | undefined
    }>();

    const comments = ref<IComment[] | null | undefined>(undefined);
    const commentCount = computed<number>(() => props.recording != null ? props.recording.comments : 0);

    const newCommentText = ref<string>("");
    const postingNewComment = ref<boolean>(false);

    const accountStore = useAccountStore();

    onMounted(() => initialize());
    watch(() => props.recording, () => initialize());

    function initialize() {
        if (props.recording != null && props.recording.commentsAllowed) fetchComments();
        else comments.value = [];
    }

    function fetchComments() : void {
        //comments.value = undefined;

        //TODO: Add pagination
        if (props.recording != null) {
            RectureApi.getCommentsByRecording(0, 100, props.recording.recordingId).then(result => {
                if (result.success && result.data != null) comments.value = result.data.data;
                else comments.value = null;
            }).catch(reason => {
                comments.value = null;
            })
        } else {
            //comments.value = null;
        }
    }

    function onPostButtonClicked() {
        if (props.recording != null && postingNewComment.value === false && newCommentText.value.trim().length > 0) {
            postingNewComment.value = true;

            RectureApi.createComment(props.recording.recordingId, newCommentText.value).then(result => {
                if (result.success && result.data != null) {
                    if (comments.value == undefined) comments.value = [result.data];
                    else comments.value = [result.data].concat(comments.value);
                }

                newCommentText.value = "";
                postingNewComment.value = false;
            }).catch(reason => {
                postingNewComment.value = false;
            });
        }
    }

    function onCommentDeleteButtonClicked(comment: IComment) {
        //TODO: Maybe show error message on failure
        RectureApi.deleteComment(comment.commentId).then(result => {
            if (result.success) {
                if (comments.value != null) comments.value = comments.value.filter(item => item.commentId !== comment.commentId);
            }
        });
    }
</script>