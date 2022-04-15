// 评论请求模块
import request from '@/utils/request'

// 获取文章评论列表
export const getComment = (params) =>
  request({
    method: 'GET',
    url: '/v1_0/comments',
    params,
  })
// 对评论或评论回复点赞
export const addCommentLikings = (target) =>
  request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target,
    },
  })
// 取消对评论或评论回复点赞
export const deleteCommentLikings = (target) =>
  request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`,
  })
// 发布文章评论或评论的回复
export const addComment = (data) =>
  request({
    method: 'POST',
    url: '/v1_0/comments',
    data,
  })
