<template>
  <div class="updata-gender">
    <!-- 头部导航栏 -->
    <van-picker title="设置性别" show-toolbar :columns="columns" :default-index="localgender" @cancel="$emit('close')" @confirm="onConfirm" @change="onPickerChange" />
    <!-- /头部导航栏 -->
  </div>
</template>

<script>
import { updataUserProfileAPI } from '@/Api/index.js'
export default {
  name: 'UpdataGender',
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: ['男', '女'],
      localgender: this.value, // 用户的性别
    }
  },
  methods: {
    // 更新用户性别
    async onConfirm() {
      // 展示loading 防止用户在网络慢时,多次点击完成
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0, // 持续展示
      })
      try {
        const localgender = this.localgender

        await updataUserProfileAPI({
          gender: localgender,
        })
        // 更新视图
        this.$emit('input', localgender)
        // 关闭弹出层
        this.$emit('close')
        // 提示成功
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
    // 内容发生改变时
    onPickerChange(picker, value, index) {
      this.localgender = index
    },
  },
}
</script>

<style></style>
