<template>
  <van-button v-if="isFollowed" class="follow-btn" round size="small" :loading="loading" @click="onFollowed">已关注</van-button>
  <van-button v-else class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus" :loading="loading" @click="onFollowed">关注</van-button>
</template>

<script>
import { addFollowingsAPI, deleteFollowingsAPI } from '@/Api/index.js'
export default {
  name: 'FollowUser',
  // 修改自定义v-model的数据名称 名为 value的prop和名为input 的事件
  model: {
    prop: 'isFollowed', // 默认value
    event: 'update-is_followed', // 默认input
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true,
    },
    userId: {
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
    // 关注和取消关注
    async onFollowed() {
      this.loading = true
      try {
        if (this.isFollowed) {
          // 已关注，取消关注
          await deleteFollowingsAPI(this.userId)
        } else {
          // 没有关注，添加关注
          await addFollowingsAPI(this.userId)
        }
        // this.loading = !this.loading
        // this.$emit('updateIsFollowed', !this.value)
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (err) {
        let message = '操作失败，请重试'
        if (err.response && err.response.status === 400) {
          message = '你不能关注你自己！'
        }
        this.$toast(message)
      }
      this.loading = false
    },
  },
}
</script>

<style></style>
