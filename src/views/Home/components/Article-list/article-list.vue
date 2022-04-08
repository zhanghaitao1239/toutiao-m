<template>
  <div class="article-list">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" :success-text="refreshSuccess" :success-duration="1500" @refresh="onRefresh">
      <!-- 加载更多 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error" error-text="请求失败，点击重新加载" @load="onLoad">
        <!-- 文章列表项组件 -->
        <ArticleItem v-for="(article, index) in list" :key="index" :article="article"></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 导入请求文章列表的数据的接口
import { getArticlesAPI } from '@/Api/index.js'
// 导入文章列表项
import ArticleItem from '@/components/article-item/index.vue'
export default {
  name: 'article-list',
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [], // 存储文章列表数据的数组
      loading: false, // 控制加载中loading状态
      finished: false, // 控制数据加载结果的状态
      timestamp: null, // 请求下一页的时间戳
      error: false, // 提示请求失败的状态
      refreshing: false, // 控制下拉的状态
      refreshSuccess: '刷新成功', // 下拉刷新成功提示文体
    }
  },
  methods: {
    // 加载更多
    async onLoad() {
      try {
        // 1.请求获取数据
        const { data } = await getArticlesAPI({
          channel_id: this.channel.id, // 频道ID
          // 时间戳 timestamp 简单理解就是请求数据的页码
          // 请求第1页数据：当前最新时间戳
          // 用于请求之后数据的时间戳会在当前请求结果中返回给你
          timestamp: this.timestamp || Date.now(),
        })
        // 人为制作错误
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsdfakldjs')
        // }

        // 2.把请求结果放到list 数组中
        const { results } = data.data
        this.list.push(...results)
        // 3.本次数据加载结果之后要把加载状态设置为结果
        this.loading = false
        // 4.判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页的数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有更多数据了，将finished改为true，不再load加载更多了了
          this.finished = true
          this.loading = false
        }
      } catch (err) {
        // console.log('请求失败', err)
        this.error = true
        this.loading = false
      }
    },
    // 下拉刷新
    async onRefresh() {
      // 请求获取数据
      try {
        const { data } = await getArticlesAPI({
          channel_id: this.channel.id,
          timestamp: Date.now(),
        })
        // if (Math.random() > 0.5) { 人为错误
        //   JSON.parse('dsdfakldjs')
        // }
        // 将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)
        // 关闭下拉刷新的loading状态
        this.refreshing = false
        // 更新下拉刷新成功提示的文本
        this.refreshSuccess = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        // console.log('请求失败')
        this.refreshSuccess = '刷新失败'
        this.refreshing = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
