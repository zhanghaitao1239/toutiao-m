<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar">
      <van-button class="search-btn" round slot="title" type="info" size="small" icon="search">搜索</van-button>
    </van-nav-bar>
    <!-- 导航栏 -->
    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab v-for="item in channelsList" :key="item.id" :title="item.name">
        <!-- 文章列表 -->
        <article-list :channel="item"></article-list>
        <!-- 文章列表 -->
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 步骤列表 -->
  </div>
</template>

<script>
// 调用获取用户频道列表模块
import { getUserChannelsAPI } from '@/Api/index.js'
import ArticleList from '@/components/Article-list/article-list.vue'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
  },
  data() {
    return {
      active: 2,
      channelsList: [], // 频道用户的数据
    }
  },
  created() {
    this.loadChannels()
  },
  methods: {
    // 获取用户频道列表数据方法
    async loadChannels() {
      try {
        const { data } = await getUserChannelsAPI()
        console.log(data)
        this.channelsList = data.data.channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.home-container {
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/.channel-tabs {
    .van-tabs__wrap {
      height: 82px;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.9;
      i.iconfont {
        font-size: 33px;
        color: #333;
        font-weight: 700;
      }
      &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 2px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
