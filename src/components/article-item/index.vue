<template>
  <van-cell class="article-item" :to="`/article/${article.art_id}`">
    <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div class="cover-item" v-for="(item, index) in article.cover.images" :key="index">
          <van-image class="cover-img" fit="cover" :src="item" />
        </div>
      </div>
    </div>
    <div class="label-info-wrap">
      <span>{{ article.aut_name }}</span>
      <span>{{ article.comm_count }}评论</span>
      <span>{{ article.pubdate | relativeTime }}</span>
    </div>

    <van-image class="right-cover" slot="default" fit="cover" v-if="article.cover.type === 1" :src="article.cover.images[0]"></van-image>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticelItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 246px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 164px;
  }
  .label-info-wrap span {
    font-size: 22px;
    color: #999999;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
