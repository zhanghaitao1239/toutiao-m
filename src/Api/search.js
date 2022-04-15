// 搜索相关请求相关模块
import request from '@/utils/request'
// 请求搜索建议接口
export const getSearchSuggestion = (q) =>
  request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q,
    },
  })
// 获取搜索结果
export const getSearchResult = (params) =>
  request({
    method: 'GET',
    url: '/v1_0/search',
    params,
  })
