<template>
  <!--只有List 在可视范围内才会 -->
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error="error" error-text="加载失败，请重试" :immediate-check="false" @load="onLoad">
    <comment-item v-for="(item, index) in commentList" :key="index" :comment="item" @reply-click="$emit('reply-click', $event)" />
  </van-list>
</template>

<script>
import { getCommentAPI } from '@/Api/index.js'
import CommentItem from './comment-item.vue'
export default {
  name: 'CommentList',
  components: {
    CommentItem,
  },
  props: {
    source: {
      // 文章的id
      type: [Number, String, Object],
      required: true,
    },
    list: {
      // 评论的数组
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      // 自定义Prop 数据验证
      validator(value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a',
    },
  },
  data() {
    return {
      commentList: this.list, // 评论数据
      loading: false,
      finished: false,
      offset: null, // 下一页的页码值
      limit: 10, // 请求评论的条数
      error: false, // 控制加载失败的状态
    }
  },
  created() {
    // 当你手动初始化 onLoad 的话，它不会自动开始的loading
    this.loading = true
    // 页面一加载就调用，可以开始就可以拿到评论总数
    this.onLoad()
  },
  methods: {
    async onLoad() {
      // 1.请求获取数据
      try {
        const { data } = await getCommentAPI({
          type: this.type, // 评论类型, a-对文章(article),c-对评论(comment)的回复
          source: this.source.toString(), // 文章的id
          offset: this.offset, // 页码值
          limit: this.limit, // 每次请求的个数
        })
        // console.log(data)
        // 2. 将数据添加到列表中
        const { results } = data.data
        this.commentList.push(...results)
        // 把文章评论的总数量传递到外部
        this.$emit('onload-success', data.data)

        // 3.将 loading设置为 false
        this.loading = false
        // 4.判断是否还有数据
        if (results.length) {
          // 有就更新获取下一页的数据页码
          this.offset = data.data.last_id
        } else {
          // 没有就将 finished 设置结束
          this.finished = true
        }
      } catch (ert) {
        // this.$toast('获取数据失败，请稍后重试')
        this.error = true
        this.loading = false
      }
    },
  },
}
</script>

<style></style>
