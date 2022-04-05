// 文章请求模块
import request from '@/utils/request.js'

// 请求获取文章列表数据
export const getArticles = (params) =>
  request({
    method: 'GET',
    url: '/v1_1/articles',
    params,
  })
