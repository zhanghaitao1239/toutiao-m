<template>
  <div class="article-list">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
// 导入请求文章列表的数据的接口
import { getArticlesAPI } from '@/Api/index.js'
export default {
  name: 'article-list',
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false,
      finished: false,
    }
  },
  methods: {
    async onLoad() {
      try {
        // 1.请求获取数据
        const { data } = await getArticlesAPI({
          channel_id: this.channel.id, // 频道ID
          // 时间戳 timestamp 简单理解就是请求数据的页码
          // 请求第1页数据：当前最新时间戳
          // 用于请求之后数据的时间戳会在当前请求结果中返回给你
          timestamp: Date.now(),
          with_top: 1,
        })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
      } catch (err) {
        console.log('请求失败', err)
      }

      // 2.把请求结果放到list 数组中
      // 3.本次数据加载结果之后要把加载状态设置为结果
      // 4.判断数据是否全部加载完成
    },
  },
}
</script>

<style></style>
