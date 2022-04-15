<template>
  <van-button :icon="value ? 'star' : 'star-o'" :loading="loading" :class="{ collected: value }" @click="onCollect" />
</template>

<script>
import { addCollectAPI, deleteCollectAPI } from '@/Api/index.js'
export default {
  name: 'CollectArticle',
  props: {
    value: {
      // 收藏状态
      type: Boolean,
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
        if (this.value) {
          // 已收藏，取消收藏
          await deleteCollectAPI(this.articleId)
        } else {
          // 未收藏，添加收藏
          await addCollectAPI(this.articleId)
        }
        // 更新视图
        // 自定义事件修改数据并不是立即的
        this.$emit('input', !this.value)

        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        this.$toast.fail('操作失败，请重试')
      }
      this.loading = false
    },
  },
}
</script>

<style lang="less" scoped>
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
