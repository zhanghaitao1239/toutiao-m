<template>
  <van-button :icon="value === 1 ? 'good-job' : 'good-job-o'" :loading="loading" :class="{ liked: value === 1 }" @click="onCollect" />
</template>

<script>
import { addLikeAPI, deleteLikeAPI } from '@/Api/index.js'
export default {
  name: 'likeCollect',
  props: {
    value: {
      type: Number,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async onCollect() {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          // 已点赞，取消点赞
          await deleteLikeAPI(this.articleId)
        } else {
          // 未点赞，添加点赞
          await addLikeAPI(this.articleId)
          status = 1
        }
        // 更新视图
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast.fail('操作失败，请重试')
      }
      this.loading = false
    },
  },
}
</script>

<style lang="less" scoped>
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>
