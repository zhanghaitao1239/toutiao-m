<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar :title="Comment.reply_count > 0 ? `${Comment.reply_count}条回复` : '暂无回复'">
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <div class="sroll-wrap">
      <!-- 当前评论项 -->
      <comment-item :comment="Comment"></comment-item>
      <!-- 评论的回复列表 -->
      <van-cell title="全部回复" />
      <comment-list :source="Comment.com_id" type="c" :list="commentList"></comment-list>
      <!-- /评论的回复列表 -->
      <!-- 底部区域 -->
      <div class="post-wrap">
        <van-button class="post-btn" size="small" round @click="isPostShow = true">写评论</van-button>
        <!-- 发布评论 -->
        <van-popup v-model="isPostShow" position="bottom">
          <comment-post :targetId="Comment.com_id" @post-success="onPostSuccess"></comment-post>
        </van-popup>
        <!-- /发布评论 -->
      </div>
    </div>
  </div>
</template>

<script>
import CommentItem from './comment-item.vue' // 当前评论项组件
import CommentList from './comment-list.vue' // 评论列表
import CommentPost from './comment-post.vue'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost,
  },

  props: {
    comment: {
      // 评论回复内容数据
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isPostShow: false, // 控制弹出层的显示与隐藏
      Comment: this.comment, // 评论回复内容
      commentList: [], // 评论回复列表
    }
  },
  methods: {
    // 发布成功后
    onPostSuccess(data) {
      // 更新回复的数量
      this.Comment.reply_count++
      // 关闭弹出层
      this.isPostShow = false
      // 将最新回复展示到页面上
      this.commentList.unshift(data.new_obj)
    },
  },
}
</script>

<style lang="less" scoped>
.sroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>
