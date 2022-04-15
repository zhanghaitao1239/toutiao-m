<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form action="/" class="search-form">
      <van-search v-model="searchText" show-action background="#3296fa" placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" @focus="isResultShow = false" />
    </form>
    <!--/搜索框 -->

    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow" :searchText="searchText"></SearchResult>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <SearchSuggestion v-else-if="searchText" :searchText="searchText" @search="onSearch"></SearchSuggestion>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <SearchHistory v-else :searchHistories="searchHistories" @clear-search-histories="searchHistories = []" @search="onSearch"></SearchHistory>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
// 导入子组件
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
import { getItem, setItem } from '@/utils/storage.js'
export default {
  name: 'SearchIndex',
  data() {
    return {
      searchText: '', // 用户输入文本框内容
      isResultShow: false, // 控制搜索结果的展示
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [], // 搜索历史记录数据
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  watch: {
    // 监听历史记录的数据 --数据持久化
    searchHistories(value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    },
  },
  created() {},
  methods: {
    // 键盘或敲击回车触发
    onSearch(val) {
      // 更新文本框内容
      this.searchText = val
      // 存储搜索历史记录
      // 要求：不要有重复历史记录、最新排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      // 渲染搜索结果
      this.isResultShow = true
    },
    // 点击取消时，触发事件
    onCancel() {
      this.$router.back()
    },
  },
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
