<template>
  <div class="search-suggestion">
    <van-cell v-for="(suggestion, index) in suggestionList" :key="index" icon="search" @click="$emit('search', suggestion)">
      <!-- 让搜索的关键词高亮 -->
      <div slot="title" v-html="hightlight(suggestion)"></div>
    </van-cell>
  </div>
</template>

<script>
// 导入搜索建议接口
import { getSearchSuggestionAPI } from '@/Api/index.js'
// 按需加载有好处，只会把使用到成员打包到结果中
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    // 用户输入的内容
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestionList: [], // 搜索建议数据列表
    }
  },
  computed: {},
  watch: {
    searchText: {
      // 当 searchText 发生改变的时候会调用 handler 函数
      // handler(value) {
      //   // 调用搜索建义方法
      //   this.loadSearchSuggestion(value)
      // },

      // debounce 函数
      // 参数1：一个函数
      // 参数2：延迟时间，单位是毫秒
      // 返回值 ：防抖之后的函数
      handler: debounce(function (value) {
        this.loadSearchSuggestion(value)
      }, 900),
      immediate: true, // 该回调交将会在侦听开始之后立即调用
    },
  },
  created() {},
  mounted() {},
  methods: {
    // 请求搜索建议数据
    async loadSearchSuggestion(q) {
      try {
        const { data } = await getSearchSuggestionAPI(q)
        // console.log(data)
        this.suggestionList = data.data.options
      } catch (err) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    hightlight(suggestion) {
      const hegthlightStr = `<span class="active">${this.searchText}<span>`
      // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegExp
      // RegExp 正则表达式构造函数
      // 参数1：匹配模块字符串，它会根据这个字符串创建正则对象
      // 参数2：匹配模式，要写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      return suggestion.replace(reg, hegthlightStr)
    },
  },
}
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
