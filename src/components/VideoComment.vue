<template>
    <v-row no-gutters>
        <v-col>
            <VideoCommentBody :author-id="authorId" :avatar="authorAvatar" :author-full-name="authorFullName" :author-user-type="authorUserType" :tagged-user-id="null" :tagged-user-full-name="null" :content="comment.content" :creation-timestamp="comment.creationTimestamp" @reply-button-click="onReplyButtonClicked" @delete-button-click="() => emit('deleteButtonClick')"/>
            <VideoCommentReplyBox v-if="showReplyBox" :replying-to="replyingTo" :disabled-and-loading="postingReply" @cancel-button-click="showReplyBox = false" @postButtonClick="onReplyBoxPostButtonClicked"/>
            <VideoCommentReply v-for="reply in replies" :key="reply.replyId" :reply="reply" @reply-button-click="() => onChildReplyButtonClicked(reply)" @delete-button-click="() => onChildDeleteButtonClicked(reply)"/>
            <v-row v-if="showLoadMoreButton">
                <v-col align="left">
                    <v-btn variant="plain" :disabled="repliesLoading" :loading="repliesLoading" @click="onLoadMoreButtonClicked">Load more replies</v-btn>
                </v-col>
            </v-row>
        </v-col>
        <div class="line"></div>
    </v-row>
</template>

<style lang="scss" scoped>
    @import "@/styles/mixins.scss";

    .v-row {
        position: relative;
    }

    .line {
        position: absolute;
        top: 68px;
        left: 22px;
        height: calc(100% - 68px);
        border-left: solid 2px black;
        opacity: 20%;
    }

    .v-btn {
        margin-left: 66px;
        opacity: 100%;
    }

    .load-more-button {
        @include elevated-button(0px, 3px, 1px);
        border: solid 2px black;
    }
</style>

<script lang="ts" setup>
    import { ref, computed, onMounted } from 'vue';
    import { IComment, ICommentReply, IPublicUserInfo, RectureApi, UserType } from '@/api/RectureApi';
    import VideoCommentBody from './VideoCommentBody.vue';
    import VideoCommentReplyBox from './VideoCommentReplyBox.vue';
    import VideoCommentReply from './VideoCommentReply.vue';

    const props = defineProps<{
        comment: IComment
    }>();

    const emit = defineEmits<{
        (e: "deleteButtonClick"): void
    }>();

    const author = ref<IPublicUserInfo | undefined>(undefined);
    const replies = ref<ICommentReply[] | undefined>(undefined);

    const authorId = computed<number | null>(() => author.value != null ? author.value.userId : null);
    const authorAvatar = computed<string | null>(() => author.value != null ? author.value.avatar : null);
    const authorFullName = computed<string | null>(() => author.value != null ? (author.value.firstName+" "+author.value.lastName) : null);
    const authorUserType = computed<UserType | null>(() => author.value != null ? author.value.userType : null);
    
    const replyingTo = ref<ICommentReply | null>(null);
    const showReplyBox = ref<boolean>(false);
    const postingReply = ref<boolean>(false);

    const page = ref<number>(0);
    const allRepliesLoaded = ref<boolean>(false);
    const repliesLoading = ref<boolean>(false);
    const showLoadMoreButton = computed<boolean>(() => replies.value != null && replies.value.length > 0 && !allRepliesLoaded.value);

    onMounted(() => {
        page.value = 0;
        allRepliesLoaded.value = false;
        fetchAuthorInfo();
        fetchReplies(page.value);
    });

    function fetchAuthorInfo() {
        author.value = undefined;

        RectureApi.getUserInfo(props.comment.userId).then((result) => {
            if (result.success && result.data != null) author.value = result.data; 
        }).catch(reason => {
            //TODO: Maybe show error
        });
    }

    function fetchReplies(page: number) {
        if (page === 0) replies.value = undefined;

        repliesLoading.value = true;

        //TODO: Test pagination
        //TODO: Maybe show error on failure?
        RectureApi.getRepliesByComment(page, 5, props.comment.commentId).then((result) => {
            if (result.success && result.data != null) {
                if (page === 0) {
                    replies.value = result.data.data;
                } else {
                    if (replies.value == undefined) replies.value = [];
                    replies.value = replies.value.concat(result.data.data);
                }

                if (result.data.pages === 0 || page+1 === result.data.pages) allRepliesLoaded.value = true;
                else allRepliesLoaded.value = false;
            }
        }).catch(reason => {
            //TODO: Maybe show error
        }).finally(() => {
            repliesLoading.value = false;
        });
    }

    function onReplyButtonClicked() {
        replyingTo.value = null;
        showReplyBox.value = true;
    }

    function onReplyBoxPostButtonClicked(replyText: string) {
        if (postingReply.value === false && replyText.trim().length > 0) {
            RectureApi.createCommentReply(props.comment.commentId, replyText, replyingTo.value != null ? replyingTo.value.replyId : null).then(result => {
                if (result.success && result.data != null) {
                    if (replies.value == undefined) replies.value = [result.data];
                    else replies.value = [result.data].concat(replies.value);
                }

                postingReply.value = false;
                showReplyBox.value = false;
                replyingTo.value = null;
            }).catch(reason => {
                postingReply.value = false;
            });
        }
    }

    function onChildReplyButtonClicked(reply: ICommentReply) {
        replyingTo.value = reply;
        showReplyBox.value = true;
    }

    function onChildDeleteButtonClicked(reply: ICommentReply) {
        //TODO: Maybe show error message on failure
        RectureApi.deleteReply(reply.replyId).then(result => {
            if (result.success) {
                if (replies.value != null) replies.value = replies.value.filter(item => item.replyId !== reply.replyId);
            }
        }).catch(reason => {
            //TODO: Maybe show error
        });
    }

    function onLoadMoreButtonClicked() {
        page.value++;;
        fetchReplies(page.value);
    }
</script>