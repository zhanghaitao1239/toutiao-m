<template>
  <div class="my-container">
    <!-- 登录状态 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image round class="avatar" fit="cover" :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button round size="mini">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录的状态 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录/注册</span>
      </div>
    </div>

    <!-- 导航 -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i class="iconfont icon-shoucang" slot="icon"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i class="iconfont icon-lishi" slot="icon"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 导航 -->
    <!-- 消息通知 小智同学 退出登录  -->
    <div class="mg9">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </div>
    <van-cell clickable v-if="user" class="lgout-cell" title="退出登录" @click="onLogout" />
  </div>
</template>

<script>
// 将vuex中状态映射到当前页面中
import { mapState } from 'vuex'
// 获取用户自己信息的接口
import { getUserInfoAPI } from '@/Api/index.js'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data() {
    return {
      userInfo: {}, // 用户信息
    }
  },
  computed: {
    // 映射到这里
    ...mapState(['user']),
  },
  created() {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    // 退出登录
    onLogout() {
      // 退出提示
      this.$dialog
        .confirm({
          title: '确认退出吗？',
        })
        .then(() => {
          // 确定退出执行
          // 清除登录状态
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // 取消执行
        })
    },
    // 获取用户自己信息
    async loadUserInfo() {
      try {
        const { data } = await getUserInfoAPI()
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  // 未登录状态
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  //登录状态样式
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 2px solid #fff;
        }
        .name {
          margin-left: 22px;
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .data-item {
        flex: 1;
        display: flex;
        height: 130px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  //收藏/历史
  .grid-nav {
    .grid-item {
      height: 141px;
      i.iconfont {
        font-size: 45px;
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .mg9 {
    margin: 9px 0;
  }
  // 退出登录
  .lgout-cell {
    text-align: center;
    color: #d86262;
  }
}
</style>
