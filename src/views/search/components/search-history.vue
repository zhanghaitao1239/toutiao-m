<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-histories')">全部删除</span>
        &nbsp; &nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <!-- 渲染历史记录 -->
    <van-cell v-for="(item, index) in searchHistories" :key="index" :title="item" @click="onSearchItemClick(item, index)">
      <van-icon name="close" v-show="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    // prop 数据
    // 如果是普通数据（数字。字符串、布尔值）绝对不能修改
    // 即便改了也不会传导给父组件
    // 如果是引用类型数据，（数组、对象）
    // 可以修改，例如[].push(xxxx),对象.xxx = xxx
    // 不能重新赋值，xxx=[]
    searchHistories: {
      // 历史记录数据
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      SearchHistories: this.searchHistories,
      isDeleteShow: false, // 控制删除按钮的显示/隐藏
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 点击历史记录项，删除或跳转
    onSearchItemClick(item, index) {
      if (this.isDeleteShow) {
        // 删除状态，删除历史记录
        this.SearchHistories.splice(index, 1)
      } else {
        // 非删除状态，直接进行搜索
        this.$emit('search', item)
      }
    },
  },
}
</script>

<style></style>
