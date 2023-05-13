<template>
    <v-row no-gutters class="pt-5">
        <v-col cols="2">
            <h3>{{ commentCountString }}</h3>
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
            <v-btn v-if="totalPages != null && (page+1 < totalPages || (totalPages != null && page+1 === totalPages && commentsLoading))" :disabled="commentsLoading" :loading="commentsLoading" variant="flat" color="recture-bright-blue" class="load-more-button rounded-pill" @click="fetchCommentsNextPage">Load more</v-btn>
    </template>
    <template v-else-if="commentsLoading">
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
    <template v-else-if="props.recording != null && !props.recording.commentsAllowed">
        <v-row>
            <v-col>
                Comments are disabled for this video.
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
    @import "@/styles/mixins.scss";

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

    .load-more-button {
        @include elevated-button(0px, 3px, 1px);
        border: solid 2px black;
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

    const comments = ref<IComment[] | null>([]);
    const commentCount = computed<number>(() => props.recording != null ? props.recording.comments : 0);

    const commentCountString = computed<string>(() => {
        const count = commentCount.value;
        if (count === 1) return "1 comment";
        else return count + " comments";
    });

    const page = ref<number>(0);
    const totalPages = ref<number | undefined>(undefined);

    const commentsLoading = ref<boolean>(false);

    const newCommentText = ref<string>("");
    const postingNewComment = ref<boolean>(false);

    const accountStore = useAccountStore();

    onMounted(() => initialize());
    watch(() => props.recording, () => initialize());

    function initialize() {
        page.value = 0;
        totalPages.value = undefined;

        if (props.recording != null && props.recording.commentsAllowed) fetchComments(false);
        else comments.value = [];
    }

    function fetchComments(append: boolean) : void {
        if (append !== true) {
            comments.value = [];
            page.value = 0;
        }

        if (props.recording != null) {
            commentsLoading.value = true;

            RectureApi.getCommentsByRecording(page.value, 15, props.recording.recordingId).then(result => {
                if (result.success && result.data != null) {
                    if (append && comments.value != null){
                        result.data.data.forEach(c => {
                            if (comments.value != null) comments.value.push(c);
                        });
                    } else comments.value = result.data.data;
                } else comments.value = null;
            }).catch(reason => {
                comments.value = null;
            }).finally(() => {
                commentsLoading.value = false;
            });
        } else {
            comments.value = null;
        }
    }

    function fetchCommentsNextPage() {
        page.value++;
        fetchComments(true);
    }

    function onPostButtonClicked() {
        if (props.recording != null && postingNewComment.value === false && newCommentText.value.trim().length > 0) {
            postingNewComment.value = true;

            RectureApi.createComment(props.recording.recordingId, newCommentText.value).then(result => {
                if (result.success && result.data != null) {
                    if (comments.value == null) comments.value = [result.data];
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
        }).catch(reason => {
            //TODO: Maybe show error
        });
    }
</script>