<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="close" @click="$router.back()" />
    </van-nav-bar>
    <!-- 导航栏 -->
    <!-- 登录表单 -->
    <!-- 表单验证：
    1、给van-field 组件配置 rules 验证规则
    2. 当表单提交的时候会自动触发表单验证
    如果验证通过，会触发 submit事件
    如果验证失败，不会触发submit事件 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field v-model="user.mobile" type="number" name="mobile" placeholder="请输入手机号" :rules="userFormRules.mobile" maxlength="11">
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field v-model="user.code" type="number" name="验证码" placeholder="请输入验证码" :rules="userFormRules.code" maxlength="6">
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <!-- 验证码 -->
        <template #button>
          <!-- 倒计时
          time 是倒计时时间 -->
          <van-count-down :time="1000 * 60" format="ss s" v-if="isCountDownShow" @finish="isCountDownShow = false" />
          <van-button v-else native-type="button" class="send-sms-btn" round size="small" type="pdefault" @click="onSendSms">获取验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 导入接口模块
import { loginAPI, sendSmsAPI } from '@/Api/index.js'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '', // 手机号
        code: '', // 验证码
      },
      userFormRules: {
        // 表单验证规则
        mobile: [
          { require: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式错误' },
        ],
        code: [
          { require: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' },
        ],
      },
      isCountDownShow: false, // 是否显示倒计时
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 表单提交
    async onSubmit() {
      // 1.获取表单数据
      const user = this.user
      // TODO: 2.表单验证

      // 在组件中必须通过this.$toast 来调用Toast 组件
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true, // 禁用背景点击
        duration: 0, // 持续时间，默认是2000， 如果为0 则持续展示
      })
      // 3.提交表单请求登录
      try {
        const { data } = await loginAPI(user)
        // 使用Vuex方法，将登录成功后的获得token存入到Vuex中
        this.$store.commit('setUser', data.data)
        // console.log('登录成功')
        this.$toast.success('登录成功')
        // 登录成功，跳转加原来页面
        // back 的方式不严谨，后面讲功能优化的时候再说
        this.$router.back()
      } catch (err) {
        // 错误的捕获
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
      // 4.根据请求响应结果处理后续操作
    },
    // 获取验证码
    async onSendSms() {
      // 1.校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        // console.log('验证通过')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2.验证通过，显示倒计时
      this.isCountDownShow = true
      // 3.请求发送验证码
      try {
        await sendSmsAPI(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.isCountDownShow = false // 发送失败，就不开启倒计时
        if (err.response.status === 429) {
          this.$toast('发送太频繁了,请稍后重试')
        } else {
          this.$toast('发送失败,请稍后重试')
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
    border: none;
  }
  .login-btn-wrap {
    padding: 53px 28px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      border-radius: 8px;
    }
  }
}
</style>
