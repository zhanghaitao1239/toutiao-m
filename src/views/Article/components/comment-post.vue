<template>
  <div class="comment-post">
    <van-field class="post-field" v-model.trim="message" rows="2" autosize type="textarea" maxlength="50" placeholder="请输入留言" show-word-limit />
    <van-button class="post-btn" :disabled="!message.length" @click="addComment">发布</van-button>
  </div>
</template>

<script>
import { addCommentAPI } from '@/Api/index.js'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    targetId: {
      // 文章的id
      type: [Number, String, Object],
      required: true,
    },
  },
  // 接收祖先组件中的数据
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  data() {
    return {
      message: '', // 评论的内容
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 发布评论方法
    async addComment() {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true, // 禁用背景点击
        duration: 0, // 持续时间，默认是2000， 如果为0 则持续展示
      })
      try {
        const { data } = await addCommentAPI({
          target: this.targetId.toString(), // 文章的id
          content: this.message, // 评论的内容
          art_id: this.articleId ? this.articleId.toString() : null, // 文章的id 后面要回复评论使用
        })
        // console.log(data)
        this.$toast.success('发布成功')
        // 发布完成将文本框清空
        this.message = ''
        // 使用自定义事件，通过父组件关闭弹出层
        this.$emit('post-success', data.data)
      } catch (err) {
        this.$toast.fail('操作失败，请重试')
      }
    },
  },
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
