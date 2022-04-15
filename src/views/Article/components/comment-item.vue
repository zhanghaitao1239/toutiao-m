<template>
  <van-cell class="comment-item">
    <van-image slot="icon" class="avatar" round fit="cover" :src="Comment.aut_photo" />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ Comment.aut_name }}</div>
      <van-button class="like-btn" :class="{ liked: Comment.is_liking }" :icon="Comment.is_liking ? 'good-job' : 'good-job-o'" :loading="commentLoading" @click="onCommentLike">{{ Comment.like_count > 0 ? Comment.like_count : '赞' }}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{ Comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{ Comment.pubdate | relativeTime }}</span>
        <van-button class="reply-btn" round @click="$emit('reply-click', Comment)">回复 {{ Comment.reply_count }}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLikingsAPI, deleteCommentLikingsAPI } from '@/Api/index.js'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      // 评论的数据
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      Comment: this.comment, // 转存评论数据
      commentLoading: false, // loading加载状态
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onCommentLike() {
      this.commentLoading = true
      try {
        // 判断是否点赞
        if (this.Comment.is_liking) {
          // 已点赞，取消点赞
          await deleteCommentLikingsAPI(this.Comment.com_id)
          this.Comment.like_count--
        } else {
          // 未点赞，添加点赞
          await addCommentLikingsAPI(this.Comment.com_id)
          this.Comment.like_count++
        }
        this.Comment.is_liking = !this.Comment.is_liking
      } catch (err) {
        this.$toast('操作失败，请重试')
      }
      this.commentLoading = false
    },
  },
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    // width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.liked {
      color: #e5645f;
    }
  }
}
</style>
