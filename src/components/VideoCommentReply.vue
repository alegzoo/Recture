<template>
    <v-row>
        <v-col>
            <VideoCommentBody :author-id="authorId" :avatar="authorAvatar" :author-full-name="authorFullName" :author-user-type="authorUserType" :tagged-user-id="taggedReplyAuthorId" :tagged-user-full-name="taggedReplyAuthorFullName" :content="reply.content" :creation-timestamp="reply.creationTimestamp" @reply-button-click="() => emit('replyButtonClick')" @delete-button-click="() => emit('deleteButtonClick')"/>
        </v-col>
    </v-row>
</template>

<style lang="scss" scoped>
    .v-col {
        padding-left: 80px;
    }
</style>

<script lang="ts" setup>
    import { ref, computed, onMounted } from 'vue';
    import { ICommentReply, IPublicUserInfo, RectureApi, UserType } from '@/api/RectureApi';
    import VideoCommentBody from './VideoCommentBody.vue';

    const props = defineProps<{
        reply: ICommentReply
    }>();

    const emit = defineEmits<{
        (e: "replyButtonClick"): void,
        (e: "deleteButtonClick"): void
    }>();

    const author = ref<IPublicUserInfo | undefined>(undefined);
    
    const authorId = computed<number | null>(() => author.value != null ? author.value.userId : null);
    const authorAvatar = computed<string | null>(() => author.value != null ? author.value.avatar : null);
    const authorFullName = computed<string | null>(() => author.value != null ? (author.value.firstName+" "+author.value.lastName) : null);
    const authorUserType = computed<UserType | null>(() => author.value != null ? author.value.userType : null);

    const taggedReplyAuthorId = computed<number | null>(() => props.reply.taggedReplyUserId != null ? props.reply.taggedReplyUserId : null);
    const taggedReplyAuthorFullName = computed<string | null>(() => (props.reply.taggedReplyUserFirstName != null && props.reply.taggedReplyUserLastName != null) ? (props.reply.taggedReplyUserFirstName+" "+props.reply.taggedReplyUserLastName) : null);

    onMounted(() => {
        fetchAuthorInfo();
    });

    function fetchAuthorInfo() {
        author.value = undefined;

        RectureApi.getUserInfo(props.reply.userId).then((result) => {
            if (result.success && result.data != null) author.value = result.data;
        }).catch(reason => {
            //TODO: Maybe show error
        });
    }
</script>