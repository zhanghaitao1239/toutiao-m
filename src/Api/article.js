// 文章请求模块
import request from '@/utils/request.js'

// 请求获取文章列表数据
export const getArticles = (params) =>
  request({
    method: 'GET',
    url: '/v1_0/articles',
    params,
  })
// 根据id获取文章新闻详情
export const getArticelInfo = (articleId) =>
  request({
    method: 'GET',
    url: `v1_0/articles/${articleId}`,
  })
// 收藏文章
export const addCollect = (target) =>
  request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target,
    },
  })

// 取消收藏
export const deleteCollect = (target) =>
  request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`,
  })
// 点赞
export const addLike = (target) =>
  request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target,
    },
  })
// 取消点赞
export const deleteLike = (target) =>
  request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`,
  })
