<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow @click-left="$router.back()" title="文章详情"></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 文章详情主体 -->
    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoadingShow">
        <van-loading color="#3296fa" vertical>加载中...</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articleInfo.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleInfo.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <!-- 用户头像 -->
          <van-image class="avatar" slot="icon" round fit="cover" :src="articleInfo.aut_photo" />
          <div class="user-name" slot="title">{{ articleInfo.aut_name }}</div>
          <div class="publish-date" slot="label">{{ articleInfo.pubdate | relativeTime }}</div>
          <!-- 关注按钮 -->
          <!--
            模板中的$event 是事件参数
            当我们传递给子组件的数据即要使用还要修改
            传递：props
            : is-followed="articleInfo.is_followed"
            修改：自定义事件
            @update-is_followed="articel.is_followed=$event"
            简写方式：在组件上使用v-model
            value="articleInfo.is_followed"
            @input="articleInfo.is_followed=$event"

            如果需要修改 v-model 的规则名称，可以通过子组件的model 属性来配置

            一个组件上只能使用一次 v-model
            如果有多个数据需要实现类似于 v-model 的效果
            可以使用属性的 .sync 修饰符
           -->
          <FollowUser class="follow-btn" v-model="articleInfo.is_followed" :userId="articleInfo.aut_id"></FollowUser>
          <!-- <van-button v-if="articleInfo.is_followed" class="follow-btn" round size="small" :loading="followLoading" @click="onFollowed">已关注</van-button>
          <van-button v-else class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus" :loading="followLoading" @click="onFollowed">关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->
        <!-- 文章内容 -->
        <div ref="article-content" class="article-content markdown-body" v-html="articleInfo.content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论列表 组件 -->
        <comment-list :source="articleInfo.art_id" :list="commentsList" @onload-success="totalCommentCount = $event.total_count" @reply-click="onReplyClick"></comment-list>
        <!-- /文章评论列表组件 -->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small" @click="isPostShow = true">写评论</van-button>
          <van-icon name="comment-o" :info="totalCommentCount" color="#777" />
          <!-- 收藏组件 -->
          <collect-article class="btn-item" :articleId="articleInfo.art_id" v-model="articleInfo.is_collected"></collect-article>
          <!-- <van-icon color="#777" name="star-o" /> -->
          <!-- 点赞组件 -->
          <liked-collect class="btn-item" v-model="articleInfo.attitude" :articleId="articleInfo.art_id"></liked-collect>
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <!-- 发布评论弹出层 -->
        <van-popup v-model="isPostShow" position="bottom">
          <comment-post :targetId="articleInfo.art_id" @post-success="onPostSuccess"></comment-post>
        </van-popup>
        <!-- 发布评论弹出层 -->
      </div>
      <!-- /加载完成-文章详情 -->
      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- /文章详情主体 -->

    <!-- 评论回复弹出层  -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 100%"> <comment-reply v-if="isReplyShow" :comment="currentComment" @close="isReplyShow = false" /> </van-popup>
    <!--/评论回复弹出层 -->
  </div>
</template>

<script>
// 导入文章新闻详情接口
import { getArticelInfoAPI } from '@/Api/index.js'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/followUser/index.vue'
import CollectArticle from '@/components/collect-article/index.vue'
import likedCollect from '@/components/like-collect/index.vue'
import CommentList from './components/comment-list.vue'
import CommentPost from './components/comment-post.vue'
import CommentReply from './components/comment-reply.vue'
export default {
  name: 'myArticle',
  components: {
    FollowUser,
    CollectArticle,
    likedCollect,
    CommentList,
    CommentPost,
    CommentReply,
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      articleInfo: {}, // 文章详情数据
      isLoadingShow: true, // 控制加载状态
      errStatus: 0, // 失败的状态码
      // followLoading: false, // 控制关注的loading状态
      totalCommentCount: 0, // 评论的数量
      isPostShow: false, // 评论弹出层的显示状态
      commentsList: [], // 评论的数据
      isReplyShow: false, // 控制回复的弹出层
      currentComment: {}, // 当前点击回复的评论项
    }
  },
  // 给所有的后代提供数据
  provide: function () {
    return {
      articleId: this.articleId,
    }
  },
  computed: {},
  watch: {},
  created() {
    // 初始化文章数据方法
    this.loadArticle()
  },
  mounted() {},
  methods: {
    // 初始化文章详情数据
    async loadArticle() {
      this.isLoadingShow = true
      try {
        const { data } = await getArticelInfoAPI(this.articleId)
        // if (Math.random() > 0.5) { 手动制造加载失败
        //   JSON.parse('adafhjkadhsklj')
        // }
        this.articleInfo = data.data
        // 初始化图上点击预览
        setTimeout(() => {
          this.previewImage()
        }, 0)

        // 请求成功，关闭isLoadingShow=false
        this.isLoadingShow = false
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        // this.$toast('获取数据失败，请稍后重试')
        this.isLoadingShow = false
      }
    },
    // 文章中图片预览方法
    previewImage() {
      // 得到所有的img节点
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      // 获取所有img 地址
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            // 预览的图片地址数组
            images: images,
            // 起始位置，从0 开始
            startPosition: index,
          })
        }
      })
      // console.log(images)
    },
    // 发布评论的方法
    onPostSuccess(data) {
      // 关闭弹出层
      this.isPostShow = false
      // 将发布内容显示到列表顶部
      this.commentsList.unshift(data.new_obj)
    },
    // 回复弹出层当前项的方法
    onReplyClick(comment) {
      this.currentComment = comment
      // 让弹出层显示
      this.isReplyShow = true
    },
  },
}
</script>

<style lang="less" scoped>
@import './github-markdown.css';
.article-container {
  // 内部主体
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }
  // 底部区域
  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
    .btn-item {
      border: none;
      padding: 0;
      height: 40px;
      line-height: 40px;
      color: #777;
    }
    .collect-btn--collected {
      color: #ffa500;
    }
    .like-btn--liked {
      color: #e5645f;
    }
  }
}
</style>
