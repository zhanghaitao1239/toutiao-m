<template>
  <div class="updata-birthday">
    <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @cancel="$emit('close')" @confirm="confirm" />
  </div>
</template>

<script>
import { updataUserProfileAPI } from '@/Api/index.js'
import dayjs from 'dayjs'
export default {
  name: 'UpdataBirthday',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // birthday: this.value, // 用户的初始生日
      minDate: new Date(1970, 0, 1), // 可选的最小日期
      maxDate: new Date(), // 可选的最大日期
      currentDate: new Date(this.value),
    }
  },
  methods: {
    // 点击确定触发
    async confirm() {
      // 展示loading 防止用户在网络慢时,多次点击完成
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0, // 持续展示
      })
      try {
        // 将选择的日期格式化 20020-01-10
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await updataUserProfileAPI({
          birthday: currentDate,
        })
        // console.log(data)
        // 更新视图
        this.$emit('input', currentDate)
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

<style></style>
