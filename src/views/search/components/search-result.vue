<template>
  <div class="search-result">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error" error-text="加载失败，请点击重试" @load="onLoad">
      <van-cell v-for="(active, index) in list" :key="index" :title="active.title" />
    </van-list>
  </div>
</template>

<script>
// 导入接口模块
import { getSearchResultAPI } from '@/Api/index.js'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [], // 搜索结果的数据
      loading: false, // 控制加载状态
      finished: false, // 控制是否全部加载完毕
      page: 1, // 页码
      perPage: 20, // 每页的数量
      error: false, // 控制加载失败提示
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 触底加载更多事件
    async onLoad() {
      // 1.请求获取数据
      try {
        const { data } = await getSearchResultAPI({
          page: this.page, // 页面
          per_page: this.perPage, // 每页数量
          q: this.searchText, // 关键词
        })
        const { results } = data.data
        // 2.将数据添加到数组列表中
        this.list.push(...results)
        // 3.将本次加载中的loading关闭
        this.loading = false
        // 4.判断是否还有数据
        if (results.length) {
          this.page++
        } else {
          // 如果没有，则将加载状设置为结束
          this.finished = true
          this.loading = false
        }
      } catch (err) {
        // 展示加载失败的提示状态
        this.error = true
        // 加载失败了 loading 也要关闭,结果本次请求
        this.loading = true
        // this.$toast('数据获取失败，请稍后重试')
      }
    },
  },
}
</script>

<style></style>
