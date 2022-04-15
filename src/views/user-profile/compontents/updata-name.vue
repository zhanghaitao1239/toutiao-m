<template>
  <div class="updata-name">
    <!-- 头部导航栏 -->
    <van-nav-bar title="设置昵称" left-text="取消" right-text="完成" @click-left="$emit('close')" @click-right="onUpdata" />
    <!-- /头部导航栏 -->
    <div class="field-wrap">
      <!-- 输入框 -->
      <van-field v-model.trim="username" rows="2" autosize type="textarea" maxlength="7" show-word-limit placeholder="请输入昵称" />
      <!-- /输入框 -->
    </div>
  </div>
</template>

<script>
// 导入修改用户资料接口
import { updataUserProfileAPI } from '@/Api/index.js'
export default {
  name: 'UpdataName',
  components: {},
  props: {
    value: {
      // 用户的昵称数据
      type: String,
      required: true,
    },
  },
  data() {
    return {
      username: this.value, // 用户的昵称
    }
  },
  methods: {
    // 修改用户昵称
    async onUpdata() {
      // 展示loading 防止用户在网络慢时,多次点击完成
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0, // 持续展示
      })
      try {
        const username = this.username
        if (!username.length) {
          this.$toast('昵称不能为空')
          return
        }
        await updataUserProfileAPI({
          name: username, // 用户昵称
        })
        // 更新视图
        this.$emit('input', username)
        // 关闭弹层
        this.$emit('close')
        // 提示成功
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.field-wrap {
  padding: 10px;
}
</style>
